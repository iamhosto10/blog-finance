import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Comprar Vivienda | Monopolombiano",
  description:
    "Todo lo que necesitas saber para comprar vivienda en Colombia: créditos, subsidios, cuotas iniciales y consejos para tomar la mejor decisión financiera.",
  keywords: [
    "comprar vivienda",
    "crédito hipotecario",
    "subsidios vivienda",
    "cuota inicial",
    "vivienda nueva",
    "leasing habitacional",
    "inversión inmobiliaria",
    "finanzas personales",
    "vivienda en Colombia",
    "educación financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Comprar Vivienda",
    description:
      "Guías, consejos y herramientas para comprar vivienda en Colombia. Aprende sobre créditos, subsidios y estrategias para cumplir tu sueño de tener casa propia.",
    url: "https://monopolombiano.com/finanzas-personales/comprar-vivienda",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Comprar Vivienda",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprar Vivienda",
    description:
      "Aprende a comprar vivienda en Colombia paso a paso: créditos, subsidios y planificación financiera para lograrlo.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Comprar Vivienda
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Si estás pensando en{" "}
          <span className="font-bold">comprar vivienda</span>, aquí encontrarás
          toda la información que necesitas para hacerlo con seguridad y buena
          planificación. Aprende a elegir entre{" "}
          <span className="font-bold">vivienda nueva o usada</span>, cómo
          solicitar un crédito hipotecario, aprovechar{" "}
          <span className="font-bold">subsidios del gobierno</span> y calcular
          tu cuota inicial.
          <br />
          <br />
          Te enseñamos paso a paso cómo organizar tus finanzas, comparar
          opciones de financiamiento y tomar decisiones informadas para lograr
          el sueño de tener casa propia sin poner en riesgo tu estabilidad
          económica.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> créditos
          hipotecarios, subsidios, ahorro para vivienda, leasing habitacional,
          inversión inmobiliaria y planificación financiera.
        </p>

        <ArticleShowcase category="Comprar Vivienda" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Comprar Vivienda" indexes={[4, 7]} />
        <ArticleHome category="Comprar Vivienda" />
        <ArticleShowcase category="Comprar Vivienda" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Comprar Vivienda" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
