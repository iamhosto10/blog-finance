"use client";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export type SubCategory = { label: string; href: string };

const menuItems = [
  {
    label: "FINANZAS PERSONALES",
    href: "/finanzas-personales",
    subCategories: [
      {
        label: "Ahorro y presupuesto",
        href: "/finanzas-personales/ahorro-y-presupuesto",
      },
      { label: "Inversión", href: "/finanzas-personales/inversion" },
      {
        label: "Deudas y créditos",
        href: "/finanzas-personales/deudas-y-creditos",
      },
      {
        label: "Comprar vivienda",
        href: "/finanzas-personales/comprar-vivienda",
      },
      {
        label: "Finanzas en pareja",
        href: "/finanzas-personales/finanzas-en-pareja",
      },
      {
        label: "Educación financiera",
        href: "/finanzas-personales/educacion-financiera",
      },
    ],
  },
  {
    label: "ECONOMIA HOY",
    href: "/economia-hoy",
    subCategories: [
      { label: "Bancos en Colombia", href: "/economia-hoy/bancos-en-colombia" },
      {
        label: "Cripto y nuevas tecnologías",
        href: "/economia-hoy/cripto-y-nuevas-tecnologias",
      },
      { label: "Economía del país", href: "/economia-hoy/economia-del-pais" },
      { label: "Regulaciones", href: "/economia-hoy/regulaciones" },
      { label: "Tasas de interés", href: "/economia-hoy/tasas-de-interes" },
      { label: "Impuestos", href: "/economia-hoy/impuestos" },
    ],
  },
  {
    label: "TIPS FINANCIEROS",
    href: "/tips-financieros",
    subCategories: [
      { label: "Cajeros y bancos", href: "/tips-financieros/cajeros-y-bancos" },
      {
        label: "Compras y ahorro diario",
        href: "/tips-financieros/compras-y-ahorro-diario",
      },
      {
        label: "Seguridad financiera",
        href: "/tips-financieros/seguridad-financiera",
      },
      {
        label: "Apps y herramientas útiles",
        href: "/tips-financieros/apps-y-herramientas-utiles",
      },
      {
        label: "Manejo del dinero en el extranjero",
        href: "/tips-financieros/manejo-de-dinero-en-el-extranjero",
      },
      {
        label: "Historial crediticio",
        href: "/tips-financieros/historial-crediticio",
      },
    ],
  },
  {
    label: "CALCULADORAS",
    href: "/calculadoras",
    subCategories: [
      {
        label: "Calculadora de rentabilidad",
        href: "/calculadoras/calculadora-de-rentabilidad",
      },
      {
        label: "Calculadora de crédito",
        href: "/calculadoras/calculadora-de-credito",
      },
      {
        label: "Calculadora de ahorro",
        href: "/calculadoras/calculadora-de-ahorro",
      },
      {
        label: "Simulador de inversión",
        href: "/calculadoras/simulador-de-inversion",
      },
      {
        label: "Comparador de tarjetas",
        href: "/calculadoras/comparador-de-tarjetas",
      },
      {
        label: "Simulador de leasing y vivienda",
        href: "/calculadoras/simulador-de-leasing-y-vivienda",
      },
      {
        label: "Calculadora 4X1000",
        href: "/calculadoras/4x1000",
      },
      {
        label: "Conversor de dolares",
        href: "/calculadoras/conversor-dolares",
      },
    ],
  },
];

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}

export default function Navbar({ open, setOpen, pathname }: NavbarProps) {
  return (
    <header>
      {/* Desktop */}
      <nav className="hidden lg:flex w-full items-center relative z-10 px-1">
        <DesktopMenu
          menuItems={menuItems.slice(0, 2)}
          pathname={pathname}
          first
        />
        <Logo />
        <DesktopMenu menuItems={menuItems.slice(2, 4)} pathname={pathname} />
      </nav>

      {/* Mobile */}
      <nav className="block lg:hidden relative z-10">
        <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} />
      </nav>
    </header>
  );
}
