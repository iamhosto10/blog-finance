export interface MediaKitPackage {
  id: string;
  badge: string;
  title: string;
  priceLabel: string;
  billingCycle: string;
  summary: string;
  deliverables: string[];
  idealFor: string;
}

export const MEDIA_KIT_PACKAGES: MediaKitPackage[] = [
  {
    id: "patrocinio-calculadoras",
    badge: "Mayor intención",
    title: "Patrocinio en Calculadoras y Comparadores",
    priceLabel: "$650.000 COP",
    billingCycle: "por mes · cupos por categoría",
    summary:
      "Presencia destacada dentro de nuestras calculadoras de rentabilidad bancaria, 4x1000, vivienda o comparador de 20 tarjetas de crédito en Colombia.",
    deliverables: [
      "Módulo patrocinado contextual debajo de los resultados de cálculo",
      "Botón directo de solicitud con parámetros UTM y medición GA4",
      "Aviso transparente de marca aliada integrado al diseño del sitio",
      "Reporte mensual de clics salientes e impresiones",
    ],
    idealFor: "Neobancos, billeteras digitales, fiduciarias y CDT",
  },
  {
    id: "contenido-patrocinado",
    badge: "SEO + Newsletter",
    title: "Artículo Patrocinado + Mención en Newsletter",
    priceLabel: "$450.000 COP",
    billingCycle: "pago único por campaña",
    summary:
      "Guía práctica redactada con enfoque Colombia (tasas EA, UVT, 4x1000, requisitos reales) optimizada para posicionamiento orgánico y difusión a suscriptores.",
    deliverables: [
      "Artículo evergreen en Economía Hoy, Finanzas Personales o Tips Financieros",
      "Datos estructurados JSON-LD y enlaces contextuales a tu producto",
      "Mención destacada en nuestra lista de correo de finanzas personales",
      "Revisión editorial previa a la publicación",
    ],
    idealFor: "Apps tributarias, fintechs de inversión, seguros y educación financiera",
  },
  {
    id: "afiliacion-cpa",
    badge: "Por desempeño",
    title: "Alianza de Afiliados / Referidos (CPA / CPL)",
    priceLabel: "Comisión CPA",
    billingCycle: "a medida según producto",
    summary:
      "Integramos tu enlace oficial de referido o afiliación en nuestras 7 calculadoras bancarias y en el comparador de tarjetas de crédito.",
    deliverables: [
      "Integración de botón directo con rel='sponsored nofollow' y tracking",
      "Ubicación en las fichas de producto de alto tráfico orgánico",
      "Compatibilidad con enlaces con UTM, códigos de referido o redes CPA",
      "Sin costo fijo de entrada para programas aprobados",
    ],
    idealFor: "Tarjetas de crédito, cuentas remuneradas, brókers y remesas",
  },
  {
    id: "paquete-lanzamiento-fintech",
    badge: "Cobertura 360°",
    title: "Paquete Lanzamiento Fintech 360°",
    priceLabel: "$1.100.000 COP",
    billingCycle: "por mes · máximo 2 marcas/mes",
    summary:
      "Combina visibilidad continua en calculadoras, contenido SEO dedicado y captación directa para lanzamientos o campañas trimestrales en Colombia.",
    deliverables: [
      "Patrocinio en 2 calculadoras o comparadores estratégicos",
      "1 artículo guía SEO optimizado para búsquedas en Colombia",
      "Integración de enlace de conversión / referido en todo el embudo",
      "Acompañamiento directo para ajustar copy y llamados a la acción",
    ],
    idealFor: "Lanzamientos de producto, campañas de captación y constructoras",
  },
];

export const BUDGET_RANGES = [
  "Menos de $500.000 COP",
  "$500.000 – $1.500.000 COP",
  "$1.500.000 – $3.000.000 COP",
  "Más de $3.000.000 COP",
  "Modelo CPA / Referidos",
] as const;

export const AUDIENCE_HIGHLIGHTS = [
  {
    value: "15",
    label: "Calculadoras activas",
    detail: "Rentabilidad bancaria, 4x1000, crédito, ahorro, inversión, TRM y vivienda VIS/Leasing.",
  },
  {
    value: "20+",
    label: "Tarjetas y cuentas comparadas",
    detail: "Comparativa de tasas EA reales y beneficios de bancos tradicionales y neobancos.",
  },
  {
    value: "100%",
    label: "Enfoque Colombia",
    detail: "Contenido en COP, UVT, Fogafín, retención del 7% y reglas del sistema financiero local.",
  },
];

export function findAdPackageById(id: string): MediaKitPackage | undefined {
  return MEDIA_KIT_PACKAGES.find((item) => item.id === id);
}
