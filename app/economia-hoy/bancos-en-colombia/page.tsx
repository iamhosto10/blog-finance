import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Bancos en Colombia";
const DESCRIPTION =
  "Descubre todo sobre los bancos en Colombia: comparativas, productos financieros, tasas, servicios digitales y consejos para elegir el mejor banco para ti.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Compara los principales bancos en Colombia, conoce sus productos, tasas y beneficios, y aprende cómo elegir la mejor opción para tus finanzas.",
  twitterDescription:
    "Todo lo que necesitas saber sobre los bancos en Colombia: tasas, servicios, productos y recomendaciones.",
  keywords: [
    "bancos en Colombia",
    "cuentas de ahorro",
    "tarjetas de crédito",
    "créditos bancarios",
    "tasas de interés",
    "banca digital",
    "transferencias",
    "neobancos",
    "fintech Colombia",
    "educación financiera",
  ],
  path: "/economia-hoy/bancos-en-colombia",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Bancos en Colombia");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="economia-hoy"
      subcategorySlug="bancos-en-colombia"
      categoryLabel="Bancos en Colombia"
      blogs={blogs}
      intro={
        <>
          En esta sección encontrarás información actualizada sobre los{" "}
          <span className="font-bold">bancos en Colombia</span>, sus productos
          financieros y las mejores opciones para tus necesidades. Comparamos
          <span className="font-bold">
            {" "}
            cuentas de ahorro, tarjetas, créditos e inversiones
          </span>{" "}
          de las principales entidades bancarias y plataformas digitales del
          país.
          <br />
          <br />
          Aprende cómo funcionan los{" "}
          <span className="font-bold">neobancos y las fintech</span>, qué banco
          ofrece mejores tasas y beneficios, y cómo aprovechar la{" "}
          <span className="font-bold">banca digital</span> para administrar tu
          dinero con mayor comodidad y seguridad.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> bancos
          tradicionales, fintech, neobancos, tasas de interés, productos
          financieros, cuentas y servicios digitales.
        </>
      }
    />
  );
}
