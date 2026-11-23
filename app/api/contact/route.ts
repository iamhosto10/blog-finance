import { Resend } from "resend";
import { getEmailFrom } from "@/lib/emails";
import { escapeHtml, isValidEmail } from "@/lib/subscribers";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, apellido, correo, mensaje } = await req.json();
    const safeEmail = typeof correo === "string" ? correo.trim() : "";

    await resend.emails.send({
      from: getEmailFrom("Formulario Web"),
      to: process.env.EMAIL_TO!,
      ...(isValidEmail(safeEmail) ? { replyTo: safeEmail } : {}),
      subject: "Nuevo mensaje desde el formulario",
      html: `
      <h2>Nuevo mensaje recibido</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(String(nombre ?? ""))}</p>
      <p><strong>Apellido:</strong> ${escapeHtml(String(apellido ?? ""))}</p>
      <p><strong>Correo:</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Mensaje:</strong><br>${escapeHtml(String(mensaje ?? ""))}</p>
    `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error }, { status: 500 });
  }
}
