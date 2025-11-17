"use client";

import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import Profitability from "@/components/CommonComponents/Profitability/Profitability";
import Tag from "@/components/CommonComponents/Tag";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const info = [
  {
    title: "¿Qué es Global66?",
    description:
      "Global66 es una fintech internacional que opera en varios países de Latinoamérica, incluyendo Colombia. Su propuesta principal es ofrecer una cuenta digital y servicios de transferencias internacionales rápidos y económicos.",
  },
  {
    title: "¿Cómo funciona la cuenta Global66?",
    description:
      "Puedes abrir una cuenta 100% digital desde la aplicación o página web. Global66 permite recibir dinero, hacer transferencias internacionales y en algunos casos obtener intereses sobre el saldo disponible.",
  },
  {
    title: "Ventajas de Global66",
    description:
      "✔ Enfoque en transferencias internacionales con costos reducidos.\n✔ Apertura 100% digital y rápida.\n✔ Posibilidad de manejar diferentes monedas.\n✔ Intereses competitivos en el saldo disponible (según condiciones del mercado).\n✔ Transparencia en las tasas de cambio.",
  },
  {
    title: "Desventajas de Global66",
    description:
      "❌ No cuenta con oficinas físicas en Colombia.\n❌ La cobertura de servicios financieros es más limitada frente a bancos locales.\n❌ Algunas operaciones dependen de la regulación de cada país.\n❌ La disponibilidad de intereses puede variar según la normativa.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si recibes $2.000.000 COP en tu cuenta Global66 y la tasa ofrecida es del 11% EA, podrías recibir alrededor de $17.469 COP en intereses después de un mes, además de poder transferir el dinero al exterior con comisiones bajas.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga Global66 por ahorrar?",
    description:
      "Global66 ofrece rendimientos sobre el dinero disponible dependiendo del mercado y la regulación en Colombia. Su tasa suele rondar entre el 10% y 12% EA.",
  },
  {
    title: "¿Es seguro usar Global66?",
    description:
      "Sí, Global66 opera bajo regulación financiera en los países donde está presente. En Colombia, cumple con las normativas locales para proteger a los usuarios.",
  },
  {
    title: "¿Cómo abrir una cuenta en Global66?",
    description:
      "Solo necesitas registrarte en la app o página web de Global66, validar tu identidad y en minutos tendrás tu cuenta digital lista para usar.",
  },
  {
    title: "¿Qué costos tiene Global66?",
    description:
      "Abrir y mantener la cuenta es gratis. Sin embargo, las transferencias internacionales tienen una comisión reducida, mucho más baja que la de bancos tradicionales.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, puedes transferir tu dinero a bancos locales o usarlo para pagos y envíos internacionales en cualquier momento.",
  },
];

const Page = () => {
  const { profitability } = useSelector((state: RootState) => state.sanity);
  const [selected, setSelected] = useState(0);

  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE GlOBAL 66
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de{" "}
              {(Number(profitability?.global66[selected]) * 100).toFixed(2)} %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/global66/global66.png"
                alt="global66"
                className="mx-auto w-full"
              />
              <div className="absolute -top-5 -right-5 md:-top-7 md:-right-7 size-10 md:size-14">
                <img
                  src="/assets/calculator.png"
                  alt="Miniature Image"
                  className="size-10 md:size-14"
                />
              </div>
            </div>
            <div className="h-auto hidden md:block ">
              <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
                HERRAMIENTAS
              </p>
            </div>
          </div>

          <Card className="shadow-xl bg-tertiary-foreground">
            <CardContent className="p-3 md:p-5 lg:p-8">
              <Profitability
                profitability={profitability?.global66}
                selected={selected}
                setSelected={setSelected}
              />
            </CardContent>
          </Card>
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="7506188604"
          />

          <InfoSection data={info} />

          <FAQ data={Faq} />
        </div>
      </div>
    </div>
  );
};

export default Page;
