import React from "react";

const Header = () => {
  return (
    <div
      className="
    relative flex flex-col justify-center items-center
    w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px]
    bg-[url('/assets/Header/headerBackground1.png')] bg-cover bg-no-repeat bg-center
    -mt-20 lg:top-[-60px] z-0 lg:px-12 mb-10 
  "
    >
      <div className="flex flex-col items-center -mt-10 md:-mt-20">
        <div className="bg-[url('/assets/Layout/Screen.png')] bg-cover bg-no-repeat w-auto">
          <h1 className="py-2 px-5 md:py-4 md:px-10 xl:py-6 xl:px-20 font-league-gothics font-bold text-white text-xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl">
            EL BLOG PERFECTO
          </h1>
        </div>
        <h2 className="bg-secondary py-1 px-6 md:py-2 md:px-16 xl:py-5 xl:px-28 font-league-gothics font-bold text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl">
          PARA UNA VIDA FINANCIERA PRECISA
        </h2>
      </div>
    </div>
  );
};

export default Header;
