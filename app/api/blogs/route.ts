import { client } from "@/app/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await client.fetch(`*[_type == "blog"]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt,
      body,
      categories[]->{ _id, title, slug }
    } | order(publishedAt desc)`);

    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json(
      { error: "Error cargando blogs" },
      { status: 500 }
    );
  }
}
