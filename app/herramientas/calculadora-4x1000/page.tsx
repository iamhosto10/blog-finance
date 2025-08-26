import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "@/components/Calculator";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import Tag from "@/components/CommonComponents/Tag";

export const metadata: Metadata = {
  title: "Calculadora 4x1000 Colombia",
  description:
    "Descubre qué es el 4x1000 en Colombia, cómo funciona y usa nuestra calculadora para saber cuánto debes pagar.",
};

const info = [
  {
    title: "¿Qué es el 4x1000?",
    description:
      "Es un impuesto que se cobra en Colombia sobre las transacciones financieras. Por cada $1.000 que retires o transfieras desde una cuenta bancaria, el Estado cobra $4 como gravamen.",
  },
  {
    title: "¿Cómo funciona?",
    description:
      "El impuesto se descuenta automáticamente cuando haces un retiro, transferencia, emisión de cheque o cualquier movimiento que implique salida de dinero de tus cuentas.",
  },
  {
    title: "¿Quiénes están exentos?",
    description:
      "Puedes tener una cuenta exenta del 4x1000 si lo solicitas a tu banco. Solo una cuenta por persona puede estar exenta, y debe cumplir con condiciones como ser cuenta de ahorros o corriente y estar registrada ante la DIAN como cuenta exenta.",
  },
  {
    title: "Ejemplo práctico ",
    description:
      "Si retiras $1.000.000 COP, pagarás $4.000 COP como impuesto. El banco te entregará $996.000 COP y $4.000 se irán al Estado como parte del gravamen.",
  },
  { title: "", description: "" },
];

const Faq = [
  {
    title: "¿Qué tipo de transacciones generan el 4x1000?",
    description:
      "Retiros, transferencias, pagos, cheques y cualquier salida de dinero desde cuentas bancarias.",
  },
  {
    title: "¿Puedo tener más de una cuenta exenta?",
    description:
      "No. Solo puedes registrar una cuenta exenta por persona ante el banco y la DIAN.",
  },
  {
    title: "¿Cómo evitar el 4x1000 legalmente?",
    description:
      "Registrando una cuenta como exenta y manteniendo transferencias internas entre cuentas propias.",
  },
  {
    title: "¿Desde cuándo existe el 4x1000?",
    description:
      "Fue creado en 1998 como medida temporal, pero ha sido prorrogado hasta hoy.",
  },
];
export default function Page() {
  return (
    <div className="container md:-mt-6">
      <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
        <section className="text-center space-y-4 w-5/6 mx-auto">
          <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
            ¿CUANTO PAGAS POR EL <span className="text-primary">4x1000</span> ?
          </h1>
          <p className="text-lg text-tertiary font-canva-sans">
            Aprende sobre este impuesto financiero en Colombia y calcula
            fácilmente el valor
          </p>
        </section>
        <div className="flex flex-col md:flex-row  w-full justify-start">
          <div className="h-auto flex md:block">
            <Tag title="HERRAMIENTAS" />
          </div>
          <img
            src="/assets/4x1000/4x1000.webp"
            alt="4x1000"
            className="mx-auto max-w-5/6 md:max-w-3/6 lg:max-w-2/6 self-"
          />
          <div className="h-auto hidden md:block ">
            <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
              HERRAMIENTAS
            </p>
          </div>
        </div>

        <Card className="shadow-xl bg-tertiary-foreground">
          <CardContent className="p-3 md:p-5 lg:p-8">
            <Calculator />
          </CardContent>
        </Card>

        <InfoSection data={info} />

        <FAQ data={Faq} />
      </div>
    </div>
  );
}
