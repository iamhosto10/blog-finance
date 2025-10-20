"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const items = [
  {
    title: "Calculadoras de Rentabilidad",
    subtitle: "🏦 Simula las rentabilidades de Bancos",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Calculadora de Crédito",
    subtitle: "📊 Proyecta tus pagos mensuales",
    icon: "/icons/calculadora.svg",
  },
  {
    title: "Calculadora de Ahorro",
    subtitle: "🔮 Visualiza el crecimiento de tu ahorro",
    icon: "/icons/conversor.svg",
  },
  {
    title: "Simulador de Inversión",
    subtitle: "🧮 Visualiza tus ganancias potenciales",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Comparador de Tarjetas",
    subtitle: "💳 Encuentra la tarjeta ideal",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Simulador de Leasing y Vivienda",
    subtitle: "🏠 Calcula tus cuotas hipotecarias",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Calculadora de 4x1000",
    subtitle: "🏦 Descubre cuánto pagas en 4x1000",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Conversor de Dolares",
    subtitle: "🔄 Calcula el cambio actual USD-COP",
    icon: "/icons/cdt.svg",
  },
];

export default function InfiniteSlider() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const speed = 0.5;

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (!isDragging) {
        setOffset((prev) => prev + speed);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  // Normaliza el offset para que nunca crezca infinito
  const itemWidth = 350 + 16; // ancho tarjeta + gap
  const totalWidth = itemWidth * items.length;
  const normalizedOffset = ((offset % totalWidth) + totalWidth) % totalWidth;

  // Eventos de drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    dragOffset.current = offset;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart.current;
    setOffset(dragOffset.current - delta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStart.current = e.touches[0].clientX;
    dragOffset.current = offset;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart.current;
    setOffset(dragOffset.current - delta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full py-6 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${normalizedOffset}px)`,
          gap: "16px",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <Link href="/blog" key={index}>
            <div
              key={index}
              className="flex items-center justify-between border border-secondary rounded-xl h-20 lg:h-auto px-4 py-3 gap-4 w-[350px] sm:w-[350px] flex-shrink-0 bg-white shadow-sm  hover:scale-105 transition-all"
            >
              <div className="flex items-center gap-3">
                {/* <Image src={item.icon} alt="icon" width={32} height={32} /> */}
                <div>
                  <h2 className="font-semibold font-agrandir">{item.title}</h2>
                  <p className="font-canva-sans text-xs sm:text-sm text-gray-600">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <div className="bg-secondary p-2 rounded-full">
                <ChevronRight className="text-white" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
