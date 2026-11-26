import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Economía del País";
const DESCRIPTION =
  "Análisis, noticias y reportes sobre la economía colombiana: inflación, empleo, tasas de interés, crecimiento y decisiones del gobierno que impactan tus finanzas.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Infórmate sobre los cambios en la economía colombiana y cómo afectan tu bolsillo: inflación, empleo, tasas y más.",
  twitterDescription:
    "Entiende cómo la economía colombiana evoluciona y qué decisiones del gobierno o del Banco de la República pueden afectar tus finanzas.",
  keywords: [
    "economía de Colombia",
    "inflación",
    "empleo",
    "tasas de interés",
    "Banco de la República",
    "PIB",
    "crecimiento económico",
    "finanzas públicas",
    "mercado laboral",
    "política económica",
  ],
  path: "/economia-hoy/economia-del-pais",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Economía del pais");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="economia-del-pais"
      categoryLabel="Economía del pais"
      blogs={blogs}
      intro={
        <>
          Mantente informado sobre los{" "}
          <span className="font-bold">
            principales indicadores económicos de Colombia
          </span>{" "}
          y cómo las decisiones del gobierno, el Banco de la República y el
          contexto internacional afectan tu vida diaria.
          <br />
          <br />
          Aquí encontrarás análisis sobre{" "}
          <span className="font-bold">
            inflación, tasas de interés, empleo, PIB y políticas fiscales
          </span>
          , explicados de manera sencilla para que entiendas el panorama
          económico del país.
          <br />
          <br />
          También conocerás las{" "}
          <span className="font-bold">
            tendencias del mercado, precios del dólar, inversión extranjera y
            medidas económicas
          </span>{" "}
          que impactan a los ciudadanos y las empresas colombianas.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> inflación, PIB,
          tasas, empleo, política económica, Banco de la República y finanzas
          nacionales.
        </>
      }
    />
  );
}
