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
    title: "¿Qué es Lulo Bank?",
    description:
      "Lulo Bank es un banco 100% digital colombiano que busca ofrecer productos simples y transparentes. Su cuenta de ahorros de alta rentabilidad permite que tu dinero genere intereses diarios.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros Lulo?",
    description:
      "Al depositar tu dinero en Lulo Bank, este genera rendimientos diarios con una tasa efectiva anual atractiva. Todo se maneja desde la app móvil, sin necesidad de sucursales físicas.",
  },
  {
    title: "Ventajas de Lulo Bank",
    description:
      "✔ Rendimientos diarios sobre el saldo disponible.\n✔ Sin cuota de manejo ni costos por transferencias.\n✔ Apertura fácil desde el celular.\n✔ Notificaciones en tiempo real y control desde la app.\n✔ Respaldado por el seguro de Fogafín.",
  },
  {
    title: "Desventajas de Lulo Bank",
    description:
      "❌ Solo opera de manera digital, no tiene oficinas físicas.\n❌ Al ser un banco relativamente nuevo, algunos usuarios pueden desconfiar.\n❌ Oferta de productos limitada frente a bancos tradicionales.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $2.000.000 COP en Lulo Bank con una tasa del 8% EA, al cabo de un mes podrías recibir alrededor de 12.868 COP en intereses, los cuales se suman automáticamente a tu saldo.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga Lulo Bank por ahorrar?",
    description:
      "Lulo Bank ofrece una tasa efectiva anual competitiva 8% EA (10% si eres lulo pro), generando intereses diarios que se abonan automáticamente a tu cuenta.",
  },
  {
    title: "¿Es seguro ahorrar en Lulo Bank?",
    description:
      "Sí, Lulo Bank está vigilado por la Superintendencia Financiera de Colombia y tu dinero cuenta con la protección de Fogafín hasta por $50 millones de pesos.",
  },
  {
    title: "¿Cómo abrir una cuenta en Lulo Bank?",
    description:
      "Debes descargar la app de Lulo Bank, registrarte con tu cédula y realizar el proceso de validación. La apertura es gratuita y 100% digital.",
  },
  {
    title: "¿Qué costos tiene la cuenta Lulo?",
    description:
      "No tiene cuota de manejo ni costos por transferencias. Todo está diseñado para ser transparente y sin comisiones ocultas.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, el dinero está disponible en todo momento. Puedes transferir a otros bancos o usar la tarjeta débito Lulo para compras y retiros.",
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
              DE LULO
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de {(Number(profitability?.lulo[selected]) * 100).toFixed(2)}{" "}
              %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/lulo/lulo.png"
                alt="lulo"
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
                profitability={profitability?.lulo}
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
