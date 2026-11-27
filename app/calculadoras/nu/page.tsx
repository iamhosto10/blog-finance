import ClientPage from "./ClientPage";
import { client } from "@/lib/sanity";
import { profitabilityQuery } from "@/lib/queries";
import type { Metadata } from "next";
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
  title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
  description:
    "Conoce la cuenta de ahorros de Nu (NuBank) en Colombia. Calcula cuánto puedes ganar con su tasa de interés, revisa ventajas, desventajas y simula tus rendimientos con Monopolombiano.",
  keywords: [
    "Nu Bank Colombia",
    "Nu Colombia",
    "cuenta de ahorros Nu",
    "NuBank rentabilidad",
    "tasa de interés Nu",
    "simulador Nu",
    "ahorro digital Colombia",
    "finanzas personales",
  ],
  openGraph: {
    title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
    description:
      "Descubre cuánto puedes ganar con la cuenta de ahorros de Nu en Colombia. Calcula intereses, conoce su tasa efectiva anual y aprende a optimizar tus ahorros.",
    url: "https://monopolombiano.com/calculadoras/nu",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Calculadora de rentabilidad Nu Bank",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
    description:
      "Simula tus ganancias con la cuenta de ahorros de Nu Colombia. Calcula intereses, conoce su tasa y descubre si es una buena opción para ti.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/nu",
  },
};

export default async function Page() {
  const [data, blogs] = await Promise.all([
    client.fetch(profitabilityQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const nuRates = data?.nu || [];
  const guides = resolveCalculatorGuides("nu", blogs);

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad Nu Colombia",
          description:
            "Calcula cuánto puedes ganar con la cuenta de ahorros y cajitas de Nu en Colombia según su tasa EA.",
          slug: "nu",
          faqs: buildBankPageCopy("nu", nuRates).faq,
          extraNodes: [
            buildBankFinancialProductNode({
              name: "Cuenta Nu Colombia y Cajitas de Ahorro",
              providerName: "Nu Colombia",
              slug: "nu",
              description:
                "Cuenta de ahorros digital sin cuota de manejo y cajitas remuneradas en Colombia.",
              rates: nuRates,
            }),
          ],
        })}
      />
      <ClientPage profitabilityData={nuRates} />
      <CalculatorRelatedGuides calculatorSlug="nu" guides={guides} />
    </>
  );
}
