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
      { label: "Calculadoras", href: "/herramientas/calculadoras" },
      { label: "Conversores", href: "/herramientas/conversores" },
    ],
  },
];

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}

export default function Navbar({ open, setOpen, pathname }: NavbarProps) {
  const menuLabels = menuItems.map((item) => item.label);

  return (
    <header>
      {/* Desktop */}
      <nav className="hidden lg:flex w-full items-center px-6 relative top-[-80px]">
        <Logo />
        <DesktopMenu menuItems={menuItems} pathname={pathname} />
      </nav>

      {/* Mobile */}
      <div className="block lg:hidden">
        <MobileMenu open={open} setOpen={setOpen} menuLabels={menuLabels} />
      </div>
    </header>
  );
}
