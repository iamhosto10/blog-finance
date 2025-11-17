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
    title: "¿Qué es Bold?",
    description:
      "Bold es una fintech colombiana que nació enfocada en ofrecer soluciones de pagos digitales para comercios, y ahora también ofrece una cuenta de ahorros digital con intereses competitivos.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros Bold?",
    description:
      "Tu dinero en Bold genera rendimientos diarios gracias a su tasa efectiva anual. Puedes abrir tu cuenta de forma digital y manejar todo desde la aplicación móvil.",
  },
  {
    title: "Ventajas de Bold",
    description:
      "✔ Intereses competitivos con abono diario.\n✔ Sin cuota de manejo ni costos por transferencias.\n✔ Todo el manejo se hace desde el celular.\n✔ Posibilidad de integrar servicios financieros para negocios y comercios.\n✔ Respaldado por Fogafín.",
  },
  {
    title: "Desventajas de Bold",
    description:
      "❌ Es un banco digital en crecimiento, con menor trayectoria frente a bancos tradicionales.\n❌ No cuenta con oficinas físicas.\n❌ Oferta de productos financieros limitada en comparación con entidades grandes.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $1.500.000 COP en Bold con una tasa del 10% EA, al finalizar un mes recibirías aproximadamente $11.961 COP en intereses, que se suman automáticamente a tu saldo.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga Bold por ahorrar?",
    description:
      "Bold ofrece una tasa efectiva anual cercana al 10% EA, con abono diario de intereses sobre el saldo disponible.",
  },
  {
    title: "¿Es seguro ahorrar en Bold?",
    description:
      "Sí, Bold está vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por Fogafín hasta por $50 millones.",
  },
  {
    title: "¿Cómo abrir una cuenta en Bold?",
    description:
      "Solo necesitas descargar la aplicación de Bold, registrarte con tu cédula y seguir el proceso de validación en línea. Todo el trámite es 100% digital.",
  },
  {
    title: "¿Tiene costos la cuenta de Bold?",
    description:
      "No. Bold no cobra cuota de manejo ni comisiones por transferencias, lo que la hace atractiva para personas y negocios.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, tu dinero siempre está disponible. Puedes transferir a otros bancos o usar los servicios de Bold para pagos y transacciones.",
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
              DE BOLD
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de {(Number(profitability?.bold[selected]) * 100).toFixed(2)}{" "}
              %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/bold/bold.png"
                alt="bold"
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
                profitability={profitability?.bold}
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
