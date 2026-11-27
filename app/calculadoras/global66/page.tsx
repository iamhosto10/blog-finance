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
  title: "Calculadora de Rentabilidad Global66 | Monopolombiano",
  description:
    "Simula cuánto podrías ganar con una cuenta Global66. Calcula los intereses generados según la tasa anual efectiva (EA) y descubre si esta fintech es una opción rentable para tus ahorros y transferencias internacionales.",
  keywords: [
    "Global66",
    "calculadora de rentabilidad Global66",
    "cuenta digital Global66",
    "fintech Colombia",
    "rendimiento Global66",
    "intereses Global66",
    "ahorros digitales",
    "transferencias internacionales",
    "bancos digitales en Colombia",
  ],
  openGraph: {
    title: "Calculadora de Rentabilidad Global66 | Monopolombiano",
    description:
      "Descubre cuánto puedes ganar con tus ahorros en Global66. Calcula el rendimiento según la tasa de interés anual y compara resultados con otros bancos digitales.",
    url: "https://monopolombiano.com/calculadoras/global66",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Calculadora de Rentabilidad Global66",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rentabilidad Global66 | Monopolombiano",
    description:
      "Simula los intereses que podrías obtener con una cuenta Global66 según la tasa anual efectiva (EA). Calculadora gratuita y actualizada para usuarios en Colombia.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/global66",
  },
};

export default async function Page() {
  const [data, blogs] = await Promise.all([
    client.fetch(profitabilityQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const global66Rates = data?.global66 || [];
  const guides = resolveCalculatorGuides("global66", blogs);
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad Global66 Colombia",
          description:
            "Simula los intereses de tu cuenta Global66 en Colombia según su tasa efectiva anual.",
          slug: "global66",
          faqs: buildBankPageCopy("global66", global66Rates).faq,
          extraNodes: [
            buildBankFinancialProductNode({
              name: "Cuenta Global66 Colombia",
              providerName: "Global66",
              slug: "global66",
              description:
                "Cuenta digital multimoneda en Colombia con rendimientos EA y transferencias internacionales.",
              rates: global66Rates,
            }),
          ],
        })}
      />
      <ClientPage profitabilityData={global66Rates} />
      <CalculatorRelatedGuides calculatorSlug="global66" guides={guides} />
    </>
  );
}
