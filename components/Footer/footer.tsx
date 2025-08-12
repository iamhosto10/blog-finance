"use client";

import Image from "next/image";
import { ReactSVG } from "react-svg";

const Footer = () => {
  return (
    <footer className="bg-tertiary text-background px-10 md:px-20 py-10 self-end">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Imagen */}
        <div className="flex flex-col flex-shrink-0 gap-8">
          <Image
            src="/assets/Layout/Navbar/logo.jpeg" // Cambia por tu imagen
            alt="Wallet en la nube"
            width={300}
            height={300}
            className="rounded-2xl"
          />
          <div className="hidden md:flex gap-4">
            <span className="font-semibold font-agrandir text-xl self-end">
              Síguenos
            </span>
            <ReactSVG
              src="/assets/Layout/Facebook.svg"
              className="size-10 fill-background self-start cursor-pointer"
            />
            <ReactSVG
              src="/assets/Layout/Instagram.svg"
              className="size-10 fill-background self-start cursor-pointer"
            />
            <ReactSVG
              src="/assets/Layout/Youtube.svg"
              className="size-10 fill-background self-start cursor-pointer"
            />
          </div>
        </div>

        {/* Texto y botón */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-3xl md:text-7xl font-bold font-agrandir">
            WALLET EN LA NUBE
          </h2>
          <p className="mt-4 text-sm font-canva-sans">
            Para más información, ayuda y asesoría, puedes suscribirte a nuestra
            página web y recibir contenido personalizado
          </p>
          <button className="mt-6 px-6 py-2  border-background border-4 rounded-full font-semibold hover:bg-background hover:text-tertiary transition cursor-pointer">
            SUSCRÍBETE
          </button>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="flex flex-col items-center mt-10 gap-4 ">
        <div className="flex items-center gap-4 md:hidden">
          <span className="font-semibold font-agrandir">Síguenos</span>
          <ReactSVG
            src="/assets/Layout/Facebook.svg"
            className="size-6 fill-background"
          />
          <ReactSVG
            src="/assets/Layout/Instagram.svg"
            className="size-6 fill-background"
          />
          <ReactSVG
            src="/assets/Layout/Youtube.svg"
            className="size-6 fill-background"
          />
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-1 bg-background mt-4"></div>

        {/* Links legales */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-4">
          <p className="font-agrandir font-bold text-sm">
            © Wallet en la nube 2025
          </p>

          <div className="flex flex-row items-center gap-4 text-sm">
            <a href="#" className="font-agrandir font-bold">
              Política de privacidad
            </a>
            <a href="#" className="font-agrandir font-bold">
              Política de cookies
            </a>
          </div>

          {/* Copyright */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
