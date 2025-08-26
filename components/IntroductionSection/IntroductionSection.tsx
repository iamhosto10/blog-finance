import FeatureCard from "../CommonComponents/FeatureCard/FeatureCard";
import { Card, CardContent } from "../ui/card";

const IntroductionSection = () => {
  return (
    <Card className="shadow-xl bg-tertiary-foreground w-full my-10 lg:my-16">
      <CardContent className="p-3 md:p-5 lg:p-8">
        <h2 className="font-agrandir font-bold text-secondary text-xl text-center  md:text-2xl lg:text-3xl">
          ¿QUE ENCONTRARAS EN LA <span className="text-primary">PAGINA</span> ?
        </h2>
        <p className="font-canva-sans text-tertiary mb-4 text-center md:w-2/3 mx-auto my-4">
          Ahorrar para una vivienda propia es uno de los grandes retos
          financieros de la vida adulta. La respuesta a cuántos años necesitas
          dependerá de tu ingreso
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-5 lg:gap-x-16 md:gap-y-7 ">
          <FeatureCard
            url="/"
            title="Herramientas"
            subtitle="Lorem Ipsum, Lorem Ipsum"
          />
          <FeatureCard
            url="/"
            title="Blog"
            subtitle="Lorem Ipsum, Lorem Ipsum"
          />

          <FeatureCard
            url="/"
            title="Tips y hacks"
            subtitle="Lorem Ipsum, Lorem Ipsum"
          />
          <FeatureCard
            url="/"
            title="Noticias"
            subtitle="Lorem Ipsum, Lorem Ipsum"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IntroductionSection;
