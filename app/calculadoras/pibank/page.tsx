import ClientPage from "./ClientPage";
import { Metadata } from "next";

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
      "Simula tus ganancias con la cuenta de ahorros de Pibank. Descubre cuánto puedes ganar con su tasa del 11% EA y conoce si es la mejor opción de ahorro digital en Colombia.",
    url: "https://monopolombiano.com/calculadoras/pibank",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
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
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/pibank",
  },
};

export default function Page() {
  return <ClientPage />;
}
