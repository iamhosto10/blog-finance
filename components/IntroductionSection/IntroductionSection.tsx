import FeatureCard from "../CommonComponents/FeatureCard/FeatureCard";
import { Card, CardContent } from "../ui/card";

const IntroductionSection = () => {
  return (
    <div className="reveal">
      <Card className="shadow-xl bg-tertiary-foreground w-full mb-10 lg:mb-16">
        <CardContent className="p-3 md:p-5 lg:p-8">
          <h2
            className="font-agrandir font-bold text-secondary text-xl text-center md:text-2xl lg:text-3xl"
          >
            ¿QUE ENCONTRARAS EN LA <span className="text-primary">PAGINA</span>{" "}
            ?
          </h2>
          <p
            className="font-canva-sans text-tertiary mb-4 text-center md:w-2/3 mx-auto my-4"
          >
            Aquí aprenderás a manejar mejor tu dinero, entender la economía
            colombiana y tomar decisiones financieras inteligentes. Desde
            consejos prácticos de ahorro hasta calculadoras que te ayudarán a
            planear tus metas, todo en un solo lugar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-5 lg:gap-x-16 md:gap-y-7 ">
            <div>
              <FeatureCard
                url="/finanzas-personales"
                title="Finanzas Personales"
                subtitle="Ahorro, inversión, créditos, vivienda"
              />
            </div>

            <div>
              <FeatureCard
                url="/economia-hoy"
                title="Economia Hoy"
                subtitle="Bancos, tasas, impuestos, criptomonedas"
              />
            </div>

            <div>
              <FeatureCard
                url="/tips-financieros"
                title="Tips Financieros"
                subtitle="Consejos, seguridad, apps, historial"
              />
            </div>

            <div>
              <FeatureCard
                url="/calculadoras"
                title="Calculadoras"
                subtitle="Intereses, dólar, ahorro, 4x1000"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroductionSection;
