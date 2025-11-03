import { Metadata } from "next";
import ClientPage from "./Clientpage";

export const metadata: Metadata = {
  title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
  description:
    "Convierte dólares (USD) a pesos colombianos (COP) al instante con la tasa de cambio diaria del Banco de la República. Calcula el valor real de tus compras, viajes o transacciones internacionales con nuestra herramienta actualizada.",
  keywords: [
    "conversor de dólar a peso colombiano",
    "tasa de cambio hoy",
    "valor del dólar en Colombia",
    "convertir USD a COP",
    "tipo de cambio Banco de la República",
    "moneda colombiana",
    "calculadora de divisas",
    "dólar hoy en Colombia",
  ],
  openGraph: {
    title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
    description:
      "Convierte dólares estadounidenses a pesos colombianos en segundos con la tasa de cambio oficial del Banco de la República. Herramienta gratuita, rápida y precisa.",
    url: "https://monopolombiano.com/calculadoras/conversor-dolares",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Conversor de Dólares a Pesos Colombianos",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversor de Dólares a Pesos Colombianos | Monopolombiano",
    description:
      "Convierte dólares (USD) a pesos colombianos (COP) con la tasa del día. Ideal para viajeros, compras y transacciones internacionales.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/conversor-dolares",
  },
};

const page = () => {
  return <ClientPage />;
};

export default page;
