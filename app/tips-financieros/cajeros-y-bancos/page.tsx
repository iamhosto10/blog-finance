import ArticleList from "@/components/ArticleList/ArticleList";
import ArticleShowcase from "@/components/ArticleShowcase/ArticleShowcase";
import ArticleHome from "@/components/Home/ArticleHome/ArticleHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cajeros y Bancos | Monopolombiano",
  description:
    "Encuentra información útil sobre cajeros automáticos, servicios bancarios, comisiones, transferencias y tecnología financiera en Colombia.",
  keywords: [
    "cajeros automáticos",
    "bancos en Colombia",
    "retiros",
    "comisiones bancarias",
    "transferencias",
    "tarjetas débito",
    "cuentas de ahorro",
    "banca digital",
    "fintech",
    "servicios financieros",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Cajeros y Bancos",
    description:
      "Guías y comparativas sobre bancos y cajeros automáticos en Colombia. Descubre las mejores opciones para tus finanzas diarias.",
    url: "https://monopolombiano.com/tips-financieros/cajeros-y-bancos",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 630,
        height: 630,
        alt: "Cajeros y Bancos",
      },
    ],
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cajeros y Bancos",
    description:
      "Aprende sobre cajeros automáticos, servicios bancarios, comisiones y banca digital en Colombia.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Cajeros y Bancos
        </h1>

        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Descubre todo lo que necesitas saber sobre los{" "}
          <span className="font-bold">
            cajeros automáticos y servicios bancarios en Colombia
          </span>
          . Aquí encontrarás información sobre{" "}
          <span className="font-bold">
            retiros, transferencias, comisiones, horarios y tecnología bancaria
          </span>{" "}
          para manejar tu dinero con facilidad y seguridad.
          <br />
          <br />
          Aprende cómo elegir el{" "}
          <span className="font-bold">banco o red de cajeros</span> que más te
          conviene, cómo evitar cobros innecesarios y cómo usar las{" "}
          <span className="font-bold">plataformas digitales y fintech</span> que
          facilitan tus transacciones diarias.
          <br />
          <br />
          <span className="font-bold">Temas principales:</span> cajeros
          automáticos, bancos, comisiones, transferencias, banca digital,
          fintech y servicios financieros.
        </p>

        <ArticleShowcase category="Cajeros y Bancos" indexes={[0, 4]} />
        <ArticleList category="Cajeros y Bancos" indexes={[4, 7]} />
        <ArticleHome category="Cajeros y Bancos" />
        <ArticleShowcase category="Cajeros y Bancos" indexes={[7, 11]} />
        <ArticleList category="Cajeros y Bancos" indexes={[11, 20]} />
      </div>
    </>
  );
};

export default page;
