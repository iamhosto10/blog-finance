import ClientPage from "./ClientPage";
import { Metadata } from "next";

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
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
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
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/popular",
  },
};

export default function Page() {
  return <ClientPage />;
}
