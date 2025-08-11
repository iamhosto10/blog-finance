import { client } from "../lib/sanity";

export default async function handler(req, res) {
  try {
    const resp = await fetch(
      "https://www.datos.gov.co/resource/ceyp-9c7c.json?$select=valor&$order=vigenciadesde desc&$limit=1"
    );
    const [obj] = await resp.json();
    const valorCOP = parseFloat(obj.valor);

    const today = new Date().toISOString().split("T")[0];
    const existing = await client.fetch(
      `*[_type == "dolar" && fecha match "${today}*"]`
    );

    if (existing.length === 0) {
      await client.create({
        _type: "dolar",
        valor: valorCOP,
        fecha: new Date().toISOString(),
      });
    }

    res.status(200).json({ dolar: valorCOP });
  } catch (error) {
    console.error("Error al obtener TRM:", error);
    res.status(500).json({ error: "Error al obtener TRM" });
  }
}
