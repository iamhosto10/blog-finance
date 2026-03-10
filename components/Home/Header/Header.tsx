import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px] -mt-20 lg:top-[-60px] z-0 mb-10 overflow-hidden">
      {/* 1. Fondo Principal Optimizado */}
      <Image
        src="/assets/Header/headerBackground1.png"
        alt="Fondo Header"
        fill
        priority // Esto le dice a Google que cargue esta imagen PRIMERO
        className="object-cover object-center -z-10"
        sizes="100vw"
        quality={90}
      />

      <div className="relative flex flex-col justify-center items-center h-full lg:px-12">
        <div className="flex flex-col items-center -mt-10 md:-mt-20">
          {/* 2. El contenedor del título con su propia imagen de fondo optimizada */}
          <div className="relative w-auto group">
            {/* Imagen de "Screen" optimizada */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/assets/Layout/Screen.png"
                alt="Background Screen"
                fill
                priority
                className="object-cover"
              />
            </div>

            <h1 className="py-2 px-5 md:py-4 md:px-10 xl:py-6 xl:px-20 font-league-gothics font-bold text-white text-xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl relative">
              EL BLOG PERFECTO
            </h1>
          </div>

          <h2 className="bg-secondary py-1 px-6 md:py-2 md:px-16 xl:py-5 xl:px-28 font-league-gothics font-bold text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl">
            PARA UNA VIDA FINANCIERA PRECISA
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
