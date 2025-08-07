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
}

export default function DesktopMenu({ menuItems }: DesktopMenuProps) {
  const [activeMenu, setActiveMenu] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-between self-end bg-primary px-8 py-2 rounded-lg rounded-l-none relative top-[-50px]">
      {menuItems.map((item, index) => {
        const isActive =
          activeMenu === item.label || hoveredMenu === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setHoveredMenu(item.label)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              href={item.href}
              onClick={() => setActiveMenu(item.label)}
              className="relative font-semibold text-white transition drop-shadow-md"
            >
              {item.label}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-background" />
              )}
            </Link>

            {hoveredMenu === item.label && (
              <div
                className={`absolute left-1/2 ${
                  index >= menuItems.length / 2
                    ? "-translate-x-4/5"
                    : "-translate-x-1/5"
                } mt-2 w-56 p-4 bg-white shadow-lg rounded-lg z-50`}
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
