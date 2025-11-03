import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad Lulo Bank | Monopolombiano",
  description:
    "Descubre cuánto puedes ganar con la cuenta de ahorros de Lulo Bank. Calcula tu rentabilidad, conoce su tasa de interés y aprende cómo funcionan sus rendimientos diarios.",
  keywords: [
    "Lulo Bank",
    "calculadora Lulo",
    "rentabilidad Lulo Bank",
    "cuenta de ahorros Lulo",
    "intereses Lulo",
    "rendimientos diarios Lulo Bank",
    "banco digital Colombia",
    "finanzas personales",
  ],
  openGraph: {
    title: "Calculadora de rentabilidad Lulo Bank | Monopolombiano",
    description:
      "Calcula los intereses y rendimientos que puedes obtener con la cuenta de ahorros Lulo Bank. Conoce su tasa efectiva anual y las ventajas de ahorrar digitalmente.",
    url: "https://monopolombiano.com/calculadoras/lulo",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Calculadora de rentabilidad Lulo Bank",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de rentabilidad Lulo Bank | Monopolombiano",
    description:
      "Descubre cuánto puedes ganar con la cuenta de ahorros de Lulo Bank. Calcula tus intereses y aprende cómo funciona su rentabilidad diaria.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/herramientas/lulo",
  },
};

export default function Page() {
  return <ClientPage />;
}
