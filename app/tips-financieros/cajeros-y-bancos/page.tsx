import React from "react";
import type { Metadata } from "next";
import SubcategoryPageView from "@/components/CategoryHub/SubcategoryPageView";
import { getBlogsByCategory } from "@/lib/queries";
import { buildSubcategoryMetadata } from "@/lib/structuredData";

const TITLE = "Cajeros y Bancos";
const DESCRIPTION =
  "Encuentra información útil sobre cajeros automáticos, servicios bancarios, comisiones, transferencias y tecnología financiera en Colombia.";

export const metadata: Metadata = buildSubcategoryMetadata({
  title: TITLE,
  description: DESCRIPTION,
  openGraphDescription:
    "Guías y comparativas sobre bancos y cajeros automáticos en Colombia. Descubre las mejores opciones para tus finanzas diarias.",
  twitterDescription:
    "Aprende sobre cajeros automáticos, servicios bancarios, comisiones y banca digital en Colombia.",
  keywords: [
    "cajeros automáticos",
    "bancos en Colombia",
    "retiros",
    "comisiones bancarias",
    "transferencias",
    "tarjetas débito",
    "cuentas de ahorro",
    "banca digital",
    "fintech",
    "servicios financieros",
  ],
  path: "/tips-financieros/cajeros-y-bancos",
});

export default async function Page() {
  const blogs = await getBlogsByCategory("Cajeros y Bancos");

  return (
    <SubcategoryPageView
      title={TITLE}
      description={DESCRIPTION}
      sectionPath="tips-financieros"
      subcategorySlug="cajeros-y-bancos"
      categoryLabel="Cajeros y Bancos"
      blogs={blogs}
      intro={
        <>
          Descubre todo lo que necesitas saber sobre los{" "}
          <span className="font-bold">
            cajeros automáticos y servicios bancarios en Colombia
          </span>
          . Aquí encontrarás información sobre{" "}
          <span className="font-bold">
            retiros, transferencias, comisiones, horarios y tecnología bancaria
          </span>{" "}
          para manejar tu dinero con facilidad y seguridad.
          <br />
          <br />
          Aprende cómo elegir el{" "}
          <span className="font-bold">banco o red de cajeros</span> que más te
          conviene, cómo evitar cobros innecesarios y cómo usar las{" "}
          <span className="font-bold">plataformas digitales y fintech</span> que
          facilitan tus transacciones diarias.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> cajeros
          automáticos, bancos, comisiones, transferencias, banca digital,
          fintech y servicios financieros.
        </>
      }
    />
  );
}
