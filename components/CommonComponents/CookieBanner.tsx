"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "monopolombiano_cookie_consent";
const EXPIRE_DAYS = 365;

type Consent = {
  necessary: boolean;
  analytics: boolean;
  ads: boolean;
};

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()};SameSite=Lax`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) {
      setShow(true);
    } else {
      try {
        const parsed = JSON.parse(cookie) as Consent;
        setConsent((c) => ({ ...c, ...parsed }));
      } catch (e) {
        // malformed cookie -> show banner
        setShow(true);
      }
    }
  }, []);

  function acceptAll() {
    const c: Consent = { necessary: true, analytics: true, ads: true };
    setCookie(COOKIE_NAME, JSON.stringify(c), EXPIRE_DAYS);
    setConsent(c);
    setShow(false);
    // TODO: inicializar analytics/ads si usas (p.ej. initGA())
  }

  function acceptSelected() {
    const c = { ...consent, necessary: true };
    setCookie(COOKIE_NAME, JSON.stringify(c), EXPIRE_DAYS);
    setOpenSettings(false);
    setShow(false);
    // TODO: inicializar condicionalmente analytics/ads
  }

  function declineNonEssential() {
    const c: Consent = { necessary: true, analytics: false, ads: false };
    setCookie(COOKIE_NAME, JSON.stringify(c), EXPIRE_DAYS);
    setConsent(c);
    setShow(false);
  }

  if (!show) return null;

  return (
    <>
      {/* Banner principal */}
      <div className="fixed inset-x-4 bottom-4 z-50">
        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-primary-background border-2 border-primary rounded-xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row md:items-center gap-4">
          {/* Left: imagen estilo (puedes reemplazar con tu logo) */}
          {/* Si tienes un logo, reemplaza por <img src="/logo.png" ... /> */}
          <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            <img src="/../../favicon.ico" alt="" />
          </div>

          {/* Texto */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-agrandir font-bold text-primary">
              Usamos cookies para mejorar tu experiencia
            </h3>
            <p className="text-sm md:text-base text-tertiary mt-1">
              Utilizamos cookies necesarias, de analítica y de publicidad para
              mostrar contenido relevante y mejorar el sitio. Puedes aceptar
              todas, rechazar las no esenciales o configurar tus preferencias.
            </p>
            <p className="text-xs text-tertiary mt-2">
              Consulta nuestra{" "}
              <a
                href="/politica-de-privacidad"
                className="underline text-primary"
              >
                Política de Privacidad
              </a>
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch">
            <button
              onClick={declineNonEssential}
              className="px-3 py-2 text-sm rounded-md border border-primary text-primary bg-transparent hover:bg-primary/5 cursor-pointer"
              aria-label="Rechazar no esenciales"
            >
              Rechazar no esenciales
            </button>

            <button
              onClick={() => setOpenSettings(true)}
              className="px-3 py-2 text-sm rounded-md border border-secondary text-secondary bg-secondary-background hover:bg-secondary-foreground cursor-pointer"
              aria-label="Configurar cookies"
            >
              Configurar
            </button>

            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm rounded-md bg-primary text-background font-semibold shadow cursor-pointer"
              aria-label="Aceptar todas las cookies"
            >
              Aceptar todo
            </button>
          </div>
        </div>
      </div>

      {/* Modal de configuración */}
      {openSettings && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Preferencias de cookies"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenSettings(false)}
          />
          <div className="relative max-w-2xl w-full bg-white rounded-xl p-6 z-10 shadow-lg border-2 border-primary">
            <h3 className="text-lg font-semibold text-secondary mb-2">
              Preferencias de cookies
            </h3>
            <p className="text-sm text-tertiary mb-4">
              Las cookies necesarias son esenciales para que el sitio funcione.
              Activa o desactiva las demás según prefieras.
            </p>

            <div className="space-y-4">
              {/* Necesarias */}
              <div className="flex items-center justify-between p-3 rounded-md bg-primary/5">
                <div>
                  <div className="font-medium text-secondary">Necesarias</div>
                  <div className="text-sm text-tertiary">
                    Imprescindibles para el funcionamiento del sitio.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked
                  readOnly
                  aria-label="Cookies necesarias"
                />
              </div>

              {/* Analítica */}
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium text-secondary">Analítica</div>
                  <div className="text-sm text-tertiary">
                    Nos ayuda a mejorar el contenido y la experiencia.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent((s) => ({ ...s, analytics: e.target.checked }))
                  }
                  aria-label="Cookies de analítica"
                />
              </div>

              {/* Publicidad */}
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium text-secondary">Publicidad</div>
                  <div className="text-sm text-tertiary">
                    Publicidad personalizada según tus intereses.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={consent.ads}
                  onChange={(e) =>
                    setConsent((s) => ({ ...s, ads: e.target.checked }))
                  }
                  aria-label="Cookies de publicidad"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-3 py-2 rounded border"
                onClick={() => setOpenSettings(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-primary text-background font-semibold"
                onClick={acceptSelected}
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
