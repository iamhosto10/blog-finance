import React from "react";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { CALCULATOR_FAQS } from "@/lib/calculatorFaqs";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro | Proyecta tus finanzas fácilmente",
  description:
    "Descubre cómo crecerán tus ahorros con el tiempo usando nuestra Calculadora de Ahorro. Visualiza tus aportes, rendimientos e intereses en tablas y gráficos claros, y entiende la importancia del interés compuesto.",
  keywords: [
    "calculadora de ahorro",
    "interés compuesto",
    "ahorros",
    "finanzas personales",
    "rendimientos",
    "proyecciones financieras",
    "ahorrar dinero",
    "inversiones",
  ],
  openGraph: {
    title: "Calculadora de Ahorro 💰 | Visualiza cómo crece tu dinero",
    description:
      "Haz aportes periódicos, mira cómo se acumulan intereses y proyecta el crecimiento de tu ahorro con nuestra calculadora interactiva.",
    url: "https://monopolombiano.com/calculadoras/calculadora-de-ahorro",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Gráfico de crecimiento de ahorro",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Ahorro 💰",
    description:
      "Simula tus aportes e intereses y observa cómo crece tu ahorro con el tiempo.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/calculadora-de-ahorro",
  },
};
const page = () => {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Ahorro e Interés Compuesto",
          description:
            "Proyecta cómo crecerán tus ahorros con aportes periódicos e interés compuesto en Colombia.",
          slug: "calculadora-de-ahorro",
          faqs: CALCULATOR_FAQS["calculadora-de-ahorro"],
        })}
      />
      <ClientPage />
    </>
  );
};

export default page;
