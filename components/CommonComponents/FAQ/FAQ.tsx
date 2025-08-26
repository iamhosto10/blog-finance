import Item from "./Item";
import { Accordion } from "@/components/ui/accordion";

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
      </Accordion>
    </section>
  );
}
