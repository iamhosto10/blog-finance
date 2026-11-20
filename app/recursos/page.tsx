import type { Metadata } from "next";
import RecursosClient from "./RecursosClient";
import { RECURSOS_CATALOG } from "@/lib/recursos";

export const metadata: Metadata = {
  title: "Recursos, Plantillas PRO y Asesoría Financiera",
  description:
    "Descarga plantillas maestras en Excel y Google Sheets para finanzas personales en Colombia, compra de vivienda VIS/No VIS y reserva tu diagnóstico financiero 1-a-1.",
  keywords: [
    "plantilla finanzas personales Colombia",
    "excel presupuesto Colombia",
    "plantilla compra vivienda VIS leasing",
    "diagnóstico financiero 1 a 1 Colombia",
    "herramientas Monopolombiano",
  ],
  alternates: {
    canonical: "https://monopolombiano.com/recursos",
  },
  openGraph: {
    title: "Recursos, Plantillas PRO y Asesoría Financiera | Monopolombiano",
    description:
      "Plantillas en Excel/Sheets adaptadas a Colombia (4x1000, UVR, cesantías, tasas EA) y diagnóstico financiero 1-a-1.",
    url: "https://monopolombiano.com/recursos",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Recursos y Plantillas PRO Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recursos, Plantillas PRO y Asesoría Financiera | Monopolombiano",
    description:
      "Plantillas financieras en Excel/Sheets para Colombia y diagnóstico 1-a-1.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};

export default function RecursosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://monopolombiano.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recursos",
            item: "https://monopolombiano.com/recursos",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Recursos y Plantillas PRO de Monopolombiano",
        itemListElement: RECURSOS_CATALOG.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": item.kind === "service" ? "Service" : "Product",
            name: item.title,
            description: item.description,
            url: `https://monopolombiano.com/recursos#${item.id}`,
            offers: {
              "@type": "Offer",
              price: item.priceCop,
              priceCurrency: "COP",
              availability: "https://schema.org/InStock",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecursosClient />
    </>
  );
}
