import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Regulaciones";
const DESCRIPTION =
  "Conoce las leyes, decretos y políticas financieras que regulan la economía colombiana. Entérate cómo las normas afectan a los bancos, inversionistas, fintech y consumidores.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Noticias y análisis sobre leyes, normas y políticas que afectan el sistema financiero colombiano.",
  twitterDescription:
    "Infórmate sobre las normas y regulaciones financieras en Colombia: bancos, impuestos, fintech, cripto y más.",
  keywords: [
    "regulaciones financieras",
    "leyes económicas",
    "Superintendencia Financiera",
    "normas bancarias",
    "política fiscal",
    "impuestos",
    "protección al consumidor financiero",
    "fintech Colombia",
    "regulación cripto",
    "mercado de valores",
  ],
  path: "/economia-hoy/regulaciones",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Regulaciones");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="regulaciones"
      categoryLabel="Regulaciones"
      blogs={blogs}
      intro={
        <>
          Entérate de las{" "}
          <span className="font-bold">
            regulaciones financieras y económicas
          </span>{" "}
          que impactan el día a día en Colombia. En esta sección analizamos las
          <span className="font-bold">
            {" "}
            leyes, decretos y políticas públicas
          </span>{" "}
          emitidas por entidades como la Superintendencia Financiera, el
          Ministerio de Hacienda y el Banco de la República.
          <br />
          <br />
          Conoce cómo afectan a los{" "}
          <span className="font-bold">
            bancos, inversionistas, fintech, empresas y consumidores
          </span>
          , y mantente actualizado sobre los cambios en tributación, mercado de
          valores y regulación cripto.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> leyes
          económicas, regulación financiera, impuestos, política fiscal,
          fintech, cripto y protección al consumidor.
        </>
      }
    />
  );
}
