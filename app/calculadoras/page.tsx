import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import Simulators from "@/components/Simulators/Simulators";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadoras Financieras en Línea | Monopolombiano",
  description:
    "Accede a todas nuestras calculadoras financieras en línea. Calcula tu ahorro, inversión, crédito, leasing, 4x1000, conversión de dólares y más. Herramientas diseñadas para Colombia que te ayudan a tomar mejores decisiones con tu dinero.",
  keywords: [
    "calculadoras financieras",
    "calculadora de ahorro",
    "simulador de inversión",
    "calculadora de crédito",
    "simulador de leasing y vivienda",
    "calculadora 4x1000",
    "conversor de dólares",
    "comparador de tarjetas",
    "calculadoras Colombia",
    "herramientas financieras online",
    "planificación financiera personal",
    "tasa de interés Colombia",
  ],
  openGraph: {
    title: "Calculadoras Financieras en Línea | Monopolombiano",
    description:
      "Haz tus cuentas con nuestras calculadoras financieras diseñadas para Colombia. Calcula ahorro, inversión, crédito, 4x1000, dólar-peso y más en segundos.",
    url: "https://monopolombiano.com/calculadoras",
    siteName: "Monopolombiano",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://monopolombiano.com/favicon.ico",
        width: 625,
        height: 625,
        alt: "Calculadoras Financieras Monopolombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadoras Financieras en Línea | Monopolombiano",
    description:
      "Explora nuestras calculadoras financieras para Colombia: ahorro, inversión, crédito, leasing, 4x1000, dólar y más. Herramientas gratuitas para tu bolsillo.",
    images: ["https://monopolombiano.com/favicon.ico"],
  },
};

const subcategories = [
  {
    label: "Calculadoras de rentabilidad",
    href: "/calculadoras/calculadora-de-rentabilidad",
    description:
      "Compara cuánto ganarías con tu ahorro en distintos bancos y descubre cuál ofrece la mejor rentabilidad para tu dinero.",
    icon: "/assets/calculadoras/calculadoraDeRentabilidad.png",
    buttonText: "Calcular",
  },
  {
    label: "Calculadora de crédito",
    href: "/calculadoras/calculadora-de-credito",
    description:
      "Simula tus cuotas y conoce cuánto pagarás por tu crédito o tarjeta. Compara plazos, tasas e intereses para elegir la opción más conveniente.",
    icon: "/assets/calculadoras/calculadoraDeCredito.png",
    buttonText: "Calcular",
  },
  {
    label: "Calculadora de ahorro",
    href: "/calculadoras/calculadora-de-ahorro",
    description:
      "Proyecta cuánto crecerá tu dinero con el tiempo. Ingresa tu ahorro inicial, aportes y tasa de interés para ver cómo el interés compuesto impulsa tus metas financieras.",
    icon: "/assets/calculadoras/calculadoraDeAhorro.png",
    buttonText: "Ahorrar",
  },
  {
    label: "Simulador de inversión",
    href: "/calculadoras/simulador-de-inversion",
    description:
      "Estima cuánto crecerá tu inversión con el tiempo. Ingresa tus aportes, tasa y plazo para ver cómo el interés compuesto hace crecer tu capital.",
    icon: "/assets/calculadoras/simuladorDeInversion.png",
    buttonText: "Simular",
  },
  {
    label: "Comparador de tarjetas",
    href: "/calculadoras/comparador-de-tarjetas",
    description:
      "Compara tarjetas bancarias y elige la que mejor se adapte a ti. Analiza comisiones, beneficios y valoraciones para tomar decisiones más acertadas.",
    icon: "/assets/calculadoras/comparadorDeTarjetas.png",
    buttonText: "Comparar",
  },
  {
    label: "Simulador de leasing y vivienda",
    href: "/calculadoras/simulador-de-leasing-y-vivienda",
    description:
      "Simula tu crédito o leasing de vivienda y conoce tus cuotas, intereses y pagos mensuales. Visualiza cómo evoluciona tu deuda y planifica mejor tu compra.",
    icon: "/assets/calculadoras/simuladorDeLeasingYVivienda.png",
    buttonText: "Simular",
  },
  {
    label: "Calculadora 4X1000",
    href: "/calculadoras/4x1000",
    description:
      "Calcula fácilmente cuánto pagas por el 4x1000 en tus transacciones. Ingresa el monto y conoce el valor exacto del impuesto que descuentan tus bancos.",
    icon: "/assets/calculadoras/calculadora4x1000.png",
    buttonText: "Calcular",
  },
  {
    label: "Conversor de dolares",
    href: "/calculadoras/conversor-dolares",
    description:
      "Convierte dólares a pesos colombianos al instante con la tasa de cambio actual. Ideal para compras, viajes o transacciones internacionales.",
    icon: "/assets/calculadoras/conversorDeDolares.png",
    buttonText: "Convertir",
  },
];
const Page = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16">
        <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
          Calculadoras
        </h1>
        <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
          Haz tus cuentas con nuestras calculadoras financieras en línea,
          diseñadas especialmente para Colombia. Calcula cuánto puedes ahorrar
          cada mes, los intereses de tus créditos, el impuesto del 4x1000, la
          rentabilidad de tus inversiones o convierte dólares a pesos
          colombianos al instante. Estas herramientas te ayudarán a planear
          mejor tu dinero y tomar decisiones financieras informadas sin
          complicaciones.
          <br />
          <br />
          <span className="font-bold">Herramientas disponibles: </span>
          calculadora de ahorro, inversión, intereses, 4x1000, dólar-peso, y
          mucho más.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subcategories.map((subcategory, index) => (
            <CalculatorCard
              key={index}
              asset={subcategory.icon}
              buttonText={subcategory.buttonText}
              description={subcategory.description}
              href={subcategory.href}
              label={subcategory.label}
            />
          ))}
        </div>

        <div className="w-full shadow-2xl rounded-xl p-6 bg-tertiary-foreground my-6">
          <Simulators />
        </div>
      </div>
    </>
  );
};

export default Page;
