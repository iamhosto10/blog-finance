import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import React from "react";

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
];

const Page = () => {
  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        Calculadora de rentabilidad
      </h1>
      <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banks.map((bank, index) => (
          <div
            className={`
            ${index === 4 ? "lg:col-start-2" : ""} h-full
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
