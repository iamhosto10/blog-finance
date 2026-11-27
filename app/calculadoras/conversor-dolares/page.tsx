import { Metadata } from "next";
import ClientPage from "./Clientpage";
import { client } from "@/lib/sanity";
import { dolarQuery } from "@/lib/queries"; // Asegúrate de que esta ruta sea correcta
import JsonLd from "@/components/CommonComponents/JsonLd";
import CalculatorRelatedGuides from "@/components/CommonComponents/CalculatorRelatedGuides";
import {
  fetchBlogsPreviewSafe,
  resolveCalculatorGuides,
} from "@/lib/calculatorGuides";
import { CALCULATOR_FAQS } from "@/lib/calculatorFaqs";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
  description:
    "Convierte dólares (USD) a pesos colombianos (COP) al instante con la tasa de cambio diaria del Banco de la República. Calcula el valor real de tus compras, viajes o transacciones internacionales con nuestra herramienta actualizada.",
  keywords: [
    "conversor de dólar a peso colombiano",
    "tasa de cambio hoy",
    "valor del dólar en Colombia",
    "convertir USD a COP",
    "tipo de cambio Banco de la República",
    "moneda colombiana",
    "calculadora de divisas",
    "dólar hoy en Colombia",
  ],
  openGraph: {
    title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
    description:
      "Convierte dólares estadounidenses a pesos colombianos en segundos con la tasa de cambio oficial del Banco de la República. Herramienta gratuita, rápida y precisa.",
    url: "https://monopolombiano.com/calculadoras/conversor-dolares",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Conversor de Dólares a Pesos Colombianos",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
    description:
      "Convierte dólares (USD) a pesos colombianos (COP) con la tasa del día. Ideal para viajeros, compras y transacciones internacionales.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/conversor-dolares",
  },
};

export default async function ConversorDolaresPage() {
  const [dolar, blogs] = await Promise.all([
    client.fetch(dolarQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const guides = resolveCalculatorGuides("conversor-dolares", blogs);

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Conversor de Dólares (USD) a Pesos Colombianos (COP)",
          description:
            "Convierte dólares a pesos colombianos al instante con la tasa representativa del mercado (TRM).",
          slug: "conversor-dolares",
          faqs: CALCULATOR_FAQS["conversor-dolares"],
        })}
      />
      <ClientPage dolar={dolar} />
      <CalculatorRelatedGuides calculatorSlug="conversor-dolares" guides={guides} />
    </>
  );
}
