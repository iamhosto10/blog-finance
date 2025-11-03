import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Historial Crediticio | Monopolombiano",
  description:
    "Aprende cómo funciona tu historial crediticio, cómo mejorarlo y cómo influye en tus préstamos, tarjetas y oportunidades financieras.",
  keywords: [
    "historial crediticio",
    "puntaje crediticio",
    "centrales de riesgo",
    "reportes de crédito",
    "datacrédito",
    "mejorar score",
    "vida crediticia",
    "créditos personales",
    "endeudamiento",
    "finanzas personales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Historial Crediticio",
    description:
      "Guías y consejos para entender, cuidar y mejorar tu puntaje crediticio. Aprende cómo tu historial influye en tus oportunidades financieras.",
    url: "https://monopolombiano.com/tips-financieros/historial-crediticio",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Historial Crediticio",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Historial Crediticio",
    description:
      "Descubre cómo construir un buen historial crediticio y aumentar tu puntaje para acceder a mejores oportunidades financieras.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Historial Crediticio
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Tu <span className="font-bold">historial crediticio</span> es uno de
          los factores más importantes para acceder a{" "}
          <span className="font-bold">
            préstamos, tarjetas de crédito y oportunidades financieras
          </span>
          . En esta sección aprenderás{" "}
          <span className="font-bold">
            cómo se calcula tu puntaje, cómo interpretarlo y qué hábitos te
            ayudan a mantenerlo saludable.
          </span>
          <br />
          <br />
          Descubre cómo{" "}
          <span className="font-bold">
            Datacrédito, TransUnion y otras centrales de riesgo
          </span>{" "}
          manejan tu información, cómo corregir errores en tu reporte y
          estrategias para{" "}
          <span className="font-bold">
            mejorar tu score y construir una buena reputación financiera
          </span>
          .
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> puntaje
          crediticio, reportes de crédito, centrales de riesgo, score
          financiero, endeudamiento responsable y acceso al crédito.
        </p>

        <ArticleShowcase category="Historial Crediticio" indexes={[0, 4]} />
        <ArticleList category="Historial Crediticio" indexes={[4, 7]} />
        <ArticleHome category="Historial Crediticio" />
        <ArticleShowcase category="Historial Crediticio" indexes={[7, 11]} />
        <ArticleList category="Historial Crediticio" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
