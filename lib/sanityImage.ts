import imageUrlBuilder from "@sanity/image-url";

// Builder de URLs de imagen sin el cliente de Sanity: se usa desde componentes
// de cliente y no arrastra next-sanity al bundle del navegador.
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: "production",
});

type ImageSource = Parameters<typeof builder.image>[0];

// Acepta undefined como hacía la versión en JS (lib/sanity.jsx).
export function urlFor(source: ImageSource | undefined) {
  return builder.image(source as ImageSource);
}
