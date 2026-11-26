import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Compras y Ahorro Diario";
const DESCRIPTION =
  "Aprende a optimizar tus gastos y a comprar de forma inteligente. Descubre estrategias para ahorrar en tus compras diarias y mejorar tus finanzas personales.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Consejos prácticos para ahorrar en tus compras del día a día. Aprende a gastar menos y aprovechar mejor tu dinero.",
  twitterDescription:
    "Aprende a ahorrar todos los días con estrategias simples para tus compras y gastos del hogar.",
  keywords: [
    "ahorro diario",
    "compras inteligentes",
    "finanzas personales",
    "descuentos",
    "cupones",
    "promociones",
    "supermercado",
    "presupuesto familiar",
    "consumo responsable",
    "ahorro en el hogar",
  ],
  path: "/tips-financieros/compras-y-ahorro-diario",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Compras y ahorro diario");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="compras-y-ahorro-diario"
      categoryLabel="Compras y Ahorro Diario"
      blogs={blogs}
      intro={
        <>
          Aprende a{" "}
          <span className="font-bold">
            ahorrar dinero en tus compras del día a día
          </span>{" "}
          sin sacrificar calidad ni comodidad. En esta sección encontrarás{" "}
          <span className="font-bold">
            consejos prácticos sobre consumo responsable, planificación de
            compras, comparación de precios y uso de descuentos o cupones
          </span>
          .
          <br />
          <br />
          Descubre cómo{" "}
          <span className="font-bold">optimizar tu presupuesto familiar</span>,
          aprovechar promociones en supermercados y tiendas, y reducir gastos
          innecesarios para alcanzar tus metas financieras.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> ahorro diario,
          compras inteligentes, presupuesto, promociones, consumo responsable y
          finanzas del hogar.
        </>
      }
    />
  );
}
