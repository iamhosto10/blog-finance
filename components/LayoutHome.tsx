"use client";
import React, { useState } from "react";
import SocialMedia from "./SocialMedia";
import Navbar from "./Navbar/Navbar";
import { usePathname } from "next/navigation";

const LayoutHome = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().split("/");
  return (
    <>
      <SocialMedia />
      <div className="my-6 mx-5 pb-10 lg:my-10 lg:mx-12 bg-background rounded-4xl">
        <Navbar open={open} setOpen={setOpen} pathname={pathname[1]} />
        {!open && <main className="w-full mx-auto px-10">{children}</main>}
      </div>
    </>
  );
};

export default LayoutHome;
