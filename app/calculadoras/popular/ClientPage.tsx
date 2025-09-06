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
    title: "¿Qué es el Banco Popular?",
    description:
      "El Banco Popular es una de las entidades financieras más tradicionales de Colombia. Forma parte del Grupo Aval y ofrece una amplia gama de productos, incluyendo cuentas de ahorro de alta rentabilidad.",
  },
  {
    title: "¿Cómo funciona la cuenta de ahorros Banco Popular?",
    description:
      "Con la cuenta de ahorros del Banco Popular puedes generar intereses sobre tu saldo con tasas competitivas en el mercado. Además, tienes acceso a una red amplia de oficinas y cajeros en todo el país.",
  },
  {
    title: "Ventajas del Banco Popular",
    description:
      "✔ Respaldo de un banco tradicional del Grupo Aval.\n✔ Intereses competitivos en sus cuentas de ahorro.\n✔ Acceso a oficinas físicas y amplia red de cajeros.\n✔ Variedad de productos adicionales (CDT, créditos, tarjetas).\n✔ Protección de Fogafín.",
  },
  {
    title: "Desventajas del Banco Popular",
    description:
      "❌ Puede cobrar comisiones por retiros y transferencias si no se cumplen ciertas condiciones.\n❌ Procesos más burocráticos frente a bancos digitales.\n❌ La tasa de interés puede ser menor comparada con fintechs.",
  },
  {
    title: "Ejemplo práctico",
    description:
      "Si depositas $3.000.000 COP en una cuenta de ahorros del Banco Popular con una tasa del 8% EA, al cabo de un mes podrías recibir aproximadamente $19.302 COP en intereses, dependiendo de las condiciones del producto.",
  },
];

const Faq = [
  {
    title: "¿Cuánto paga el Banco Popular por ahorrar?",
    description:
      "El Banco Popular ofrece cuentas de ahorro con tasas de interés variables, que dependen del producto específico. En promedio están alrededor del 8% EA.",
  },
  {
    title: "¿Es seguro ahorrar en el Banco Popular?",
    description:
      "Sí, el Banco Popular es vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por Fogafín hasta por $50 millones.",
  },
  {
    title: "¿Cómo abrir una cuenta de ahorros en el Banco Popular?",
    description:
      "Puedes abrirla en línea a través de su página web o acercándote a cualquiera de sus oficinas en Colombia. Debes presentar tu cédula y diligenciar el formulario correspondiente.",
  },
  {
    title: "¿Qué costos tiene la cuenta del Banco Popular?",
    description:
      "Dependiendo del tipo de cuenta, puede tener cuota de manejo o cobros por retiros y transferencias. Sin embargo, algunos productos de alta rentabilidad ofrecen beneficios especiales.",
  },
  {
    title: "¿Puedo retirar mi dinero en cualquier momento?",
    description:
      "Sí, tu dinero siempre está disponible. Puedes retirarlo en cajeros de la red Aval, hacer transferencias o usar tu tarjeta débito.",
  },
];

const Page = () => {
  const { profitability } = useSelector((state: RootState) => state.sanity);
  console.log(profitability?.popular);
  const [selected, setSelected] = useState(0);

  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE POPULAR
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de{" "}
              {(Number(profitability?.popular[selected]) * 100).toFixed(2)} %
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <div className="relative max-w-4/6 md:max-w-3/6 lg:max-w-2/6 mx-auto my-8">
              <img
                src="/assets/popular/popular.png"
                alt="popular"
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
                profitability={profitability?.popular}
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
