import { Separator } from "@/components/ui/separator";
import Info from "./Info";

export interface IInfoProps {
  title: string;
  description: string;
}
interface IInfoSectionProps {
  data: IInfoProps[];
}

export function InfoSection({ data }: IInfoSectionProps) {
  return (
    <section className="space-y-8 pt-5 lg:pt-10">
      {data?.map((item, index) => (
        <>
          {index !== 0 && <Separator />}
          <Info key={index} title={item.title} description={item.description} />
        </>
      ))}
    </section>
  );
}
