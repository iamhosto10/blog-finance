import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { getBlogsByCategory } from "@/lib/queries";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Economía Hoy",
  description:
    "Noticias y análisis sobre bancos en Colombia, criptomonedas, economía del país, regulaciones financieras, tasas de interés e impuestos. Todo lo que necesitas saber para entender la economía actual.",
  keywords: [
    "economía hoy",
    "bancos en Colombia",
    "cripto en Colombia",
    "finanzas y regulación",
    "tasas de interés Colombia",
    "impuestos en Colombia",
    "Superintendencia Financiera",
    "salario mínimo",
    "inflación en Colombia",
    "dólar en Colombia",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Economía Hoy",
    description:
      "Análisis de bancos, criptomonedas, inflación, impuestos y regulaciones en Colombia.",
    url: "https://monopolombiano.com/economia-hoy",
    siteName: "Mi Sitio Web",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg", // 👈 puedes usar /public o Sanity
        width: 1200,
        height: 630,
        alt: "Economía Hoy en Colombia",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Economía Hoy",
    description:
      "Todo sobre bancos, cripto, inflación, regulaciones, tasas de interés e impuestos en Colombia.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};

const page = async () => {
  const blogs = await getBlogsByCategory("Economia Hoy");
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Economia Hoy
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Mantente al día con las últimas noticias y análisis sobre la economía
          colombiana. Conoce cómo las tasas de interés, los cambios en los
          impuestos, las políticas de los bancos en Colombia y las nuevas
          regulaciones financieras pueden afectar tu bolsillo. Además,
          exploramos el impacto de las criptomonedas, las fintech y las nuevas
          tecnologías en el sistema económico del país.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> tasas de
          interés, regulaciones, bancos, impuestos, criptomonedas y economía
          digital.
        </p>
        <ArticleShowcase blogs={blogs} indexes={[0, 4]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Economia Hoy" indexes={[4, 7]} blogs={blogs} />
        <ArticleHome blog={blogs[Math.floor(Math.random() * blogs.length)]} />

        <ArticleShowcase blogs={blogs} indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList category="Economia Hoy" indexes={[11, 20]} blogs={blogs} />
      </div>
    </>
  );
};

export default page;
