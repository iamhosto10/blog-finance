// app/page.tsx

import { client } from "@/app/lib/sanity";
import { SanityState } from "@/store/slices/sanitySlice";
import Home from "./components/Home/Home";

export const revalidate = 60; // cachea por 60 segundos

export default async function Page() {
  const [blogs, categories, dolar] = await Promise.all([
    client.fetch(
      `*[_type == "blog"]{
        _id,
        title,
        focusTitle,
        continueTitle,
        slug,
        publishedAt,
        mainImage,
        miniatureImage,
        excerpt,
        body,
        categories[]->{ _id, title, slug }
      } | order(publishedAt desc)`,
      {},
      { cache: "force-cache" }
    ),
    client.fetch(
      `*[_type == "category"]{ _id, title, slug }`,
      {},
      { cache: "force-cache" }
    ),
    client.fetch(
      `*[_type == "dolar"] | order(fecha desc)[0]`,
      {},
      { cache: "force-cache" }
    ),
  ]);

  const preloadedState: SanityState = {
    blogs,
    categories,
    dolar,
    loading: false,
    error: null,
  };

  return <Home preloadedState={preloadedState} />;
}
