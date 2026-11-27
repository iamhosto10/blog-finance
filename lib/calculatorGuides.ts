import type { Blog } from "@/lib/interface";
import { blogsPreviewQuery } from "@/lib/queries";
import { client } from "@/lib/sanity";
import { formatArticleTitle } from "@/lib/structuredData";

export type CalculatorSlug =
  | "4x1000"
  | "nu"
  | "lulo"
  | "pibank"
  | "global66"
  | "bold"
  | "rappi"
  | "popular"
  | "calculadora-de-rentabilidad"
  | "calculadora-de-credito"
  | "calculadora-de-ahorro"
  | "simulador-de-inversion"
  | "simulador-de-leasing-y-vivienda"
  | "comparador-de-tarjetas"
  | "conversor-dolares";

export interface GuideCategoryLink {
  label: string;
  href: string;
  description: string;
}

export interface ResolvedGuideArticle {
  id: string;
  title: string;
  href: string;
  excerpt?: string;
  categoryLabel?: string;
  publishedAt?: string;
}

export interface ResolvedCalculatorGuides {
  sectionTitle: string;
  sectionSubtitle: string;
  categoryLinks: GuideCategoryLink[];
  articles: ResolvedGuideArticle[];
}

interface CalculatorGuideProfile {
  sectionTitle: string;
  sectionSubtitle: string;
  categoryLinks: GuideCategoryLink[];
  keywords: string[];
}

const VALID_SECTION_SLUGS = new Set([
  "economia-hoy",
  "finanzas-personales",
  "tips-financieros",
]);

const BANK_CATEGORY_LINKS: GuideCategoryLink[] = [
  {
    label: "Bancos en Colombia",
    href: "/economia-hoy/bancos-en-colombia",
    description: "Comparativas, beneficios y cambios en neobancos y bancos locales.",
  },
  {
    label: "Tasas de interés",
    href: "/economia-hoy/tasas-de-interes",
    description: "Análisis del Banco de la República y rendimientos EA vigentes.",
  },
];

