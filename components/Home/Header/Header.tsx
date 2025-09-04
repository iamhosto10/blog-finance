import React from "react";

const Header = () => {
  return (
    <>
      <div
        className="
    relative hidden md:flex flex-row justify-between items-center
    w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px]
    bg-[url('/assets/Header/headerBackground.png')] bg-contain bg-no-repeat bg-center
    -mt-20 lg:top-[-60px] z-0 lg:px-12
  "
      >
        {/* Texto principal */}
        <div className="flex flex-col justify-center h-full w-7/12 mx-auto pl-5 pb-30">
          {/* Título con ícono */}
          <div className="flex items-center h-auto">
            <h2
              className="
          font-agrandir font-bold text-primary
          md:text-[36px] lg:text-4xl xl:text-5xl 2xl:text-8xl
          self-end mt-6 xl:mt-10 z-10
        "
            >
              EL BLOG PERFECTO
            </h2>
            <img
              src="/assets/Header/icon.png"
              alt="icon"
              className="size-11 xl:size-16 self-start -ml-3 lg:-ml-4 xl:-ml-5 z-0"
            />
          </div>

          {/* Subtítulo */}
          <h3 className="font-agrandir">
            <span className="flex gap-1">
              <span className="md:text-xl xl:text-2xl">para una</span>
              <span className="md:text-2xl xl:text-5xl">VIDA FINANCIERA</span>
            </span>
            <span
              className="
          md:text-[36px] xl:text-6xl
          font-agrandir font-bold text-primary
        "
            >
              PRECISA
            </span>
          </h3>
        </div>

        {/* Imagen principal */}
        <img
          src="/assets/Header/mainimage.png"
          alt="main"
          className="
      w-[200px] md:w-[325px] lg:w-[450px] xl:w-[600px] 2xl:w-[1000px]
      aspect-square
    "
        />
      </div>
      <div
        className="relative md:hidden flex flex-col items-center justify-between
    w-full h-[70vh]
    bg-[url('/assets/Header/headerBackgroundMobile.png')] bg-cover bg-no-repeat bg-center
    -mt-20 mb-6 z-0"
      >
        <div className="flex flex-col h-auto w-full px-10 items-center text-center">
          {/* Título con ícono */}

          <h2
            className=" text-3xl w-full
          font-agrandir font-bold text-primary mt-14 z-10
        "
          >
            EL BLOG PERFECTO
          </h2>

          {/* Subtítulo */}
          <h3 className="font-agrandir">
            <span className="flex gap-1">
              <span className="text-2xl text-tertiary">para una</span>
              <span className="text-2xl font-bold">VIDA FINANCIERA</span>
            </span>
            <span
              className="
          font-agrandir font-bold text-primary text-center text-4xl 
        "
            >
              PRECISA
            </span>
          </h3>
        </div>
        <img
          src="/assets/Header/mainimage.png"
          alt="main"
          className="
      w-[80%]
      max-w-[450px]

      aspect-square
    "
        />
      </div>
    </>
  );
};

export default Header;
