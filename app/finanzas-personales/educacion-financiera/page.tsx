import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Educación Financiera | Monopolombiano",
  description:
    "Aprende los fundamentos de la educación financiera: cómo manejar tu dinero, ahorrar, invertir y tomar decisiones económicas inteligentes.",
  keywords: [
    "educación financiera",
    "finanzas personales",
    "ahorro",
    "inversión",
    "presupuesto",
    "deudas",
    "planificación financiera",
    "finanzas básicas",
    "economía personal",
    "alfabetización financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Educación Financiera",
    description:
      "Domina los conceptos esenciales del dinero: ahorro, inversión, presupuesto y toma de decisiones financieras conscientes.",
    url: "https://www.monopolombiano.com/educacion-financiera",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Educación Financiera",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educación Financiera",
    description:
      "Aprende a tomar mejores decisiones con tu dinero y desarrolla hábitos financieros sólidos para toda la vida.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Educación Financiera
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          La <span className="font-bold">educación financiera</span> es la base
          para lograr estabilidad económica y tomar decisiones inteligentes con
          tu dinero. Aquí encontrarás conceptos clave explicados de forma
          simple: cómo presupuestar, ahorrar, invertir y evitar errores comunes
          que afectan tus finanzas personales.
          <br />
          <br />
          Desarrolla hábitos financieros saludables, entiende cómo funcionan los
          productos financieros y aprende a planificar tu futuro económico paso
          a paso. No importa tu edad o nivel de conocimiento: siempre es buen
          momento para empezar a construir una relación más consciente con tu
          dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> ahorro,
          inversión, presupuesto, manejo de deudas, planificación financiera y
          hábitos económicos saludables.
        </p>

        <ArticleShowcase category="Educación Financiera" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Educación Financiera" indexes={[4, 7]} />
        <ArticleHome category="Educación Financiera" />
        <ArticleShowcase category="Educación Financiera" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Educación Financiera" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
