import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

// util: map de tipos MIME a extensiones por si hace falta
const mimeToExt: Record<string, string> = {
  "application/pdf": "pdf",
  "text/csv": "csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "doc",
  "application/zip": "zip",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  // agrega más si necesitas
};

function sanitizeFilename(name: string) {
  // quitar saltos, barras y caracteres peligrosos, limitar longitud
  let s = name.replace(/[\r\n"]/g, "").replace(/[\/\\]/g, "-");
  s = s.replace(/\s+/g, " ").trim();
  if (s.length > 120) s = s.slice(0, 120);
  return s;
}

function getExtensionFromFilename(fname?: string) {
  if (!fname) return null;
  const m = fname.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);
  return m ? m[1].toLowerCase() : null;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  // 1) Obtener metadata del archivo
  const data = await client.fetch(
    `*[_type == "archivo" && slug.current == $slug][0]{
        _id,
        title,
        downloadCount,
        attachment {
          asset->
        }
      }`,
    { slug }
  );

  if (!data) return new NextResponse("Archivo no encontrado", { status: 404 });
  console.log("data archivo:", data);

  const asset = data.attachment?.asset;
  if (!asset || !asset.url)
    return new NextResponse("Archivo no encontrado", { status: 404 });

  const originalFilename: string | undefined = asset.originalFilename; // nombre tal cual se subió
  const fileUrl = asset.url;

  // 2) Fetch del recurso (stream)
  const remoteResp = await fetch(fileUrl);
  if (!remoteResp.ok)
    return new NextResponse("Error al obtener archivo", { status: 502 });

  const contentType =
    remoteResp.headers.get("content-type") || "application/octet-stream";

  // 3) Construir filename definitivo
  const rawTitle = (data.title || " ").trim();
  const titleHasExt = !!getExtensionFromFilename(rawTitle);
  const originalExt = getExtensionFromFilename(originalFilename);
  const extFromMime = mimeToExt[contentType.split(";")[0]] || null;

  let finalName = rawTitle || `download`;

  // si el title existe pero no tiene extensión y tenemos una extensión original, añádela
  if (rawTitle && !titleHasExt) {
    const extToAdd = originalExt || extFromMime;
    if (extToAdd) finalName = `${rawTitle}.${extToAdd}`;
    else finalName = rawTitle; // sin ext si no se puede deducir
  }

  // si no hay title pero sí originalFilename, úsalo (ya contiene extensión)
  if (!rawTitle && originalFilename) {
    finalName = originalFilename;
  }

  // Asegurar que tenga extensión: si aún no tiene, intentar añadir extFromMime
  if (!getExtensionFromFilename(finalName) && extFromMime) {
    finalName = `${finalName}.${extFromMime}`;
  }

  finalName = sanitizeFilename(finalName);

  // 4) Incrementar contador (no bloquear la respuesta)
  client
    .patch(data._id)
    .set({ downloadCount: (data.downloadCount || 0) + 1 })
    .commit()
    .catch(() => console.log("Error actualizando contador"));

  // 5) Preparar headers Content-Disposition con fallback y UTF-8 (filename*)
  const fallback = finalName.replace(/[^ -~]/g, "_"); // fallback ASCII simple
  const encoded = encodeURIComponent(finalName);

  const contentDisposition = `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;

  return new NextResponse(remoteResp.body as ReadableStream<Uint8Array>, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
