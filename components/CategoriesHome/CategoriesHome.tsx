import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoriesHome = () => {
  return (
    <>
      <h2 className="font-agrandir font-bold text-lg ">FINANZAS PERSONALES</h2>
      <ul className="space-y-2">
        <li>
          <Link href={"/ahorro-y-presupuesto"} className="flex items-center">
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
          <Link href={"/inversion"} className="flex items-center">
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
          <Link href={"/deudas-y-creditos"} className="flex items-center">
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
          <Link href={"/comprar-vivienda"} className="flex items-center">
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
      </ul>
      <h2 className="font-agrandir font-bold text-lg mt-5">ECONOMÍA HOY</h2>
      <ul className="space-y-2">
        <li>
          <Link href={"/bancos-en-colombia"} className="flex items-center">
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
            href={"/cripto-y-nuevas-tecnologias"}
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
          <Link href={"/economía-del-pais"} className="flex items-center">
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
          <Link href={"/regulaciones"} className="flex items-center">
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
          <Link href={"/tasas-de-interes"} className="flex items-center">
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
          <Link href={"/impuestos"} className="flex items-center">
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
          <Link href={"/Cajeros-y-bancos"} className="flex items-center">
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
          <Link href={"/compras-y-ahorro-diario"} className="flex items-center">
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
          <Link href={"/seguridad-financiera"} className="flex items-center">
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
            href={"/apps-y-herramientas-utiles"}
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
            href={"/manejo-del-dinero-en-el-extranjero"}
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
          <Link href={"/historial-crediticio"} className="flex items-center">
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
