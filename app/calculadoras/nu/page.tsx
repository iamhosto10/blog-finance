import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
  description:
    "Conoce la cuenta de ahorros de Nu (NuBank) en Colombia. Calcula cuánto puedes ganar con su tasa de interés, revisa ventajas, desventajas y simula tus rendimientos con Monopolombiano.",
  keywords: [
    "Nu Bank Colombia",
    "Nu Colombia",
    "cuenta de ahorros Nu",
    "NuBank rentabilidad",
    "tasa de interés Nu",
    "simulador Nu",
    "ahorro digital Colombia",
    "finanzas personales",
  ],
  openGraph: {
    title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
    description:
      "Descubre cuánto puedes ganar con la cuenta de ahorros de Nu en Colombia. Calcula intereses, conoce su tasa efectiva anual y aprende a optimizar tus ahorros.",
    url: "https://monopolombiano.com/calculadoras/nu",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Calculadora de rentabilidad Nu Bank",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de rentabilidad Nu Bank | Monopolombiano",
    description:
      "Simula tus ganancias con la cuenta de ahorros de Nu Colombia. Calcula intereses, conoce su tasa y descubre si es una buena opción para ti.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/nu",
  },
};

export default function Page() {
  return <ClientPage />;
}
