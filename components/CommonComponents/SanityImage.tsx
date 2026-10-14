"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { urlFor } from "@/lib/sanityImage";

type SanitySource = Parameters<typeof urlFor>[0];

// El CDN de Sanity redimensiona y convierte a WebP/AVIF por URL, así que
// next/image solo genera el srcset y no consume cuota de optimización de Vercel.
function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}

type SanityImageProps = Omit<ImageProps, "src" | "loader"> & {
  image: SanitySource;
};

export default function SanityImage({ image, alt, ...props }: SanityImageProps) {
  if (!image) return null;
  return (
    <Image
      src={urlFor(image).url()}
      loader={sanityLoader}
      alt={alt}
      {...props}
    />
  );
}
