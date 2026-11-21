import React from "react";
import Clientpage from "./ClientPage";
import { Metadata } from "next";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { buildCalculatorJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
  description:
    "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y saldo pendiente de préstamos o compras con tarjeta de crédito.",
  applicationName: "Monopolombiano",
  authors: [{ name: "Monopolombiano" }],
  alternates: {
    canonical: "https://monopolombiano.com/calculadoras/calculadora-de-credito",
  },
  openGraph: {
    title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
    description:
      "Calculadora de crédito online para simular préstamos y compras con tarjeta. Ingresa monto, plazo, tasa y seguro para ver cuotas e intereses.",
    url: "https://monopolombiano.com/calculadoras/calculadora-de-credito",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Crédito — Simulador de cuotas",
    description:
      "Simula cuotas, intereses y saldo pendiente para préstamos o compras con tarjeta.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};

const page = () => {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          name: "Calculadora de Crédito en Colombia",
          description:
            "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y tabla de amortización en Colombia.",
          slug: "calculadora-de-credito",
        })}
      />
      <Clientpage />
    </>
  );
};

export default page;
