import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/CommonComponents/Tag";

interface BankCalculatorHeroProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  showCalculatorBadge?: boolean;
}

/**
 * Cabecera visual estandarizada con `next/image` (priority) para mejorar LCP/CLS
 * en las 7 calculadoras de rentabilidad bancaria.
 */
export default function BankCalculatorHero({
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  showCalculatorBadge = true,
}: BankCalculatorHeroProps) {
  return (
    <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
      <div className="h-auto flex md:block">
        <Link href="/calculadoras">
          <Tag title="HERRAMIENTAS" />
        </Link>
      </div>
      <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          priority
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 320px, 240px"
          className="mx-auto w-full h-auto"
        />
        {showCalculatorBadge && (
          <div className="absolute -top-5 -right-5 md:-top-7 md:-right-7 size-10 md:size-14">
            <Image
              src="/assets/calculator.png"
              alt="Calculadora de rentabilidad"
              width={56}
              height={56}
              className="size-10 md:size-14 object-contain"
            />
          </div>
        )}
      </div>
      <div className="h-auto hidden md:block">
        <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
          HERRAMIENTAS
        </p>
      </div>
    </div>
  );
}
