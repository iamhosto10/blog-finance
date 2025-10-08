import React from "react";
import Clientpage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
  description:
    "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y saldo pendiente de préstamos o compras con tarjeta de crédito.",
  applicationName: "MiCalculadoraDeCredito",
  authors: [{ name: "TuNombre o El Nombre del Sitio" }],
  openGraph: {
    title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
    description:
      "Calculadora de crédito online para simular préstamos y compras con tarjeta. Ingresa monto, plazo, tasa y seguro para ver cuotas e intereses.",
    url: "https://tusitio.com/calculadoras/calculadora-de-credito",
    siteName: "TuSitio",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Crédito — Simulador de cuotas",
    description:
      "Simula cuotas, intereses y saldo pendiente para préstamos o compras con tarjeta.",
    images: ["https://tusitio.com/og-images/calculadora-credito.png"],
    creator: "@tu_handle",
  },
};

const page = () => {
  return <Clientpage />;
};

export default page;
