import React from "react";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";

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
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Simulador de Leasing y Vivienda Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Leasing y Vivienda | Monopolombiano",
    description:
      "Calcula tu crédito hipotecario o leasing habitacional. Descubre cuánto pagarías en cuotas mensuales y visualiza la evolución de tu deuda con gráficos interactivos.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return <ClientPage />;
};

export default page;
