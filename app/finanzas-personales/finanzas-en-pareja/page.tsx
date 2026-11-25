import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Finanzas en Pareja";
const DESCRIPTION =
  "Aprende a manejar el dinero en pareja con comunicación, organización y metas compartidas. Guías prácticas para mejorar tu vida financiera en conjunto.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Consejos para manejar el dinero en pareja, crear un presupuesto común y alcanzar metas financieras juntos.",
  twitterDescription:
    "Aprende a manejar las finanzas en pareja sin estrés: presupuesto, ahorro y comunicación efectiva.",
  keywords: [
    "finanzas en pareja",
    "dinero en pareja",
    "presupuesto compartido",
    "cuentas conjuntas",
    "ahorro en pareja",
    "metas financieras",
    "conflictos financieros",
    "educación financiera",
    "relaciones y dinero",
    "finanzas personales",
  ],
  path: "/finanzas-personales/finanzas-en-pareja",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Finanzas en Pareja");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="finanzas-en-pareja"
      categoryLabel="Finanzas en Pareja"
      blogs={blogs}
      intro={
        <>
          El dinero puede ser una de las principales causas de conflicto en una
          relación, pero también una oportunidad para{" "}
          <span className="font-bold">crecer juntos financieramente</span>. En
          esta sección encontrarás estrategias para crear un{" "}
          <span className="font-bold">presupuesto compartido</span>, decidir
          cómo dividir gastos, ahorrar para metas comunes y mantener una
          comunicación clara sobre el dinero.
          <br />
          <br />
          Aprende a usar las finanzas como una herramienta para fortalecer tu
          relación, construir proyectos de vida en conjunto y alcanzar objetivos
          como comprar vivienda, viajar o invertir juntos.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> presupuesto en
          pareja, ahorro compartido, comunicación financiera, metas comunes y
          planificación del futuro juntos.
        </>
      }
    />
  );
}
