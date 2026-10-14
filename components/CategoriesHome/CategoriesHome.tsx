import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoriesHome = () => {
  const renderLink = (href: string, label: string) => (
    <li key={href}>
      <Link href={href} className="flex items-center group">
        <div className="w-5 transition-transform duration-200 group-hover:translate-x-1">
          <ArrowRight
            size={20}
            className="text-secondary mr-1"
            absoluteStrokeWidth
            strokeWidth={3}
          />
        </div>
        <span className="font-canva-sans text-tertiary line-clamp-2 group-hover:text-secondary transition-colors">
          {label}
        </span>
      </Link>
    </li>
  );

  return (
    <div className="reveal">
      <h2
        className="font-agrandir font-bold text-lg"
      >
        FINANZAS PERSONALES
      </h2>
      <ul className="space-y-2 mt-2">
        {renderLink(
          "/finanzas-personales/ahorro-y-presupuesto",
          "Ahorro y presupuesto",
        )}
        {renderLink("/finanzas-personales/inversion", "Inversión")}
        {renderLink(
          "/finanzas-personales/deudas-y-creditos",
          "Deudas y créditos",
        )}
        {renderLink(
          "/finanzas-personales/comprar-vivienda",
          "Comprar vivienda",
        )}
        {renderLink(
          "/finanzas-personales/finanzas-en-pareja",
          "Finanzas en Pareja",
        )}
        {renderLink(
          "/finanzas-personales/educacion-financiera",
          "Educación Financiera",
        )}
      </ul>

      <h2
        className="font-agrandir font-bold text-lg mt-5"
      >
        ECONOMÍA HOY
      </h2>
      <ul className="space-y-2 mt-2">
        {renderLink("/economia-hoy/bancos-en-colombia", "Bancos en Colombia")}
        {renderLink(
          "/economia-hoy/cripto-y-nuevas-tecnologias",
          "Cripto y nuevas tecnologías",
        )}
        {renderLink("/economia-hoy/economia-del-pais", "Economía del país")}
        {renderLink("/economia-hoy/regulaciones", "Regulaciones")}
        {renderLink("/economia-hoy/tasas-de-interes", "Tasas de interés")}
        {renderLink("/economia-hoy/impuestos", "Impuestos")}
      </ul>

      <h2
        className="font-agrandir font-bold text-lg mt-5"
      >
        TIPS FINANCIEROS
      </h2>
      <ul className="space-y-2 mt-2">
        {renderLink("/tips-financieros/cajeros-y-bancos", "Cajeros y bancos")}
        {renderLink(
          "/tips-financieros/compras-y-ahorro-diario",
          "Compras y ahorro diario",
        )}
        {renderLink(
          "/tips-financieros/seguridad-financiera",
          "Seguridad financiera",
        )}
        {renderLink(
          "/tips-financieros/apps-y-herramientas-utiles",
          "Apps y herramientas útiles",
        )}
        {renderLink(
          "/tips-financieros/manejo-de-dinero-en-el-extranjero",
          "Manejo del dinero en el extranjero",
        )}
        {renderLink(
          "/tips-financieros/historial-crediticio",
          "Historial crediticio",
        )}
      </ul>
    </div>
  );
};

export default CategoriesHome;
