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
    href: "/noticias",
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
    href: "/tips-hacks",
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
    href: "/herramientas",
    subCategories: [
      {
        label: "Calculadora de rentabilidad",
        href: "/herramientas/calculadora-4x1000",
      },
      {
        label: "Calculadora de crédito",
        href: "/herramientas/conversor-dolares",
      },
      { label: "Calculadora de ahorro", href: "/herramientas/nu" },
      { label: "Simulador de inversión", href: "/herramientas/nu" },
      { label: "Comparador de tarjetas", href: "/herramientas/nu" },
      { label: "Simulador de leasing y vivienda", href: "/herramientas/nu" },
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
