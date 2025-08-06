import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="que-se-grava">
          <AccordionTrigger>
            ¿Qué tipo de transacciones generan el 4x1000?
          </AccordionTrigger>
          <AccordionContent>
            Retiros, transferencias, pagos, cheques y cualquier salida de dinero
            desde cuentas bancarias.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cuentas-exentas">
          <AccordionTrigger>
            ¿Puedo tener más de una cuenta exenta?
          </AccordionTrigger>
          <AccordionContent>
            No. Solo puedes registrar una cuenta exenta por persona ante el
            banco y la DIAN.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="como-evitar">
          <AccordionTrigger>
            ¿Cómo evitar el 4x1000 legalmente?
          </AccordionTrigger>
          <AccordionContent>
            Registrando una cuenta como exenta y manteniendo transferencias
            internas entre cuentas propias.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="desde-cuando">
          <AccordionTrigger>¿Desde cuándo existe el 4x1000?</AccordionTrigger>
          <AccordionContent>
            Fue creado en 1998 como medida temporal, pero ha sido prorrogado
            hasta hoy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
