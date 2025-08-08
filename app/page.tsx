import { Blog } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LatestNews from "./components/LatestNews/LatestNews";
import RecommendedTags from "./components/RecomendedTags/RecomendedTags";
import ArticleHome from "./components/ArticleHome/ArticleHome";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == "blog"] {
  _id,
    type,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  body,
  categories[]->{
    _id,
    title
  }
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: Blog[] = await getData();

  return (
    <div>
      <LatestNews />
      <div className="flex flex-col lg:flex-row py-10 gap-8">
        <ArticleHome />
        <RecommendedTags />
      </div>
      {/* {data.map((post, idx) => (
        <div className="w-full flex flex-col">
          <h2 className="text-lg line-clamp-2 text-tertiary font-agrandir font-bold">
            {post.title}
          </h2>
          <img
            src={urlFor(post.mainImage).url()}
            alt="image"
            height={500}
            className="rounded-lg object-cover w-full h-52"
          />

          <p className="line-clamp-4 text-sm mt-2 text-tertiary font-canva-sans">
            {post.excerpt}
          </p>
          <Button asChild className="w-full mt-7">
            <Link href={`/blog/${post.slug.current}`}>Read More</Link>
          </Button>
        </div>
      ))} */}
    </div>
  );
}
