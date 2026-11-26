import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Manejo de Dinero en el Extranjero";
const DESCRIPTION =
  "Aprende cómo administrar tu dinero en el extranjero: cuentas internacionales, remesas, cambio de divisas, y consejos para evitar comisiones altas.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Guías y consejos para administrar tu dinero mientras vives, estudias o viajas fuera del país. Aprende sobre remesas, cambio de divisas y bancos internacionales.",
  twitterDescription:
    "Descubre cómo manejar tus finanzas en el exterior: transferencias, divisas, remesas y más.",
  keywords: [
    "manejo de dinero en el extranjero",
    "remesas",
    "cambio de divisas",
    "cuentas internacionales",
    "transferencias internacionales",
    "tarjetas en el exterior",
    "finanzas para viajeros",
    "dinero en el exterior",
    "bancos internacionales",
    "pagos globales",
  ],
  path: "/tips-financieros/manejo-de-dinero-en-el-extranjero",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Manejo del dinero en el extranjero");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="manejo-de-dinero-en-el-extranjero"
      categoryLabel="Manejo de Dinero en el Extranjero"
      blogs={blogs}
      intro={
        <>
          Si vives, trabajas o estudias fuera del país, el{" "}
          <span className="font-bold">manejo de dinero en el extranjero</span>{" "}
          es clave para mantener tus finanzas en orden. En esta sección
          aprenderás cómo{" "}
          <span className="font-bold">
            enviar y recibir dinero, abrir cuentas internacionales, manejar
            divisas y evitar comisiones excesivas
          </span>{" "}
          al usar bancos o plataformas digitales globales.
          <br />
          <br />
          También encontrarás{" "}
          <span className="font-bold">
            consejos sobre tarjetas internacionales, remesas, ahorro en otra
            moneda, impuestos y transferencias seguras
          </span>{" "}
          desde y hacia Colombia.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> remesas,
          transferencias, divisas, bancos internacionales, tarjetas globales,
          ahorro en el exterior y finanzas para expatriados.
        </>
      }
    />
  );
}
