"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderOpen } from "lucide-react";
import type {
  CalculatorSlug,
  ResolvedCalculatorGuides,
} from "@/lib/calculatorGuides";
import { trackEvent } from "@/lib/gtag";

interface CalculatorRelatedGuidesProps {
  calculatorSlug: CalculatorSlug;
  guides: ResolvedCalculatorGuides;
  className?: string;
}

export default function CalculatorRelatedGuides({
  calculatorSlug,
  guides,
  className = "max-w-4xl mx-auto px-6 pb-12",
}: CalculatorRelatedGuidesProps) {
  return (
    <section
      aria-label="Guías y artículos relacionados"
      className={className}
    >
      <div className="rounded-2xl border border-secondary/15 bg-primary-foreground/60 p-5 md:p-7 space-y-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-agrandir font-bold uppercase tracking-wide text-secondary">
            <BookOpen className="size-3.5" />
            Sigue aprendiendo en Monopolombiano
          </span>
          <h2 className="font-agrandir font-bold text-xl md:text-2xl text-secondary">
            {guides.sectionTitle}
          </h2>
          <p className="font-canva-sans text-sm text-tertiary/85">
            {guides.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {guides.categoryLinks.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() =>
                trackEvent("calculator_guide_click", {
                  calculator_slug: calculatorSlug,
                  target_type: "category",
                  target_href: cat.href,
                })
              }
              className="group flex items-start justify-between gap-3 rounded-xl border border-secondary/15 bg-white p-4 hover:border-primary transition-colors"
            >
              <div className="space-y-1">
                <p className="inline-flex items-center gap-1.5 font-agrandir font-bold text-sm text-secondary group-hover:text-secondary/80">
                  <FolderOpen className="size-3.5 text-primary" />
                  {cat.label}
                </p>
                <p className="font-canva-sans text-xs text-tertiary/80 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-secondary shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>

        {guides.articles.length > 0 && (
          <div className="space-y-2.5 pt-1">
            <p className="font-agrandir font-bold text-xs uppercase tracking-wide text-tertiary/75">
              Artículos recomendados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {guides.articles.map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  onClick={() =>
                    trackEvent("calculator_guide_click", {
                      calculator_slug: calculatorSlug,
                      target_type: "article",
                      target_href: article.href,
                    })
                  }
                  className="group flex flex-col justify-between gap-2 rounded-xl border border-secondary/10 bg-white p-4 hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="space-y-1.5">
                    {article.categoryLabel && (
                      <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-agrandir font-bold uppercase text-secondary">
                        {article.categoryLabel}
                      </span>
                    )}
                    <h3 className="font-agrandir font-bold text-sm text-secondary line-clamp-2 group-hover:underline">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="font-canva-sans text-xs text-tertiary/80 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-agrandir font-bold text-secondary">
                    Leer guía
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
