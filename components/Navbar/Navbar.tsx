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
      { label: "Ahorro y presupuesto", href: "/blog/recientes" },
      { label: "Inversión", href: "/blog/opinion" },
      { label: "Deudas y créditos", href: "/blog/entrevistas" },
      { label: "Comprar vivienda", href: "/blog/" },
      { label: "Finanzas en pareja", href: "/blog/" },
      { label: "Educación financiera", href: "/blog/" },
    ],
  },
  {
    label: "ECONOMIA HOY",
    href: "/economia-hoy",
    subCategories: [
      { label: "Bancos en Colombia", href: "/noticias/ultimas" },
      { label: "Cripto y nuevas tecnologías", href: "/noticias/economia" },
      { label: "Economía del país", href: "/noticias/tecnologia" },
      { label: "Regulaciones", href: "/noticias/tecnologia" },
      { label: "Tasas de interés", href: "/noticias/tecnologia" },
      { label: "Impuestos", href: "/noticias/tecnologia" },
    ],
  },
  {
    label: "TIPS FINANCIEROS",
    href: "/tips-financieros",
    subCategories: [
      { label: "Cajeros y bancos", href: "/tips/ahorro" },
      { label: "Compras y ahorro diario", href: "/tips/productividad" },
      { label: "Seguridad financiera", href: "/tips/productividad" },
      { label: "Apps y herramientas útiles", href: "/tips/productividad" },
      {
        label: "Manejo del dinero en el extranjero",
        href: "/tips/productividad",
      },
      { label: "Historial crediticio", href: "/tips/productividad" },
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
        href: "/calculadoras/conversor-de-dolares",
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
