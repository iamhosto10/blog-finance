import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tasas de Interés | Monopolombiano",
  description:
    "Entérate de las últimas decisiones sobre tasas de interés en Colombia y cómo impactan tus créditos, inversiones y ahorros. Análisis del Banco de la República y tendencias económicas.",
  keywords: [
    "tasas de interés",
    "Banco de la República",
    "créditos",
    "ahorro",
    "inversión",
    "inflación",
    "economía colombiana",
    "política monetaria",
    "rendimientos",
    "deuda",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Tasas de Interés",
    description:
      "Conoce cómo las tasas de interés del Banco de la República afectan tu dinero, los créditos, los ahorros y la inversión en Colombia.",
    url: "https://www.monopolombiano.com/economia-hoy/tasas-de-interes",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 425,
        height: 425,
        alt: "Tasas de Interés",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasas de Interés",
    description:
      "Aprende cómo las tasas de interés impactan tus finanzas personales, tus créditos y tus inversiones en Colombia.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Tasas de Interés
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Mantente informado sobre las{" "}
          <span className="font-bold">tasas de interés</span> y su impacto en la
          economía colombiana. Aquí analizamos las decisiones del{" "}
          <span className="font-bold">Banco de la República</span> y cómo
          influyen en el costo de los créditos, los rendimientos del ahorro y
          las oportunidades de inversión.
          <br />
          <br />
          Descubre cómo las variaciones en la tasa de política monetaria afectan
          el consumo, la inflación y el acceso al financiamiento. También
          encontrarás consejos para aprovechar los cambios de tasa a tu favor en
          tus <span className="font-bold">deudas e inversiones</span>.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> Banco de la
          República, inflación, créditos, ahorro, política monetaria, inversión
          y economía colombiana.
        </p>

        <ArticleShowcase category="tasas de interes" indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="tasas de interes" indexes={[4, 7]} />
        <ArticleHome category="tasas de interes" />
        <ArticleShowcase category="tasas de interes" indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="tasas de interes" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
