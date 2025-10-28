import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ahorro y Presupuesto | Monopolombiano",
  description:
    "Aprende a planificar tus finanzas, crear un presupuesto efectivo y alcanzar tus metas de ahorro sin complicaciones.",
  keywords: [
    "ahorro",
    "presupuesto",
    "finanzas personales",
    "metas financieras",
    "gastos",
    "planificación financiera",
    "control de gastos",
    "finanzas del hogar",
    "educación financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Ahorro y Presupuesto",
    description:
      "Aprende a planificar tus finanzas, crear un presupuesto efectivo y alcanzar tus metas de ahorro sin complicaciones.",
    url: "https://www.monopolombiano.com/ahorro-y-presupuesto",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/ahorro.jpg",
        width: 1200,
        height: 630,
        alt: "Ahorro y Presupuesto",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahorro y Presupuesto",
    description:
      "Consejos para ahorrar dinero, controlar tus gastos y organizar tu presupuesto personal o familiar.",
    images: ["https://www.monopolombiano.com/images/ahorro.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Ahorro y Presupuesto
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Descubre cómo organizar tus finanzas personales creando un
          <span className="font-bold"> presupuesto inteligente </span> que te
          permita alcanzar tus metas de ahorro y mantener tus gastos bajo
          control. Aprende a distribuir tus ingresos, identificar gastos
          innecesarios y crear hábitos financieros sostenibles. También
          encontrarás estrategias para ahorrar en el hogar, planificar tus
          compras y construir un fondo de emergencia sólido.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> gestión del
          presupuesto, ahorro mensual, control de gastos, fondo de emergencia y
          metas financieras.
        </p>

        <ArticleShowcase category="Ahorro y Presupuesto" indexes={[0, 4]} />
        <ArticleList category="Ahorro y Presupuesto" indexes={[4, 7]} />
        <ArticleHome category="Ahorro y Presupuesto" />
        <ArticleShowcase category="Ahorro y Presupuesto" indexes={[7, 11]} />
        <ArticleList category="Ahorro y Presupuesto" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
