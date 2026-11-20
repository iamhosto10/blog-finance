"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  FileSpreadsheet,
  Home,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { RECURSOS_CATALOG, RecursoItem } from "@/lib/recursos";
import { trackEvent } from "@/lib/gtag";
import { Button } from "@/components/ui/button";

function getProductIcon(id: string) {
  switch (id) {
    case "plantilla-finanzas-colombia":
      return <FileSpreadsheet className="size-7 text-secondary" />;
    case "kit-comprador-vivienda":
      return <Home className="size-7 text-secondary" />;
    default:
      return <CalendarCheck className="size-7 text-secondary" />;
  }
}

const FAQS = [
  {
    q: "¿Cómo recibo la plantilla o agendo el diagnóstico?",
    a: "Al enviar tu solicitud te contactamos por correo en menos de 24 horas hábiles con el enlace de pago (PSE, Nequi o tarjeta) y, una vez confirmado, recibes acceso inmediato al archivo o el calendario para tu sesión.",
  },
  {
    q: "¿Las plantillas funcionan en Excel y Google Sheets?",
    a: "Sí. Entregamos versión compatible con Microsoft Excel (.xlsx) y copia directa en Google Sheets para que puedas usarlas desde computador o celular.",
  },
  {
    q: "¿Están adaptadas a las reglas financieras de Colombia?",
    a: "Totalmente. Incluyen cálculos en pesos colombianos (COP), 4x1000, tasas Efectivas Anuales (EA), UVR, cesantías, primas y gastos notariales vigentes en Colombia.",
  },
];

