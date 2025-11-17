"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import CalculatorCard from "@/components/CommonComponents/Cards/CalculatorCard";
import Tag from "@/components/CommonComponents/Tag";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ClientPage = () => {
  const { profitability } = useSelector((state: RootState) => state.sanity);

  const banks = [
    {
      label: "Lulo Bank",
      href: "/calculadoras/lulo",
      interest:
        profitability?.lulo && profitability?.lulo?.length > 1
          ? (Number(profitability?.lulo[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.lulo[1]) * 100).toFixed(2)
          : (Number(profitability?.lulo[0]) * 100).toFixed(2),
      description:
        "Ahorra fácil en tu Lulo Cuenta y gana rendimientos desde 0.10% E.A.\nCrea bolsillos para tus metas y recibe hasta 9.5% E.A. si eres Lulo Pro\n Sin montos mínimos, sin plazos y con tu dinero siempre disponible.\n✨ ¡Simula tus ahorros y mira cuánto puedes ganar!",
      icon: "/assets/calculadoras/rentabilidad/luloBank.png",
      buttonText: "Calcular",
    },
    {
      label: "Nu bank",
      href: "/calculadoras/nu",
      interest:
        profitability?.nu && profitability?.nu?.length > 1
          ? (Number(profitability?.nu[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.nu[1]) * 100).toFixed(2)
          : (Number(profitability?.nu[0]) * 100).toFixed(2),
      description:
        "No solo ahorres, ¡haz crecer tu dinero!\nCon un 8,25% E.A. diario, tu plata no se detiene.\nSin mínimos, sin plazos, sin enredos.\n💜 Calcula hoy el poder de tu ahorro.",
      icon: "/assets/calculadoras/rentabilidad/nu.png",
      buttonText: "Calcular",
    },
    {
      label: "Banco Popular",
      href: "/calculadoras/popular",
      description:
        "Recibe tu rentabilidad todos los días, según tu saldo.\nGana intereses sobre intereses sin esperar fin de mes.\nTu plata siempre disponible, sin enredos.\n💜 ¡Empieza hoy a ver cómo crece tu ahorro!",
      icon: "/assets/calculadoras/rentabilidad/bancoPopular.png",
      interest:
        profitability?.popular && profitability?.popular?.length > 1
          ? (Number(profitability?.popular[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.popular[1]) * 100).toFixed(2)
          : (Number(profitability?.popular[0]) * 100).toFixed(2),
      buttonText: "Calcular",
    },
    {
      label: "Pibank",
      href: "/calculadoras/pibank",
      description:
        "💸 Gana el 11% E.A. desde el primer peso.\nTu Cuenta Pibank hace crecer tu dinero sin condiciones.\nIngresa o retira cuando quieras, sin plazos ni restricciones.\nHaz transferencias a cualquier cuenta y gestiona todo desde tu celular.\n✨ ¡Tu dinero siempre disponible y rindiendo al máximo!",
      interest:
        profitability?.pibank && profitability?.pibank?.length > 1
          ? (Number(profitability?.pibank[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.pibank[1]) * 100).toFixed(2)
          : (Number(profitability?.pibank[0]) * 100).toFixed(2),
      icon: "/assets/calculadoras/rentabilidad/pibank.png",
      buttonText: "Calcular",
    },
    {
      label: "Global 66",
      href: "/calculadoras/global66",
      interest:
        profitability?.global66 && profitability?.global66?.length > 1
          ? (Number(profitability?.global66[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.global66[1]) * 100).toFixed(2)
          : (Number(profitability?.global66[0]) * 100).toFixed(2),
      description:
        "💰 Gana hasta 11% E.A. en tu cuenta en pesos.\nTu dinero crece todos los días, sin montos mínimos y disponible 24/7.\n📈 Genera hasta 11% de interés anual.\n🕒 Rendimientos calculados a diario.\n💜 Tu plata siempre disponible, sin restricciones.",
      icon: "/assets/calculadoras/rentabilidad/global66.png",
      buttonText: "Calcular",
    },
    {
      label: "Rappi",
      href: "/calculadoras/rappi",
      interest:
        profitability?.rappi && profitability?.rappi?.length > 1
          ? (Number(profitability?.rappi[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.rappi[1]) * 100).toFixed(2)
          : (Number(profitability?.rappi[0]) * 100).toFixed(2),
      description:
        "💸 Ahora tus Bolsillos rentan al 9% E.A. sin condiciones.\nHaz que tu dinero en RappiCuenta crezca más fácil y rápido.\nSolo ponlo en Bolsillos y gana más desde el primer peso.\nSi lo dejas fuera, rentará solo al 0,1% E.A.\n✨ ¡Muévelo a tus Bolsillos y haz que rinda de verdad!",
      icon: "/assets/calculadoras/rentabilidad/rapi.png",
      buttonText: "Calcular",
    },
    {
      label: "Bold",
      href: "/calculadoras/bold",
      interest:
        profitability?.bold && profitability?.bold?.length > 1
          ? (Number(profitability?.bold[0]) * 100).toFixed(2) +
            " a " +
            (Number(profitability?.bold[1]) * 100).toFixed(2)
          : (Number(profitability?.bold[0]) * 100).toFixed(2),
      description:
        "💰 Haz crecer tu dinero desde el primer peso.\nRecibe hasta 10% E.A. de rentabilidad en tus Bolsillos Bold.\nUna de las tasas más altas del mercado, con liquidez total.\nRetira o mueve tu dinero cuando quieras, sin plazos ni condiciones.\n✨ ¡Tu plata siempre disponible y ganando más!",
      icon: "/assets/calculadoras/rentabilidad/bold.png",
      buttonText: "Calcular",
    },
  ];

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

      <AdBanner
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="7506188604"
      />
    </div>
  );
};

export default ClientPage;
