import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Cripto y Nuevas Tecnologías";
const DESCRIPTION =
  "Noticias, guías y análisis sobre criptomonedas, blockchain, inteligencia artificial, fintech y las tecnologías que están transformando el mundo financiero.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Explora cómo las criptomonedas, el blockchain y la inteligencia artificial están cambiando las finanzas modernas.",
  twitterDescription:
    "Aprende sobre blockchain, criptomonedas, IA y las nuevas tecnologías que transforman el mundo financiero.",
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
  path: "/economia-hoy/cripto-y-nuevas-tecnologias",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Cripto y nuevas tecnologías");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="cripto-y-nuevas-tecnologias"
      categoryLabel="Cripto y Nuevas Tecnologías"
      blogs={blogs}
      intro={
        <>
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
        </>
      }
    />
  );
}
