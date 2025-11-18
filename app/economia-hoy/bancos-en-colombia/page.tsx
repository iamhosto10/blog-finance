import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bancos en Colombia | Monopolombiano",
  description:
    "Descubre todo sobre los bancos en Colombia: comparativas, productos financieros, tasas, servicios digitales y consejos para elegir el mejor banco para ti.",
  keywords: [
    "bancos en Colombia",
    "cuentas de ahorro",
    "tarjetas de crédito",
    "créditos bancarios",
    "tasas de interés",
    "banca digital",
    "transferencias",
    "neobancos",
    "fintech Colombia",
    "educación financiera",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Bancos en Colombia",
    description:
      "Compara los principales bancos en Colombia, conoce sus productos, tasas y beneficios, y aprende cómo elegir la mejor opción para tus finanzas.",
    url: "https://www.monopolombiano.com/economia-hoy/bancos-en-colombia",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 425,
        height: 425,
        alt: "Bancos en Colombia",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bancos en Colombia",
    description:
      "Todo lo que necesitas saber sobre los bancos en Colombia: tasas, servicios, productos y recomendaciones.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Bancos en Colombia
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          En esta sección encontrarás información actualizada sobre los{" "}
          <span className="font-bold">bancos en Colombia</span>, sus productos
          financieros y las mejores opciones para tus necesidades. Comparamos
          <span className="font-bold">
            {" "}
            cuentas de ahorro, tarjetas, créditos e inversiones
          </span>{" "}
          de las principales entidades bancarias y plataformas digitales del
          país.
          <br />
          <br />
          Aprende cómo funcionan los{" "}
          <span className="font-bold">neobancos y las fintech</span>, qué banco
          ofrece mejores tasas y beneficios, y cómo aprovechar la{" "}
          <span className="font-bold">banca digital</span> para administrar tu
          dinero con mayor comodidad y seguridad.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> bancos
          tradicionales, fintech, neobancos, tasas de interés, productos
          financieros, cuentas y servicios digitales.
        </p>

        <ArticleShowcase category="Bancos en Colombia" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Bancos en Colombia" indexes={[4, 7]} />
        <ArticleHome category="Bancos en Colombia" />
        <ArticleShowcase category="Bancos en Colombia" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Bancos en Colombia" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
