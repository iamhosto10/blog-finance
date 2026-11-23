export type RecursoKind = "template" | "service";

export interface RecursoItem {
  id: string;
  kind: RecursoKind;
  badge: string;
  title: string;
  subtitle: string;
  priceCop: number;
  priceFormatted: string;
  billingLabel: string;
  formatLabel: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  relatedCalculatorHref: string;
  relatedCalculatorLabel: string;
}

export const RECURSOS_CATALOG: RecursoItem[] = [
  {
    id: "plantilla-finanzas-colombia",
    kind: "template",
    badge: "Más vendida",
    title: "Plantilla Maestra de Finanzas Personales Colombia",
    subtitle: "Excel (.xlsx) + Google Sheets",
    priceCop: 39000,
    priceFormatted: "$39.000 COP",
    billingLabel: "Pago único · Acceso de por vida",
    formatLabel: "Excel + Google Sheets con video guía",
    description:
      "Organiza quincenas, primas, cesantías y cuentas bancarias colombianas sin pelear con fórmulas. Diseñada para controlar el 4x1000, comparar tasas EA de neobancos y acelerar el pago de tus deudas.",
    highlights: [
      "Presupuesto mensual y quincenal con regla 50/30/20 adaptada a Colombia",
      "Control automático de tope UVT y cuenta exenta del 4x1000",
      "Simulador bola de nieve / avalancha para tarjetas y créditos de consumo",
      "Tablero de ahorro, CDTs y cuentas remuneradas (Nu, Lulo, Pibank, Bold, Global66)",
    ],
    ctaLabel: "Solicitar plantilla ($39.000 COP)",
    relatedCalculatorHref: "/calculadoras/4x1000",
    relatedCalculatorLabel: "Probar calculadora 4x1000 gratis",
  },
  {
    id: "kit-comprador-vivienda",
    kind: "template",
    badge: "Actualizada 2026",
    title: "Kit Comprador de Vivienda VIS / No VIS y Leasing",
    subtitle: "Excel (.xlsx) + Checklist legal y financiero",
    priceCop: 39000,
    priceFormatted: "$39.000 COP",
    billingLabel: "Pago único · Actualizaciones incluidas",
    formatLabel: "Simulador Excel/Sheets + Guía de gastos ocultos",
    description:
      "Evita errores millonarios antes de firmar separación o crédito. Compara en segundos crédito hipotecario en Pesos vs UVR vs Leasing Habitacional incluyendo gastos notariales, escrituración y seguros.",
    highlights: [
      "Comparador real: Crédito en Pesos vs UVR vs Leasing Habitacional",
      "Cálculo de cuota inicial (20% / 30%), cesantías, FNA y subsidios VIS",
      "Presupuesto completo de gastos de escrituración, boleta fiscal y registro",
      "Simulador de abonos inteligentes a capital para reducir años e intereses",
    ],
    ctaLabel: "Solicitar kit vivienda ($39.000 COP)",
    relatedCalculatorHref: "/calculadoras/simulador-de-leasing-y-vivienda",
    relatedCalculatorLabel: "Abrir simulador de vivienda gratis",
  },
  {
    id: "diagnostico-financiero-1a1",
    kind: "service",
    badge: "Cupos limitados",
    title: "Diagnóstico Financiero 1-a-1 (60 min + Plan 90 días)",
    subtitle: "Sesión privada por videollamada",
    priceCop: 110000,
    priceFormatted: "$110.000 COP",
    billingLabel: "Sesión única + hoja de ruta en PDF",
    formatLabel: "Videollamada 60 min + seguimiento por correo",
    description:
      "Revisamos contigo tus números reales: ingresos, tarjetas, créditos, cuentas de ahorro, 4x1000 y metas de inversión o vivienda para entregarte un plan claro y accionable en los próximos 90 días.",
    highlights: [
      "Auditoría de tasas de crédito y estrategia de compra de cartera o abonos",
      "Optimización de liquidez entre cuentas de alto rendimiento y CDTs en Colombia",
      "Revisión de tu estrategia para minimizar 4x1000 y comisiones bancarias",
      "Incluye acceso incluido a la Plantilla Maestra de Finanzas Personales",
    ],
    ctaLabel: "Reservar diagnóstico ($110.000 COP)",
    relatedCalculatorHref: "/calculadoras/calculadora-de-rentabilidad",
    relatedCalculatorLabel: "Ver comparador de rentabilidad gratis",
  },
];

export interface BrebPaymentInstructions {
  key: string;
  bank: string;
  holder: string;
}

export function getBrebPaymentInstructions(): BrebPaymentInstructions {
  return {
    key: process.env.BREB_KEY?.trim() || "gerav0400@gmail.com",
    bank: process.env.BREB_BANK?.trim() || "Lulo Bank",
    holder: process.env.BREB_HOLDER?.trim() || "Gerardo Ramirez",
  };
}

export function findRecursoById(id: string): RecursoItem | undefined {
  return RECURSOS_CATALOG.find((item) => item.id === id);
}
