import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Deudas y Créditos";
const DESCRIPTION =
  "Aprende a manejar tus deudas y utilizar los créditos de forma responsable. Conoce estrategias para mejorar tu historial y salir de deudas sin perder tu estabilidad financiera.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Guías y estrategias para entender y manejar tus créditos de manera inteligente. Aprende a evitar el sobreendeudamiento y mejora tu historial financiero.",
  twitterDescription:
    "Consejos para salir de deudas, mejorar tu puntaje crediticio y usar el crédito de forma inteligente.",
  keywords: [
    "deudas",
    "créditos",
    "historial crediticio",
    "puntaje crediticio",
    "tarjetas de crédito",
    "préstamos",
    "endeudamiento",
    "finanzas personales",
    "cómo salir de deudas",
    "educación financiera",
  ],
  path: "/finanzas-personales/deudas-y-creditos",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Deudas y créditos");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="deudas-y-creditos"
      categoryLabel="Deudas y Créditos"
      blogs={blogs}
      intro={
        <>
          Entiende cómo funcionan las{" "}
          <span className="font-bold">deudas y los créditos</span> para tomar
          mejores decisiones financieras. Aprende a identificar cuándo
          endeudarte puede ser una herramienta útil y cuándo puede poner en
          riesgo tu estabilidad económica. Descubre cómo mejorar tu{" "}
          <span className="font-bold">historial crediticio</span>, reducir tasas
          de interés y evitar caer en el sobreendeudamiento.
          <br />
          <br />
          También encontrarás estrategias para consolidar tus deudas, pagar
          menos intereses y recuperar tu tranquilidad financiera paso a paso.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> manejo de
          créditos, puntaje crediticio, consolidación de deudas, préstamos,
          tarjetas de crédito y educación financiera.
        </>
      }
    />
  );
}
