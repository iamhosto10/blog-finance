"use client";

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
    title: "¿Qué es RappiPay?",
    description:
      "RappiPay es el banco digital de Rappi en alianza con Davivienda. Ofrece una cuenta de ahorros 100% digital con tarjeta débito y beneficios adicionales dentro del ecosistema Rappi.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros RappiPay?",
    description:
      "Puedes abrir una cuenta desde la app de Rappi, recibir tu tarjeta débito y empezar a ahorrar. Tu dinero genera intereses diarios con una tasa competitiva y puedes usarlo para compras, pagos y transferencias.",
  },
  {
    title: "Ventajas de RappiPay",
    description:
      "✔ Rendimientos diarios sobre tu saldo.\n✔ Sin cuota de manejo.\n✔ Integración con la app de Rappi para pagos y compras rápidas.\n✔ Transferencias gratuitas a otros bancos.\n✔ Respaldado por Davivienda y Fogafín.",
  },
  {
    title: "Desventajas de RappiPay",
    description:
      "❌ Dependencia de la app de Rappi para la mayoría de gestiones.\n❌ Puede presentar fallas técnicas en horarios de alta demanda.\n❌ Aún no tiene la misma variedad de productos financieros que un banco tradicional.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $1.000.000 COP en RappiPay con una tasa del 9% EA, al cabo de un mes recibirías alrededor de $7.207 COP en intereses, abonados directamente a tu cuenta.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga RappiPay por ahorrar?",
    description:
      "RappiPay ofrece una tasa efectiva anual cercana al 9% EA, con intereses que se calculan diariamente sobre tu saldo.",
  },
  {
    title: "¿Es seguro ahorrar en RappiPay?",
    description:
      "Sí, RappiPay funciona en alianza con Davivienda y está vigilado por la Superintendencia Financiera de Colombia. Además, tu dinero está protegido por Fogafín hasta por $50 millones.",
  },
  {
    title: "¿Cómo abrir una cuenta en RappiPay?",
    description:
      "Debes descargar la aplicación de Rappi, ingresar a la sección de RappiPay y registrar tu cuenta con tu cédula. El proceso es 100% digital.",
  },
  {
    title: "¿Tiene costos la cuenta de RappiPay?",
    description:
      "No. La cuenta de RappiPay no tiene cuota de manejo ni comisiones por transferencias. Solo pagas si haces retiros en cajeros de otras redes.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, puedes usar tu tarjeta débito RappiPay para compras, retiros en cajeros y transferencias sin restricciones.",
  },
];

const Page = () => {
  const { profitability } = useSelector((state: RootState) => state.sanity);
  console.log(profitability?.rappi);
  const [selected, setSelected] = useState(0);

  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE RAPPIPAY
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de{" "}
              {(Number(profitability?.rappi[selected]) * 100).toFixed(2)} %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/rappi/rappi.png"
                alt="rappi"
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
                profitability={profitability?.rappi}
                selected={selected}
                setSelected={setSelected}
              />
            </CardContent>
          </Card>

          <InfoSection data={info} />

          <FAQ data={Faq} />
        </div>
      </div>
    </div>
  );
};

export default Page;
