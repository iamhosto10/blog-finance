import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Finanzas Personales";
  const category = searchParams.get("category") || "Monopolombiano";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "40px",
          border: "20px solid #064e3b", // Un borde verde estilo financiero
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#064e3b",
            fontWeight: "bold",
          }}
        >
          MONOPOLOMBIANO.COM
        </div>

        {/* Título Principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "#666",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: "#000",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer / Call to Action */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#064e3b",
            color: "white",
            padding: "20px 60px",
            fontSize: 40,
            borderRadius: 50,
          }}
        >
          Leer Artículo Completo ➔
        </div>
      </div>
    ),
    {
      width: 1000,
      height: 1500, // Tamaño Vertical para Pinterest
    }
  );
}
