import React from "react";

const Header = () => {
  return (
    <div className="relative bg-[url('/assets/Header/headerBackground.png')] bg-contain bg-no-repeat bg-center w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px] mb-6 -mt-12 lg:top-[-60px] z-0 flex flex-row justify-between items-center ">
      <div className="h-full w-7/12 mx-auto justify-center flex flex-col pl-5 pb-30">
        <div className="flex items-center h-auto ">
          <h2 className="md:text-[26px] lg:text-4xl xl:text-5xl 2xl:text-8xl font-agrandir font-bold text-primary self-end mt-6 xl:mt-10 z-10">
            EL BLOG PERFECTO
          </h2>
          <img
            src="/assets/header/icon.png"
            alt=""
            className="size-11 xl:size-16 self-start -ml-3 lg:-ml-4 xl:-ml-5 z-0"
          />
        </div>
        <div>
          <h3 className="font-agrandir">
            <span className="flex gap-1">
              <span className="md:text-xl xl:text-2xl">para una</span>
              <span className="md:text-2xl xl:text-5xl">VIDA FINANCIERA</span>
            </span>
            <span className="md:text-[26px] xl:text-6xl font-agrandir font-bold text-primary">
              PRECISA
            </span>
          </h3>
          {/* <h2 className="md:text-4xl lg:text-6xl font-agrandir font-bold text-primary self-end mt-10 z-10">
            PRECISA
          </h2> */}
        </div>
      </div>

      <img
        src="/assets/Header/mainimage.png"
        className="w-[200px] md:w-[325px] lg:w-[450px] xl:w-[600px] 2xl:w-[1000px] aspect-square"
      />
    </div>
  );
};

export default Header;
