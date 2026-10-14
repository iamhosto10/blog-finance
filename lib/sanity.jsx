// Se importa de @sanity/client y no de "next-sanity": la raíz de next-sanity
// re-exporta componentes de cliente (Live, VisualEditing) que Next terminaba
// metiendo en el JavaScript del navegador de cada página (~55 KB gzip).
import { createClient } from "@sanity/client";

export const client = createClient({
  apiVersion: "2025-07-30",
  dataset: "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export { urlFor } from "./sanityImage";
