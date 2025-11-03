import ClientPage from "./ClientPage";
import { Metadata } from "next";

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
const page = () => {
  return <ClientPage />;
};

export default page;
