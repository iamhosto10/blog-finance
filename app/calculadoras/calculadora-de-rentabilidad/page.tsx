import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import Tag from "@/components/CommonComponents/Tag";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Calculadora de Rentabilidad | Compara cuentas de ahorro en Colombia",
  description:
    "Compara la rentabilidad de cuentas de ahorro en Colombia y descubre cuánto podrías ganar con bancos como Lulo Bank, Nu Bank, Banco Popular, Pibank, Global 66 y Rappi. Calcula tus intereses y elige la opción más rentable para tus ahorros.",
  keywords: [
    "calculadora de rentabilidad",
    "cuentas de ahorro rentables",
    "comparar bancos en Colombia",
    "simulador de ahorro",
    "rendimiento cuentas bancarias",
    "Lulo Bank rentabilidad",
    "Nu Bank intereses",
    "Pibank ahorro",
    "mejor banco para ahorrar",
    "simulador financiero",
  ],
  openGraph: {
    title: "💰 Calculadora de Rentabilidad | Compara bancos en Colombia",
    description:
      "Descubre qué banco te paga más por tus ahorros. Compara tasas, simula rendimientos y elige la cuenta más rentable entre Lulo Bank, Nu Bank, Banco Popular, Pibank, Global 66 y Rappi.",
    url: "https://monopolombiano.com/calculadoras/calculadora-de-rentabilidad",
    siteName: "Tu Sitio Financiero",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico", // puedes cambiarlo por un banner real
        width: 625,
        height: 625,
        alt: "Comparador de cuentas de ahorro rentables en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rentabilidad 💰 | Compara bancos en Colombia",
    description:
      "Simula tus rendimientos con Lulo Bank, Nu Bank, Pibank, Rappi y más. Encuentra la mejor rentabilidad para tus ahorros.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const banks = [
  {
    label: "Lulo Bank",
    href: "/calculadoras/lulo",
    interest: "9",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n2.Puntos BBVA \n3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n4.Premios Acumulas doble puntaje en tus compras online. \n5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/luloBank.png",
    buttonText: "Calcular",
  },
  {
    label: "Nu bank",
    href: "/calculadoras/nu",
    interest: "9",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n 2.Puntos BBVA \n 3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n 4.PremiosAcumulas doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/nu.png",
    buttonText: "Calcular",
  },
  {
    label: "Banco Popular",
    href: "/calculadoras/popular",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n 2.Puntos BBVA \n 3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n 4.PremiosAcumulas doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/bancoPopular.png",
    interest: "9",
    buttonText: "Calcular",
  },
  {
    label: "Pibank",
    href: "/calculadoras/pibank",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n 2.Puntos BBVA \n 3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n 4.PremiosAcumulas doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    interest: "9",
    icon: "/assets/calculadoras/rentabilidad/pibank.png",
    buttonText: "Calcular",
  },
  {
    label: "Global 66",
    href: "/calculadoras/global66",
    interest: "9",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales.doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/global66.png",
    buttonText: "Calcular",
  },
  {
    label: "Rappi",
    href: "/calculadoras/rappi",
    interest: "9",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n 2.Puntos BBVA \n 3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n 4.PremiosAcumulas doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/rapi.png",
    buttonText: "Calcular",
  },
  {
    label: "Bold",
    href: "/calculadoras/bold",
    interest: "9",
    description:
      "1.Disfruta los descuentos de nuestros aliados comerciales. \n 2.Puntos BBVA \n 3.Difiere tus deudas hasta 36 meses (3 años) a través de BBVA net. \n 4.PremiosAcumulas doble puntaje en tus compras online. \n 5.Solicítala en minutos y 100% en línea.",
    icon: "/assets/calculadoras/rentabilidad/bold.png",
    buttonText: "Calcular",
  },
];

const Page = () => {
  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        Calculadora de rentabilidad
      </h1>
      <div className="flex ">
        <Link href="/calculadoras">
          <Tag title="CALCULADORAS" />
        </Link>
      </div>
      <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        Compara cuánto podrías ganar con las diferentes cuentas de ahorro en
        Colombia gracias a nuestras calculadoras de rentabilidad bancaria. Aquí
        podrás simular los rendimientos que ofrecen entidades como Lulo Bank, Nu
        Bank, Banco Popular, Pibank, Global 66 y Rappi, para que elijas la
        opción más rentable según tus metas financieras.
        <br />
        <br /> Solo debes ingresar el Solo debes ingresar el monto a invertir,
        el plazo y la tasa de rentabilidad anual. En segundos obtendrás una
        proyección del crecimiento de tu dinero, los intereses generados y el
        rendimiento total.
        <br />
        <br />
        💡 Usa nuestras calculadoras de rentabilidad y descubre qué banco te
        paga más por tus ahorros. Compara tasas, analiza resultados y toma
        decisiones financieras inteligentes con información actualizada y
        confiable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banks.map((bank, index) => (
          <div
            className={`
            ${index === 4 ? "lg:col-start-1" : ""} h-full
          `}
            key={index}
          >
            <CalculatorCard
              key={index}
              asset={bank.icon}
              buttonText={bank.buttonText}
              description={bank.description}
              href={bank.href}
              label={bank.label}
              rentability
              interest={bank.interest}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
