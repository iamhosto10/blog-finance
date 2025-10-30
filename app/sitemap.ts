/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { blogsQuery, categoriesQuery } from "@/lib/queries";
import { client } from "@/lib/sanity";
import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL || "https://tusitio.com";

const structure = {
  "economia-hoy": [
    "bancos-en-colombia",
    "cripto-y-nuevas-tecnologias",
    "economia-del-pais",
    "impuestos",
    "regulaciones",
    "tasas-de-interes",
  ],
  "finanzas-personales": [
    "ahorro-y-presupuesto",
    "comprar-vivienda",
    "deudas-y-creditos",
    "educacion-financiera",
    "finanzas-en-pareja",
    "inversion",
  ],
  "tips-financieros": [
    "apps-y-herramientas-utiles",
    "cajeros-y-bancos",
    "compras-y-ahorro-diario",
    "historial-crediticio",
    "manejo-de-dinero-en-el-extranjero",
    "seguridad-financiera",
  ],
  calculadoras: [
    "4x1000",
    "bold",
    "calculadora-de-ahorro",
    "calculadora-de-credito",
    "calculadora-de-rentabilidad",
    "comparador-de-tarjetas",
    "conversor-dolares",
    "global66",
    "lulo",
    "nu",
    "pibank",
    "popular",
    "rappi",
    "simulador-de-leasing-y-vivienda",
  ],
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // 🔹 1. Páginas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 🔹 2. Categorías principales
  const categoryRoutes = Object.keys(structure).map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 🔹 3. Subcategorías
  const subcategoryRoutes = Object.entries(structure).flatMap(
    ([parent, subs]) =>
      subs.map((sub) => ({
        url: `${baseUrl}/${parent}/${sub}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }))
  );

  // 🔹 4. Artículos desde Sanity
  const [blogs, categories] = await Promise.all([
    client.fetch(blogsQuery),
    client.fetch(categoriesQuery),
  ]);

  const blogRoutes = blogs.map((post: any) => {
    const categorySlug = post.categories?.[0]?.slug?.current || "economia-hoy";

    return {
      url: `${baseUrl}/${categorySlug}/${post.slug.current}`,
      lastModified: new Date(post.publishedAt).toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  // 🔹 5. Combinar y devolver
  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...blogRoutes,
  ];
}
