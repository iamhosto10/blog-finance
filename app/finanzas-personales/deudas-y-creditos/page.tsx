import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Deudas y Créditos | Monopolombiano",
  description:
    "Aprende a manejar tus deudas y utilizar los créditos de forma responsable. Conoce estrategias para mejorar tu historial y salir de deudas sin perder tu estabilidad financiera.",
  keywords: [
    "deudas",
    "créditos",
    "historial crediticio",
    "puntaje crediticio",
    "tarjetas de crédito",
    "préstamos",
    "endeudamiento",
    "finanzas personales",
    "cómo salir de deudas",
    "educación financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Deudas y Créditos",
    description:
      "Guías y estrategias para entender y manejar tus créditos de manera inteligente. Aprende a evitar el sobreendeudamiento y mejora tu historial financiero.",
    url: "https://monopolombiano.com/finanzas-personales/deudas-y-creditos",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Deudas y Créditos",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deudas y Créditos",
    description:
      "Consejos para salir de deudas, mejorar tu puntaje crediticio y usar el crédito de forma inteligente.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Deudas y Créditos
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Entiende cómo funcionan las{" "}
          <span className="font-bold">deudas y los créditos</span> para tomar
          mejores decisiones financieras. Aprende a identificar cuándo
          endeudarte puede ser una herramienta útil y cuándo puede poner en
          riesgo tu estabilidad económica. Descubre cómo mejorar tu{" "}
          <span className="font-bold">historial crediticio</span>, reducir tasas
          de interés y evitar caer en el sobreendeudamiento.
          <br />
          <br />
          También encontrarás estrategias para consolidar tus deudas, pagar
          menos intereses y recuperar tu tranquilidad financiera paso a paso.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> manejo de
          créditos, puntaje crediticio, consolidación de deudas, préstamos,
          tarjetas de crédito y educación financiera.
        </p>

        <ArticleShowcase category="Deudas y Créditos" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Deudas y Créditos" indexes={[4, 7]} />
        <ArticleHome category="Deudas y Créditos" />
        <ArticleShowcase category="Deudas y Créditos" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Deudas y Créditos" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
