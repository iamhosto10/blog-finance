import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Impuestos | Mi Sitio Web",
  description:
    "Guías, noticias y análisis sobre impuestos en Colombia. Aprende sobre declaración de renta, IVA, impuestos empresariales y reformas tributarias.",
  keywords: [
    "impuestos Colombia",
    "declaración de renta",
    "reforma tributaria",
    "IVA",
    "impuestos empresariales",
    "DIAN",
    "tributación",
    "impuestos personales",
    "retención en la fuente",
    "finanzas fiscales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Impuestos",
    description:
      "Aprende todo sobre impuestos en Colombia: declaración de renta, IVA, reformas y cómo optimizar tu carga tributaria.",
    url: "https://www.monopolombiano.com/economia-hoy/impuestos",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 425,
        height: 425,
        alt: "Impuestos",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impuestos",
    description:
      "Todo lo que necesitas saber sobre impuestos en Colombia: declaración de renta, IVA, reformas y más.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Impuestos
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Mantente al día con todo lo relacionado con los{" "}
          <span className="font-bold">impuestos en Colombia</span>. En esta
          sección encontrarás guías prácticas, análisis y noticias sobre{" "}
          <span className="font-bold">
            declaración de renta, IVA, impuestos empresariales
          </span>{" "}
          y las últimas <span className="font-bold">reformas tributarias</span>.
          <br />
          <br />
          Aprende cómo cumplir con tus obligaciones fiscales, evitar sanciones y
          aprovechar beneficios legales que te ayuden a{" "}
          <span className="font-bold">optimizar tu carga tributaria</span>,
          tanto si eres persona natural como empresa.
          <br />
          <br />
          También analizamos las medidas del gobierno, la DIAN y el impacto de
          los impuestos en la economía y las finanzas personales.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> declaración de
          renta, IVA, retención en la fuente, impuestos empresariales, reformas
          tributarias y finanzas fiscales.
        </p>

        <ArticleShowcase category="Impuestos" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Impuestos" indexes={[4, 7]} />
        <ArticleHome category="Impuestos" />
        <ArticleShowcase category="Impuestos" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Impuestos" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
