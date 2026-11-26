import ClientPage from "./ClientPage";
import { client } from "@/lib/sanity";
import { profitabilityQuery } from "@/lib/queries";
import type { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { buildBankPageCopy } from "@/lib/profitabilityCopy";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Cuenta de Ahorros Bold en Colombia - Simulador y Rentabilidad 2025",
  description:
    "Conoce la cuenta de ahorros de Bold en Colombia, su tasa de interés, ventajas, desventajas y simula cuánto podrías ganar en 2025 con nuestra calculadora.",
  keywords: [
    "Bold Colombia",
    "Bold cuenta de ahorros",
    "cuentas de ahorro alta rentabilidad Colombia",
    "Bold intereses 2025",
    "simulador Bold",
    "Bold ahorro Colombia",
  ],
  openGraph: {
    title: "Cuenta de Ahorros Bold en Colombia - Simulador y Rentabilidad 2025",
    description:
      "Aprende cómo funciona la cuenta de ahorros Bold en Colombia, revisa las tasas de interés actualizadas y usa nuestro simulador de inversión.",
    url: "https://monopolombiano.com/calculadoras/bold",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/bold",
  },
};

export default async function BoldPage() {
  const data = await client.fetch(
    profitabilityQuery,
    {},
    { next: { tags: ["global-data"] } },
  );
  const boldRates = data?.bold || [];

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad Bold Colombia",
          description:
            "Simula tus rendimientos con la cuenta de ahorros Bold en Colombia según su tasa efectiva anual.",
          slug: "bold",
          faqs: buildBankPageCopy("bold", boldRates).faq,
        })}
      />
      <ClientPage profitabilityData={boldRates} />
    </>
  );
}
