import { client } from "@/lib/sanity";
import { getLeadMagnetBySlug } from "@/lib/leadMagnets";
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
};

function sanitizeFilename(name: string) {
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

function buildContentDisposition(filename: string) {
  const safeName = sanitizeFilename(filename);
  const fallback = safeName.replace(/[^ -~]/g, "_");
  const encoded = encodeURIComponent(safeName);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  // 1) Intentar primero desde Sanity (`archivo`) cuando exista proyecto configurado
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch(
        `*[_type == "archivo" && slug.current == $slug][0]{
          _id,
          title,
          downloadCount,
          attachment {
            asset->
          }
        }`,
        { slug },
      );

      const asset = data?.attachment?.asset;
      if (data && asset?.url) {
        const remoteResp = await fetch(asset.url);
        if (remoteResp.ok) {
          const contentType =
            remoteResp.headers.get("content-type") || "application/octet-stream";
          const originalFilename: string | undefined = asset.originalFilename;
          const rawTitle = (data.title || " ").trim();
          const titleHasExt = !!getExtensionFromFilename(rawTitle);
          const originalExt = getExtensionFromFilename(originalFilename);
          const extFromMime = mimeToExt[contentType.split(";")[0]] || null;

          let finalName = rawTitle || "download";

          if (rawTitle && !titleHasExt) {
            const extToAdd = originalExt || extFromMime;
            finalName = extToAdd ? `${rawTitle}.${extToAdd}` : rawTitle;
          }

          if (!rawTitle && originalFilename) {
            finalName = originalFilename;
          }

          if (!getExtensionFromFilename(finalName) && extFromMime) {
            finalName = `${finalName}.${extFromMime}`;
          }

          client
            .patch(data._id)
            .set({ downloadCount: (data.downloadCount || 0) + 1 })
            .commit()
            .catch(() => console.error("Error actualizando contador de descarga"));

          return new NextResponse(remoteResp.body as ReadableStream<Uint8Array>, {
            headers: {
              "Content-Type": contentType,
              "Content-Disposition": buildContentDisposition(finalName),
            },
          });
        }
      }
    } catch (error) {
      console.error("Error consultando archivo en Sanity, verificando fallback local:", error);
    }
  }

  // 2) Fallback integrado para lead magnets gratuitos de Monopolombiano
  const builtIn = getLeadMagnetBySlug(slug);
  if (builtIn) {
    const content = builtIn.buildContent();
    return new NextResponse(content, {
      headers: {
        "Content-Type": builtIn.contentType,
        "Content-Disposition": buildContentDisposition(builtIn.filename),
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new NextResponse("Archivo no encontrado", { status: 404 });
}
