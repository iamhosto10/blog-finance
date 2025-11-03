import React from "react";
import Clientpage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
  description:
    "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y saldo pendiente de préstamos o compras con tarjeta de crédito.",
  applicationName: "MiCalculadoraDeCredito",
  authors: [{ name: "Monopolombiano" }],
  openGraph: {
    title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
    description:
      "Calculadora de crédito online para simular préstamos y compras con tarjeta. Ingresa monto, plazo, tasa y seguro para ver cuotas e intereses.",
    url: "https://monopolombiano.com/calculadoras/calculadora-de-ahorro",
    siteName: "TuSitio",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Crédito — Simulador de cuotas",
    description:
      "Simula cuotas, intereses y saldo pendiente para préstamos o compras con tarjeta.",
    images: ["https://monopolombiano.com/calculadoras/calculadora-de-ahorro"],
    creator: "@gerav04",
  },
};

const page = () => {
  return <Clientpage />;
};

export default page;
