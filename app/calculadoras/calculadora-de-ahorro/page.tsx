import React from "react";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro | Proyecta tus finanzas fácilmente",
  description:
    "Descubre cómo crecerán tus ahorros con el tiempo usando nuestra Calculadora de Ahorro. Visualiza tus aportes, rendimientos e intereses en tablas y gráficos claros, y entiende la importancia del interés compuesto.",
  keywords: [
    "calculadora de ahorro",
    "interés compuesto",
    "ahorros",
    "finanzas personales",
    "rendimientos",
    "proyecciones financieras",
    "ahorrar dinero",
    "inversiones",
  ],
  openGraph: {
    title: "Calculadora de Ahorro 💰 | Visualiza cómo crece tu dinero",
    description:
      "Haz aportes periódicos, mira cómo se acumulan intereses y proyecta el crecimiento de tu ahorro con nuestra calculadora interactiva.",
    url: "https://tusitio.com/calculadora-de-ahorro",
    siteName: "Calculadora de Ahorro",
    images: [
      {
        url: "https://tusitio.com/imagen-previa-calculadora.jpg", // reemplaza con tu imagen real
        width: 1200,
        height: 630,
        alt: "Gráfico de crecimiento de ahorro",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Ahorro 💰",
    description:
      "Simula tus aportes e intereses y observa cómo crece tu ahorro con el tiempo.",
    images: ["https://tusitio.com/imagen-previa-calculadora.jpg"], // reemplaza
  },
  alternates: {
    canonical: "https://tusitio.com/calculadora-de-ahorro",
  },
};
const page = () => {
  return <ClientPage />;
};

export default page;
