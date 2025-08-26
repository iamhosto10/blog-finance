import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const category = await client.fetch(`*[_type == "category"]{
        _id,
        title,
        description,
        slug
      } | order(title asc)`);

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(
      { error: "Error cargando blogs" + err },
      { status: 500 }
    );
  }
}
