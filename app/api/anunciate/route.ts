import { Resend } from "resend";
import { client } from "@/lib/sanity";
import { isSafeExternalUrl } from "@/lib/affiliates";
import { findAdPackageById } from "@/lib/anunciate";
import {
  escapeHtml,
  formatColombiaDate,
  isValidEmail,
  normalizeEmail,
  upsertSubscriber,
  type SanitySubscriberClient,
} from "@/lib/subscribers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const company = typeof body?.company === "string" ? body.company.trim().slice(0, 120) : "";
    const contactName =
      typeof body?.contactName === "string" ? body.contactName.trim().slice(0, 120) : "";
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const packageId = typeof body?.packageId === "string" ? body.packageId.trim() : "";
    const budgetRange =
      typeof body?.budgetRange === "string"
        ? body.budgetRange.trim().slice(0, 80)
        : "Por definir";
    const rawWebsite = typeof body?.website === "string" ? body.website.trim().slice(0, 200) : "";
    const notes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 600) : "";

    if (!company || company.length < 2) {
      return Response.json(
        { ok: false, error: "Por favor ingresa el nombre de tu empresa o marca." },
        { status: 400 },
      );
    }

    if (!contactName || contactName.length < 2) {
      return Response.json(
        { ok: false, error: "Por favor ingresa tu nombre de contacto." },
        { status: 400 },
      );
    }

    if (!isValidEmail(rawEmail)) {
      return Response.json(
        { ok: false, error: "Ingresa un correo corporativo o de contacto válido." },
        { status: 400 },
      );
    }

    const pkg = findAdPackageById(packageId);
    if (!pkg) {
      return Response.json(
        { ok: false, error: "Selecciona un formato de pauta o alianza válido." },
        { status: 400 },
      );
    }

    const safeWebsite = rawWebsite
      ? isSafeExternalUrl(rawWebsite)
        ? rawWebsite
        : isSafeExternalUrl(`https://${rawWebsite}`)
          ? `https://${rawWebsite}`
          : ""
      : "";

    const email = normalizeEmail(rawEmail);
    const source = `anunciate_b2b_${pkg.id}`;
    let persisted = false;
    let alreadySubscribed = false;

    if (process.env.SANITY_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      try {
        const result = await upsertSubscriber(
          {
            email,
            source,
            name: `${contactName} (${company})`.slice(0, 120),
            interest: `${pkg.title} · ${budgetRange}`.slice(0, 160),
          },
          client as unknown as SanitySubscriberClient,
        );
        persisted = result.persisted;
        alreadySubscribed = result.alreadySubscribed;
      } catch (sanityError) {
        console.error("Error guardando lead B2B en Sanity:", sanityError);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;

    if (!apiKey || !emailTo) {
      return Response.json(
        { ok: false, error: "Servicio de contacto comercial no configurado." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const fechaColombia = formatColombiaDate();

    await resend.emails.send({
      from: "Monopolombiano B2B <onboarding@resend.dev>",
      to: emailTo,
      subject: `Nueva propuesta comercial B2B: ${company} — ${pkg.title}`,
      html: `
        <h2>Nueva solicitud de pauta / alianza en Monopolombiano</h2>
        <p><strong>Empresa / Marca:</strong> ${escapeHtml(company)}</p>
        <p><strong>Contacto:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Sitio web:</strong> ${safeWebsite ? escapeHtml(safeWebsite) : "No informado"}</p>
        <p><strong>Formato de interés:</strong> ${escapeHtml(pkg.title)} (${escapeHtml(pkg.priceLabel)})</p>
        <p><strong>Presupuesto estimado:</strong> ${escapeHtml(budgetRange)}</p>
        <p><strong>Objetivo / Mensaje:</strong> ${notes ? escapeHtml(notes) : "Sin detalles adicionales"}</p>
        <p><strong>Estado en Sanity:</strong> ${persisted ? (alreadySubscribed ? "Contacto existente actualizado" : "Nuevo contacto B2B guardado") : "No guardado en Sanity"}</p>
        <p><strong>Fecha (Colombia):</strong> ${escapeHtml(fechaColombia)}</p>
      `,
    });

    return Response.json({
      ok: true,
      persisted,
      alreadySubscribed,
      packageTitle: pkg.title,
    });
  } catch (error) {
    console.error("Error procesando solicitud B2B en /api/anunciate:", error);
    return Response.json(
      { ok: false, error: "No pudimos enviar tu solicitud comercial. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
