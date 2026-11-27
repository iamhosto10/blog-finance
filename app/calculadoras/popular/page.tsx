import ClientPage from "./ClientPage";
import { client } from "@/lib/sanity";
import { profitabilityQuery } from "@/lib/queries";
import { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import CalculatorRelatedGuides from "@/components/CommonComponents/CalculatorRelatedGuides";
import {
  fetchBlogsPreviewSafe,
  resolveCalculatorGuides,
} from "@/lib/calculatorGuides";
import { buildBankPageCopy } from "@/lib/profitabilityCopy";
import {
  buildBankFinancialProductNode,
  buildCalculatorJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad Banco Popular | Monopolombiano",
  description:
    "Simula cuánto puedes ganar con la cuenta de ahorros del Banco Popular en Colombia. Conoce su tasa de interés, ventajas, desventajas y rentabilidad real para 2025.",
  keywords: [
    "Banco Popular Colombia",
    "cuenta de ahorros Banco Popular",
    "Banco Popular rentabilidad",
    "tasa de interés Banco Popular",
    "simulador Banco Popular",
    "ahorro rentable Colombia",
    "Grupo Aval",
    "cuenta digital Banco Popular",
  ],
  openGraph: {
    title: "Calculadora de rentabilidad Banco Popular | Monopolombiano",
    description:
      "Calcula tus rendimientos con la cuenta de ahorros del Banco Popular. Descubre su tasa de interés actual y evalúa si es la mejor opción de ahorro en Colombia.",
    url: "https://monopolombiano.com/calculadoras/popular",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Calculadora de rentabilidad Banco Popular",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de rentabilidad Banco Popular | Monopolombiano",
    description:
      "Conoce la tasa de interés del Banco Popular y simula cuánto podrías ganar al ahorrar con una de las entidades más tradicionales de Colombia.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/popular",
  },
};

export default async function Page() {
  const [data, blogs] = await Promise.all([
    client.fetch(profitabilityQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const popularRates = data?.popular || [];
  const guides = resolveCalculatorGuides("popular", blogs);
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad Banco Popular Colombia",
          description:
            "Simula los rendimientos de tu dinero en la cuenta de ahorros del Banco Popular en Colombia.",
          slug: "popular",
          faqs: buildBankPageCopy("popular", popularRates).faq,
          extraNodes: [
            buildBankFinancialProductNode({
              name: "Cuenta de Ahorros Banco Popular",
              providerName: "Banco Popular",
              slug: "popular",
              description:
                "Cuenta de ahorros con rentabilidad efectiva anual del Banco Popular en Colombia.",
              rates: popularRates,
            }),
          ],
        })}
      />
      <ClientPage profitabilityData={popularRates} />
      <CalculatorRelatedGuides calculatorSlug="popular" guides={guides} />
    </>
  );
}
