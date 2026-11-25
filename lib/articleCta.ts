import type { Blog } from "@/lib/interface";

export type ArticleSectionPath =
  | "economia-hoy"
  | "finanzas-personales"
  | "tips-financieros";

export type ArticleTopicKey =
  | "vivienda"
  | "impuestos"
  | "deuda-tarjetas"
  | "divisas"
  | "inversion"
  | "rentabilidad";

export interface ArticleCtaRecommendation {
  topicKey: ArticleTopicKey;
  badge: string;
  calculatorLabel: string;
  calculatorHref: string;
  calculatorDescription: string;
  headline: string;
  description: string;
  leadMagnetSlug: "guia-presupuesto-50-30-20-colombia" | "checklist-vivienda-vis-colombia";
  subscribeSource: string;
  buttonLabel: string;
  proProductId: string;
  proHref: string;
  proLabel: string;
}

interface TopicTemplate {
  topicKey: ArticleTopicKey;
  badge: string;
  calculatorLabel: string;
  calculatorHref: string;
  calculatorDescription: string;
  headline: string;
  description: string;
  leadMagnetSlug: "guia-presupuesto-50-30-20-colombia" | "checklist-vivienda-vis-colombia";
  sourceTag: string;
  buttonLabel: string;
  proProductId: string;
  proHref: string;
  proLabel: string;
}

