import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawEmail = typeof body?.email === "string" ? body.email.trim() : "";
    const rawSource =
      typeof body?.source === "string" && body.source.trim()
        ? body.source.trim().slice(0, 80)
        : "footer_newsletter";

    if (!EMAIL_REGEX.test(rawEmail)) {
      return Response.json(
        { ok: false, error: "Ingresa un correo electrónico válido." },
        { status: 400 },
      );
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
    const fechaColombia = new Intl.DateTimeFormat("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Bogota",
    }).format(new Date());

    await resend.emails.send({
      from: "Monopolombiano Leads <onboarding@resend.dev>",
      to: emailTo,
      subject: `Nuevo suscriptor en Monopolombiano (${rawSource})`,
      html: `
        <h2>Nuevo lead registrado en Monopolombiano</h2>
        <p><strong>Correo:</strong> ${escapeHtml(rawEmail)}</p>
        <p><strong>Origen:</strong> ${escapeHtml(rawSource)}</p>
        <p><strong>Fecha (Colombia):</strong> ${escapeHtml(fechaColombia)}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error registrando suscriptor:", error);
    return Response.json(
      { ok: false, error: "No pudimos completar tu suscripción. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
