"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import CalculatorResultCta from "@/components/CommonComponents/CalculatorResultCta";
import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import Tag from "@/components/CommonComponents/Tag";
import { AFFILIATE_DISCLOSURE_TEXT } from "@/lib/affiliates";
import {
  buildBankPageCopy,
  formatRentabilidadCardInterest,
  type ProfitabilityBankKey,
} from "@/lib/profitabilityCopy";
import Link from "next/link";
import React from "react";

interface ProfitabilityData {
  lulo: number[];
  nu: number[];
  pibank: number[];
  bold: number[];
  rappi: number[];
  popular: number[];
  global66: number[];
}

const BANK_CARDS: Array<{
  key: ProfitabilityBankKey;
  label: string;
  href: string;
  icon: string;
}> = [
  {
    key: "lulo",
    label: "Lulo Bank",
    href: "/calculadoras/lulo",
    icon: "/assets/calculadoras/rentabilidad/luloBank.png",
  },
  {
    key: "nu",
    label: "Nu bank",
    href: "/calculadoras/nu",
    icon: "/assets/calculadoras/rentabilidad/nu.png",
  },
  {
    key: "popular",
    label: "Banco Popular",
    href: "/calculadoras/popular",
    icon: "/assets/calculadoras/rentabilidad/bancoPopular.png",
  },
  {
    key: "pibank",
    label: "Pibank",
    href: "/calculadoras/pibank",
    icon: "/assets/calculadoras/rentabilidad/pibank.png",
  },
  {
    key: "global66",
    label: "Global 66",
    href: "/calculadoras/global66",
    icon: "/assets/calculadoras/rentabilidad/global66.png",
  },
  {
    key: "rappi",
    label: "Rappi",
    href: "/calculadoras/rappi",
    icon: "/assets/calculadoras/rentabilidad/rapi.png",
  },
  {
    key: "bold",
    label: "Bold",
    href: "/calculadoras/bold",
    icon: "/assets/calculadoras/rentabilidad/bold.png",
  },
];

const ClientPage = ({
  profitability,
}: {
  profitability: ProfitabilityData;
}) => {
  const banks = BANK_CARDS.map((bank) => {
    const rates = profitability?.[bank.key];
    return {
      ...bank,
      interest: formatRentabilidadCardInterest(rates),
      description: buildBankPageCopy(bank.key, rates).cardDescription,
      buttonText: "Calcular",
    };
  });

  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        Calculadora de rentabilidad
      </h1>
      <div className="flex ">
        <Link href="/calculadoras">
          <Tag title="CALCULADORAS" />
        </Link>
      </div>
      <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        Compara cuánto podrías ganar con las diferentes cuentas de ahorro en
        Colombia gracias a nuestras calculadoras de rentabilidad bancaria. Aquí
        podrás simular los rendimientos que ofrecen entidades como Lulo Bank, Nu
        Bank, Banco Popular, Pibank, Global 66, Rappi y Bold, para que elijas la
        opción más rentable según tus metas financieras.
        <br />
        <br /> Solo debes ingresar el monto a invertir, el plazo y revisar la
        tasa de rentabilidad efectiva anual vigente. En segundos obtendrás una
        proyección del crecimiento de tu dinero, los intereses generados y el
        rendimiento total neto.
        <br />
        <br />
        💡 Usa nuestras calculadoras de rentabilidad y descubre qué banco te
        paga más por tus ahorros. Compara tasas, analiza resultados y toma
        decisiones financieras inteligentes con información actualizada y
        confiable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banks.map((bank, index) => (
          <div
            className={`
                  ${index === 4 ? "lg:col-start-1" : ""} h-full
                `}
            key={bank.key}
          >
            <CalculatorCard
              asset={bank.icon}
              buttonText={bank.buttonText}
              description={bank.description}
              href={bank.href}
              label={bank.label}
              rentability
              interest={bank.interest}
            />
          </div>
        ))}
      </div>

      <CalculatorResultCta calculatorId="rentabilidad" />

      <p className="text-center font-canva-sans text-xs text-tertiary/75">
        {AFFILIATE_DISCLOSURE_TEXT}
      </p>

      <AdBanner
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="7506188604"
      />
    </div>
  );
};

export default ClientPage;
