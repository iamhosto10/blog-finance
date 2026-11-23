import { Resend } from "resend";
import { buildSubscriberWelcomeEmail, getEmailFrom } from "@/lib/emails";
import { client } from "@/lib/sanity";
import {
  escapeHtml,
  formatColombiaDate,
  isValidEmail,
  normalizeEmail,
  sanitizeSource,
  upsertSubscriber,
  type SanitySubscriberClient,
} from "@/lib/subscribers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const rawSource = sanitizeSource(body?.source, "footer_newsletter");

    if (!isValidEmail(rawEmail)) {
      return Response.json(
        { ok: false, error: "Ingresa un correo electrónico válido." },
        { status: 400 },
      );
    }

    const email = normalizeEmail(rawEmail);
    let alreadySubscribed = false;
    let persisted = false;

    if (process.env.SANITY_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      try {
        const result = await upsertSubscriber(
          { email, source: rawSource },
          client as unknown as SanitySubscriberClient,
        );
        alreadySubscribed = result.alreadySubscribed;
        persisted = result.persisted;
      } catch (sanityError) {
        console.error("Error persistiendo suscriptor en Sanity:", sanityError);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;

    if (!apiKey || !emailTo) {
      return Response.json(
        { ok: false, error: "Servicio de suscripción no configurado." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const fechaColombia = formatColombiaDate();
    const estadoSanity = persisted
      ? alreadySubscribed
        ? "Suscriptor existente (actualizado en Sanity sin duplicar)"
        : "Nuevo suscriptor guardado en Sanity"
      : "No guardado en Sanity (revisar logs / token)";

    await resend.emails.send({
      from: getEmailFrom("Monopolombiano Leads"),
      to: emailTo,
      replyTo: email,
      subject: alreadySubscribed
        ? `Re-interacción de suscriptor en Monopolombiano (${rawSource})`
        : `Nuevo suscriptor en Monopolombiano (${rawSource})`,
      html: `
        <h2>${alreadySubscribed ? "Suscriptor actualizado" : "Nuevo lead registrado"} en Monopolombiano</h2>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Origen:</strong> ${escapeHtml(rawSource)}</p>
        <p><strong>Estado en Sanity:</strong> ${escapeHtml(estadoSanity)}</p>
        <p><strong>Fecha (Colombia):</strong> ${escapeHtml(fechaColombia)}</p>
      `,
    });

    let welcomeEmailSent = false;
    try {
      const welcome = buildSubscriberWelcomeEmail({
        source: rawSource,
        alreadySubscribed,
      });
      await resend.emails.send({
        from: getEmailFrom("Monopolombiano"),
        to: email,
        replyTo: emailTo,
        subject: welcome.subject,
        html: welcome.html,
      });
      welcomeEmailSent = true;
    } catch (welcomeError) {
      console.error("Error enviando correo de bienvenida al suscriptor:", welcomeError);
    }

    return Response.json({ ok: true, alreadySubscribed, persisted, welcomeEmailSent });
  } catch (error) {
    console.error("Error registrando suscriptor:", error);
    return Response.json(
      { ok: false, error: "No pudimos completar tu suscripción. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
