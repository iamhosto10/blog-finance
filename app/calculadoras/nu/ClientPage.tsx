"use client";

import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import Tag from "@/components/CommonComponents/Tag";
import TableNu from "@/components/nu/Table";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const metadata = {
  title: "Cuenta de Ahorros Nu en Colombia - Simulador y Rentabilidad 2025",
  description:
    "Conoce la cuenta de ahorros de Nu (NuBank) en Colombia, su tasa de interés, ventajas, desventajas y simula cuánto podrías ganar en 2025 con nuestra calculadora.",
  keywords: [
    "Nu Colombia",
    "NuBank cuenta de ahorros",
    "cuentas de ahorro alta rentabilidad Colombia",
    "Nu intereses 2025",
    "simulador NuBank",
    "Nu ahorro Colombia",
  ],
  openGraph: {
    title: "Cuenta de Ahorros Nu en Colombia - Simulador y Rentabilidad 2025",
    description:
      "Aprende cómo funciona la cuenta de ahorros de Nu en Colombia, revisa las tasas de interés actualizadas y usa nuestro simulador de inversión.",
    url: "https://tusitio.com/nu-colombia",
    siteName: "Simulador de Inversiones en Colombia",
    locale: "es_CO",
    type: "website",
  },
};

const info = [
  {
    title: "¿Qué es Nu en Colombia?",
    description:
      "Nu es un banco digital que llegó a Colombia ofreciendo productos financieros 100% digitales. Su cuenta de ahorros de alta rentabilidad permite a los usuarios ganar intereses diarios sobre el dinero depositado.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros Nu?",
    description:
      "Tu dinero genera rendimientos diarios con una tasa efectiva anual competitiva en el mercado colombiano. Todo se maneja desde la aplicación móvil sin necesidad de oficinas físicas.",
  },
  {
    title: "Ventajas de Nu",
    description:
      "✔ Rendimientos diarios sobre tu saldo.\n✔ Sin cuota de manejo.\n✔ Apertura y uso totalmente digital.\n✔ Transferencias gratuitas a otros bancos en Colombia.\n✔ Transparencia y control desde la app.",
  },
  {
    title: "Desventajas de Nu",
    description:
      "❌ No tiene oficinas físicas, todo es digital.\n❌ La tarjeta débito física puede tardar en llegar.\n❌ Todavía no ofrece todos los productos de un banco tradicional (créditos hipotecarios, CDT, etc.).",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $1.000.000 COP en tu cuenta Nu y la tasa efectiva anual es del 8.25%, al final de un mes podrías recibir aproximadamente $6,536 COP de intereses, que se suman automáticamente a tu saldo.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga Nu por ahorrar en Colombia?",
    description:
      "Nu ofrece una tasa efectiva anual que varía según el mercado, generalmente alrededor del 8.25% EA, generando intereses diarios que se abonan a tu cuenta.",
  },
  {
    title: "¿Es seguro ahorrar en Nu?",
    description:
      "Sí, Nu está vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por el seguro de depósitos de Fogafín.",
  },
  {
    title: "¿Cómo abrir una cuenta en Nu?",
    description:
      "Solo necesitas descargar la app de Nu, registrarte con tu cédula y verificar tu identidad. En minutos puedes abrir tu cuenta sin papeleo.",
  },
  {
    title: "¿Tiene costos ocultos?",
    description:
      "No. La cuenta Nu no tiene cuota de manejo ni costos por transferencias, lo que la hace muy competitiva frente a bancos tradicionales.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, tu dinero siempre está disponible. Puedes transferirlo a otros bancos o retirarlo con tu tarjeta débito Nu en cajeros.",
  },
];

export default function Page() {
  const { profitability } = useSelector((state: RootState) => state.sanity);
  const [selected, setSelected] = useState(0);
  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE NU
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de {(Number(profitability?.nu[selected]) * 100).toFixed(2)} %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/nu/logonu.png"
                alt="nu"
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
              <TableNu
                profitabilityNu={profitability?.nu}
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
}
