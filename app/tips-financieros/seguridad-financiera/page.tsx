import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Seguridad Financiera | Monopolombiano",
  description:
    "Aprende a proteger tus finanzas personales, evitar fraudes y construir una base económica sólida para el futuro.",
  keywords: [
    "seguridad financiera",
    "fraudes bancarios",
    "protección del dinero",
    "emergencias económicas",
    "seguros",
    "ciberseguridad financiera",
    "finanzas personales",
    "estabilidad económica",
    "riesgos financieros",
    "plan de ahorro",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Seguridad Financiera",
    description:
      "Consejos prácticos para cuidar tu dinero, prevenir fraudes y lograr estabilidad económica.",
    url: "https://monopolombiano.com/tips-financieros/seguridad-financiera",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Seguridad Financiera",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguridad Financiera",
    description:
      "Protege tus finanzas personales y evita fraudes con estrategias sencillas y efectivas.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Seguridad Financiera
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          La <span className="font-bold">seguridad financiera</span> consiste en
          proteger tus ingresos, ahorros e inversiones ante imprevistos, fraudes
          o crisis económicas. En esta sección encontrarás{" "}
          <span className="font-bold">
            estrategias para cuidar tu dinero, evitar estafas financieras,
            fortalecer tu fondo de emergencia y asegurar tu futuro económico.
          </span>
          <br />
          <br />
          También aprenderás sobre{" "}
          <span className="font-bold">
            seguros, planes de contingencia, ciberseguridad y educación
            financiera preventiva
          </span>{" "}
          que te ayudarán a mantener estabilidad y tranquilidad a largo plazo.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> prevención de
          fraudes, ahorro de emergencia, seguros, protección del dinero,
          estabilidad financiera y gestión de riesgos.
        </p>

        <ArticleShowcase category="Seguridad Financiera" indexes={[0, 4]} />
        <ArticleList category="Seguridad Financiera" indexes={[4, 7]} />
        <ArticleHome category="Seguridad Financiera" />
        <ArticleShowcase category="Seguridad Financiera" indexes={[7, 11]} />
        <ArticleList category="Seguridad Financiera" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
