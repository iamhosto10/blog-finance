import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Compras y Ahorro Diario | Monopolombiano",
  description:
    "Aprende a optimizar tus gastos y a comprar de forma inteligente. Descubre estrategias para ahorrar en tus compras diarias y mejorar tus finanzas personales.",
  keywords: [
    "ahorro diario",
    "compras inteligentes",
    "finanzas personales",
    "descuentos",
    "cupones",
    "promociones",
    "supermercado",
    "presupuesto familiar",
    "consumo responsable",
    "ahorro en el hogar",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Compras y Ahorro Diario",
    description:
      "Consejos prácticos para ahorrar en tus compras del día a día. Aprende a gastar menos y aprovechar mejor tu dinero.",
    url: "https://www.monopolombiano.com/compras-y-ahorro-diario",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/compras.jpg",
        width: 1200,
        height: 630,
        alt: "Compras y Ahorro Diario",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compras y Ahorro Diario",
    description:
      "Aprende a ahorrar todos los días con estrategias simples para tus compras y gastos del hogar.",
    images: ["https://www.monopolombiano.com/images/compras.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Compras y Ahorro Diario
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Aprende a{" "}
          <span className="font-bold">
            ahorrar dinero en tus compras del día a día
          </span>{" "}
          sin sacrificar calidad ni comodidad. En esta sección encontrarás{" "}
          <span className="font-bold">
            consejos prácticos sobre consumo responsable, planificación de
            compras, comparación de precios y uso de descuentos o cupones
          </span>
          .
          <br />
          <br />
          Descubre cómo{" "}
          <span className="font-bold">optimizar tu presupuesto familiar</span>,
          aprovechar promociones en supermercados y tiendas, y reducir gastos
          innecesarios para alcanzar tus metas financieras.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> ahorro diario,
          compras inteligentes, presupuesto, promociones, consumo responsable y
          finanzas del hogar.
        </p>

        <ArticleShowcase category="Compras y Ahorro Diario" indexes={[0, 4]} />
        <ArticleList category="Compras y Ahorro Diario" indexes={[4, 7]} />
        <ArticleHome category="Compras y Ahorro Diario" />
        <ArticleShowcase category="Compras y Ahorro Diario" indexes={[7, 11]} />
        <ArticleList category="Compras y Ahorro Diario" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
