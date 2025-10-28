import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cripto y Nuevas Tecnologías | Monopolombiano",
  description:
    "Noticias, guías y análisis sobre criptomonedas, blockchain, inteligencia artificial, fintech y las tecnologías que están transformando el mundo financiero.",
  keywords: [
    "criptomonedas",
    "blockchain",
    "bitcoin",
    "ethereum",
    "web3",
    "fintech",
    "tecnología financiera",
    "IA en finanzas",
    "nuevas tecnologías",
    "criptoactivos",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Cripto y Nuevas Tecnologías",
    description:
      "Explora cómo las criptomonedas, el blockchain y la inteligencia artificial están cambiando las finanzas modernas.",
    url: "https://www.monopolombiano.com/cripto-y-nuevas-tecnologias",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://www.monopolombiano.com/images/cripto.jpg",
        width: 1200,
        height: 630,
        alt: "Cripto y Nuevas Tecnologías",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cripto y Nuevas Tecnologías",
    description:
      "Aprende sobre blockchain, criptomonedas, IA y las nuevas tecnologías que transforman el mundo financiero.",
    images: ["https://www.monopolombiano.com/images/cripto.jpg"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Cripto y Nuevas Tecnologías
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Explora cómo la{" "}
          <span className="font-bold">
            tecnología está revolucionando las finanzas
          </span>
          . En esta sección encontrarás artículos sobre{" "}
          <span className="font-bold">
            criptomonedas, blockchain, fintech, inteligencia artificial
          </span>{" "}
          y las últimas tendencias digitales que están transformando la economía
          global.
          <br />
          <br />
          Aprende sobre el funcionamiento de{" "}
          <span className="font-bold">Bitcoin, Ethereum y Web3</span>, conoce
          cómo la IA está cambiando la forma de invertir, y descubre las nuevas
          herramientas financieras que están definiendo el futuro del dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> criptomonedas,
          blockchain, IA, fintech, innovación financiera, Web3 y activos
          digitales.
        </p>

        <ArticleShowcase
          category="Cripto y Nuevas Tecnologías"
          indexes={[0, 4]}
        />
        <ArticleList category="Cripto y Nuevas Tecnologías" indexes={[4, 7]} />
        <ArticleHome category="Cripto y Nuevas Tecnologías" />
        <ArticleShowcase
          category="Cripto y Nuevas Tecnologías"
          indexes={[7, 11]}
        />
        <ArticleList
          category="Cripto y Nuevas Tecnologías"
          indexes={[11, 20]}
        />
      </div>
    </>
  );
};

export default page;
