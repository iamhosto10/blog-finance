"use client";

import FeatureCard from "../CommonComponents/FeatureCard/FeatureCard";
import { Card, CardContent } from "../ui/card";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const IntroductionSection = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="shadow-xl bg-tertiary-foreground w-full mb-10 lg:mb-16">
        <CardContent className="p-3 md:p-5 lg:p-8">
          <motion.h2
            variants={textVariants}
            className="font-agrandir font-bold text-secondary text-xl text-center md:text-2xl lg:text-3xl"
          >
            ¿QUE ENCONTRARAS EN LA <span className="text-primary">PAGINA</span>{" "}
            ?
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="font-canva-sans text-tertiary mb-4 text-center md:w-2/3 mx-auto my-4"
          >
            Aquí aprenderás a manejar mejor tu dinero, entender la economía
            colombiana y tomar decisiones financieras inteligentes. Desde
            consejos prácticos de ahorro hasta calculadoras que te ayudarán a
            planear tus metas, todo en un solo lugar.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-5 lg:gap-x-16 md:gap-y-7 ">
            <motion.div variants={cardVariants}>
              <FeatureCard
                url="/finanzas-personales"
                title="Finanzas Personales"
                subtitle="Ahorro, inversión, créditos, vivienda"
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <FeatureCard
                url="/economia-hoy"
                title="Economia Hoy"
                subtitle="Bancos, tasas, impuestos, criptomonedas"
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <FeatureCard
                url="/tips-financieros"
                title="Tips Financieros"
                subtitle="Consejos, seguridad, apps, historial"
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <FeatureCard
                url="/calculadoras"
                title="Calculadoras"
                subtitle="Intereses, dólar, ahorro, 4x1000"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntroductionSection;
