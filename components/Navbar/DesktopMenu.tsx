"use client";

import Link from "next/link";
import { useState } from "react";

type SubCategory = { label: string; href: string };

interface MenuItem {
  label: string;
  href: string;
  subCategories: SubCategory[];
}

interface DesktopMenuProps {
  menuItems: MenuItem[];
  pathname: string;
  first?: boolean;
}

export default function DesktopMenu({
  menuItems,
  pathname,
  first = false,
}: DesktopMenuProps) {
  const [activeMenu, setActiveMenu] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <div
      className={`flex w-full  justify-evenly  bg-primary-background py-2 rounded-lg ${first ? "rounded-r-none pr-24 pl-5" : "rounded-l-none justify-end pl-24 pr-5"}  relative top-[-10px]`}
    >
      {menuItems.map((item, index) => {
        const isActive =
          activeMenu === item.label ||
          hoveredMenu === item.label ||
          pathname.toLowerCase() === item.label.toLowerCase();

        return (
          <div
            key={item.label}
            className="relative w-auto h-full"
            onMouseEnter={() => setHoveredMenu(item.label)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              href={item.href}
              onClick={() => setActiveMenu(item.label)}
              className="font-semibold text-white  drop-shadow-md"
            >
              <div className="w-full text-center transition-all">
                <h2 className="relative w-auto line-clamp-1 text-sm xl:text-lg 2xl:text-3xl">
                  {item.label}
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-background" />
                  )}
                </h2>
              </div>
            </Link>

            {hoveredMenu === item.label && (
              <div
                className={`absolute left-1/2 ${
                  index >= menuItems.length / 2
                    ? "-translate-x-4/5"
                    : "-translate-x-1/5"
                } -mt-0.5 w-56 p-4 bg-white shadow-lg rounded-lg z-50`}
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
        );
      })}
    </div>
  );
}
