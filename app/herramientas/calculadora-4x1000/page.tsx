import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "@/app/components/Calculator";
import { InfoSection } from "@/app/components/InfoSection";
import { FAQ } from "@/app/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora 4x1000 Colombia",
  description:
    "Descubre qué es el 4x1000 en Colombia, cómo funciona y usa nuestra calculadora para saber cuánto debes pagar.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">¿Cuánto pagas por el 4x1000?</h1>
        <p className="text-lg text-muted-foreground">
          Aprende sobre este impuesto financiero en Colombia y calcula
          fácilmente el valor.
        </p>
      </section>

      <Card className="shadow-xl">
        <CardContent className="p-6">
          <Calculator />
        </CardContent>
      </Card>

      <InfoSection />

      <FAQ />
    </main>
  );
}