const TOPIC_TEMPLATES: Record<ArticleTopicKey, TopicTemplate> = {
  vivienda: {
    topicKey: "vivienda",
    badge: "Siguiente paso para comprar vivienda",
    calculatorLabel: "Abrir Simulador de Leasing y Vivienda",
    calculatorHref: "/calculadoras/simulador-de-leasing-y-vivienda",
    calculatorDescription:
      "Simula tu cuota mensual, compara crédito hipotecario vs. leasing habitacional y revisa tu capacidad de pago.",
    headline: "Descarga gratis el Checklist de Vivienda VIS / No VIS y Leasing",
    description:
      "Valida cuota inicial, notaría, boleta fiscal, registro y seguros antes de firmar promesa de compraventa en Colombia.",
    leadMagnetSlug: "checklist-vivienda-vis-colombia",
    sourceTag: "vivienda",
    buttonLabel: "Descargar checklist (.CSV)",
    proProductId: "kit-comprador-vivienda",
    proHref: "/recursos#kit-comprador-vivienda",
    proLabel: "Ver Kit PRO Comprador de Vivienda ($39.000 COP)",
  },
  impuestos: {
    topicKey: "impuestos",
    badge: "Herramienta recomendada",
    calculatorLabel: "Calcular impacto en Calculadora 4x1000",
    calculatorHref: "/calculadoras/4x1000",
    calculatorDescription:
      "Verifica cuánto te descuentan por GMF (0,4%) y cuándo te conviene marcar tu cuenta exenta hasta 350 UVT.",
    headline: "Descarga la Plantilla 50/30/20 + Control de 4x1000 en Colombia",
    description:
      "Lleva el control mensual de tus cuentas exentas, retenciones y flujo de caja en Excel o Google Sheets.",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    sourceTag: "impuestos",
    buttonLabel: "Descargar plantilla (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Plantilla Maestra Finanzas PRO ($39.000 COP)",
  },
  "deuda-tarjetas": {
    topicKey: "deuda-tarjetas",
    badge: "Optimiza tus tarjetas y créditos",
    calculatorLabel: "Comparar tarjetas en Colombia",
    calculatorHref: "/calculadoras/comparador-de-tarjetas",
    calculatorDescription:
      "Revisa tasas EA, cuota de manejo, exoneraciones y beneficios de cashback o millas antes de elegir o refinanciar.",
    headline: "Organiza tus deudas y tarjetas con la Plantilla 50/30/20 gratuita",
    description:
      "Incluye hoja de presupuesto mensual e inventario de deudas para aplicar el método avalancha sin descuadrar tu flujo.",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    sourceTag: "deudas",
    buttonLabel: "Descargar guía (.CSV)",
    proProductId: "diagnostico-financiero-1a1",
    proHref: "/recursos#diagnostico-financiero-1a1",
    proLabel: "Agendar Diagnóstico Financiero 1-a-1 ($110.000 COP)",
  },
  divisas: {
    topicKey: "divisas",
    badge: "Herramienta para divisas y viajes",
    calculatorLabel: "Abrir Conversor de Dólares a Pesos (TRM)",
    calculatorHref: "/calculadoras/conversor-dolares",
    calculatorDescription:
      "Convierte USD a COP en segundos con la tasa de referencia del Banco de la República para compras, viajes o remesas.",
    headline: "Descarga gratis la Plantilla 50/30/20 + Control 4x1000 Colombia",
    description:
      "Presupuesta tus compras en dólares, viajes y suscripciones internacionales sin perder visibilidad de tu ahorro en pesos.",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    sourceTag: "divisas",
    buttonLabel: "Descargar plantilla (.CSV)",
    proProductId: "diagnostico-financiero-1a1",
    proHref: "/recursos#diagnostico-financiero-1a1",
    proLabel: "Diagnóstico 1-a-1 para ordenar tus finanzas ($110.000 COP)",
  },
  inversion: {
    topicKey: "inversion",
    badge: "Proyecta tu patrimonio",
    calculatorLabel: "Abrir Simulador de Inversión",
    calculatorHref: "/calculadoras/simulador-de-inversion",
    calculatorDescription:
      "Simula aportes mensuales e interés compuesto en COP para proyectar cuánto crecerá tu capital a mediano y largo plazo.",
    headline: "Estructura tus aportes con la Plantilla 50/30/20 gratuita",
    description:
      "Define cuánto destinar cada mes a inversión sin desproteger tu fondo de emergencia ni pagar 4x1000 de más.",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    sourceTag: "inversion",
    buttonLabel: "Descargar plantilla (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Plantilla Maestra Finanzas PRO ($39.000 COP)",
  },
  rentabilidad: {
    topicKey: "rentabilidad",
    badge: "Pon en práctica lo que leíste",
    calculatorLabel: "Comparar cuentas que más pagan hoy",
    calculatorHref: "/calculadoras/calculadora-de-rentabilidad",
    calculatorDescription:
      "Compara Nu, Lulo, Pibank, Bold, Global66, Rappi y Banco Popular con cálculo real neto tras retención del 7% y 4x1000.",
    headline: "Descarga la Plantilla Gratuita 50/30/20 + Control de 4x1000",
    description:
      "Organiza tu presupuesto en Colombia, separa tu ahorro mensual y controla tus cuentas remuneradas en Excel o Sheets.",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    sourceTag: "rentabilidad",
    buttonLabel: "Descargar plantilla (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Ver Plantilla PRO y Asesoría en /recursos",
  },
};

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasAnyKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function resolveTopicFromSearchable(
  searchable: string,
): {
  topicKey: ArticleTopicKey;
  overrideCalculator: { label: string; href: string } | null;
} {
  let topicKey: ArticleTopicKey = "rentabilidad";
  let overrideCalculator: { label: string; href: string } | null = null;

  if (
    hasAnyKeyword(searchable, [
      "comprar-vivienda",
      "vivienda",
      "hipoteca",
      "leasing",
      "vis",
      "mi casa ya",
      "apartamento",
      "inmobiliari",
    ])
  ) {
    topicKey = "vivienda";
  } else if (
    hasAnyKeyword(searchable, [
      "impuesto",
      "4x1000",
      "gmf",
      "renta",
      "dian",
      "uvt",
      "retencion en la fuente",
      "tribut",
      "regulacion",
    ])
  ) {
    topicKey = "impuestos";
  } else if (
    hasAnyKeyword(searchable, [
      "deudas-y-creditos",
      "historial-crediticio",
      "tarjeta",
      "credito",
      "deuda",
      "datacredito",
      "prestamo",
      "cuota de manejo",
    ])
  ) {
    topicKey = "deuda-tarjetas";
    if (
      !hasAnyKeyword(searchable, ["tarjeta", "cashback", "millas", "historial"])
    ) {
      overrideCalculator = {
        label: "Simular cuotas en Calculadora de Crédito",
        href: "/calculadoras/calculadora-de-credito",
      };
    }
  } else if (
    hasAnyKeyword(searchable, [
      "manejo-de-dinero-en-el-extranjero",
      "dolar",
      "trm",
      "divisa",
      "remesa",
      "extranjero",
      "viaje",
      "usd",
    ])
  ) {
    topicKey = "divisas";
  } else if (
    hasAnyKeyword(searchable, [
      "inversion",
      "cripto",
      "invertir",
      "cdt",
      "bolsa",
      "accion",
      "etf",
      "interes compuesto",
    ])
  ) {
    topicKey = "inversion";
  }

  return { topicKey, overrideCalculator };
}

