"use client";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export type SubCategory = { label: string; href: string };

const menuItems = [
  {
    label: "BLOG",
    href: "/blog",
    subCategories: [
      { label: "Artículos recientes", href: "/blog/recientes" },
      { label: "Opinión", href: "/blog/opinion" },
      { label: "Entrevistas", href: "/blog/entrevistas" },
    ],
  },
  {
    label: "NOTICIAS",
    href: "/noticias",
    subCategories: [
      { label: "Últimas noticias", href: "/noticias/ultimas" },
      { label: "Economía", href: "/noticias/economia" },
      { label: "Tecnología", href: "/noticias/tecnologia" },
    ],
  },
  {
    label: "TIPS & HACKS",
    href: "/tips-hacks",
    subCategories: [
      { label: "Ahorro", href: "/tips/ahorro" },
      { label: "Productividad", href: "/tips/productividad" },
    ],
  },
  {
    label: "HERRAMIENTAS",
    href: "/herramientas",
    subCategories: [
      { label: "Calculadora 4x1000", href: "/herramientas/calculadora-4x1000" },
      { label: "Conversor dolar", href: "/herramientas/conversor-dolares" },
      { label: "Nu", href: "/herramientas/nu" },
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
      <nav className="hidden lg:flex w-full items-center px-6 relative top-[-80px] z-10">
        <Logo />
        <DesktopMenu menuItems={menuItems} pathname={pathname} />
      </nav>

      {/* Mobile */}
      <nav className="block lg:hidden relative z-10">
        <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} />
      </nav>
    </header>
  );
}
