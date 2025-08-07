"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon, SearchIcon } from "lucide-react";
import { ReactSVG } from "react-svg";

type SubCategory = { label: string; href: string };

const menuItems: {
  label: string;
  href: string;
  subCategories: SubCategory[];
}[] = [
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

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ open, setOpen }: IProps) {
  const [active, setActive] = useState("BLOG");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <>
      <nav className="hidden lg:flex w-full items-center px-6 top-[-80px] relative ">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/Layout/Navbar/logo.jpeg"
              alt="Logo"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* Menú */}
        <div className="w-full flex gap-6 bg-primary px-8 py-2 rounded-lg rounded-l-none relative justify-between self-end top-[-50px]">
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredMenu(item.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                href={item.href}
                onClick={() => setActive(item.label)}
                className={`relative font-semibold text-white drop-shadow-md transition`}
              >
                {item.label}
                {/* Triángulo indicador */}
                {(active === item.label || hoveredMenu === item.label) && (
                  <div className="w-full bg-primary">
                    <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-background" />
                  </div>
                )}
                {}
              </Link>

              {/* Modal de subcategorías */}
              {hoveredMenu === item.label && (
                <div
                  className={`absolute left-1/2 ${index >= menuItems.length / 2 ? "-translate-x-4/5" : "-translate-x-1/5"} mt-2 bg-white shadow-lg rounded-lg p-4 w-56 z-50`}
                >
                  {item.subCategories.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
      <div className="block lg:hidden">
        <div className="h-24">
          <nav className="flex  items-center justify-between px-4 py-3 bg-primary rounded-t-2xl">
            {/* Logo */}
            <div className="flex items-center gap-2 -bottom-5 relative">
              <Link href="/">
                <Image
                  src="/assets/Layout/Navbar/logo.jpeg"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </Link>
            </div>

            {/* Botones lado derecho */}
            <div className="flex items-center gap-4">
              <SearchIcon className="text-secondary w-6 h-6 cursor-pointer" />
              {open ? (
                <XIcon
                  className="w-6 h-6 text-secondary cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              ) : (
                <MenuIcon
                  className="text-secondary w-6 h-6 cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </nav>
        </div>
        {open && (
          <div className="h-screen bg-background p-4">
            {/* Categorías */}
            <h2 className="text-primary font-bold mb-4 uppercase">
              Categorías
            </h2>
            <ul className="space-y-4">
              {["Blog", "Noticias", "Tips & Hacks", "Herramientas"].map(
                (item) => (
                  <li
                    key={item}
                    className="text-secondary font-semibold border-b border-secondary pb-2 cursor-pointer hover:underline"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-8">
              <div className="flex flex-row flex-wrap items-end justify-end gap-2 max-w-full bg-background rounded-b-4xl">
                <ReactSVG
                  src="/assets/Layout/Facebook.svg"
                  className="w-6 h-6 fill-accent"
                />
                <ReactSVG
                  src="/assets/Layout/Instagram.svg"
                  className="w-6 h-6 fill-accent"
                />
                <ReactSVG
                  src="/assets/Layout/Youtube.svg"
                  className="w-6 h-6 fill-accent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
