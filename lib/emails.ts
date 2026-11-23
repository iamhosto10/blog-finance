import { LEAD_MAGNETS, type BuiltInLeadMagnet } from "@/lib/leadMagnets";
import { getBrebPaymentInstructions, type BrebPaymentInstructions } from "@/lib/recursos";
import { escapeHtml } from "@/lib/subscribers";

export const DEFAULT_FROM_EMAIL = "info@monopolombiano.com";
export const DEFAULT_SITE_URL = "https://monopolombiano.com";

export const BRAND_COLORS = {
  green: "#327e41",
  greenDark: "#245c30",
  greenDeep: "#14331b",
  yellow: "#fbd028",
  yellowSoft: "#fce16b",
  cream: "#fefdee",
  mint: "#edf9ee",
  sageBorder: "#a5cfbf",
  ink: "#1a241c",
  muted: "#4a5d4e",
} as const;

export function getSiteBaseUrl(): string {
  const configured = process.env.SITE_URL?.trim();
  if (!configured) return DEFAULT_SITE_URL;
  return configured.replace(/\/+$/, "");
}

export function getBrandLogoUrl(): string {
  return `${getSiteBaseUrl()}/icon.png`;
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
  subtitle?: string;
  bodyHtml: string;
}): string {
  const siteUrl = getSiteBaseUrl();
  const logoUrl = getBrandLogoUrl();

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(params.title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND_COLORS.mint};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND_COLORS.ink};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(params.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND_COLORS.mint};padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid ${BRAND_COLORS.sageBorder};box-shadow:0 8px 24px rgba(50,126,65,0.10);">
            <!-- Franja superior amarilla de marca -->
            <tr>
              <td style="background-color:${BRAND_COLORS.yellow};height:6px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <!-- Encabezado verde Monopolombiano con logo -->
            <tr>
              <td align="center" style="background-color:${BRAND_COLORS.green};padding:30px 28px 28px 28px;text-align:center;">
                <a href="${siteUrl}" style="text-decoration:none;display:inline-block;">
                  <img
                    src="${logoUrl}"
                    alt="El Monopolombiano"
                    width="82"
                    height="82"
                    style="display:block;width:82px;height:82px;border-radius:999px;border:3px solid ${BRAND_COLORS.yellow};background-color:#ffffff;margin:0 auto 12px auto;"
                  />
                </a>
                <div style="font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_COLORS.yellowSoft};margin:0 0 12px 0;">
                  EL MONOPOLOMBIANO
                </div>
                <span style="display:inline-block;background-color:${BRAND_COLORS.yellow};color:${BRAND_COLORS.greenDeep};font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:5px 14px;border-radius:999px;">
                  ${escapeHtml(params.badge)}
                </span>
                <h1 style="margin:14px 0 0 0;font-size:24px;line-height:1.25;color:#ffffff;font-weight:800;">
                  ${escapeHtml(params.title)}
                </h1>
                ${
                  params.subtitle
                    ? `<p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;color:#e6f6e9;">${escapeHtml(params.subtitle)}</p>`
                    : ""
                }
              </td>
            </tr>
            <!-- Contenido principal -->
            <tr>
              <td style="padding:30px 28px 26px 28px;font-size:15px;line-height:1.65;color:${BRAND_COLORS.ink};">
                ${params.bodyHtml}
              </td>
            </tr>
            <!-- Pie de página con identidad de marca -->
            <tr>
              <td style="background-color:${BRAND_COLORS.mint};padding:22px 28px;font-size:12px;line-height:1.6;color:${BRAND_COLORS.muted};border-top:1px solid ${BRAND_COLORS.sageBorder};text-align:center;">
                <p style="margin:0 0 6px 0;">
                  <strong style="color:${BRAND_COLORS.greenDark};">El Monopolombiano</strong> · Finanzas personales claras para Colombia
                </p>
                <p style="margin:0;">
                  <a href="${siteUrl}" style="color:${BRAND_COLORS.green};font-weight:700;text-decoration:none;">Inicio</a>
                  &nbsp;·&nbsp;
                  <a href="${siteUrl}/calculadoras" style="color:${BRAND_COLORS.green};font-weight:700;text-decoration:none;">Calculadoras</a>
                  &nbsp;·&nbsp;
                  <a href="${siteUrl}/recursos" style="color:${BRAND_COLORS.green};font-weight:700;text-decoration:none;">Recursos PRO</a>
                  &nbsp;·&nbsp;
                  <a href="${siteUrl}/anunciate" style="color:${BRAND_COLORS.green};font-weight:700;text-decoration:none;">Anúnciate</a>
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
      : "¡Bienvenido a El Monopolombiano! Aquí tienes tu plantilla gratuita";

  const introText = isCalculatorLead
    ? "¡Gracias por usar nuestras calculadoras! Aquí tienes el enlace directo para descargar tu recurso cuando quieras en Excel o Google Sheets:"
    : params.alreadySubscribed
      ? "¡Qué bueno verte de nuevo! Tu correo ya hacía parte de la comunidad de El Monopolombiano. Aquí te dejamos a mano tu plantilla gratuita para organizar tus finanzas en Colombia:"
      : "¡Qué alegría tenerte por acá! En El Monopolombiano te ayudamos a tomar mejores decisiones con tu plata en Colombia: comparativas reales de cuentas EA, tarjetas, impuestos y herramientas prácticas sin rodeos.";

  const bodyHtml = `
    <p style="margin:0 0 14px 0;font-size:16px;font-weight:700;color:${BRAND_COLORS.greenDark};">¡Hola!</p>
    <p style="margin:0 0 22px 0;">${escapeHtml(introText)}</p>

    <!-- Tarjeta destacada del recurso gratuito -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND_COLORS.cream};border:2px solid ${BRAND_COLORS.yellow};border-radius:14px;margin:0 0 26px 0;">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:800;color:${BRAND_COLORS.green};text-transform:uppercase;letter-spacing:0.08em;">
            Regalo de bienvenida · Descarga gratuita
          </p>
          <p style="margin:0 0 16px 0;font-size:17px;line-height:1.35;font-weight:800;color:${BRAND_COLORS.ink};">
            ${escapeHtml(leadMagnet.title)}
          </p>
          <a href="${downloadUrl}" style="display:inline-block;background-color:${BRAND_COLORS.green};color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:13px 22px;border-radius:10px;border-bottom:3px solid ${BRAND_COLORS.greenDark};">
            Descargar plantilla gratis (.CSV) →
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 12px 0;font-size:15px;font-weight:800;color:${BRAND_COLORS.greenDark};">
      Herramientas recomendadas para empezar hoy:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 10px 0;background-color:${BRAND_COLORS.mint};border-left:4px solid ${BRAND_COLORS.green};border-radius:8px;">
      <tr>
        <td style="padding:12px 16px;">
          <a href="${siteUrl}/calculadoras/calculadora-de-rentabilidad" style="color:${BRAND_COLORS.greenDark};font-weight:800;text-decoration:none;font-size:14px;">
            Comparador de cuentas de rentabilidad en Colombia →
          </a>
          <p style="margin:4px 0 0 0;font-size:13px;color:${BRAND_COLORS.muted};">
            Compara Nu, Lulo, Pibank, Bold, Global66, Rappi y Popular con retención y 4x1000.
          </p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 10px 0;background-color:${BRAND_COLORS.mint};border-left:4px solid ${BRAND_COLORS.green};border-radius:8px;">
      <tr>
        <td style="padding:12px 16px;">
          <a href="${siteUrl}/calculadoras/comparador-de-tarjetas" style="color:${BRAND_COLORS.greenDark};font-weight:800;text-decoration:none;font-size:14px;">
            Comparador de tarjetas de crédito →
          </a>
          <p style="margin:4px 0 0 0;font-size:13px;color:${BRAND_COLORS.muted};">
            Revisa cuota de manejo, beneficios y tasas antes de pedir tu próxima tarjeta.
          </p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;background-color:${BRAND_COLORS.cream};border-left:4px solid ${BRAND_COLORS.yellow};border-radius:8px;">
      <tr>
        <td style="padding:12px 16px;">
          <a href="${siteUrl}/recursos" style="color:${BRAND_COLORS.greenDark};font-weight:800;text-decoration:none;font-size:14px;">
            Plantillas PRO y Diagnóstico Financiero 1-a-1 →
          </a>
          <p style="margin:4px 0 0 0;font-size:13px;color:${BRAND_COLORS.muted};">
            Lleva tu presupuesto, compra de vivienda o plan de deudas al siguiente nivel.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 14px 0;font-size:14px;color:${BRAND_COLORS.muted};">
      Si tienes alguna duda sobre finanzas personales en Colombia, responde directamente a este correo — leemos cada mensaje.
    </p>
    <p style="margin:0;font-weight:800;color:${BRAND_COLORS.greenDark};">
      Un saludo,<br />Gerardo · El Monopolombiano
    </p>
  `;

  return {
    subject,
    html: wrapEmailLayout({
      preheader: `Descarga gratis: ${leadMagnet.title}`,
      badge: "Bienvenida",
      title: isCalculatorLead
        ? "Tu plantilla gratuita está lista"
        : "¡Bienvenido a El Monopolombiano!",
      subtitle: "Finanzas personales claras y herramientas reales para Colombia",
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
    <p style="margin:0 0 14px 0;font-size:16px;">Hola <strong style="color:${BRAND_COLORS.greenDark};">${escapeHtml(params.name)}</strong>,</p>
    <p style="margin:0 0 20px 0;">
      Recibimos tu solicitud en <strong>Monopolombiano Recursos</strong>. Para completar tu compra o reserva de forma inmediata y sin comisiones, realiza la transferencia vía <strong>Bre-B</strong> desde cualquier banco o billetera en Colombia:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND_COLORS.cream};border:2px solid ${BRAND_COLORS.yellow};border-radius:14px;margin:0 0 20px 0;">
      <tr>
        <td style="padding:18px 22px;">
          <p style="margin:0 0 10px 0;font-size:12px;font-weight:800;color:${BRAND_COLORS.green};text-transform:uppercase;letter-spacing:0.06em;">
            Datos para transferencia inmediata por Bre-B
          </p>
          <p style="margin:0 0 6px 0;"><strong>Llave Bre-B:</strong> <span style="font-family:monospace;font-size:15px;font-weight:700;color:${BRAND_COLORS.greenDeep};">${escapeHtml(breb.key)}</span></p>
          <p style="margin:0 0 6px 0;"><strong>Banco:</strong> ${escapeHtml(breb.bank)}</p>
          <p style="margin:0 0 6px 0;"><strong>Titular:</strong> ${escapeHtml(breb.holder)}</p>
          <p style="margin:0;"><strong>Valor a transferir:</strong> <strong style="color:${BRAND_COLORS.green};">${escapeHtml(params.priceFormatted)}</strong></p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND_COLORS.mint};border:1px solid ${BRAND_COLORS.sageBorder};border-radius:12px;margin:0 0 22px 0;">
      <tr>
        <td style="padding:14px 18px;font-size:14px;">
          <p style="margin:0 0 6px 0;"><strong>Recurso / Servicio:</strong> ${escapeHtml(params.productTitle)}</p>
          <p style="margin:0;"><strong>Medio seleccionado:</strong> ${escapeHtml(params.paymentPreference)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 16px 0;">
      <strong>Paso final:</strong> una vez hagas la transferencia, <strong>responde a este mismo correo adjuntando el comprobante</strong> para enviarte de inmediato el acceso a tu plantilla o el enlace para agendar tu diagnóstico 1-a-1.
    </p>
    <p style="margin:0 0 20px 0;font-size:14px;color:${BRAND_COLORS.muted};">
      Si tienes cualquier pregunta, solo responde este mensaje. Mientras tanto, puedes explorar nuestras
      <a href="${siteUrl}/calculadoras" style="color:${BRAND_COLORS.green};font-weight:700;">calculadoras gratuitas</a>.
    </p>
    <p style="margin:0;font-weight:800;color:${BRAND_COLORS.greenDark};">Gracias por tu confianza,<br />Gerardo · El Monopolombiano</p>
  `;

  return {
    subject: `Instrucciones de pago Bre-B: ${params.productTitle}`,
    html: wrapEmailLayout({
      preheader: `Datos Bre-B para completar tu solicitud de ${params.productTitle} (${params.priceFormatted})`,
      badge: "Pago inmediato vía Bre-B",
      title: "Instrucciones para completar tu solicitud",
      subtitle: `${params.productTitle} · ${params.priceFormatted}`,
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
    <p style="margin:0 0 14px 0;font-size:16px;">Hola <strong style="color:${BRAND_COLORS.greenDark};">${escapeHtml(params.contactName)}</strong>,</p>
    <p style="margin:0 0 18px 0;">
      Gracias por escribirnos en nombre de <strong>${escapeHtml(params.company)}</strong>. Recibimos tu solicitud comercial en El Monopolombiano:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND_COLORS.mint};border:1px solid ${BRAND_COLORS.sageBorder};border-radius:12px;margin:0 0 22px 0;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px 0;"><strong>Formato de interés:</strong> ${escapeHtml(params.packageTitle)}</p>
          <p style="margin:0;"><strong>Referencia comercial:</strong> ${escapeHtml(params.priceLabel)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 18px 0;">
      Revisaremos los detalles y te responderemos en menos de 24 horas hábiles con disponibilidad de espacios, métricas actualizadas y propuesta a la medida.
    </p>
    <p style="margin:0 0 22px 0;font-size:14px;color:${BRAND_COLORS.muted};">
      Puedes consultar nuevamente nuestro Media Kit en <a href="${siteUrl}/anunciate" style="color:${BRAND_COLORS.green};font-weight:700;">monopolombiano.com/anunciate</a> o responder directamente a este correo si deseas adjuntar un brief.
    </p>
    <p style="margin:0;font-weight:800;color:${BRAND_COLORS.greenDark};">Saludos,<br />Gerardo Ramírez · El Monopolombiano</p>
  `;

  return {
    subject: `Recibimos la solicitud comercial de ${params.company} · Monopolombiano`,
    html: wrapEmailLayout({
      preheader: `Confirmación de contacto comercial para ${params.company}`,
      badge: "Alianzas y Pauta B2B",
      title: "Recibimos tu propuesta comercial",
      subtitle: `${params.company} · ${params.packageTitle}`,
      bodyHtml,
    }),
  };
}
