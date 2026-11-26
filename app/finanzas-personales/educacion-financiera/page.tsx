import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Educación Financiera";
const DESCRIPTION =
  "Aprende los fundamentos de la educación financiera: cómo manejar tu dinero, ahorrar, invertir y tomar decisiones económicas inteligentes.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Domina los conceptos esenciales del dinero: ahorro, inversión, presupuesto y toma de decisiones financieras conscientes.",
  twitterDescription:
    "Aprende a tomar mejores decisiones con tu dinero y desarrolla hábitos financieros sólidos para toda la vida.",
  keywords: [
    "educación financiera",
    "finanzas personales",
    "ahorro",
    "inversión",
    "presupuesto",
    "deudas",
    "planificación financiera",
    "finanzas básicas",
    "economía personal",
    "alfabetización financiera",
  ],
  path: "/finanzas-personales/educacion-financiera",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Educación financiera");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="educacion-financiera"
      categoryLabel="Educación Financiera"
      blogs={blogs}
      intro={
        <>
          La <span className="font-bold">educación financiera</span> es la base
          para lograr estabilidad económica y tomar decisiones inteligentes con
          tu dinero. Aquí encontrarás conceptos clave explicados de forma
          simple: cómo presupuestar, ahorrar, invertir y evitar errores comunes
          que afectan tus finanzas personales.
          <br />
          <br />
          Desarrolla hábitos financieros saludables, entiende cómo funcionan los
          productos financieros y aprende a planificar tu futuro económico paso
          a paso. No importa tu edad o nivel de conocimiento: siempre es buen
          momento para empezar a construir una relación más consciente con tu
          dinero.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> ahorro,
          inversión, presupuesto, manejo de deudas, planificación financiera y
          hábitos económicos saludables.
        </>
      }
    />
  );
}
