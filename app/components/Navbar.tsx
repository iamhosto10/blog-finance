"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

export default function Navbar() {
  const [active, setActive] = useState("BLOG");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <nav className="w-full flex items-center px-6 top-[-80px] relative ">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/assets/Layout/Navbar/logo.jpeg" // Cambia por tu ruta real
          alt="Logo"
          width={180}
          height={180}
          className="rounded-lg"
        />
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
  );
}
