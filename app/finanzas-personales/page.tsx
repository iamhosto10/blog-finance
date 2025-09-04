import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Finanzas Personales | Mi Sitio Web",
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ArticleShowcase />
        <ArticleList />
        <ArticleShowcase />
        <ArticleList />
      </div>
    </>
  );
};

export default page;
