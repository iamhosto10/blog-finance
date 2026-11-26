import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Historial Crediticio";
const DESCRIPTION =
  "Aprende cómo funciona tu historial crediticio, cómo mejorarlo y cómo influye en tus préstamos, tarjetas y oportunidades financieras.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Guías y consejos para entender, cuidar y mejorar tu puntaje crediticio. Aprende cómo tu historial influye en tus oportunidades financieras.",
  twitterDescription:
    "Descubre cómo construir un buen historial crediticio y aumentar tu puntaje para acceder a mejores oportunidades financieras.",
  keywords: [
    "historial crediticio",
    "puntaje crediticio",
    "centrales de riesgo",
    "reportes de crédito",
    "datacrédito",
    "mejorar score",
    "vida crediticia",
    "créditos personales",
    "endeudamiento",
    "finanzas personales",
  ],
  path: "/tips-financieros/historial-crediticio",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Historial crediticio");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="historial-crediticio"
      categoryLabel="Historial Crediticio"
      blogs={blogs}
      intro={
        <>
          Tu <span className="font-bold">historial crediticio</span> es uno de
          los factores más importantes para acceder a{" "}
          <span className="font-bold">
            préstamos, tarjetas de crédito y oportunidades financieras
          </span>
          . En esta sección aprenderás{" "}
          <span className="font-bold">
            cómo se calcula tu puntaje, cómo interpretarlo y qué hábitos te
            ayudan a mantenerlo saludable.
          </span>
          <br />
          <br />
          Descubre cómo{" "}
          <span className="font-bold">
            Datacrédito, TransUnion y otras centrales de riesgo
          </span>{" "}
          manejan tu información, cómo corregir errores en tu reporte y
          estrategias para{" "}
          <span className="font-bold">
            mejorar tu score y construir una buena reputación financiera
          </span>
          .
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> puntaje
          crediticio, reportes de crédito, centrales de riesgo, score
          financiero, endeudamiento responsable y acceso al crédito.
        </>
      }
    />
  );
}
