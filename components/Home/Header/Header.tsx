import Image from "next/image";
import headerBackground from "@/public/assets/Header/headerBackground1.webp";
import screenBackground from "@/public/assets/Layout/Screen.webp";

// Componente de servidor: la imagen de fondo es el LCP de la home, así que se
// pinta desde el HTML inicial (priority = preload + fetchpriority alto) y solo
// se anima con CSS, sin depender de que hidrate JavaScript.
const Header = () => {
  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[600px] 2xl:h-[1000px] -mt-20 lg:top-[-60px] z-0 mb-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-hero-zoom">
        <Image
          src={headerBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
        />
      </div>

      <div className="relative flex flex-col justify-center items-center h-full lg:px-12">
        <div className="flex flex-col items-center -mt-10 md:-mt-20">
          <div
            className="relative w-auto group animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 -z-10">
              <Image
                src={screenBackground}
                alt=""
                fill
                sizes="(min-width: 1536px) 1000px, (min-width: 768px) 600px, 300px"
                className="object-cover"
              />
            </div>

            <h1 className="py-2 px-5 md:py-4 md:px-10 xl:py-6 xl:px-20 font-league-gothics font-bold text-white text-xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl relative">
              EL BLOG PERFECTO
            </h1>
          </div>
          <h2
            className="bg-secondary py-1 px-6 md:py-2 md:px-16 xl:py-5 xl:px-28 font-league-gothics font-bold text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            PARA UNA VIDA FINANCIERA PRECISA
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
