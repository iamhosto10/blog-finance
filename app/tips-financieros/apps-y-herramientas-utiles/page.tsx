import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Apps y Herramientas Útiles";
const DESCRIPTION =
  "Descubre las mejores aplicaciones y herramientas digitales para manejar tus finanzas, ahorrar, invertir y organizar tu dinero fácilmente.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Las mejores apps y herramientas digitales para tus finanzas personales. Controla tus gastos, ahorra y administra tu dinero de forma inteligente.",
  twitterDescription:
    "Explora las mejores aplicaciones y plataformas digitales para mejorar tu organización y salud financiera.",
  keywords: [
    "apps financieras",
    "herramientas de finanzas personales",
    "control de gastos",
    "aplicaciones para ahorrar",
    "gestión del dinero",
    "fintech",
    "apps de inversión",
    "presupuesto",
    "billeteras digitales",
    "organización financiera",
  ],
  path: "/tips-financieros/apps-y-herramientas-utiles",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Apps y Herramientas Útiles");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="apps-y-herramientas-utiles"
      categoryLabel="Apps y Herramientas Útiles"
      blogs={blogs}
      intro={
        <>
          Mantén el control de tus finanzas con las{" "}
          <span className="font-bold">
            mejores aplicaciones y herramientas digitales
          </span>{" "}
          disponibles hoy. Descubre plataformas para{" "}
          <span className="font-bold">
            gestionar tus gastos, hacer presupuestos, invertir, ahorrar e
            incluso aprender sobre finanzas personales
          </span>{" "}
          desde tu celular o computador.
          <br />
          <br />
          Aquí encontrarás{" "}
          <span className="font-bold">
            recomendaciones, guías y comparativas
          </span>{" "}
          sobre apps fintech, billeteras digitales, calculadoras financieras,
          simuladores y extensiones útiles para administrar tu dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> apps
          financieras, control de gastos, fintech, ahorro, inversión y
          herramientas digitales.
        </>
      }
    />
  );
}
