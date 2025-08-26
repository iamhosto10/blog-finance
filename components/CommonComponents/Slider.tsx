"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const items = [
  {
    title: "Simulador CDT",
    subtitle: "(Certificado de Depósito a Término)",
    icon: "/icons/cdt.svg",
  },
  {
    title: "Calculadora de Interés",
    subtitle: "(Interés Compuesto)",
    icon: "/icons/calculadora.svg",
  },
  {
    title: "Conversor de Moneda",
    subtitle: "(Dólar, Euro, etc.)",
    icon: "/icons/conversor.svg",
  },
];

export default function InfiniteSlider() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Velocidad de auto-scroll
  const speed = 0.5; // px por frame

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
              className="flex items-center justify-between border border-secondary rounded-xl px-4 py-3 gap-4 w-[300px] sm:w-[350px] flex-shrink-0 bg-white shadow-sm  hover:scale-105 transition-all"
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
