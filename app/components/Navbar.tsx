"use client";

// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";

// const menuItems = [
//   { label: "BLOG", href: "/blog" },
//   { label: "NOTICIAS", href: "/noticias" },
//   { label: "TIPS & HACKS", href: "/tips-hacks" },
//   { label: "HERRAMIENTAS", href: "/herramientas" },
// ];

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
        {menuItems.map((item) => (
          // <Link
          //   key={item.label}
          //   href={item.href}
          //   onClick={() => setActive(item.label)}
          //   className={`relative font-semibold text-white drop-shadow-md transition
          //     ${active === item.label ? "text-white" : "text-gray-100"}`}
          // >
          //   {item.label}
          //   {/* Triángulo indicador */}
          //   {active === item.label && (
          //     <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-background" />
          //   )}
          // </Link>
          <></>
        ))}
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

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import { ModeToggle } from "./ModeToggle";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { href: "/", label: "Inicio" },
//     { href: "/about", label: "Sobre mí" },
//     { href: "/blog", label: "Blog" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-accent shadow-md transition-all">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link href="/">
//           <div className="flex items-center space-x-2 transition-all duration-300">
//             <img
//               src={"/next.svg"} // Cambia esto por tu ruta real
//               alt="Logo"
//               className={clsx(
//                 "transition-all duration-300"
//                 // scrolled ? "w-8" : "w-12"
//               )}
//             />
//             {/* <span
//               className={clsx(
//                 "font-bold transition-all duration-300",
//                 scrolled ? "text-lg" : "text-2xl"
//               )}
//             >
//               MiSitio
//             </span> */}
//           </div>
//         </Link>

//         <nav className="flex items-center space-x-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={clsx(
//                 "text-xl px-2 py-1 rounded transition-colors",
//                 pathname === item.href
//                   ? "bg-primary text-secondary font-semibold "
//                   : "text-primary hover:bg-primary hover:text-secondary hover:font-semibold"
//               )}
//             >
//               <h2>{item.label}</h2>
//             </Link>
//           ))}
//         </nav>

//         <ModeToggle />
//       </div>
//     </header>
//   );
// }

// export default function Navbar() {
//   return (
//     <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
//       <Link href="/" className="font-bold text-3xl">
//         Finance<span className="text-primary">Blog</span>
//       </Link>

//       <ModeToggle />
//     </nav>
//   );
// }
