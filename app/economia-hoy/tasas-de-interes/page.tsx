import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Tasas de Interés";
const DESCRIPTION =
  "Entérate de las últimas decisiones sobre tasas de interés en Colombia y cómo impactan tus créditos, inversiones y ahorros. Análisis del Banco de la República y tendencias económicas.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Conoce cómo las tasas de interés del Banco de la República afectan tu dinero, los créditos, los ahorros y la inversión en Colombia.",
  twitterDescription:
    "Aprende cómo las tasas de interés impactan tus finanzas personales, tus créditos y tus inversiones en Colombia.",
  keywords: [
    "tasas de interés",
    "Banco de la República",
    "créditos",
    "ahorro",
    "inversión",
    "inflación",
    "economía colombiana",
    "política monetaria",
    "rendimientos",
    "deuda",
  ],
  path: "/economia-hoy/tasas-de-interes",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Tasas de interes");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="tasas-de-interes"
      categoryLabel="tasas de interes"
      blogs={blogs}
      intro={
        <>
          Mantente informado sobre las{" "}
          <span className="font-bold">tasas de interés</span> y su impacto en la
          economía colombiana. Aquí analizamos las decisiones del{" "}
          <span className="font-bold">Banco de la República</span> y cómo
          influyen en el costo de los créditos, los rendimientos del ahorro y
          las oportunidades de inversión.
          <br />
          <br />
          Descubre cómo las variaciones en la tasa de política monetaria afectan
          el consumo, la inflación y el acceso al financiamiento. También
          encontrarás consejos para aprovechar los cambios de tasa a tu favor en
          tus <span className="font-bold">deudas e inversiones</span>.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> Banco de la
          República, inflación, créditos, ahorro, política monetaria, inversión
          y economía colombiana.
        </>
      }
    />
  );
}
