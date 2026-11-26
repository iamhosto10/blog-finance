import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Impuestos";
const DESCRIPTION =
  "Guías, noticias y análisis sobre impuestos en Colombia. Aprende sobre declaración de renta, IVA, impuestos empresariales y reformas tributarias.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Aprende todo sobre impuestos en Colombia: declaración de renta, IVA, reformas y cómo optimizar tu carga tributaria.",
  twitterDescription:
    "Todo lo que necesitas saber sobre impuestos en Colombia: declaración de renta, IVA, reformas y más.",
  keywords: [
    "impuestos Colombia",
    "declaración de renta",
    "reforma tributaria",
    "IVA",
    "impuestos empresariales",
    "DIAN",
    "tributación",
    "impuestos personales",
    "retención en la fuente",
    "finanzas fiscales",
  ],
  path: "/economia-hoy/impuestos",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Impuestos");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="impuestos"
      categoryLabel="Impuestos"
      blogs={blogs}
      intro={
        <>
          Mantente al día con todo lo relacionado con los{" "}
          <span className="font-bold">impuestos en Colombia</span>. En esta
          sección encontrarás guías prácticas, análisis y noticias sobre{" "}
          <span className="font-bold">
            declaración de renta, IVA, impuestos empresariales
          </span>{" "}
          y las últimas <span className="font-bold">reformas tributarias</span>.
          <br />
          <br />
          Aprende cómo cumplir con tus obligaciones fiscales, evitar sanciones y
          aprovechar beneficios legales que te ayuden a{" "}
          <span className="font-bold">optimizar tu carga tributaria</span>,
          tanto si eres persona natural como empresa.
          <br />
          <br />
          También analizamos las medidas del gobierno, la DIAN y el impacto de
          los impuestos en la economía y las finanzas personales.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> declaración de
          renta, IVA, retención en la fuente, impuestos empresariales, reformas
          tributarias y finanzas fiscales.
        </>
      }
    />
  );
}
