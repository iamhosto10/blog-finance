import { client } from "@/app/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dolar = await client.fetch(
      `*[_type == "dolar"] | order(fecha desc)[0]`
    );
    return NextResponse.json(dolar);
  } catch (err) {
    return NextResponse.json(
      { error: "Error cargando blogs" },
      { status: 500 }
    );
  }
}
