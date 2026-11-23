import { LEAD_MAGNETS, type BuiltInLeadMagnet } from "@/lib/leadMagnets";
import { getBrebPaymentInstructions, type BrebPaymentInstructions } from "@/lib/recursos";
import { escapeHtml } from "@/lib/subscribers";

export const DEFAULT_FROM_EMAIL = "info@monopolombiano.com";
export const DEFAULT_SITE_URL = "https://monopolombiano.com";

export function getSiteBaseUrl(): string {
  const configured = process.env.SITE_URL?.trim();
  if (!configured) return DEFAULT_SITE_URL;
  return configured.replace(/\/+$/, "");
}

/**
 * Devuelve el remitente formateado para Resend usando `EMAIL_FROM` si está definido
 * o `info@monopolombiano.com` por defecto.
 */
export function getEmailFrom(senderName = "Monopolombiano"): string {
  const configured = process.env.EMAIL_FROM?.trim();
  if (configured) {
    if (configured.includes("<") && configured.includes(">")) {
      return configured;
    }
    return `${senderName} <${configured}>`;
  }
  return `${senderName} <${DEFAULT_FROM_EMAIL}>`;
}

export function resolveLeadMagnetForSource(source: string): {
  leadMagnet: BuiltInLeadMagnet;
  isCalculatorLead: boolean;
} {
  const normalized = source.toLowerCase();
  const isCalculatorLead = normalized.startsWith("calc_");

  if (normalized.includes("vivienda") || normalized.includes("leasing")) {
    return {
      leadMagnet: LEAD_MAGNETS["checklist-vivienda-vis-colombia"],
      isCalculatorLead,
    };
  }

  return {
    leadMagnet: LEAD_MAGNETS["guia-presupuesto-50-30-20-colombia"],
    isCalculatorLead,
  };
}

