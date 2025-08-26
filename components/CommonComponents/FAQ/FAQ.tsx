import Item from "./Item";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface IItem {
  title: string;
  description: string;
}

interface IFaqProps {
  data: IItem[];
}
export function FAQ({ data }: IFaqProps) {
  return (
    <section className="space-y-6 pt-5">
      <h2 className="text-3xl font-bold text-primary font-agrandir">
        Preguntas Frecuentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {data?.map((item, index) => (
          <Item key={index} title={item.title} description={item.description} />
        ))}
        {/* <AccordionItem value="que-se-grava">
          <AccordionTrigger className="text-lg md:text-xl text-secondary font-agrandir">
            ¿Qué tipo de transacciones generan el 4x1000?
          </AccordionTrigger>
          <AccordionContent className="font-canva-sans text-tertiary">
            Retiros, transferencias, pagos, cheques y cualquier salida de dinero
            desde cuentas bancarias.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cuentas-exentas">
          <AccordionTrigger className="text-secondary font-agrandir">
            ¿Puedo tener más de una cuenta exenta?
          </AccordionTrigger>
          <AccordionContent className="font-canva-sans text-tertiary">
            No. Solo puedes registrar una cuenta exenta por persona ante el
            banco y la DIAN.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="como-evitar">
          <AccordionTrigger className="text-secondary font-agrandir">
            ¿Cómo evitar el 4x1000 legalmente?
          </AccordionTrigger>
          <AccordionContent className="font-canva-sans text-tertiary">
            Registrando una cuenta como exenta y manteniendo transferencias
            internas entre cuentas propias.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="desde-cuando">
          <AccordionTrigger className="text-secondary font-agrandir">
            ¿Desde cuándo existe el 4x1000?
          </AccordionTrigger>
          <AccordionContent className="font-canva-sans text-tertiary">
            Fue creado en 1998 como medida temporal, pero ha sido prorrogado
            hasta hoy.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </section>
  );
}
