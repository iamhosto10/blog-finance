// publishedAt llega como "YYYY-MM-DD..." y new Date("YYYY-MM-DD") es medianoche
// UTC. Sin fijar timeZone, el servidor (UTC) y un navegador en Colombia (UTC-5)
// muestran días distintos y React lanza el error de hidratación #418.
export function formatPublishedDate(publishedAt?: string): string {
  if (!publishedAt) return "";
  const date = new Date(publishedAt.slice(0, 10));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}
