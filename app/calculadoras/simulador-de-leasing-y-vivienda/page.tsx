import React from "react";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import CalculatorRelatedGuides from "@/components/CommonComponents/CalculatorRelatedGuides";
import {
  fetchBlogsPreviewSafe,
  resolveCalculatorGuides,
} from "@/lib/calculatorGuides";
import { CALCULATOR_FAQS } from "@/lib/calculatorFaqs";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Simulador de Leasing y Vivienda | Monopolombiano",
  description:
    "Calcula cuánto pagarías por tu crédito hipotecario o leasing habitacional con nuestro simulador. Obtén el valor de tus cuotas, intereses y tabla de amortización mes a mes.",
  keywords: [
    "simulador de crédito vivienda",
    "simulador leasing habitacional",
    "simulador de leasing",
    "simulador hipotecario Colombia",
    "crédito de vivienda",
    "leasing vivienda Colombia",
    "cuota mensual crédito hipotecario",
    "tabla de amortización crédito vivienda",
    "simulador de hipoteca",
    "créditos de vivienda en Colombia",
  ],
  openGraph: {
    title: "Simulador de Leasing y Vivienda | Monopolombiano",
    description:
      "Simula fácilmente tu crédito de vivienda o leasing habitacional. Calcula tus cuotas, intereses y observa la evolución de tu préstamo con gráficos y tablas detalladas.",
    url: "https://monopolombiano.com/calculadoras/simulador-de-leasing-y-vivienda",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Simulador de Leasing y Vivienda Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Leasing y Vivienda | Monopolombiano",
    description:
      "Calcula tu crédito hipotecario o leasing habitacional. Descubre cuánto pagarías en cuotas mensuales y visualiza la evolución de tu deuda con gráficos interactivos.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/simulador-de-leasing-y-vivienda",
  },
};

const page = async () => {
  const blogs = await fetchBlogsPreviewSafe();
  const guides = resolveCalculatorGuides("simulador-de-leasing-y-vivienda", blogs);

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Simulador de Leasing Habitacional y Crédito de Vivienda",
          description:
            "Calcula cuotas mensuales, intereses, seguros y tabla de amortización para crédito hipotecario o leasing habitacional en Colombia.",
          slug: "simulador-de-leasing-y-vivienda",
          faqs: CALCULATOR_FAQS["simulador-de-leasing-y-vivienda"],
        })}
      />
      <ClientPage />
      <CalculatorRelatedGuides
        calculatorSlug="simulador-de-leasing-y-vivienda"
        guides={guides}
        className="container mx-auto px-4 pb-12"
      />
    </>
  );
};

export default page;
