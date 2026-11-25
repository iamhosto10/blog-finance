import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Comprar Vivienda";
const DESCRIPTION =
  "Todo lo que necesitas saber para comprar vivienda en Colombia: créditos, subsidios, cuotas iniciales y consejos para tomar la mejor decisión financiera.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Guías, consejos y herramientas para comprar vivienda en Colombia. Aprende sobre créditos, subsidios y estrategias para cumplir tu sueño de tener casa propia.",
  twitterDescription:
    "Aprende a comprar vivienda en Colombia paso a paso: créditos, subsidios y planificación financiera para lograrlo.",
  keywords: [
    "comprar vivienda",
    "crédito hipotecario",
    "subsidios vivienda",
    "cuota inicial",
    "vivienda nueva",
    "leasing habitacional",
    "inversión inmobiliaria",
    "finanzas personales",
    "vivienda en Colombia",
    "educación financiera",
  ],
  path: "/finanzas-personales/comprar-vivienda",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Comprar Vivienda");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="finanzas-personales"
      subcategorySlug="comprar-vivienda"
      categoryLabel="Comprar Vivienda"
      blogs={blogs}
      intro={
        <>
          Si estás pensando en{" "}
          <span className="font-bold">comprar vivienda</span>, aquí encontrarás
          toda la información que necesitas para hacerlo con seguridad y buena
          planificación. Aprende a elegir entre{" "}
          <span className="font-bold">vivienda nueva o usada</span>, cómo
          solicitar un crédito hipotecario, aprovechar{" "}
          <span className="font-bold">subsidios del gobierno</span> y calcular
          tu cuota inicial.
          <br />
          <br />
          Te enseñamos paso a paso cómo organizar tus finanzas, comparar
          opciones de financiamiento y tomar decisiones informadas para lograr
          el sueño de tener casa propia sin poner en riesgo tu estabilidad
          económica.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> créditos
          hipotecarios, subsidios, ahorro para vivienda, leasing habitacional,
          inversión inmobiliaria y planificación financiera.
        </>
      }
    />
  );
}
