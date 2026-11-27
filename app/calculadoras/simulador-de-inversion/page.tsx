import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import CalculatorRelatedGuides from "@/components/CommonComponents/CalculatorRelatedGuides";
import {
  fetchBlogsPreviewSafe,
  resolveCalculatorGuides,
} from "@/lib/calculatorGuides";
import { CALCULATOR_FAQS } from "@/lib/calculatorFaqs";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Simulador de Inversión | Calcula el crecimiento de tu dinero",
  description:
    "Simula fácilmente cómo crece tu inversión con el tiempo. Ingresa el monto inicial, tus aportes y la tasa de rentabilidad, y obtén una tabla, gráfica y resumen detallado de tus resultados.",
  keywords: [
    "simulador de inversión",
    "interés compuesto",
    "calculadora de inversión",
    "rentabilidad",
    "ahorros",
    "finanzas personales",
    "simulador financiero",
  ],
  openGraph: {
    title: "Simulador de Inversión 💰 | Calcula tu rentabilidad futura",
    description:
      "Conoce cómo crece tu dinero mes a mes. Visualiza tus aportes, intereses y el valor total de tu inversión con una tabla y una gráfica clara.",
    url: "https://monopolombiano.com/calculadoras/simulador-de-inversion",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Simulador de Inversión - Calcula tu rentabilidad",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Inversión | Calcula tu rentabilidad fácilmente",
    description:
      "Simula tus inversiones y visualiza el crecimiento de tu dinero con gráficos y tablas interactivas.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/simulador-de-inversion",
  },
};

const page = async () => {
  const blogs = await fetchBlogsPreviewSafe();
  const guides = resolveCalculatorGuides("simulador-de-inversion", blogs);

  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Simulador de Inversión en Colombia",
          description:
            "Simula cómo crece tu inversión con aportes periódicos y rentabilidad anual efectiva.",
          slug: "simulador-de-inversion",
          faqs: CALCULATOR_FAQS["simulador-de-inversion"],
        })}
      />
      <ClientPage />
      <CalculatorRelatedGuides
        calculatorSlug="simulador-de-inversion"
        guides={guides}
        className="container mx-auto px-4 pb-12"
      />
    </>
  );
};

export default page;
