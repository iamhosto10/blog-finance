import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "@/components/Calculator";
import { InfoSection } from "@/components/InfoSection";
import { FAQ } from "@/components/CommonComponents/FAQ";
import Tag from "@/components/CommonComponents/Tag";

export const metadata: Metadata = {
  title: "Calculadora 4x1000 Colombia",
  description:
    "Descubre qué es el 4x1000 en Colombia, cómo funciona y usa nuestra calculadora para saber cuánto debes pagar.",
};

export default function HomePage() {
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

        <InfoSection />

        <FAQ />
      </div>
    </div>
  );
}
