import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Economía Hoy | Mi Sitio Web",
  description:
    "Noticias y análisis sobre bancos en Colombia, criptomonedas, economía del país, regulaciones financieras, tasas de interés e impuestos. Todo lo que necesitas saber para entender la economía actual.",
  keywords: [
    "economía hoy",
    "bancos en Colombia",
    "cripto en Colombia",
    "finanzas y regulación",
    "tasas de interés Colombia",
    "impuestos en Colombia",
    "Superintendencia Financiera",
    "salario mínimo",
    "inflación en Colombia",
    "dólar en Colombia",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Economía Hoy",
    description:
      "Análisis de bancos, criptomonedas, inflación, impuestos y regulaciones en Colombia.",
    url: "https://tusitio.com/economia-hoy",
    siteName: "Mi Sitio Web",
    images: [
      {
        url: "https://tusitio.com/images/economia-hoy.jpg", // 👈 puedes usar /public o Sanity
        width: 1200,
        height: 630,
        alt: "Economía Hoy en Colombia",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Economía Hoy",
    description:
      "Todo sobre bancos, cripto, inflación, regulaciones, tasas de interés e impuestos en Colombia.",
    images: ["https://tusitio.com/images/economia-hoy.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Economia Hoy
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ArticleShowcase category="Economia Hoy" />
        <ArticleList category="Economia Hoy" indexes={[0, 3]} />
        <ArticleShowcase category="Economia Hoy" />
        <ArticleList category="Economia Hoy" indexes={[3, 12]} />
      </div>
    </>
  );
};

export default page;
