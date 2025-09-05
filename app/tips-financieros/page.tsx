import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
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
        url: "https://tusitio.com/images/tips-financieros.jpg", // 👈 puedes poner una imagen de /public o de Sanity
        width: 1200,
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
    images: ["https://tusitio.com/images/tips-financieros.jpg"],
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ArticleShowcase category="Tips Financieros" />
        <ArticleList category="Tips Financieros" />
        <ArticleShowcase category="Tips Financieros" />
        <ArticleList category="Tips Financieros" indexes={[6, 12]} />
      </div>
    </>
  );
};

export default page;
