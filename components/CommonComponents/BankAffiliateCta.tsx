"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Scale, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/gtag";
import {
  AFFILIATE_DISCLOSURE_TEXT,
  getBankAffiliateConfig,
} from "@/lib/affiliates";
import type { ProfitabilityBankKey } from "@/lib/profitabilityCopy";
import B2bSponsorNotice from "./B2bSponsorNotice";

interface BankAffiliateCtaProps {
  bankKey: ProfitabilityBankKey;
  bankDisplayName: string;
}

export default function BankAffiliateCta({
  bankKey,
  bankDisplayName,
}: BankAffiliateCtaProps) {
  const affiliate = getBankAffiliateConfig(bankKey);

  return (
    <section
      aria-label={`Opciones recomendadas para ${bankDisplayName}`}
      className="rounded-2xl border border-secondary/15 bg-white p-5 shadow-sm space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-agrandir font-bold text-base md:text-lg text-secondary">
            ¿Quieres comparar o dar el siguiente paso con {bankDisplayName}?
          </p>
          <p className="font-canva-sans text-xs md:text-sm text-tertiary/85">
            Compara rendimientos netos después de retención y 4x1000 antes de mover tu ahorro.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {affiliate && (
            <a
              href={affiliate.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              onClick={() =>
                trackEvent("affiliate_click", {
                  item_type: "savings_account",
                  item_name: bankDisplayName,
                  bank_key: bankKey,
                  placement: `bank_calculator_${bankKey}`,
                  destination_url: affiliate.url,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-secondary hover:bg-primary/90 transition-colors"
            >
              {affiliate.ctaLabel}
              <ExternalLink className="size-3.5" />
            </a>
          )}

          <Link
            href="/calculadoras/calculadora-de-rentabilidad"
            onClick={() =>
              trackEvent("calculator_compare_click", {
                source: `bank_calculator_${bankKey}`,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/25 bg-primary-foreground px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-secondary hover:bg-secondary/5 transition-colors"
          >
            <Scale className="size-3.5" />
            Comparar los 7 bancos
          </Link>

          <Link
            href="/recursos#plantilla-finanzas-colombia"
            onClick={() =>
              trackEvent("product_cta_click", {
                product_id: "plantilla-finanzas-colombia",
                source: `bank_calculator_${bankKey}`,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2.5 text-xs md:text-sm font-agrandir font-bold text-white hover:bg-secondary/90 transition-colors"
          >
            <Sparkles className="size-3.5" />
            Recursos PRO
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {affiliate && (
        <p className="font-canva-sans text-[11px] leading-relaxed text-tertiary/70 border-t border-secondary/10 pt-2">
          {AFFILIATE_DISCLOSURE_TEXT}
        </p>
      )}

      <B2bSponsorNotice placement={`bank_calculator_${bankKey}`} />
    </section>
  );
}
