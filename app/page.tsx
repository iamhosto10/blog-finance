import { Card, CardContent } from "@/components/ui/card";
import { Blog } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug.current}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