function buildRecommendationFromTopic(
  topicKey: ArticleTopicKey,
  subscribeSource: string,
  overrideCalculator: { label: string; href: string } | null,
): ArticleCtaRecommendation {
  const template = TOPIC_TEMPLATES[topicKey];

  return {
    topicKey: template.topicKey,
    badge: template.badge,
    calculatorLabel: overrideCalculator?.label ?? template.calculatorLabel,
    calculatorHref: overrideCalculator?.href ?? template.calculatorHref,
    calculatorDescription: template.calculatorDescription,
    headline: template.headline,
    description: template.description,
    leadMagnetSlug: template.leadMagnetSlug,
    subscribeSource,
    buttonLabel: template.buttonLabel,
    proProductId: template.proProductId,
    proHref: template.proHref,
    proLabel: template.proLabel,
  };
}

/**
 * Selecciona la calculadora, lead magnet y oferta PRO de `/recursos` más afines al artículo actual.
 */
export function resolveArticleCta(
  post: Pick<Blog, "title" | "focusTitle" | "continueTitle" | "slug" | "categories">,
  sectionPath: ArticleSectionPath,
): ArticleCtaRecommendation {
  const categoryTerms = (post.categories ?? [])
    .flatMap((cat) => [cat.slug?.current ?? "", cat.title ?? ""])
    .join(" ");
  const titleTerms = [
    post.title,
    post.focusTitle,
    post.continueTitle,
    post.slug?.current,
  ]
    .filter(Boolean)
    .join(" ");

  const searchable = normalizeSearchText(`${categoryTerms} ${titleTerms}`);
  const { topicKey, overrideCalculator } = resolveTopicFromSearchable(searchable);
  const template = TOPIC_TEMPLATES[topicKey];

  return buildRecommendationFromTopic(
    topicKey,
    `article_${sectionPath}_${template.sourceTag}_lead`,
    overrideCalculator,
  );
}

/**
 * Selecciona la calculadora, lead magnet y oferta PRO de `/recursos` para una subcategoría editorial.
 */
export function resolveSubcategoryCta(
  sectionPath: ArticleSectionPath,
  subcategorySlug: string,
  subcategoryTitle: string,
): ArticleCtaRecommendation {
  const searchable = normalizeSearchText(`${subcategorySlug} ${subcategoryTitle}`);
  const { topicKey, overrideCalculator: topicOverride } =
    resolveTopicFromSearchable(searchable);

  let overrideCalculator = topicOverride;
  if (
    topicKey === "rentabilidad" &&
    hasAnyKeyword(searchable, ["ahorro-y-presupuesto", "compras-y-ahorro-diario"])
  ) {
    overrideCalculator = {
      label: "Abrir Calculadora de Ahorro",
      href: "/calculadoras/calculadora-de-ahorro",
    };
  }

  const template = TOPIC_TEMPLATES[topicKey];
  return buildRecommendationFromTopic(
    topicKey,
    `category_${sectionPath}_${template.sourceTag}_lead`,
    overrideCalculator,
  );
}
