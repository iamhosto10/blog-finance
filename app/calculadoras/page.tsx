import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import Simulators from "@/components/Simulators/Simulators";
import React from "react";

const subcategories = [
  {
    label: "Calculadoras de rentabilidad",
    href: "/calculadoras/calculadora-de-rentabilidad",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/calculadoraDeRentabilidad.png",
    buttonText: "Calcular",
  },
  {
    label: "Calculadora de crédito",
    href: "/calculadoras/calculadora-de-credito",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/calculadoraDeCredito.png",
    buttonText: "Calcular",
  },
  {
    label: "Calculadora de ahorro",
    href: "/calculadoras/calculadora-de-ahorro",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/calculadoraDeAhorro.png",
    buttonText: "Ahorrar",
  },
  {
    label: "Simulador de inversión",
    href: "/calculadoras/simulador-de-inversion",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/simuladorDeInversion.png",
    buttonText: "Simular",
  },
  {
    label: "Comparador de tarjetas",
    href: "/calculadoras/comparador-de-tarjetas",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/comparadorDeTarjetas.png",
    buttonText: "Comparar",
  },
  {
    label: "Simulador de leasing y vivienda",
    href: "/calculadoras/simulador-de-leasing-y-vivienda",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/simuladorDeLeasingYVivienda.png",
    buttonText: "Simular",
  },
  {
    label: "Calculadora 4X1000",
    href: "/calculadoras/calculadora-4x1000",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
    icon: "/assets/calculadoras/calculadora4x1000.png",
    buttonText: "Calcular",
  },
  {
    label: "Conversor de dolares",
    href: "/calculadoras/conversor-dolares",
    description:
      "Bienvenido a nuestra sección de Calculadoras Financieras, diseñada para ayudarte",
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
