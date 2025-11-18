import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, apellido, correo, mensaje } = await req.json();

    await resend.emails.send({
      from: `Formulario Web <onboarding@resend.dev>`,
      to: process.env.EMAIL_TO!,
      subject: "Nuevo mensaje desde el formulario",
      html: `
      <h2>Nuevo mensaje recibido</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Apellido:</strong> ${apellido}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Mensaje:</strong><br>${mensaje}</p>
    `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error }, { status: 500 });
  }
}
