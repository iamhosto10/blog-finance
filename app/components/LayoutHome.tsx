"use client";
import React, { useState } from "react";
import SocialMedia from "./SocialMedia";
import Navbar from "./Navbar/Navbar";

const LayoutHome = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SocialMedia />
      <div className="my-6 mx-5 pb-10 lg:my-10 lg:mx-16 bg-background rounded-4xl">
        <Navbar open={open} setOpen={setOpen} />
        {!open && <main className="w-full mx-auto px-4">{children}</main>}
      </div>
    </>
  );
};

export default LayoutHome;
