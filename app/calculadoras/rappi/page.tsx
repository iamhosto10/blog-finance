import ClientPage from "./ClientPage";
import type { Metadata } from "next";

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
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "RappiPay Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rentabilidad RappiPay | Monopolombiano",
    description:
      "Descubre cuánto gana tu dinero en RappiPay con nuestra calculadora de rentabilidad. Una herramienta fácil, rápida y 100% gratuita.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/rappi",
  },
};

export default function Page() {
  return <ClientPage />;
}
