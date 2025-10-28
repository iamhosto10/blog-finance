import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Regulaciones | Monopolombianos",
  description:
    "Conoce las leyes, decretos y políticas financieras que regulan la economía colombiana. Entérate cómo las normas afectan a los bancos, inversionistas, fintech y consumidores.",
  keywords: [
    "regulaciones financieras",
    "leyes económicas",
    "Superintendencia Financiera",
    "normas bancarias",
    "política fiscal",
    "impuestos",
    "protección al consumidor financiero",
    "fintech Colombia",
    "regulación cripto",
    "mercado de valores",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Regulaciones",
    description:
      "Noticias y análisis sobre leyes, normas y políticas que afectan el sistema financiero colombiano.",
    url: "https://www.monopolombiano.com/regulaciones",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/regulaciones.jpg",
        width: 1200,
        height: 630,
        alt: "Regulaciones",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulaciones",
    description:
      "Infórmate sobre las normas y regulaciones financieras en Colombia: bancos, impuestos, fintech, cripto y más.",
    images: ["https://www.monopolombiano.com/images/regulaciones.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Regulaciones
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Entérate de las{" "}
          <span className="font-bold">
            regulaciones financieras y económicas
          </span>{" "}
          que impactan el día a día en Colombia. En esta sección analizamos las
          <span className="font-bold">
            {" "}
            leyes, decretos y políticas públicas
          </span>{" "}
          emitidas por entidades como la Superintendencia Financiera, el
          Ministerio de Hacienda y el Banco de la República.
          <br />
          <br />
          Conoce cómo afectan a los{" "}
          <span className="font-bold">
            bancos, inversionistas, fintech, empresas y consumidores
          </span>
          , y mantente actualizado sobre los cambios en tributación, mercado de
          valores y regulación cripto.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> leyes
          económicas, regulación financiera, impuestos, política fiscal,
          fintech, cripto y protección al consumidor.
        </p>

        <ArticleShowcase category="Regulaciones" indexes={[0, 4]} />
        <ArticleList category="Regulaciones" indexes={[4, 7]} />
        <ArticleHome category="Regulaciones" />
        <ArticleShowcase category="Regulaciones" indexes={[7, 11]} />
        <ArticleList category="Regulaciones" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
