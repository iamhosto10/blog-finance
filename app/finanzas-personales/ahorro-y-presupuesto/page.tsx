import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Ahorro y Presupuesto";
const DESCRIPTION =
  "Aprende a planificar tus finanzas, crear un presupuesto efectivo y alcanzar tus metas de ahorro sin complicaciones.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Aprende a planificar tus finanzas, crear un presupuesto efectivo y alcanzar tus metas de ahorro sin complicaciones.",
  twitterDescription:
    "Consejos para ahorrar dinero, controlar tus gastos y organizar tu presupuesto personal o familiar.",
  keywords: [
    "ahorro",
    "presupuesto",
    "finanzas personales",
    "metas financieras",
    "gastos",
    "planificación financiera",
    "control de gastos",
    "finanzas del hogar",
    "educación financiera",
  ],
  path: "/finanzas-personales/ahorro-y-presupuesto",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Ahorro y presupuesto");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="ahorro-y-presupuesto"
      categoryLabel="Ahorro y Presupuesto"
      blogs={blogs}
      intro={
        <>
          Descubre cómo organizar tus finanzas personales creando un
          <span className="font-bold"> presupuesto inteligente </span> que te
          permita alcanzar tus metas de ahorro y mantener tus gastos bajo
          control. Aprende a distribuir tus ingresos, identificar gastos
          innecesarios y crear hábitos financieros sostenibles. También
          encontrarás estrategias para ahorrar en el hogar, planificar tus
          compras y construir un fondo de emergencia sólido.
          <br />
          <br />
          <span className="font-bold">Temas principales: </span> gestión del
          presupuesto, ahorro mensual, control de gastos, fondo de emergencia y
          metas financieras.
        </>
      }
    />
  );
}
