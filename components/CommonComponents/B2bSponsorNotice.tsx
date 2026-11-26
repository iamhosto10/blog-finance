"use client";

import React from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

interface B2bSponsorNoticeProps {
  placement: string;
}

/** Enlace discreto hacia el Media Kit B2B en páginas de comparación financiera de alta intención. */
export default function B2bSponsorNotice({ placement }: B2bSponsorNoticeProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-secondary/15 bg-primary-foreground/60 px-4 py-2.5 text-xs font-canva-sans text-tertiary/90">
      <span className="inline-flex items-center gap-2">
        <Megaphone className="size-3.5 text-secondary shrink-0" />
        <span>
          ¿Representas un banco, fintech o tarjeta en Colombia? Destaca tu tasa o producto aquí.
        </span>
      </span>
      <Link
        href="/anunciate"
        onClick={() =>
          trackEvent("b2b_media_kit_click", {
            source: placement,
          })
        }
        className="font-agrandir font-bold text-secondary hover:underline shrink-0"
      >
        Ver Media Kit y tarifas →
      </Link>
    </div>
  );
}
