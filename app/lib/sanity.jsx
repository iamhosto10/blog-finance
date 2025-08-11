import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2025-07-30",
  dataset: "production",
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
