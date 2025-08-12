"use client";

import { MenuIcon, XIcon, SearchIcon } from "lucide-react";
import { ReactSVG } from "react-svg";
import Logo from "./Logo";

interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuLabels: string[];
}

export default function MobileMenu({
  open,
  setOpen,
  menuLabels,
}: MobileMenuProps) {
  return (
    <>
      <div className="h-24">
        <nav className="flex items-center justify-between px-4 py-3 bg-primary rounded-t-2xl max-h-12">
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
            {menuLabels.map((label) => (
              <li
                key={label}
                className="text-secondary font-semibold border-b border-secondary pb-2 cursor-pointer hover:underline"
              >
                {label}
              </li>
            ))}
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
