import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Finanzas en Pareja | Monopolombiano",
  description:
    "Aprende a manejar el dinero en pareja con comunicación, organización y metas compartidas. Guías prácticas para mejorar tu vida financiera en conjunto.",
  keywords: [
    "finanzas en pareja",
    "dinero en pareja",
    "presupuesto compartido",
    "cuentas conjuntas",
    "ahorro en pareja",
    "metas financieras",
    "conflictos financieros",
    "educación financiera",
    "relaciones y dinero",
    "finanzas personales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Finanzas en Pareja",
    description:
      "Consejos para manejar el dinero en pareja, crear un presupuesto común y alcanzar metas financieras juntos.",
    url: "https://monopolombiano.com/finanzas-personales/finanzas-en-pareja",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Finanzas en Pareja",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finanzas en Pareja",
    description:
      "Aprende a manejar las finanzas en pareja sin estrés: presupuesto, ahorro y comunicación efectiva.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Finanzas en Pareja
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          El dinero puede ser una de las principales causas de conflicto en una
          relación, pero también una oportunidad para{" "}
          <span className="font-bold">crecer juntos financieramente</span>. En
          esta sección encontrarás estrategias para crear un{" "}
          <span className="font-bold">presupuesto compartido</span>, decidir
          cómo dividir gastos, ahorrar para metas comunes y mantener una
          comunicación clara sobre el dinero.
          <br />
          <br />
          Aprende a usar las finanzas como una herramienta para fortalecer tu
          relación, construir proyectos de vida en conjunto y alcanzar objetivos
          como comprar vivienda, viajar o invertir juntos.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> presupuesto en
          pareja, ahorro compartido, comunicación financiera, metas comunes y
          planificación del futuro juntos.
        </p>

        <ArticleShowcase category="Finanzas en Pareja" indexes={[0, 4]} />
        <ArticleList category="Finanzas en Pareja" indexes={[4, 7]} />
        <ArticleHome category="Finanzas en Pareja" />
        <ArticleShowcase category="Finanzas en Pareja" indexes={[7, 11]} />
        <ArticleList category="Finanzas en Pareja" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
