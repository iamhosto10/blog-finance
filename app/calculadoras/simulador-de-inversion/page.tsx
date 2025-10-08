import ClientPage from "./ClientPage";
import type { Metadata } from "next";

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
    url: "https://tusitio.com/simulador-inversion",
    siteName: "Simulador de Inversión",
    images: [
      {
        url: "https://tusitio.com/og-simulador-inversion.png",
        width: 1200,
        height: 630,
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
    images: ["https://tusitio.com/og-simulador-inversion.png"],
  },
  alternates: {
    canonical: "https://tusitio.com/simulador-inversion",
  },
};

const page = () => {
  return <ClientPage />;
};

export default page;
