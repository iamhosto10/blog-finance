"use client";

import {
  MenuIcon,
  XIcon,
  SearchIcon,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { ReactSVG } from "react-svg";
import Logo from "./Logo";
import Link from "next/link";
import { useState } from "react";

type SubCategory = { label: string; href: string };

interface MenuItem {
  label: string;
  href: string;
  subCategories: SubCategory[];
}

interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: MenuItem[];
}

export default function MobileMenu({
  open,
  setOpen,
  menuItems,
}: MobileMenuProps) {
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <>
      <div className="h-24">
        <nav className="flex items-center justify-between px-4 py-3 bg-primary-background rounded-t-2xl max-h-12">
          <Logo small />
          {/* Logo pequeño se importa desde el padre */}
          <div className="flex items-center gap-4">
            <SearchIcon className="text-secondary w-6 h-6 cursor-pointer" />
            {open ? (
              <XIcon
                className="w-6 h-6 text-secondary cursor-pointer"
                onClick={() => setOpen(false)}
              />
            ) : (
              <MenuIcon
                className="w-6 h-6 text-secondary cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </nav>
      </div>
      {open && (
        <div className="h-screen bg-background p-4">
          <h2 className="text-primary font-bold mb-4 uppercase">Categorías</h2>
          <ul className="space-y-4">
            {/* {menuLabels.map((label) => (
              <li
                key={label}
                className="text-secondary font-semibold border-b border-secondary pb-2 cursor-pointer hover:underline"
              >
                {label}
              </li>
            ))} */}
            {menuItems.map((item) => {
              const active = activeMenu === item.label;
              return (
                <>
                  <li
                    key={item.label}
                    className="flex justify-between text-secondary font-semibold border-b border-secondary pb-2 cursor-pointer hover:underline"
                  >
                    <Link
                      href={item.href}
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {active ? (
                      <ChevronDown onClick={() => setActiveMenu("")} />
                    ) : (
                      <ChevronRight onClick={() => setActiveMenu(item.label)} />
                    )}
                  </li>
                  {active && (
                    <ul>
                      {item.subCategories.map((sub, idx) => (
                        <Link
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="w-full"
                          key={idx}
                        >
                          <li> {sub.label}</li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </>
              );
            })}
          </ul>

          <div className="flex gap-4 mt-8">
            <div className="flex flex-wrap items-end justify-end gap-2 max-w-full bg-background rounded-b-4xl">
              {["Facebook", "Instagram", "Youtube"].map((network) => (
                <ReactSVG
                  key={network}
                  src={`/assets/Layout/${network}.svg`}
                  className="w-6 h-6 fill-accent"
                  aria-label={network}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
