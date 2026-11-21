import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { profitabilityQuery } from "@/lib/queries";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Calculadora de Rentabilidad RappiPay | Monopolombiano",
  description:
    "Descubre cuánto puedes ganar con tu dinero en RappiPay. Usa nuestra calculadora de rentabilidad para estimar tus ganancias y conoce las ventajas y desventajas de ahorrar en este banco digital.",
  keywords: [
    "RappiPay",
    "cuenta de ahorros RappiPay",
    "rentabilidad RappiPay",
    "calculadora RappiPay",
    "Rappi banco digital",
    "intereses RappiPay",
    "cuenta sin cuota de manejo",
    "Davivienda RappiPay",
    "Fogafín RappiPay",
    "bancos digitales Colombia",
  ],
  openGraph: {
    title: "Calculadora de Rentabilidad RappiPay | Monopolombiano",
    description:
      "Calcula tus ganancias con RappiPay, conoce su tasa de interés y las ventajas de ahorrar en esta cuenta digital respaldada por Davivienda y Fogafín.",
    url: "https://monopolombiano.com/calculadoras/rappi",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "RappiPay Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rentabilidad RappiPay | Monopolombiano",
    description:
      "Descubre cuánto gana tu dinero en RappiPay con nuestra calculadora de rentabilidad. Una herramienta fácil, rápida y 100% gratuita.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/rappi",
  },
};

export default async function Page() {
  const data = await client.fetch(
    profitabilityQuery,
    {},
    { next: { tags: ["global-data"] } },
  );

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Rentabilidad RappiPay Colombia",
          description:
            "Simula cuánto ganas ahorrando en las bóvedas y cuenta de RappiPay en Colombia.",
          slug: "rappi",
        })}
      />
      <ClientPage profitabilityData={data?.rappi || []} />
    </>
  );
}
