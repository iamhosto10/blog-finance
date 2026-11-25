"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CreditCard, FileSpreadsheet, TrendingUp } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

export default function HomeConversionBar() {
  return (
    <div className="w-full mt-2 rounded-2xl border border-secondary/15 bg-white/95 p-4 md:p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-0.5 text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
            <TrendingUp className="size-3.5" />
            Atajos de alto impacto para tu dinero
          </span>
          <p className="font-canva-sans text-sm text-tertiary">
            Compara cuánto pagan hoy las cuentas en Colombia tras retención y 4x1000 o accede a nuestras plantillas PRO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/calculadoras/calculadora-de-rentabilidad"
            onClick={() =>
              trackEvent("home_cta_click", {
                target: "comparador_rentabilidad",
                location: "home_simulators_bar",
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-secondary hover:bg-primary/90 transition-colors"
          >
            Mejor cuenta hoy
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/calculadoras/comparador-de-tarjetas"
            onClick={() =>
              trackEvent("home_cta_click", {
                target: "comparador_tarjetas",
                location: "home_simulators_bar",
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/25 bg-white px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-secondary hover:bg-secondary/5 transition-colors"
          >
            <CreditCard className="size-4" />
            Comparar 20 tarjetas
          </Link>

          <Link
            href="/recursos"
            onClick={() =>
              trackEvent("product_cta_click", {
                product_id: "catalogo-recursos",
                source: "home_simulators_bar",
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-white hover:bg-secondary/90 transition-colors"
          >
            <FileSpreadsheet className="size-4" />
            Plantillas PRO y 1-a-1
          </Link>
        </div>
      </div>
    </div>
  );
}
