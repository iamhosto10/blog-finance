import Simulators from "@/components/Simulators/Simulators";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const subcategories = [
  {
    label: "Calculadora de rentabilidad",
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
    href: "/calculadoras/conversor-de-dolares",
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subcategories.map((subcategory, index) => (
            <div
              className="rounded-xl bg-tertiary-foreground p-6 text-center flex flex-col items-center justify-center gap-3"
              key={index}
            >
              {subcategory.icon && (
                <img
                  src={subcategory.icon}
                  alt={subcategory.label}
                  className="size-20 object-contain"
                />
              )}
              <h2 className="text-[16px] font-agrandir font-bold line-clamp-2 text-secondary">
                {subcategory.label.toUpperCase()}
              </h2>
              <p className="text-xs font-canva-sans text-tertiary">
                {subcategory.description}
              </p>
              <Button
                variant={"primary"}
                className=" w-full rounded-lg cursor-pointer self-end items-center hover:scale-115 transition-all"
                asChild
              >
                <Link href={subcategory.href}>
                  <p className="text-shadow-lg  text-shadow-black/20 font-agrandir font-bold ">
                    {subcategory.buttonText}
                  </p>
                </Link>
              </Button>
            </div>
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
