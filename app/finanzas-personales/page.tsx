import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { client } from "@/lib/sanity";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Finanzas Personales",
  description:
    "Consejos prácticos sobre ahorro, inversión y manejo del dinero para las personas comunes.",
  keywords: [
    "finanzas",
    "ahorro",
    "inversión",
    "dinero",
    "presupuesto",
    "deudas",
    "creditos",
    "vivienda",
    "Finanzas en pareja",
    "educacion",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Finanzas Personales",
    description:
      "Consejos prácticos sobre ahorro, inversión y manejo del dinero para las personas comunes.",
    url: "https://www.monopolombiano.com/finanzas-personales",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Finanzas Personales",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finanzas Personales",
    description: "Aprende a manejar tu dinero de forma inteligente.",
    images: ["https://www.monopolombiano.com/images/finanzas.jpg"],
  },
};

async function getBlogsByCategory(categoryName: string) {
  const query = `
    *[_type == "blog" && $categoryName in categories[]->title] | order(publishedAt desc) {
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    miniatureImage,
    excerpt,
    audio {
      asset->
    },
    body,
    categories[]->{
      _id,
      title,
      slug
    },
    relatedNews[]->{
      _id,
      title,
      focusTitle,
      continueTitle,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      categories[]->{
        _id,
        title,
        slug
      }
    }
  }
  `;

  return client.fetch(
    query,
    { categoryName },
    {
      next: { tags: ["all-blogs", `category-${categoryName}`, "global-data"] },
    },
  );
}

const page = async () => {
  const blogs = await getBlogsByCategory("Finanzas Personales");

  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Finanzas Personales
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Aprende todo lo que necesitas para mejorar tu bienestar financiero.
          Descubre estrategias prácticas de ahorro y presupuesto, cómo invertir
          tu dinero de forma segura, y cómo manejar tus deudas y créditos sin
          afectar tu tranquilidad económica. También encontrarás guías sobre
          cómo comprar vivienda en Colombia, administrar tus finanzas en pareja
          y tomar decisiones más inteligentes con tu dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> ahorro,
          inversión, créditos, vivienda, finanzas en pareja y educación
          financiera.
        </p>
        <ArticleShowcase blogs={blogs} indexes={[0, 4]} />
        <ArticleList
          category="Finanzas Personales"
          indexes={[4, 7]}
          blogs={blogs}
        />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleHome blog={blogs[Math.floor(Math.random() * blogs.length)]} />
        <ArticleShowcase blogs={blogs} indexes={[7, 11]} />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList
          category="Finanzas Personales"
          indexes={[11, 20]}
          blogs={blogs}
        />
      </div>
    </>
  );
};

export default page;
