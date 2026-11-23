"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Megaphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  AUDIENCE_HIGHLIGHTS,
  BUDGET_RANGES,
  MEDIA_KIT_PACKAGES,
  type MediaKitPackage,
} from "@/lib/anunciate";
import { trackEvent } from "@/lib/gtag";
import { Button } from "@/components/ui/button";

const BRAND_CATEGORIES = [
  "Neobancos y cuentas remuneradas",
  "Tarjetas de crédito y billeteras digitales",
  "Apps tributarias y de inversión",
  "Constructoras, vivienda VIS y seguros",
];

export default function AnunciateClient() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(MEDIA_KIT_PACKAGES[0].id);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [budgetRange, setBudgetRange] = useState<string>(BUDGET_RANGES[1]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef<HTMLElement | null>(null);

  const selectedPackage =
    MEDIA_KIT_PACKAGES.find((item) => item.id === selectedPackageId) ?? MEDIA_KIT_PACKAGES[0];

  function handleSelectPackage(pkg: MediaKitPackage) {
    setSelectedPackageId(pkg.id);
    setStatus("idle");
    setFeedback("");
    trackEvent("b2b_package_click", {
      package_id: pkg.id,
      package_title: pkg.title,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/anunciate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: company.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          website: website.trim(),
          packageId: selectedPackageId,
          budgetRange,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback(
          `¡Propuesta recibida para ${company.trim()}! Nuestro equipo revisará tu solicitud de "${data.packageTitle}" y te responderá a ${email.trim()} en menos de 24 horas hábiles.`,
        );
        trackEvent("b2b_sponsor_inquiry", {
          package_id: selectedPackageId,
          budget_range: budgetRange,
          source: "anunciate_page",
        });
        setCompany("");
        setContactName("");
        setEmail("");
        setWebsite("");
        setNotes("");
      } else {
        setStatus("error");
        setFeedback(data.error || "No pudimos enviar tu solicitud. Intenta nuevamente.");
      }
    } catch {
      setStatus("error");
      setFeedback("Error de conexión. Inténtalo nuevamente en unos segundos.");
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-12">
      {/* Hero B2B */}
      <section className="rounded-3xl bg-primary-background text-background p-6 md:p-12 shadow-lg">
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary text-tertiary px-4 py-1 text-xs font-agrandir font-bold tracking-wide uppercase">
            <Megaphone className="size-4" />
            Media Kit · Alianzas B2B Colombia
          </span>
          <h1 className="font-agrandir font-bold text-3xl md:text-5xl leading-tight">
            Conecta tu marca financiera con usuarios que están comparando dónde ahorrar o invertir hoy
          </h1>
          <p className="font-canva-sans text-base md:text-lg text-background/90">
            Monopolombiano llega a personas en Colombia en el momento exacto de decisión: cuando
            simulan rendimientos en cuentas EA, calculan el 4x1000, comparan tarjetas de crédito o
            evalúan su crédito hipotecario.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-canva-sans text-background/95">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Integración nativa libre de ad-blockers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BarChart3 className="size-4 text-primary" />
              Medición transparente de clics y conversiones
            </span>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="bg-primary text-tertiary hover:bg-primary/90 font-agrandir font-bold rounded-xl px-6 py-5 cursor-pointer"
            >
              Solicitar disponibilidad comercial
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Inventario y propuesta de valor */}
      <section aria-labelledby="audiencia-inventario" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AUDIENCE_HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-secondary/15 bg-white p-6 shadow-sm flex flex-col gap-2"
          >
            <span className="font-agrandir font-bold text-3xl md:text-4xl text-secondary">
              {item.value}
            </span>
            <h2
              id={item.label === AUDIENCE_HIGHLIGHTS[0].label ? "audiencia-inventario" : undefined}
              className="font-agrandir font-bold text-lg text-tertiary"
            >
              {item.label}
            </h2>
            <p className="font-canva-sans text-sm text-tertiary/80 leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </section>

      {/* Formatos de pauta y precios en COP */}
      <section aria-labelledby="formatos-pauta-titulo" className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h2
              id="formatos-pauta-titulo"
              className="font-agrandir font-bold text-2xl md:text-4xl text-secondary"
            >
              Formatos de patrocinio y alianzas
            </h2>
            <p className="font-canva-sans text-sm md:text-base text-tertiary/80 mt-1">
              Elige el formato que mejor se ajuste a tus metas de captación en Colombia.
            </p>
          </div>
          <Link
            href="/calculadoras/calculadora-de-rentabilidad"
            className="inline-flex items-center gap-1.5 text-sm font-agrandir font-bold text-secondary hover:underline"
          >
            Ver comparador bancario en vivo
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MEDIA_KIT_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <article
                key={pkg.id}
                id={pkg.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between gap-5 transition-all bg-white shadow-sm ${
                  isSelected
                    ? "border-secondary ring-2 ring-secondary/20"
                    : "border-secondary/15 hover:border-secondary/40"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 text-secondary px-3 py-1 text-xs font-agrandir font-bold">
                      <Sparkles className="size-3.5" />
                      {pkg.badge}
                    </span>
                    <span className="font-agrandir font-bold text-lg text-secondary">
                      {pkg.priceLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-agrandir font-bold text-xl text-tertiary">{pkg.title}</h3>
                    <p className="font-canva-sans text-xs text-tertiary/70 mt-0.5">
                      {pkg.billingCycle}
                    </p>
                  </div>

                  <p className="font-canva-sans text-sm text-tertiary/85 leading-relaxed">
                    {pkg.summary}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {pkg.deliverables.map((del) => (
                      <li
                        key={del}
                        className="flex items-start gap-2 font-canva-sans text-xs md:text-sm text-tertiary/90"
                      >
                        <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-secondary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-canva-sans text-xs text-tertiary/75">
                    <strong>Ideal para:</strong> {pkg.idealFor}
                  </span>
                  <Button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    className="bg-secondary text-white hover:bg-secondary/90 font-agrandir font-bold rounded-xl cursor-pointer shrink-0"
                  >
                    Cotizar este formato
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sectores aliados */}
      <section className="rounded-2xl border border-secondary/15 bg-primary-foreground p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-secondary font-agrandir font-bold text-sm uppercase">
            <Building2 className="size-4" />
            Verticales afines
          </div>
          <h2 className="font-agrandir font-bold text-xl md:text-2xl text-tertiary">
            Transparencia editorial ante todo
          </h2>
          <p className="font-canva-sans text-sm text-tertiary/85">
            Solo trabajamos con entidades vigiladas o marcas verificadas que aporten valor real al
            usuario colombiano. Todo enlace patrocinado o contenido aliado se etiqueta de forma clara.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
          {BRAND_CATEGORIES.map((category) => (
            <li
              key={category}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 border border-secondary/10 font-canva-sans text-xs md:text-sm text-tertiary"
            >
              <Briefcase className="size-4 text-secondary shrink-0" />
              {category}
            </li>
          ))}
        </ul>
      </section>

      {/* Formulario comercial */}
      <section
        ref={formRef}
        id="contacto-comercial"
        aria-labelledby="contacto-comercial-titulo"
        className="rounded-3xl border border-secondary/20 bg-white p-6 md:p-10 shadow-md"
      >
        <div className="max-w-2xl space-y-6">
          <div>
            <span className="text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
              Contacto comercial directo
            </span>
            <h2
              id="contacto-comercial-titulo"
              className="font-agrandir font-bold text-2xl md:text-3xl text-tertiary mt-1"
            >
              Reserva tu espacio o solicita una propuesta a medida
            </h2>
            <p className="font-canva-sans text-sm text-tertiary/80 mt-1">
              Formato seleccionado:{" "}
              <strong className="text-secondary">{selectedPackage.title}</strong> (
              {selectedPackage.priceLabel}).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-company" className="text-xs font-agrandir font-bold text-tertiary">
                Empresa o marca *
              </label>
              <input
                id="b2b-company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ej. Fintech Colombia S.A.S."
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-contact" className="text-xs font-agrandir font-bold text-tertiary">
                Nombre de contacto *
              </label>
              <input
                id="b2b-contact"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Tu nombre y cargo"
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-email" className="text-xs font-agrandir font-bold text-tertiary">
                Correo corporativo *
              </label>
              <input
                id="b2b-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marketing@tuempresa.com"
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-website" className="text-xs font-agrandir font-bold text-tertiary">
                Sitio web (opcional)
              </label>
              <input
                id="b2b-website"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://tuempresa.com.co"
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-package" className="text-xs font-agrandir font-bold text-tertiary">
                Formato de interés
              </label>
              <select
                id="b2b-package"
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary bg-white"
              >
                {MEDIA_KIT_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.priceLabel})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-budget" className="text-xs font-agrandir font-bold text-tertiary">
                Presupuesto mensual estimado
              </label>
              <select
                id="b2b-budget"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary bg-white"
              >
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="b2b-notes" className="text-xs font-agrandir font-bold text-tertiary">
                Objetivo de la campaña o producto a promocionar (opcional)
              </label>
              <textarea
                id="b2b-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Cuéntanos qué producto quieres posicionar, fechas clave o si manejan programa CPA."
                className="rounded-xl border border-secondary/25 px-3.5 py-2.5 text-sm font-canva-sans text-tertiary outline-none focus:border-secondary"
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-secondary text-white hover:bg-secondary/90 font-agrandir font-bold rounded-xl px-6 py-5 cursor-pointer"
              >
                {status === "loading" ? "Enviando propuesta..." : "Enviar solicitud comercial"}
              </Button>
              <span className="font-canva-sans text-xs text-tertiary/75">
                Respuesta en menos de 24 horas hábiles · Sin compromiso.
              </span>
            </div>

            {feedback && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={`md:col-span-2 rounded-xl px-4 py-3 text-sm font-canva-sans ${
                  status === "success"
                    ? "bg-green-50 text-green-900 border border-green-200"
                    : "bg-red-50 text-red-900 border border-red-200"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
