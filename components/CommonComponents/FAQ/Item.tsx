import { IItem } from "./FAQ";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Item = ({ title, description }: IItem) => {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-lg md:text-xl text-secondary font-agrandir">
        {title}
      </AccordionTrigger>
      <AccordionContent className="font-canva-sans text-tertiary">
        {description}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Item;
