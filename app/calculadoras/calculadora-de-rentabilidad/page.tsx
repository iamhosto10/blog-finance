import { Metadata } from "next";
import React from "react";
import ClientPage from "./ClientPage";
import { profitabilityQuery } from "@/lib/queries";
import { client } from "@/lib/sanity";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Calculadora de Rentabilidad | Compara cuentas de ahorro en Colombia",
  description:
    "Compara la rentabilidad de cuentas de ahorro en Colombia y descubre cuánto podrías ganar con bancos como Lulo Bank, Nu Bank, Banco Popular, Pibank, Global 66 y Rappi. Calcula tus intereses y elige la opción más rentable para tus ahorros.",
  keywords: [
    "calculadora de rentabilidad",
    "cuentas de ahorro rentables",
    "comparar bancos en Colombia",
    "simulador de ahorro",
    "rendimiento cuentas bancarias",
    "Lulo Bank rentabilidad",
    "Nu Bank intereses",
    "Pibank ahorro",
    "mejor banco para ahorrar",
    "simulador financiero",
  ],
  openGraph: {
    title: "💰 Calculadora de Rentabilidad | Compara bancos en Colombia",
    description:
      "Descubre qué banco te paga más por tus ahorros. Compara tasas, simula rendimientos y elige la cuenta más rentable entre Lulo Bank, Nu Bank, Banco Popular, Pibank, Global 66 y Rappi.",
    url: "https://monopolombiano.com/calculadoras/calculadora-de-rentabilidad",
    siteName: "Tu Sitio Financiero",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg", // puedes cambiarlo por un banner real
        width: 625,
        height: 625,
        alt: "Comparador de cuentas de ahorro rentables en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rentabilidad 💰 | Compara bancos en Colombia",
    description:
      "Simula tus rendimientos con Lulo Bank, Nu Bank, Pibank, Rappi y más. Encuentra la mejor rentabilidad para tus ahorros.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};

export default async function CalculadoraRentabilidadPage() {
  const profitabilityData = await client.fetch(
    profitabilityQuery,
    {},
    { next: { tags: ["global-data"] } },
  );

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad de Cuentas en Colombia",
          description:
            "Compara la rentabilidad de cuentas de ahorro en Colombia entre Nu, Lulo Bank, Pibank, Bold, Global66, Rappi y Banco Popular.",
          slug: "calculadora-de-rentabilidad",
        })}
      />
      <ClientPage profitability={profitabilityData} />
    </>
  );
}