function wrapEmailLayout(params: {
  preheader: string;
  badge: string;
  title: string;
  bodyHtml: string;
}): string {
  const siteUrl = getSiteBaseUrl();

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(params.title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(params.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background-color:#0f172a;padding:28px 28px 24px 28px;">
                <span style="display:inline-block;background-color:#facc15;color:#0f172a;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">
                  ${escapeHtml(params.badge)}
                </span>
                <h1 style="margin:14px 0 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">
                  ${escapeHtml(params.title)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:15px;line-height:1.65;color:#334155;">
                ${params.bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:#f1f5f9;padding:20px 28px;font-size:12px;line-height:1.6;color:#64748b;border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 6px 0;">
                  Enviado por <strong style="color:#0f172a;">Monopolombiano</strong> · Finanzas personales claras para Colombia.
                </p>
                <p style="margin:0;">
                  <a href="${siteUrl}" style="color:#0f172a;text-decoration:underline;">monopolombiano.com</a> ·
                  <a href="${siteUrl}/calculadoras" style="color:#0f172a;text-decoration:underline;">Calculadoras</a> ·
                  <a href="${siteUrl}/recursos" style="color:#0f172a;text-decoration:underline;">Recursos PRO</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildSubscriberWelcomeEmail(params: {
  source: string;
  alreadySubscribed: boolean;
}): { subject: string; html: string } {
  const siteUrl = getSiteBaseUrl();
  const { leadMagnet, isCalculatorLead } = resolveLeadMagnetForSource(params.source);
  const downloadUrl = `${siteUrl}/api/files/${leadMagnet.slug}`;

  const subject = isCalculatorLead
    ? `Tu recurso gratuito de Monopolombiano: ${leadMagnet.title}`
    : params.alreadySubscribed
      ? "Tu acceso a las herramientas y plantilla gratuita de Monopolombiano"
      : "¡Bienvenido a Monopolombiano! Aquí tienes tu plantilla gratuita";

  const introText = isCalculatorLead
    ? "¡Gracias por usar las calculadoras de Monopolombiano! Aquí tienes el enlace directo para volver a descargar tu recurso cuando quieras en Excel o Google Sheets:"
    : params.alreadySubscribed
      ? "¡Qué bueno verte de nuevo! Tu correo ya hacía parte de la comunidad de Monopolombiano. Aquí te dejamos a mano nuestra plantilla gratuita para organizar tus finanzas en Colombia:"
      : "¡Bienvenido a la comunidad de Monopolombiano! Cada semana compartimos herramientas prácticas, comparativas reales de cuentas EA en Colombia y guías claras para que tu plata rinda más.";

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Hola,</p>
    <p style="margin:0 0 20px 0;">${escapeHtml(introText)}</p>

    <div style="background-color:#fefce8;border:1px solid #fde047;border-radius:12px;padding:18px 20px;margin:0 0 24px 0;">
      <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#854d0e;text-transform:uppercase;letter-spacing:0.04em;">
        Recurso gratuito listo para descargar
      </p>
      <p style="margin:0 0 14px 0;font-size:16px;font-weight:700;color:#0f172a;">
        ${escapeHtml(leadMagnet.title)}
      </p>
      <a href="${downloadUrl}" style="display:inline-block;background-color:#0f172a;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:8px;">
        Descargar plantilla (.CSV) →
      </a>
    </div>

    <p style="margin:0 0 10px 0;font-weight:700;color:#0f172a;">Herramientas recomendadas para empezar hoy:</p>
    <ul style="margin:0 0 22px 0;padding-left:20px;">
      <li style="margin-bottom:8px;">
        <a href="${siteUrl}/calculadoras/calculadora-de-rentabilidad" style="color:#0f172a;font-weight:600;">Comparador de cuentas de rentabilidad en Colombia</a> (Nu, Lulo, Pibank, Bold, Global66, Rappi y Popular).
      </li>
      <li style="margin-bottom:8px;">
        <a href="${siteUrl}/calculadoras/comparador-de-tarjetas" style="color:#0f172a;font-weight:600;">Comparador de tarjetas de crédito</a> (cuota de manejo, beneficios y tasas).
      </li>
      <li style="margin-bottom:0;">
        <a href="${siteUrl}/recursos" style="color:#0f172a;font-weight:600;">Plantillas PRO y Diagnóstico Financiero 1-a-1</a> si quieres llevar tu plan financiero al siguiente nivel.
      </li>
    </ul>

    <p style="margin:0;">
      Si tienes alguna duda sobre finanzas personales en Colombia, responde directamente a este correo — leemos cada mensaje.
    </p>
    <p style="margin:14px 0 0 0;font-weight:700;color:#0f172a;">Un saludo,<br />Equipo de Monopolombiano</p>
  `;

  return {
    subject,
    html: wrapEmailLayout({
      preheader: `Descarga gratis: ${leadMagnet.title}`,
      badge: "Monopolombiano · Bienvenida",
      title: isCalculatorLead
        ? "Tu plantilla gratuita está lista"
        : "¡Bienvenido a Monopolombiano!",
      bodyHtml,
    }),
  };
}

export function buildRecursosConfirmationEmail(params: {
  name: string;
  productTitle: string;
  priceFormatted: string;
  paymentPreference: string;
  breb?: BrebPaymentInstructions;
}): { subject: string; html: string } {
  const siteUrl = getSiteBaseUrl();
  const breb = params.breb ?? getBrebPaymentInstructions();

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Hola <strong>${escapeHtml(params.name)}</strong>,</p>
    <p style="margin:0 0 18px 0;">
      Recibimos tu solicitud en <strong>Monopolombiano Recursos</strong>. Para completar tu compra o reserva de forma inmediata y sin comisiones, realiza la transferencia vía <strong>Bre-B</strong> desde cualquier banco o billetera en Colombia:
    </p>

    <div style="background-color:#fefce8;border:1px solid #fde047;border-radius:12px;padding:18px 20px;margin:0 0 20px 0;">
      <p style="margin:0 0 10px 0;font-size:13px;font-weight:700;color:#854d0e;text-transform:uppercase;letter-spacing:0.04em;">
        Datos para transferencia inmediata por Bre-B
      </p>
      <p style="margin:0 0 6px 0;"><strong>Llave Bre-B:</strong> <span style="font-family:monospace;font-size:15px;color:#0f172a;">${escapeHtml(breb.key)}</span></p>
      <p style="margin:0 0 6px 0;"><strong>Banco:</strong> ${escapeHtml(breb.bank)}</p>
      <p style="margin:0 0 6px 0;"><strong>Titular:</strong> ${escapeHtml(breb.holder)}</p>
      <p style="margin:0;"><strong>Valor a transferir:</strong> ${escapeHtml(params.priceFormatted)}</p>
    </div>

    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin:0 0 22px 0;">
      <p style="margin:0 0 8px 0;"><strong>Recurso / Servicio:</strong> ${escapeHtml(params.productTitle)}</p>
      <p style="margin:0;"><strong>Medio seleccionado:</strong> ${escapeHtml(params.paymentPreference)}</p>
    </div>

    <p style="margin:0 0 18px 0;">
      <strong>Paso final:</strong> una vez hagas la transferencia, <strong>responde a este mismo correo adjuntando el comprobante</strong> para enviarte de inmediato el acceso a tu plantilla o el enlace para agendar tu diagnóstico 1-a-1.
    </p>
    <p style="margin:0 0 22px 0;">
      Si tienes cualquier pregunta, solo responde este mensaje. Mientras tanto, puedes explorar nuestras
      <a href="${siteUrl}/calculadoras" style="color:#0f172a;font-weight:600;">calculadoras gratuitas</a>.
    </p>
    <p style="margin:0;font-weight:700;color:#0f172a;">Gracias por tu confianza,<br />Gerardo · Monopolombiano</p>
  `;

  return {
    subject: `Instrucciones de pago Bre-B: ${params.productTitle}`,
    html: wrapEmailLayout({
      preheader: `Datos Bre-B para completar tu solicitud de ${params.productTitle} (${params.priceFormatted})`,
      badge: "Pago inmediato vía Bre-B",
      title: "Instrucciones para completar tu solicitud",
      bodyHtml,
    }),
  };
}

export function buildAnunciateConfirmationEmail(params: {
  contactName: string;
  company: string;
  packageTitle: string;
  priceLabel: string;
}): { subject: string; html: string } {
  const siteUrl = getSiteBaseUrl();

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Hola <strong>${escapeHtml(params.contactName)}</strong>,</p>
    <p style="margin:0 0 18px 0;">
      Gracias por escribirnos en nombre de <strong>${escapeHtml(params.company)}</strong>. Recibimos tu solicitud comercial en Monopolombiano:
    </p>

    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin:0 0 22px 0;">
      <p style="margin:0 0 8px 0;"><strong>Formato de interés:</strong> ${escapeHtml(params.packageTitle)}</p>
      <p style="margin:0;"><strong>Referencia comercial:</strong> ${escapeHtml(params.priceLabel)}</p>
    </div>

    <p style="margin:0 0 18px 0;">
      Revisaremos los detalles y te responderemos en menos de 24 horas hábiles con disponibilidad de espacios, métricas actualizadas y propuesta a la medida.
    </p>
    <p style="margin:0 0 22px 0;">
      Puedes consultar nuevamente nuestro Media Kit en <a href="${siteUrl}/anunciate" style="color:#0f172a;font-weight:600;">monopolombiano.com/anunciate</a> o responder directamente a este correo si deseas adjuntar un brief.
    </p>
    <p style="margin:0;font-weight:700;color:#0f172a;">Saludos,<br />Gerardo Ramírez · Monopolombiano</p>
  `;

  return {
    subject: `Recibimos la solicitud comercial de ${params.company} · Monopolombiano`,
    html: wrapEmailLayout({
      preheader: `Confirmación de contacto comercial para ${params.company}`,
      badge: "Alianzas y Pauta B2B",
      title: "Recibimos tu propuesta comercial",
      bodyHtml,
    }),
  };
}
