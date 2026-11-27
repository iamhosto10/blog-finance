import JsonLd from "@/components/CommonComponents/JsonLd";
import {
  buildInstitutionalPageJsonLd,
  buildInstitutionalPageMetadata,
} from "@/lib/structuredData";
import Clientpage from "./Clientpage";

export const metadata = buildInstitutionalPageMetadata({
  title: "Sobre Nosotros",
  description:
    "Conoce al equipo detrás de Monopolombiano: nuestra misión de educación financiera y herramientas gratuitas para tomar mejores decisiones con tu dinero en Colombia.",
  keywords: [
    "sobre Monopolombiano",
    "equipo Monopolombiano",
    "educación financiera Colombia",
    "contacto Monopolombiano",
  ],
  path: "/sobre-nosotros",
});

const page = () => {
  return (
    <>
      <JsonLd
        data={buildInstitutionalPageJsonLd({
          name: "Sobre Nosotros — Monopolombiano",
          description:
            "Equipo y propósito editorial de Monopolombiano: educación financiera y calculadoras gratuitas para Colombia.",
          path: "/sobre-nosotros",
          pageType: "AboutPage",
        })}
      />
      <Clientpage />
    </>
  );
};

export default page;
