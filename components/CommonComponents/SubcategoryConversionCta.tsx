"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/gtag";
import { submitLeadMagnetSubscription } from "@/lib/leadMagnetClient";
import {
  resolveSubcategoryCta,
  type ArticleSectionPath,
} from "@/lib/articleCta";

interface SubcategoryConversionCtaProps {
  sectionPath: ArticleSectionPath;
  subcategorySlug: string;
  subcategoryTitle: string;
}

export default function SubcategoryConversionCta({
  sectionPath,
  subcategorySlug,
  subcategoryTitle,
}: SubcategoryConversionCtaProps) {
  const rec = resolveSubcategoryCta(sectionPath, subcategorySlug, subcategoryTitle);
  const downloadHref = `/api/files/${rec.leadMagnetSlug}`;
  const inputId = `cat-lead-${sectionPath}-${subcategorySlug}`;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanedEmail = email.trim();
    if (!cleanedEmail) return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await submitLeadMagnetSubscription({
        email: cleanedEmail,
        source: rec.subscribeSource,
        fileSlug: rec.leadMagnetSlug,
        trackingContext: {
          section_path: sectionPath,
          subcategory_slug: subcategorySlug,
          topic_key: rec.topicKey,
        },
      });

      if (result.ok) {
        setStatus("success");
        setMessage(result.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Intenta nuevamente en unos segundos.");
    }
  }

  return (
    <aside
      aria-label={`Herramienta y plantilla recomendada para ${subcategoryTitle}`}
      className="rounded-2xl border-2 border-primary/40 bg-primary-foreground p-5 md:p-7 shadow-md"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-secondary/15 pb-5">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 px-3 py-1 text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
              <Calculator className="size-3.5" />
              Herramienta recomendada · {subcategoryTitle}
            </span>
            <h2 className="font-agrandir font-bold text-lg md:text-xl text-secondary">
              Lleva tus números a la práctica hoy mismo
            </h2>
            <p className="font-canva-sans text-sm text-tertiary/90">
              {rec.calculatorDescription}
            </p>
          </div>

          <Link
            href={rec.calculatorHref}
            onClick={() =>
              trackEvent("category_cta_click", {
                section_path: sectionPath,
                subcategory_slug: subcategorySlug,
                calculator_href: rec.calculatorHref,
                topic_key: rec.topicKey,
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-agrandir font-bold text-secondary hover:bg-primary/90 transition-colors shrink-0 shadow-sm"
          >
            {rec.calculatorLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
              <FileSpreadsheet className="size-4" />
              Recurso descargable gratis (Excel / Google Sheets)
            </span>

            <Link
              href={rec.proHref}
              onClick={() =>
                trackEvent("product_cta_click", {
                  product_id: rec.proProductId,
                  source: `category_${sectionPath}_${subcategorySlug}`,
                })
              }
              className="inline-flex items-center gap-1 text-xs md:text-sm font-canva-sans font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-secondary/80"
            >
              {rec.proLabel}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="font-agrandir font-bold text-base md:text-lg text-secondary">
              {rec.headline}
            </h3>
            <p className="font-canva-sans text-sm text-tertiary/90">
              {rec.description}
            </p>
          </div>

          {status === "success" ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-white/90 border border-secondary/20 p-4">
              <p className="flex items-center gap-2 text-sm font-canva-sans font-semibold text-secondary">
                <CheckCircle2 className="size-4 shrink-0 text-secondary" />
                {message}
              </p>
              <a
                href={downloadHref}
                onClick={() =>
                  trackEvent("lead_magnet_download", {
                    section_path: sectionPath,
                    subcategory_slug: subcategorySlug,
                    file_slug: rec.leadMagnetSlug,
                    method: "manual_retry",
                  })
                }
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-xs font-agrandir font-bold text-white hover:bg-secondary/90 transition-colors shrink-0"
              >
                <Download className="size-4" />
                Descargar archivo ahora
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <label htmlFor={inputId} className="sr-only">
                Correo electrónico para descargar la plantilla gratuita
              </label>
              <input
                id={inputId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com para recibirla gratis"
                disabled={status === "loading"}
                className="w-full sm:flex-1 rounded-xl border border-secondary/25 bg-white px-4 py-2.5 text-sm font-canva-sans text-tertiary placeholder:text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-agrandir font-bold text-white hover:bg-secondary/90 cursor-pointer shrink-0"
              >
                <Download className="size-4 mr-1.5" />
                {status === "loading" ? "Preparando..." : rec.buttonLabel}
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs font-canva-sans font-medium text-red-700" role="alert">
              {message}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
