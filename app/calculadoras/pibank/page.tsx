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
  title: "Calculadora de rentabilidad Pibank | Monopolombiano",
  description:
    "Calcula cuánto puedes ganar con la cuenta de ahorros de Pibank en Colombia. Conoce su tasa de interés, ventajas, desventajas y simula tus rendimientos fácilmente.",
  keywords: [
    "Pibank Colombia",
    "Pibank cuenta de ahorros",
    "Pibank rentabilidad",
    "tasa de interés Pibank",
    "simulador Pibank",
    "cuenta digital Colombia",
    "ahorro rentable Colombia",
    "Banco Pichincha Pibank",
  ],
  openGraph: {
    title: "Calculadora de rentabilidad Pibank | Monopolombiano",
    description:
      "Simula tus ganancias con la cuenta de ahorros de Pibank. Descubre cuánto puedes ganar con su tasa vigente EA y conoce si es la mejor opción de ahorro digital en Colombia.",
    url: "https://monopolombiano.com/calculadoras/pibank",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Calculadora de rentabilidad Pibank",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de rentabilidad Pibank | Monopolombiano",
    description:
      "Conoce la tasa de rentabilidad de Pibank y calcula tus intereses mensuales y anuales con nuestra herramienta de simulación financiera.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/pibank",
  },
};

export default async function Page() {
  const [data, blogs] = await Promise.all([
    client.fetch(profitabilityQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const pibankRates = data?.pibank || [];
  const guides = resolveCalculatorGuides("pibank", blogs);
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad Pibank Colombia",
          description:
            "Calcula los rendimientos de la cuenta de ahorros Pibank en Colombia.",
          slug: "pibank",
          faqs: buildBankPageCopy("pibank", pibankRates).faq,
          extraNodes: [
            buildBankFinancialProductNode({
              name: "Cuenta Pibank Colombia",
              providerName: "Pibank (Banco Pichincha)",
              slug: "pibank",
              description:
                "Cuenta de ahorros digital de alto rendimiento respaldada por Banco Pichincha y Fogafín.",
              rates: pibankRates,
            }),
          ],
        })}
      />
      <ClientPage profitabilityData={pibankRates} />
      <CalculatorRelatedGuides calculatorSlug="pibank" guides={guides} />
    </>
  );
}