const CALCULATOR_GUIDE_PROFILES: Record<CalculatorSlug, CalculatorGuideProfile> = {
  "4x1000": {
    sectionTitle: "Guías recomendadas sobre el 4x1000 e impuestos en Colombia",
    sectionSubtitle:
      "Profundiza en cómo marcar tu cuenta exenta hasta 350 UVT y evitar descuentos innecesarios.",
    categoryLinks: [
      {
        label: "Impuestos en Colombia",
        href: "/economia-hoy/impuestos",
        description: "Normas de GMF 4x1000, retención en la fuente y declaración de renta.",
      },
      {
        label: "Cajeros y bancos",
        href: "/tips-financieros/cajeros-y-bancos",
        description: "Trucos prácticos para mover tu dinero sin pagar comisiones extra.",
      },
    ],
    keywords: ["4x1000", "gmf", "impuesto", "exenta", "350 uvt", "retencion", "dian", "banco"],
  },
  nu: {
    sectionTitle: "Guías sobre Nu Colombia y cuentas remuneradas",
    sectionSubtitle:
      "Aprende a aprovechar las cajitas de Nu, su rentabilidad EA y cómo optimizar el 4x1000.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["nu", "nubank", "cajita", "rentabilidad", "cuenta", "ahorro", "tasa", "banco"],
  },
  lulo: {
    sectionTitle: "Guías sobre Lulo Bank y ahorro digital",
    sectionSubtitle:
      "Conoce cómo combinar bolsillos de Lulo Bank, devoluciones y retención del 7%.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["lulo", "bolsillo", "rentabilidad", "cuenta", "ahorro", "tasa", "banco"],
  },
  pibank: {
    sectionTitle: "Guías sobre Pibank y cuentas de alto rendimiento",
    sectionSubtitle:
      "Evalúa cómo sacarle provecho a cuentas 100% digitales y proteger tu liquidez con Fogafín.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["pibank", "pichincha", "rentabilidad", "cuenta", "ahorro", "tasa", "cdt"],
  },
  global66: {
    sectionTitle: "Guías sobre Global66, cuentas globales y divisas",
    sectionSubtitle:
      "Complementa tu simulación con estrategias para ahorrar en pesos y manejar dólares sin sobrecostos.",
    categoryLinks: [
      BANK_CATEGORY_LINKS[0],
      {
        label: "Dinero en el extranjero",
        href: "/tips-financieros/manejo-de-dinero-en-el-extranjero",
        description: "Pagos internacionales, remesas, TRM y tarjetas sin sobrecargos.",
      },
    ],
    keywords: ["global66", "dolar", "divisa", "remesa", "rentabilidad", "cuenta", "extranjero"],
  },
  bold: {
    sectionTitle: "Guías sobre Bold y cuentas remuneradas en Colombia",
    sectionSubtitle:
      "Revisa cómo funcionan los bolsillos digitales, tasas EA y movimientos exentos de GMF.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["bold", "rentabilidad", "bolsillo", "cuenta", "ahorro", "tasa", "neobanco"],
  },
  rappi: {
    sectionTitle: "Guías sobre RappiPay, bóvedas y tarjetas digitales",
    sectionSubtitle:
      "Descubre cómo combinar las bóvedas de RappiPay con exención de 4x1000 y beneficios diarios.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["rappi", "rappipay", "boveda", "rentabilidad", "cuenta", "cashback", "tarjeta"],
  },
  popular: {
    sectionTitle: "Guías sobre Banco Popular y ahorro tradicional vs. digital",
    sectionSubtitle:
      "Compara cuentas tradicionales con neobancos y entiende el impacto real de tasas e impuestos.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["popular", "banco popular", "rentabilidad", "cuenta", "ahorro", "tasa", "cdt"],
  },
  "calculadora-de-rentabilidad": {
    sectionTitle: "Artículos para elegir la cuenta que más paga en Colombia",
    sectionSubtitle:
      "Analiza tasas del Banco de la República, retención en la fuente y estrategias para tu fondo de emergencia.",
    categoryLinks: BANK_CATEGORY_LINKS,
    keywords: ["rentabilidad", "nu", "lulo", "pibank", "bold", "global66", "rappi", "cuenta", "tasa"],
  },
  "calculadora-de-credito": {
    sectionTitle: "Guías sobre créditos, cuotas y salida de deudas",
    sectionSubtitle:
      "Aprende a reducir intereses, usar abonos a capital y cuidar tu puntaje crediticio en Colombia.",
    categoryLinks: [
      {
        label: "Deudas y créditos",
        href: "/finanzas-personales/deudas-y-creditos",
        description: "Estrategias para salir de deudas, compra de cartera y tasas de usura.",
      },
      {
        label: "Historial crediticio",
        href: "/tips-financieros/historial-crediticio",
        description: "Cómo mejorar tu puntaje en Datacrédito y acceder a mejores tasas.",
      },
    ],
    keywords: ["credito", "deuda", "prestamo", "cuota", "interes", "usura", "datacredito", "cartera"],
  },
  "calculadora-de-ahorro": {
    sectionTitle: "Guías para construir tu ahorro y presupuesto mensual",
    sectionSubtitle:
      "Convierte tu meta de ahorro en un plan mensual sostenible con interés compuesto.",
    categoryLinks: [
      {
        label: "Ahorro y presupuesto",
        href: "/finanzas-personales/ahorro-y-presupuesto",
        description: "Métodos 50/30/20, fondo de emergencia y control de gastos hormiga.",
      },
      {
        label: "Compras y ahorro diario",
        href: "/tips-financieros/compras-y-ahorro-diario",
        description: "Hábitos cotidianos para liberar flujo de caja sin sacrificar calidad de vida.",
      },
    ],
    keywords: ["ahorro", "presupuesto", "fondo", "emergencia", "interes compuesto", "meta", "gasto"],
  },
  "simulador-de-inversion": {
    sectionTitle: "Guías de inversión e interés compuesto para Colombia",
    sectionSubtitle:
      "Explora opciones de renta fija, CDT, ETFs y diversificación para hacer crecer tu patrimonio.",
    categoryLinks: [
      {
        label: "Inversión",
        href: "/finanzas-personales/inversion",
        description: "Portafolios, ETFs, CDTs y cómo invertir desde Colombia paso a paso.",
      },
      {
        label: "Cripto y nuevas tecnologías",
        href: "/economia-hoy/cripto-y-nuevas-tecnologias",
        description: "Tendencias fintech, inversión digital y gestión de riesgo.",
      },
    ],
    keywords: ["inversion", "invertir", "cdt", "etf", "bolsa", "interes compuesto", "patrimonio", "trii"],
  },
  "simulador-de-leasing-y-vivienda": {
    sectionTitle: "Guías para comprar vivienda VIS, No VIS o elegir leasing",
    sectionSubtitle:
      "Revisa gastos notariales, subsidios, cuota inicial y diferencias clave entre hipoteca y leasing.",
    categoryLinks: [
      {
        label: "Comprar vivienda",
        href: "/finanzas-personales/comprar-vivienda",
        description: "Crédito hipotecario, leasing habitacional, UVR vs. pesos y subsidios.",
      },
      {
        label: "Tasas de interés",
        href: "/economia-hoy/tasas-de-interes",
        description: "Evolución de tasas hipotecarias y decisiones del Banco de la República.",
      },
    ],
    keywords: ["vivienda", "leasing", "hipoteca", "vis", "casa", "apartamento", "uvr", "subsidio"],
  },
  "comparador-de-tarjetas": {
    sectionTitle: "Guías para elegir tarjeta de crédito sin pagar de más",
    sectionSubtitle:
      "Evita cuotas de manejo ocultas, entiende las compras a una cuota y protege tu historial.",
    categoryLinks: [
      {
        label: "Historial crediticio",
        href: "/tips-financieros/historial-crediticio",
        description: "Manejo de cupo, fechas de corte y puntaje en centrales de riesgo.",
      },
      {
        label: "Deudas y créditos",
        href: "/finanzas-personales/deudas-y-creditos",
        description: "Cómo evitar intereses rotativos y aprovechar cashback o millas.",
      },
    ],
    keywords: ["tarjeta", "credito", "cuota de manejo", "cashback", "millas", "historial", "nu", "rappi"],
  },
  "conversor-dolares": {
    sectionTitle: "Guías sobre el dólar (TRM), remesas y pagos en el exterior",
    sectionSubtitle:
      "Entiende qué mueve la TRM en Colombia y cómo ahorrar en comisiones al pagar o recibir USD.",
    categoryLinks: [
      {
        label: "Dinero en el extranjero",
        href: "/tips-financieros/manejo-de-dinero-en-el-extranjero",
        description: "Cómo usar tarjetas, cuentas en USD y evitar malas tasas de cambio.",
      },
      {
        label: "Economía del país",
        href: "/economia-hoy/economia-del-pais",
        description: "Inflación, TRM, exportaciones y contexto macroeconómico de Colombia.",
      },
    ],
    keywords: ["dolar", "trm", "divisa", "usd", "extranjero", "remesa", "viaje", "cambio"],
  },
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function resolveArticleSectionSlug(post: Blog): string | null {
  for (const cat of post.categories ?? []) {
    const slug = cat?.slug?.current;
    if (slug && VALID_SECTION_SLUGS.has(slug)) {
      return slug;
    }
  }
  const firstSlug = post.categories?.[0]?.slug?.current;
  return firstSlug && VALID_SECTION_SLUGS.has(firstSlug) ? firstSlug : null;
}

/**
 * Selecciona hasta `maxArticles` artículos editoriales relevantes y enlaces de subcategoría
 * para reforzar el enlazado interno desde cada calculadora hacia el blog.
 */
export function resolveCalculatorGuides(
  slug: CalculatorSlug,
  blogs: Blog[] | null | undefined,
  maxArticles = 3,
): ResolvedCalculatorGuides {
  const profile = CALCULATOR_GUIDE_PROFILES[slug];
  const validBlogs = (blogs ?? []).filter((post) => {
    const section = resolveArticleSectionSlug(post);
    return Boolean(section && post.slug?.current);
  });

  const scored = validBlogs.map((post, index) => {
    const title = formatArticleTitle(post);
    const catText = (post.categories ?? [])
      .map((c) => `${c.title ?? ""} ${c.slug?.current ?? ""}`)
      .join(" ");
    const haystack = normalizeText(
      `${title} ${post.slug?.current ?? ""} ${post.excerpt ?? ""} ${catText}`,
    );

    let score = 0;
    for (const kw of profile.keywords) {
      if (haystack.includes(normalizeText(kw))) {
        score += 1;
      }
    }

    const section = resolveArticleSectionSlug(post)!;
    const categoryLabel =
      post.categories?.find((c) => c.slug?.current && !VALID_SECTION_SLUGS.has(c.slug.current))
        ?.title ||
      post.categories?.[0]?.title;

    return {
      score,
      index,
      publishedAtMs: post.publishedAt ? Date.parse(post.publishedAt) || 0 : 0,
      article: {
        id: post._id || `${section}-${post.slug.current}`,
        title,
        href: `/${section}/${post.slug.current}`,
        excerpt: post.excerpt,
        categoryLabel,
        publishedAt: post.publishedAt,
      } satisfies ResolvedGuideArticle,
    };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.publishedAtMs !== a.publishedAtMs) return b.publishedAtMs - a.publishedAtMs;
    return a.index - b.index;
  });

  const seenHrefs = new Set<string>();
  const articles: ResolvedGuideArticle[] = [];
  for (const item of scored) {
    if (seenHrefs.has(item.article.href)) continue;
    seenHrefs.add(item.article.href);
    articles.push(item.article);
    if (articles.length >= maxArticles) break;
  }

  return {
    sectionTitle: profile.sectionTitle,
    sectionSubtitle: profile.sectionSubtitle,
    categoryLinks: profile.categoryLinks,
    articles,
  };
}

/**
 * Obtiene la lista ligera de artículos de Sanity sin romper el render si falla la red.
 */
export async function fetchBlogsPreviewSafe(): Promise<Blog[]> {
  try {
    const data = await client.fetch(
      blogsPreviewQuery,
      {},
      { next: { tags: ["all-blogs", "global-data"] } },
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
