"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/gtag";
import { submitLeadMagnetSubscription } from "@/lib/leadMagnetClient";
import {
  type CalculatorCtaId,
  getCalculatorCtaConfig,
} from "@/lib/leadMagnets";

interface CalculatorResultCtaProps {
  calculatorId: CalculatorCtaId;
  contextLabel?: string;
}

export default function CalculatorResultCta({
  calculatorId,
  contextLabel,
}: CalculatorResultCtaProps) {
  const config = getCalculatorCtaConfig(calculatorId);
  const downloadHref = `/api/files/${config.leadMagnetSlug}`;

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
        source: `calc_${calculatorId}_lead_magnet`,
        fileSlug: config.leadMagnetSlug,
        trackingContext: { calculator_id: calculatorId },
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
      aria-label="Recurso gratuito recomendado"
      className="mt-8 rounded-2xl border-2 border-primary/40 bg-primary-foreground p-5 md:p-6 shadow-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 px-3 py-1 text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
            <FileSpreadsheet className="size-3.5" />
            {config.badge}
            {contextLabel ? ` · ${contextLabel}` : ""}
          </span>

          <Link
            href={config.proHref}
            onClick={() =>
              trackEvent("product_cta_click", {
                product_id: config.proProductId,
                source: `calc_${calculatorId}`,
              })
            }
            className="inline-flex items-center gap-1 text-xs md:text-sm font-canva-sans font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-secondary/80"
          >
            {config.proLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="space-y-1">
          <h3 className="font-agrandir font-bold text-lg md:text-xl text-secondary">
            {config.headline}
          </h3>
          <p className="font-canva-sans text-sm text-tertiary/90">
            {config.description}
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
                  calculator_id: calculatorId,
                  file_slug: config.leadMagnetSlug,
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
            <label htmlFor={`lead-email-${calculatorId}`} className="sr-only">
              Correo electrónico para descargar la plantilla gratuita
            </label>
            <input
              id={`lead-email-${calculatorId}`}
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
              {status === "loading" ? "Preparando..." : config.buttonLabel}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs font-canva-sans font-medium text-red-700" role="alert">
            {message}
          </p>
        )}
      </div>
    </aside>
  );
}
