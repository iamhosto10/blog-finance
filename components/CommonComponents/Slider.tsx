import { ChevronRight } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Calculadoras de Rentabilidad",
    subtitle: "🏦 Simula las rentabilidades de Bancos",
    icon: "/icons/cdt.svg",
    href: "calculadoras/calculadora-de-rentabilidad",
  },
  {
    title: "Calculadora de Crédito",
    subtitle: "📊 Proyecta tus pagos mensuales",
    icon: "/icons/calculadora.svg",
    href: "calculadoras/calculadora-de-credito",
  },
  {
    title: "Calculadora de Ahorro",
    subtitle: "🔮 Visualiza el crecimiento de tu ahorro",
    icon: "/icons/conversor.svg",
    href: "calculadoras/calculadora-de-ahorro",
  },
  {
    title: "Simulador de Inversión",
    subtitle: "🧮 Visualiza tus ganancias potenciales",
    icon: "/icons/cdt.svg",
    href: "calculadoras/simulador-de-inversion",
  },
  {
    title: "Comparador de Tarjetas",
    subtitle: "💳 Encuentra la tarjeta ideal",
    icon: "/icons/cdt.svg",
    href: "calculadoras/comparador-de-tarjetas",
  },
  {
    title: "Simulador de Leasing y Vivienda",
    subtitle: "🏠 Calcula tus cuotas hipotecarias",
    icon: "/icons/cdt.svg",
    href: "calculadoras/simulador-de-leasing-y-vivienda",
  },
  {
    title: "Calculadora de 4x1000",
    subtitle: "🏦 Descubre cuánto pagas en 4x1000",
    icon: "/icons/cdt.svg",
    href: "calculadoras/4x1000",
  },
  {
    title: "Conversor de Dolares",
    subtitle: "🔄 Calcula el cambio actual USD-COP",
    icon: "/icons/cdt.svg",
    href: "calculadoras/conversor-dolares",
  },
];

// Carrusel infinito animado solo con CSS (.animate-marquee): antes se hacía
// setState en cada frame, lo que re-renderizaba React 60 veces por segundo.
// Se pausa con hover/foco; con "reducir movimiento" queda como scroll manual.
export default function InfiniteSlider() {
  return (
    <div className="w-full py-6 overflow-hidden motion-reduce:overflow-x-auto">
      {/* Separación con pr-4 en cada tarjeta (no gap) para que -50% caiga
          exacto al inicio de la segunda copia y el bucle no "salte". */}
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, index) => (
          <Link
            href={"/" + item.href}
            key={index}
            className="shrink-0 pr-4"
            aria-hidden={index >= items.length ? true : undefined}
            tabIndex={index >= items.length ? -1 : undefined}
          >
            <div className="flex items-center justify-between border border-secondary rounded-xl h-20 lg:h-auto px-4 py-3 gap-4 w-[300px] sm:w-[350px] flex-shrink-0 bg-white shadow-sm hover:scale-105 transition-all">
              <div className="flex items-center gap-3">
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
