import ClientPage from "./ClientPage";
import { Metadata } from "next";
import { banksQuery, franchieseQuery, cardsQuery } from "@/lib/queries"; // Las queries de Sanity
import { client } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Comparador de Tarjetas | Monopolombiano",
  description:
    "Compara tarjetas de crédito y débito de los principales bancos en Colombia. Descubre tasas de interés, cuotas de manejo, beneficios y programas de recompensas para elegir la tarjeta ideal para ti.",
  keywords: [
    "comparador de tarjetas",
    "tarjetas de crédito",
    "tarjetas débito",
    "tarjetas bancarias",
    "bancos en Colombia",
    "cuota de manejo",
    "tasas de interés",
    "recompensas",
    "beneficios bancarios",
    "finanzas personales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Comparador de Tarjetas",
    description:
      "Compara y analiza tarjetas de crédito y débito según sus beneficios, tasas y costos. Encuentra la mejor opción según tu perfil financiero.",
    url: "https://monopolombiano.com/calculadoras/comparador-de-tarjetas",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Comparador de Tarjetas en Colombia",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparador de Tarjetas",
    description:
      "Descubre y compara tarjetas de crédito y débito de los principales bancos en Colombia. Encuentra la tarjeta perfecta para ti.",
    images: ["https://monopolombiano.com/favicon.icos"],
  },
};
export default async function ComparadorTarjetasPage() {
  // Usamos Promise.all para hacer las 3 consultas al mismo tiempo en el servidor
  // Esto es vital para el rendimiento, tardará los mismos milisegundos que hacer solo 1.
  const [banks, franchieses, cards] = await Promise.all([
    client.fetch(banksQuery, {}, { next: { tags: ["global-data"] } }),
    client.fetch(franchieseQuery, {}, { next: { tags: ["global-data"] } }),
    client.fetch(cardsQuery, {}, { next: { tags: ["global-data"] } }),
  ]);

  // Pasamos los datos al Client Component
  return (
    <ClientPage
      banks={banks || []}
      franchieses={franchieses || []}
      cards={cards || []}
    />
  );
}
