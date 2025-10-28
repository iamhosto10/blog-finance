import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Finanzas Personales | Monopolombiano",
  description:
    "Consejos prácticos sobre ahorro, inversión y manejo del dinero para las personas comunes.",
  keywords: [
    "finanzas",
    "ahorro",
    "inversión",
    "dinero",
    "presupuesto",
    "deudas",
    "creditos",
    "vivienda",
    "Finanzas en pareja",
    "educacion",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Finanzas Personales",
    description:
      "Consejos prácticos sobre ahorro, inversión y manejo del dinero para las personas comunes.",
    url: "https://www.monopolombiano.com/finanzas-personales",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/finanzas.jpg",
        width: 1200,
        height: 630,
        alt: "Finanzas Personales",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finanzas Personales",
    description: "Aprende a manejar tu dinero de forma inteligente.",
    images: ["https://www.monopolombiano.com/images/finanzas.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Finanzas Personales
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Aprende todo lo que necesitas para mejorar tu bienestar financiero.
          Descubre estrategias prácticas de ahorro y presupuesto, cómo invertir
          tu dinero de forma segura, y cómo manejar tus deudas y créditos sin
          afectar tu tranquilidad económica. También encontrarás guías sobre
          cómo comprar vivienda en Colombia, administrar tus finanzas en pareja
          y tomar decisiones más inteligentes con tu dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> ahorro,
          inversión, créditos, vivienda, finanzas en pareja y educación
          financiera.
        </p>
        <ArticleShowcase category="Finanzas Personales" indexes={[0, 4]} />
        <ArticleList category="Finanzas Personales" indexes={[4, 7]} />
        <ArticleHome category="Finanzas Personales" />
        <ArticleShowcase category="Finanzas Personales" indexes={[7, 11]} />
        <ArticleList category="Finanzas Personales" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
