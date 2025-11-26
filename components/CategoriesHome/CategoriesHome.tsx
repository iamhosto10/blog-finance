import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoriesHome = () => {
  return (
    <>
      <h2 className="font-agrandir font-bold text-lg ">FINANZAS PERSONALES</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href={"/finanzas-personales/ahorro-y-presupuesto"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Ahorro y presupuesto
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/finanzas-personales/inversion"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Inversión
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/finanzas-personales/deudas-y-creditos"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Deudas y créditos
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/finanzas-personales/comprar-vivienda"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Comprar vivienda
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/finanzas-personales/finanzas-en-pareja"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Finanzas en Pareja
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/finanzas-personales/educacion-financiera"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Educación Financiera
            </span>
          </Link>
        </li>
      </ul>
      <h2 className="font-agrandir font-bold text-lg mt-5">ECONOMÍA HOY</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href={"/economia-hoy/bancos-en-colombia"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Bancos en Colombia
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/economia-hoy/cripto-y-nuevas-tecnologias"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Cripto y nuevas tecnologías
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/economia-hoy/economía-del-pais"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Economía del país
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/economia-hoy/regulaciones"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Regulaciones
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/economia-hoy/tasas-de-interes"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Tasas de interés
            </span>
          </Link>
        </li>
        <li>
          <Link href={"/economia-hoy/impuestos"} className="flex items-center">
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Impuestos
            </span>
          </Link>
        </li>
      </ul>
      <h2 className="font-agrandir font-bold text-lg mt-5">TIPS FINANCIEROS</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href={"/tips-financieros/Cajeros-y-bancos"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Cajeros y bancos
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/tips-financieros/compras-y-ahorro-diario"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Compras y ahorro diario
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/tips-financieros/seguridad-financiera"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Seguridad financiera
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/tips-financieros/apps-y-herramientas-utiles"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Apps y herramientas útiles
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/tips-financieros/manejo-del-dinero-en-el-extranjero"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Manejo del dinero en el extranjero
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/tips-financieros/historial-crediticio"}
            className="flex items-center"
          >
            <div className="w-5">
              <ArrowRight
                size={20}
                className="text-secondary mr-1"
                absoluteStrokeWidth
                strokeWidth={3}
              />
            </div>
            <span className="font-canva-sans text-tertiary line-clamp-2">
              Historial crediticio
            </span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default CategoriesHome;
