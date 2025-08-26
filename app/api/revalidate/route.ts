import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  // Para seguridad: validamos que el secret coincida
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    // Si quieres revalidar TODO el sitio:
    revalidatePath("/");
    revalidateTag("global-data");

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" + err },
      { status: 500 }
    );
  }
}
