import ClientPage from "./ClientPage";
import { Metadata } from "next";
import { banksQuery, franchieseQuery, cardsQuery } from "@/lib/queries"; // Las queries de Sanity
import { client } from "@/lib/sanity";
import JsonLd from "@/components/CommonComponents/JsonLd";
import CalculatorRelatedGuides from "@/components/CommonComponents/CalculatorRelatedGuides";
import {
  fetchBlogsPreviewSafe,
  resolveCalculatorGuides,
} from "@/lib/calculatorGuides";
import { CALCULATOR_FAQS } from "@/lib/calculatorFaqs";
import {
  buildCalculatorJsonLd,
  buildCardComparisonJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Comparador de Tarjetas | Monopolombiano",
  description:
    "Compara tarjetas de crédito y débito de los principales bancos en Colombia. Descubre tasas de interés, cuotas de manejo, beneficios y programas de recompensas para elegir la tarjeta ideal para ti.",
  keywords: [
    "comparador de tarjetas",
    "tarjetas de crédito",
    "tarjetas débito",
    "tarjetas bancarias",
    "bancos en Colombia",
    "cuota de manejo",
    "tasas de interés",
    "recompensas",
    "beneficios bancarios",
    "finanzas personales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Comparador de Tarjetas",
    description:
      "Compara y analiza tarjetas de crédito y débito según sus beneficios, tasas y costos. Encuentra la mejor opción según tu perfil financiero.",
    url: "https://monopolombiano.com/calculadoras/comparador-de-tarjetas",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Comparador de Tarjetas en Colombia",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/comparador-de-tarjetas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparador de Tarjetas",
    description:
      "Descubre y compara tarjetas de crédito y débito de los principales bancos en Colombia. Encuentra la tarjeta perfecta para ti.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};
export default async function ComparadorTarjetasPage() {
  // Usamos Promise.all para hacer las consultas al mismo tiempo en el servidor
  const [banks, franchieses, cards, blogs] = await Promise.all([
    client.fetch(banksQuery, {}, { next: { tags: ["global-data"] } }),
    client.fetch(franchieseQuery, {}, { next: { tags: ["global-data"] } }),
    client.fetch(cardsQuery, {}, { next: { tags: ["global-data"] } }),
    fetchBlogsPreviewSafe(),
  ]);
  const guides = resolveCalculatorGuides("comparador-de-tarjetas", blogs);

  // Pasamos los datos al Client Component
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Comparador de Tarjetas de Crédito y Débito en Colombia",
          description:
            "Compara tarjetas de crédito y débito de los principales bancos en Colombia: tasas EA, cuota de manejo, beneficios y recompensas.",
          slug: "comparador-de-tarjetas",
          faqs: CALCULATOR_FAQS["comparador-de-tarjetas"],
          extraNodes: [buildCardComparisonJsonLd(cards || [])],
        })}
      />
      <ClientPage
        banks={banks || []}
        franchieses={franchieses || []}
        cards={cards || []}
      />
      <CalculatorRelatedGuides
        calculatorSlug="comparador-de-tarjetas"
        guides={guides}
        className="container mx-auto px-4 pb-12"
      />
    </>
  );
}