export default function RecursosClient() {
  const [selectedId, setSelectedId] = useState<string>(RECURSOS_CATALOG[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("PSE / Nequi");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef<HTMLElement | null>(null);

  const selectedProduct =
    RECURSOS_CATALOG.find((item) => item.id === selectedId) ?? RECURSOS_CATALOG[0];

  function handleSelectProduct(item: RecursoItem) {
    setSelectedId(item.id);
    setStatus("idle");
    setFeedback("");
    trackEvent("product_cta_click", {
      product_id: item.id,
      product_kind: item.kind,
      price_cop: item.priceCop,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/recursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          productId: selectedId,
          paymentPreference,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback(
          `¡Solicitud recibida para "${data.productTitle}"! Revisaremos tu mensaje y te enviaremos el enlace de pago (${paymentPreference}) a ${email.trim()} en menos de 24 horas.`,
        );
        trackEvent("service_inquiry", {
          product_id: selectedId,
          price_cop: selectedProduct.priceCop,
          payment_preference: paymentPreference,
          source: "recursos_page",
        });
        setName("");
        setEmail("");
        setNotes("");
      } else {
        setStatus("error");
        setFeedback(data.error || "No pudimos registrar tu solicitud. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setFeedback("Error de conexión. Inténtalo nuevamente en unos segundos.");
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-12">
      {/* Hero */}
      <section className="rounded-3xl bg-primary-background text-background p-6 md:p-12 shadow-lg">
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary text-tertiary px-4 py-1 text-xs font-agrandir font-bold tracking-wide uppercase">
            <Sparkles className="size-4" />
            Herramientas PRO para Colombia
          </span>
          <h1 className="font-agrandir font-bold text-3xl md:text-5xl leading-tight">
            Plantillas financieras y asesoría 1-a-1 pensadas para tu bolsillo en Colombia
          </h1>
          <p className="font-canva-sans text-base md:text-lg text-background/90">
            Pasa de hacer cuentas sueltas a tener claridad total sobre tus deudas, el 4x1000, tus
            ahorros en bancos digitales y la compra de tu vivienda. Sin fórmulas genéricas ni
            modelos de otros países.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-canva-sans text-background/95">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Pagos en COP vía PSE, Nequi o tarjeta
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-primary" />
              Creado con datos y tasas de Colombia 2026
            </span>
          </div>
        </div>
      </section>

      {/* Catálogo de 3 productos/servicios */}
      <section aria-labelledby="catalogo-recursos-titulo" className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h2
              id="catalogo-recursos-titulo"
              className="font-agrandir font-bold text-2xl md:text-4xl text-secondary"
            >
              Elige el recurso ideal para tu meta
            </h2>
            <p className="font-canva-sans text-sm md:text-base text-tertiary/80 mt-1">
              Selecciona una plantilla PRO o reserva tu diagnóstico personalizado 1-a-1.
            </p>
          </div>
          <Link
            href="/calculadoras"
            className="inline-flex items-center gap-1.5 text-sm font-agrandir font-bold text-secondary hover:underline"
          >
            ¿Prefieres empezar gratis? Ir a calculadoras
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {RECURSOS_CATALOG.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <article
                key={item.id}
                className={`rounded-2xl bg-tertiary-foreground p-6 flex flex-col justify-between gap-6 border-2 transition-all ${
                  isSelected
                    ? "border-secondary shadow-xl"
                    : "border-transparent hover:border-secondary/40 shadow-sm"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="size-12 rounded-xl bg-background flex items-center justify-center shadow-xs">
                      {getProductIcon(item.id)}
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-agrandir font-bold text-tertiary">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-agrandir font-bold uppercase tracking-wide text-secondary/80">
                      {item.subtitle}
                    </p>
                    <h3 className="font-agrandir font-bold text-xl text-tertiary mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <p className="font-agrandir font-bold text-3xl text-secondary">
                      {item.priceFormatted}
                    </p>
                    <p className="font-canva-sans text-xs text-tertiary/75 mt-0.5">
                      {item.billingLabel}
                    </p>
                  </div>

                  <p className="font-canva-sans text-sm text-tertiary leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs md:text-sm font-canva-sans text-tertiary"
                      >
                        <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => handleSelectProduct(item)}
                    className="w-full rounded-xl py-6 font-agrandir font-bold cursor-pointer"
                  >
                    {item.ctaLabel}
                  </Button>
                  <Link
                    href={item.relatedCalculatorHref}
                    className="text-center text-xs font-canva-sans font-semibold text-secondary hover:underline"
                  >
                    {item.relatedCalculatorLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Formulario rápido de solicitud / reserva */}
      <section
        ref={formRef}
        id="solicitar-recurso"
        aria-labelledby="solicitud-titulo"
        className="rounded-3xl border-2 border-secondary/25 bg-card p-6 md:p-10 shadow-md"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-agrandir font-bold uppercase tracking-wider text-secondary">
              Paso final · Reserva sin riesgo
            </span>
            <h2
              id="solicitud-titulo"
              className="font-agrandir font-bold text-2xl md:text-3xl text-tertiary"
            >
              Solicita tu plantilla o agenda tu diagnóstico
            </h2>
            <p className="font-canva-sans text-sm text-tertiary/80 leading-relaxed">
              Déjanos tus datos y el recurso seleccionado. Te enviaremos el enlace de pago en pesos
              colombianos (PSE, Nequi o tarjeta) junto con las instrucciones de entrega directa a tu
              correo.
            </p>
            <div className="rounded-2xl bg-tertiary-foreground p-4 flex flex-col gap-1">
              <span className="text-xs font-agrandir font-bold text-secondary uppercase">
                Selección actual
              </span>
              <span className="font-agrandir font-bold text-base text-tertiary">
                {selectedProduct.title}
              </span>
              <span className="font-canva-sans text-sm font-semibold text-secondary">
                {selectedProduct.priceFormatted} · {selectedProduct.formatLabel}
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-4"
            aria-label="Formulario de solicitud de recursos Monopolombiano"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="recurso-nombre"
                  className="text-xs font-agrandir font-bold uppercase text-tertiary"
                >
                  Nombre completo
                </label>
                <input
                  id="recurso-nombre"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Camila Rodríguez"
                  disabled={status === "loading"}
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="recurso-correo"
                  className="text-xs font-agrandir font-bold uppercase text-tertiary"
                >
                  Correo electrónico
                </label>
                <input
                  id="recurso-correo"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  disabled={status === "loading"}
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="recurso-producto"
                  className="text-xs font-agrandir font-bold uppercase text-tertiary"
                >
                  Recurso o servicio
                </label>
                <select
                  id="recurso-producto"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  disabled={status === "loading"}
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {RECURSOS_CATALOG.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} ({item.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="recurso-pago"
                  className="text-xs font-agrandir font-bold uppercase text-tertiary"
                >
                  Medio de pago preferido
                </label>
                <select
                  id="recurso-pago"
                  value={paymentPreference}
                  onChange={(e) => setPaymentPreference(e.target.value)}
                  disabled={status === "loading"}
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="PSE / Nequi">PSE / Nequi</option>
                  <option value="Tarjeta débito o crédito">Tarjeta débito o crédito</option>
                  <option value="Transferencia Bancolombia / Nu">
                    Transferencia Bancolombia / Nu
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="recurso-notas"
                className="text-xs font-agrandir font-bold uppercase text-tertiary"
              >
                Cuéntanos tu objetivo (opcional)
              </label>
              <textarea
                id="recurso-notas"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Quiero comparar leasing vs crédito hipotecario o organizar mis deudas..."
                disabled={status === "loading"}
                className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={status === "loading"}
              className="w-full md:w-auto self-start rounded-xl px-8 py-6 font-agrandir font-bold cursor-pointer"
            >
              {status === "loading"
                ? "ENVIANDO SOLICITUD..."
                : `SOLICITAR ${selectedProduct.priceFormatted}`}
            </Button>

            {feedback && (
              <div
                role="status"
                className={`rounded-xl p-4 text-sm font-canva-sans ${
                  status === "success"
                    ? "bg-tertiary-foreground text-secondary border border-secondary/30 font-semibold"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {feedback}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section aria-labelledby="recursos-faq-titulo" className="flex flex-col gap-4">
        <h2
          id="recursos-faq-titulo"
          className="font-agrandir font-bold text-2xl md:text-3xl text-secondary"
        >
          Preguntas frecuentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-2xl bg-tertiary-foreground p-5 flex flex-col gap-2">
              <h3 className="font-agrandir font-bold text-base text-tertiary">{faq.q}</h3>
              <p className="font-canva-sans text-sm text-tertiary/85 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
