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
    title: "¿Qué es Pibank?",
    description:
      "Pibank es un banco 100% digital que hace parte de Banco Pichincha. En Colombia ofrece una cuenta de ahorros de alta rentabilidad con tasas competitivas y manejo completamente en línea.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros Pibank?",
    description:
      "La cuenta Pibank permite que tu dinero genere intereses diarios con una tasa efectiva anual destacada. Se abre en minutos desde la app o página web y no requiere papeleo ni visitas a oficinas.",
  },
  {
    title: "Ventajas de Pibank",
    description:
      "✔ Intereses altos comparados con bancos tradicionales.\n✔ Sin cuota de manejo.\n✔ Apertura y manejo 100% digital.\n✔ Respaldado por Banco Pichincha y protegido por Fogafín.\n✔ Transferencias sin costo a otros bancos.",
  },
  {
    title: "Desventajas de Pibank",
    description:
      "❌ No tiene oficinas físicas en Colombia.\n❌ Menor reconocimiento en comparación con bancos tradicionales.\n❌ Su portafolio de productos es limitado frente a bancos más grandes.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $5.000.000 COP en Pibank con una tasa del 11% EA, al cabo de un mes podrías recibir aproximadamente $43.673 COP en intereses, los cuales se abonan directamente a tu saldo.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga Pibank por ahorrar?",
    description:
      "Pibank ofrece una de las tasas de interés más altas en cuentas de ahorro en Colombia, alrededor del 11% EA, con abono diario de intereses.",
  },
  {
    title: "¿Es seguro ahorrar en Pibank?",
    description:
      "Sí, Pibank pertenece al Banco Pichincha y está vigilado por la Superintendencia Financiera de Colombia. Además, tu dinero está protegido por Fogafín hasta $50 millones.",
  },
  {
    title: "¿Cómo abrir una cuenta en Pibank?",
    description:
      "Puedes abrir tu cuenta descargando la app de Pibank o desde su página web. Solo necesitas tu cédula y completar el proceso de validación en línea.",
  },
  {
    title: "¿Qué costos tiene la cuenta Pibank?",
    description:
      "La cuenta no tiene cuota de manejo ni cobros por transferencias nacionales, lo que la hace muy competitiva frente a bancos tradicionales.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, tu dinero siempre está disponible. Puedes transferirlo a cualquier banco en Colombia de forma gratuita.",
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
              DE PIBANK
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de{" "}
              {(Number(profitability?.pibank[selected]) * 100).toFixed(2)} %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/pibank/pibank.png"
                alt="pibank"
                className="mx-auto w-full"
              />
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
                profitability={profitability?.pibank}
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
