import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Economía del País | Monopolombiano",
  description:
    "Análisis, noticias y reportes sobre la economía colombiana: inflación, empleo, tasas de interés, crecimiento y decisiones del gobierno que impactan tus finanzas.",
  keywords: [
    "economía de Colombia",
    "inflación",
    "empleo",
    "tasas de interés",
    "Banco de la República",
    "PIB",
    "crecimiento económico",
    "finanzas públicas",
    "mercado laboral",
    "política económica",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Economía del País",
    description:
      "Infórmate sobre los cambios en la economía colombiana y cómo afectan tu bolsillo: inflación, empleo, tasas y más.",
    url: "https://www.monopolombiano.com/economia-del-pais",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/economia.jpg",
        width: 1200,
        height: 630,
        alt: "Economía del País",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Economía del País",
    description:
      "Entiende cómo la economía colombiana evoluciona y qué decisiones del gobierno o del Banco de la República pueden afectar tus finanzas.",
    images: ["https://www.monopolombiano.com/images/economia.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Economía del País
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Mantente informado sobre los{" "}
          <span className="font-bold">
            principales indicadores económicos de Colombia
          </span>{" "}
          y cómo las decisiones del gobierno, el Banco de la República y el
          contexto internacional afectan tu vida diaria.
          <br />
          <br />
          Aquí encontrarás análisis sobre{" "}
          <span className="font-bold">
            inflación, tasas de interés, empleo, PIB y políticas fiscales
          </span>
          , explicados de manera sencilla para que entiendas el panorama
          económico del país.
          <br />
          <br />
          También conocerás las{" "}
          <span className="font-bold">
            tendencias del mercado, precios del dólar, inversión extranjera y
            medidas económicas
          </span>{" "}
          que impactan a los ciudadanos y las empresas colombianas.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> inflación, PIB,
          tasas, empleo, política económica, Banco de la República y finanzas
          nacionales.
        </p>

        <ArticleShowcase category="Economía del pais" indexes={[0, 4]} />
        <ArticleList category="Economía del pais" indexes={[4, 7]} />
        <ArticleHome category="Economía del pais" />
        <ArticleShowcase category="Economía del pais" indexes={[7, 11]} />
        <ArticleList category="Economía del pais" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
