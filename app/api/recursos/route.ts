import { Resend } from "resend";
import { buildRecursosConfirmationEmail, getEmailFrom } from "@/lib/emails";
import { client } from "@/lib/sanity";
import { findRecursoById } from "@/lib/recursos";
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
    const rawName = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "";
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const rawProductId = typeof body?.productId === "string" ? body.productId.trim() : "";
    const rawNotes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 500) : "";
    const rawPaymentPreference =
      typeof body?.paymentPreference === "string"
        ? body.paymentPreference.trim().slice(0, 60)
        : "PSE / Nequi";

    if (!rawName || rawName.length < 2) {
      return Response.json(
        { ok: false, error: "Por favor ingresa tu nombre completo." },
        { status: 400 },
      );
    }

    if (!isValidEmail(rawEmail)) {
      return Response.json(
        { ok: false, error: "Ingresa un correo electrónico válido." },
        { status: 400 },
      );
    }

    const product = findRecursoById(rawProductId);
    if (!product) {
      return Response.json(
        { ok: false, error: "Selecciona un recurso o servicio válido." },
        { status: 400 },
      );
    }

    const email = normalizeEmail(rawEmail);
    const source = `recursos_${product.id}`;
    let persisted = false;
    let alreadySubscribed = false;

    if (process.env.SANITY_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      try {
        const result = await upsertSubscriber(
          {
            email,
            source,
            name: rawName,
            interest: `${product.title} (${product.priceFormatted})`,
          },
          client as unknown as SanitySubscriberClient,
        );
        persisted = result.persisted;
        alreadySubscribed = result.alreadySubscribed;
      } catch (sanityError) {
        console.error("Error guardando solicitud de /recursos en Sanity:", sanityError);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;

    if (!apiKey || !emailTo) {
      return Response.json(
        { ok: false, error: "Servicio de solicitudes no configurado." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const fechaColombia = formatColombiaDate();

    await resend.emails.send({
      from: getEmailFrom("Monopolombiano Recursos"),
      to: emailTo,
      replyTo: email,
      subject: `Nueva solicitud en /recursos: ${product.title} (${product.priceFormatted})`,
      html: `
        <h2>Nueva solicitud de recurso / asesoría en Monopolombiano</h2>
        <p><strong>Recurso / Servicio:</strong> ${escapeHtml(product.title)}</p>
        <p><strong>Valor:</strong> ${escapeHtml(product.priceFormatted)}</p>
        <p><strong>Nombre:</strong> ${escapeHtml(rawName)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Medio de pago preferido:</strong> ${escapeHtml(rawPaymentPreference)}</p>
        <p><strong>Notas del usuario:</strong> ${rawNotes ? escapeHtml(rawNotes) : "Sin notas adicionales"}</p>
        <p><strong>Estado en Sanity:</strong> ${persisted ? (alreadySubscribed ? "Suscriptor existente actualizado" : "Nuevo suscriptor guardado") : "No guardado en Sanity"}</p>
        <p><strong>Fecha (Colombia):</strong> ${escapeHtml(fechaColombia)}</p>
      `,
    });

    let confirmationEmailSent = false;
    try {
      const confirmation = buildRecursosConfirmationEmail({
        name: rawName,
        productTitle: product.title,
        priceFormatted: product.priceFormatted,
        paymentPreference: rawPaymentPreference,
      });
      await resend.emails.send({
        from: getEmailFrom("Monopolombiano"),
        to: email,
        replyTo: emailTo,
        subject: confirmation.subject,
        html: confirmation.html,
      });
      confirmationEmailSent = true;
    } catch (confirmationError) {
      console.error("Error enviando confirmación al solicitante de /recursos:", confirmationError);
    }

    return Response.json({
      ok: true,
      persisted,
      alreadySubscribed,
      confirmationEmailSent,
      productTitle: product.title,
    });
  } catch (error) {
    console.error("Error procesando solicitud en /recursos:", error);
    return Response.json(
      { ok: false, error: "No pudimos enviar tu solicitud. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
