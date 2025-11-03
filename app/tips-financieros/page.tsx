import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tips Financieros | Mi Sitio Web",
  description:
    "Descubre consejos prácticos sobre cajeros, bancos, ahorro diario, seguridad financiera, manejo del dinero en el extranjero, historial crediticio y las mejores apps para organizar tus finanzas.",
  keywords: [
    "tips financieros",
    "ahorro en Colombia",
    "cajeros y bancos",
    "compras inteligentes",
    "seguridad financiera",
    "apps de finanzas",
    "historial crediticio",
    "manejo del dinero",
    "viajes y divisas",
    "finanzas personales Colombia",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Tips Financieros",
    description:
      "Aprende a manejar tu dinero con consejos sobre ahorro, bancos, seguridad financiera, apps útiles e historial crediticio.",
    url: "https://tusitio.com/tips-financieros",
    siteName: "Mi Sitio Web",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Tips Financieros",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tips Financieros",
    description:
      "Consejos sobre cajeros, ahorro, seguridad financiera, historial crediticio y más.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Tips Financieros
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Descubre consejos financieros prácticos para tu día a día. Aprende a
          ahorrar en tus compras, aprovechar promociones, evitar fraudes
          bancarios y usar las mejores apps financieras del mercado colombiano.
          También te enseñamos cómo mejorar tu historial crediticio, proteger tu
          dinero y mantener una buena seguridad financiera en línea. Pequeños
          cambios pueden hacer una gran diferencia en tus finanzas personales.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> cajeros,
          bancos, seguridad financiera, apps y herramientas útiles, historial
          crediticio.
        </p>
        <ArticleShowcase category="Tips Financieros" indexes={[0, 4]} />
        <ArticleList category="Tips Financieros" indexes={[4, 7]} />
        <ArticleHome category="Tips Financieros" />
        <ArticleShowcase category="Tips Financieros" indexes={[7, 11]} />
        <ArticleList category="Tips Financieros" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
