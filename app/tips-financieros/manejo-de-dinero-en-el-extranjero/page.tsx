import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manejo de Dinero en el Extranjero | Monopolombiano",
  description:
    "Aprende cómo administrar tu dinero en el extranjero: cuentas internacionales, remesas, cambio de divisas, y consejos para evitar comisiones altas.",
  keywords: [
    "manejo de dinero en el extranjero",
    "remesas",
    "cambio de divisas",
    "cuentas internacionales",
    "transferencias internacionales",
    "tarjetas en el exterior",
    "finanzas para viajeros",
    "dinero en el exterior",
    "bancos internacionales",
    "pagos globales",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Manejo de Dinero en el Extranjero",
    description:
      "Guías y consejos para administrar tu dinero mientras vives, estudias o viajas fuera del país. Aprende sobre remesas, cambio de divisas y bancos internacionales.",
    url: "https://monopolombiano.com/tips-financieros/manejo-de-dinero-en-el-extranjero",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Manejo de Dinero en el Extranjero",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manejo de Dinero en el Extranjero",
    description:
      "Descubre cómo manejar tus finanzas en el exterior: transferencias, divisas, remesas y más.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Manejo de Dinero en el Extranjero
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Si vives, trabajas o estudias fuera del país, el{" "}
          <span className="font-bold">manejo de dinero en el extranjero</span>{" "}
          es clave para mantener tus finanzas en orden. En esta sección
          aprenderás cómo{" "}
          <span className="font-bold">
            enviar y recibir dinero, abrir cuentas internacionales, manejar
            divisas y evitar comisiones excesivas
          </span>{" "}
          al usar bancos o plataformas digitales globales.
          <br />
          <br />
          También encontrarás{" "}
          <span className="font-bold">
            consejos sobre tarjetas internacionales, remesas, ahorro en otra
            moneda, impuestos y transferencias seguras
          </span>{" "}
          desde y hacia Colombia.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> remesas,
          transferencias, divisas, bancos internacionales, tarjetas globales,
          ahorro en el exterior y finanzas para expatriados.
        </p>

        <ArticleShowcase
          category="Manejo del dinero en el extranjero"
          indexes={[0, 4]}
        />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList
          category="Manejo del dinero en el extranjero"
          indexes={[4, 7]}
        />
        <ArticleHome category="Manejo del dinero en el extranjero" />
        <ArticleShowcase
          category="Manejo del dinero en el extranjero"
          indexes={[7, 11]}
        />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />
        <ArticleList
          category="Manejo del dinero en el extranjero"
          indexes={[11, 20]}
        />
      </div>
    </>
  );
};

export default page;
