import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Seguridad Financiera";
const DESCRIPTION =
  "Aprende a proteger tus finanzas personales, evitar fraudes y construir una base económica sólida para el futuro.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Consejos prácticos para cuidar tu dinero, prevenir fraudes y lograr estabilidad económica.",
  twitterDescription:
    "Protege tus finanzas personales y evita fraudes con estrategias sencillas y efectivas.",
  keywords: [
    "seguridad financiera",
    "fraudes bancarios",
    "protección del dinero",
    "emergencias económicas",
    "seguros",
    "ciberseguridad financiera",
    "finanzas personales",
    "estabilidad económica",
    "riesgos financieros",
    "plan de ahorro",
  ],
  path: "/tips-financieros/seguridad-financiera",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Seguridad Financiera");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="seguridad-financiera"
      categoryLabel="Seguridad Financiera"
      blogs={blogs}
      intro={
        <>
          La <span className="font-bold">seguridad financiera</span> consiste en
          proteger tus ingresos, ahorros e inversiones ante imprevistos, fraudes
          o crisis económicas. En esta sección encontrarás{" "}
          <span className="font-bold">
            estrategias para cuidar tu dinero, evitar estafas financieras,
            fortalecer tu fondo de emergencia y asegurar tu futuro económico.
          </span>
          <br />
          <br />
          También aprenderás sobre{" "}
          <span className="font-bold">
            seguros, planes de contingencia, ciberseguridad y educación
            financiera preventiva
          </span>{" "}
          que te ayudarán a mantener estabilidad y tranquilidad a largo plazo.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> prevención de
          fraudes, ahorro de emergencia, seguros, protección del dinero,
          estabilidad financiera y gestión de riesgos.
        </>
      }
    />
  );
}
