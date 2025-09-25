import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const resp = await fetch(
      "https://www.datos.gov.co/resource/ceyp-9c7c.json?$select=valor&$order=vigenciadesde desc&$limit=1"
    );
    const [obj] = await resp.json();
    const valorCOP = parseFloat(obj.valor);

    const today = new Date().toISOString().split("T")[0];
    const existing = await client.fetch(`*[_type == "dolar"]`);

    if (existing[0]?.fecha?.slice(0, 10) !== today) {
      if (existing.length > 0) {
        await client.delete(existing[0]?._id);
      }
      await client.create({
        _type: "dolar",
        valor: valorCOP,
        fecha: new Date().toISOString(),
      });
    }

    return Response.json({ dolar: valorCOP });
  } catch (error) {
    console.error("Error al obtener TRM:", error);
    return Response.json({ error: "Error al obtener TRM" }, { status: 500 });
  }
}
