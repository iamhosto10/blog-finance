import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Inversión | Monopolombiano",
  description:
    "Aprende a invertir tu dinero de forma segura e inteligente. Conoce los mejores instrumentos para hacer crecer tu patrimonio.",
  keywords: [
    "inversión",
    "rentabilidad",
    "finanzas personales",
    "acciones",
    "fondos de inversión",
    "plazo fijo",
    "portafolio",
    "riesgo financiero",
    "inversiones en Colombia",
    "educación financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Inversión",
    description:
      "Aprende a invertir tu dinero de forma segura e inteligente. Conoce los mejores instrumentos para hacer crecer tu patrimonio.",
    url: "https://monopolombiano.com/finanzas-personales/inversion",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Inversión",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inversión",
    description:
      "Descubre cómo invertir tu dinero paso a paso: desde fondos y acciones hasta proyectos inmobiliarios y más.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Inversión
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Aprende a hacer que tu dinero trabaje por ti. En esta sección
          encontrarás estrategias y consejos sobre cómo invertir de manera
          inteligente según tu perfil financiero y tus objetivos. Conoce las
          diferencias entre las{" "}
          <span className="font-bold">inversiones de bajo y alto riesgo</span>,
          cómo diversificar tu portafolio, y qué opciones existen en Colombia
          para comenzar a invertir sin ser un experto.
          <br />
          <br />
          Desde <span className="font-bold">acciones y fondos</span> hasta{" "}
          <span className="font-bold">inversiones inmobiliarias</span> y
          alternativas digitales, aquí descubrirás cómo construir un patrimonio
          sólido paso a paso.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> rentabilidad,
          diversificación, riesgo, portafolios, inversiones inmobiliarias y
          educación financiera.
        </p>

        <ArticleShowcase category="Inversión" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Inversión" indexes={[4, 7]} />
        <ArticleHome category="Inversión" />
        <ArticleShowcase category="Inversión" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Inversión" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
