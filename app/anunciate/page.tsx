import type { Metadata } from "next";
import AnunciateClient from "./AnunciateClient";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { MEDIA_KIT_PACKAGES } from "@/lib/anunciate";
import { PUBLISHER_ORG, SITE_URL } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Anúnciate en Monopolombiano | Media Kit y Patrocinios Fintech Colombia",
  description:
    "Patrocina calculadoras financieras, artículos SEO y comparadores de cuentas y tarjetas de crédito en Colombia. Conecta tu fintech o banco con audiencia de alta intención.",
  keywords: [
    "publicidad fintech Colombia",
    "media kit finanzas personales Colombia",
    "patrocinio blog financiero Colombia",
    "anunciarse en Monopolombiano",
    "afiliados tarjetas y bancos Colombia",
  ],
  alternates: {
    canonical: `${SITE_URL}/anunciate`,
  },
  openGraph: {
    title: "Anúnciate en Monopolombiano | Media Kit B2B Colombia",
    description:
      "Espacios patrocinados en calculadoras de rentabilidad, 4x1000, tarjetas de crédito y contenido educativo en Colombia.",
    url: `${SITE_URL}/anunciate`,
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 600,
        height: 600,
        alt: "Media Kit Monopolombiano Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anúnciate en Monopolombiano | Media Kit B2B Colombia",
    description:
      "Conecta tu fintech, neobanco o producto financiero con usuarios en Colombia en momento de decisión.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function AnunciatePage() {
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
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Anúnciate",
            item: `${SITE_URL}/anunciate`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Media Kit y Patrocinios B2B | Monopolombiano",
        url: `${SITE_URL}/anunciate`,
        inLanguage: "es-CO",
        publisher: PUBLISHER_ORG,
      },
      {
        "@type": "ItemList",
        name: "Formatos comerciales de Monopolombiano",
        itemListElement: MEDIA_KIT_PACKAGES.map((pkg, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Service",
            name: pkg.title,
            description: pkg.summary,
            url: `${SITE_URL}/anunciate#${pkg.id}`,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <AnunciateClient />
    </>
  );
}
