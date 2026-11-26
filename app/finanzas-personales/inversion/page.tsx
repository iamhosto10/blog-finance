import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Inversión";
const DESCRIPTION =
  "Aprende a invertir tu dinero de forma segura e inteligente. Conoce los mejores instrumentos para hacer crecer tu patrimonio.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Aprende a invertir tu dinero de forma segura e inteligente. Conoce los mejores instrumentos para hacer crecer tu patrimonio.",
  twitterDescription:
    "Descubre cómo invertir tu dinero paso a paso: desde fondos y acciones hasta proyectos inmobiliarios y más.",
  keywords: [
    "inversión",
    "rentabilidad",
    "finanzas personales",
    "acciones",
    "fondos de inversión",
    "plazo fijo",
    "portafolio",
    "riesgo financiero",
    "inversiones en Colombia",
    "educación financiera",
  ],
  path: "/finanzas-personales/inversion",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Inversión");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="inversion"
      categoryLabel="Inversión"
      blogs={blogs}
      intro={
        <>
          Aprende a hacer que tu dinero trabaje por ti. En esta sección
          encontrarás estrategias y consejos sobre cómo invertir de manera
          inteligente según tu perfil financiero y tus objetivos. Conoce las
          diferencias entre las{" "}
          <span className="font-bold">inversiones de bajo y alto riesgo</span>,
          cómo diversificar tu portafolio, y qué opciones existen en Colombia
          para comenzar a invertir sin ser un experto.
          <br />
          <br />
          Desde <span className="font-bold">acciones y fondos</span> hasta{" "}
          <span className="font-bold">inversiones inmobiliarias</span> y
          alternativas digitales, aquí descubrirás cómo construir un patrimonio
          sólido paso a paso.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> rentabilidad,
          diversificación, riesgo, portafolios, inversiones inmobiliarias y
          educación financiera.
        </>
      }
    />
  );
}
