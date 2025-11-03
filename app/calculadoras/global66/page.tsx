import ClientPage from "./ClientPage";

import { Metadata } from "next";

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
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
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
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/global66",
  },
};

export default function Page() {
  return <ClientPage />;
}
