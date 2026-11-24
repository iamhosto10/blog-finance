import { trackEvent } from "@/lib/gtag";

export interface SubmitLeadMagnetParams {
  email: string;
  source: string;
  fileSlug: string;
  trackingContext?: Record<string, string>;
}

export interface SubmitLeadMagnetResult {
  ok: boolean;
  alreadySubscribed?: boolean;
  message: string;
}

/**
 * Dispara la descarga directa del lead magnet en el navegador sin navegar fuera de la página.
 */
export function triggerLeadMagnetDownload(downloadHref: string): void {
  const link = document.createElement("a");
  link.href = downloadHref;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Envía el correo al endpoint `/api/subscribe`, registra eventos GA4 e inicia la descarga del recurso.
 */
export async function submitLeadMagnetSubscription({
  email,
  source,
  fileSlug,
  trackingContext = {},
}: SubmitLeadMagnetParams): Promise<SubmitLeadMagnetResult> {
  const cleanedEmail = email.trim();
  const downloadHref = `/api/files/${fileSlug}`;

  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: cleanedEmail,
      source,
    }),
  });
  const data = await res.json();

  if (res.ok && data.ok) {
    trackEvent("lead_signup", { source });
    trackEvent("lead_magnet_download", {
      file_slug: fileSlug,
      ...trackingContext,
    });
    triggerLeadMagnetDownload(downloadHref);
    return {
      ok: true,
      alreadySubscribed: Boolean(data.alreadySubscribed),
      message: data.alreadySubscribed
        ? "¡Listo! Tu correo ya estaba registrado y tu descarga ha comenzado."
        : "¡Registro exitoso! Tu descarga ha comenzado automáticamente.",
    };
  }

  return {
    ok: false,
    message: data.error || "Ingresa un correo electrónico válido.",
  };
}
