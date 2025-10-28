import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Apps y Herramientas Útiles | Monopolombiano",
  description:
    "Descubre las mejores aplicaciones y herramientas digitales para manejar tus finanzas, ahorrar, invertir y organizar tu dinero fácilmente.",
  keywords: [
    "apps financieras",
    "herramientas de finanzas personales",
    "control de gastos",
    "aplicaciones para ahorrar",
    "gestión del dinero",
    "fintech",
    "apps de inversión",
    "presupuesto",
    "billeteras digitales",
    "organización financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Apps y Herramientas Útiles",
    description:
      "Las mejores apps y herramientas digitales para tus finanzas personales. Controla tus gastos, ahorra y administra tu dinero de forma inteligente.",
    url: "https://www.monopolombiano.com/apps-y-herramientas-utiles",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/apps.jpg",
        width: 1200,
        height: 630,
        alt: "Apps y Herramientas Útiles",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apps y Herramientas Útiles",
    description:
      "Explora las mejores aplicaciones y plataformas digitales para mejorar tu organización y salud financiera.",
    images: ["https://www.monopolombiano.com/images/apps.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Apps y Herramientas Útiles
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Mantén el control de tus finanzas con las{" "}
          <span className="font-bold">
            mejores aplicaciones y herramientas digitales
          </span>{" "}
          disponibles hoy. Descubre plataformas para{" "}
          <span className="font-bold">
            gestionar tus gastos, hacer presupuestos, invertir, ahorrar e
            incluso aprender sobre finanzas personales
          </span>{" "}
          desde tu celular o computador.
          <br />
          <br />
          Aquí encontrarás{" "}
          <span className="font-bold">
            recomendaciones, guías y comparativas
          </span>{" "}
          sobre apps fintech, billeteras digitales, calculadoras financieras,
          simuladores y extensiones útiles para administrar tu dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> apps
          financieras, control de gastos, fintech, ahorro, inversión y
          herramientas digitales.
        </p>

        <ArticleShowcase
          category="Apps y Herramientas Útiles"
          indexes={[0, 4]}
        />
        <ArticleList category="Apps y Herramientas Útiles" indexes={[4, 7]} />
        <ArticleHome category="Apps y Herramientas Útiles" />
        <ArticleShowcase
          category="Apps y Herramientas Útiles"
          indexes={[7, 11]}
        />
        <ArticleList category="Apps y Herramientas Útiles" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
