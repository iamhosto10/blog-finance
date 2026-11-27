import type { Metadata } from "next";
import type { Blog, Card } from "./interface";
import { BANK_DIRECTORY, type ProfitabilityRatesMap } from "./profitabilityRanking";

export const SITE_URL = "https://monopolombiano.com";

export const PUBLISHER_ORG = {
  "@type": "Organization",
  name: "Monopolombiano",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.png`,
  },
};

export interface FaqEntry {
  title: string;
  description: string;
}

export function formatArticleTitle(post: Pick<Blog, "title" | "focusTitle" | "continueTitle">): string {
  const combined = [post?.title, post?.focusTitle, post?.continueTitle]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (!combined) return "Monopolombiano";
  return combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase();
}

export function buildArticleJsonLd(options: {
  post: Blog;
  sectionPath: "economia-hoy" | "finanzas-personales" | "tips-financieros";
  sectionLabel: string;
  imageUrl?: string;
}) {
  const { post, sectionPath, sectionLabel, imageUrl } = options;
  const slug = post.slug?.current ?? "";
  const sectionUrl = `${SITE_URL}/${sectionPath}`;
  const articleUrl = `${sectionUrl}/${slug}`;
  const headline = formatArticleTitle(post);
  const articleImage = imageUrl || `${SITE_URL}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: sectionLabel,
            item: sectionUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: headline,
            item: articleUrl,
          },
        ],
      },
      {
        "@type": "Article",
        headline,
        description: post.excerpt || headline,
        image: [articleImage],
        ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
        inLanguage: "es-CO",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        author: PUBLISHER_ORG,
        publisher: PUBLISHER_ORG,
        articleSection: post.categories?.[0]?.title || sectionLabel,
      },
    ],
  };
}

export function buildCalculatorJsonLd(options: {
  name: string;
  description: string;
  slug: string;
  faqs?: FaqEntry[];
  extraNodes?: Record<string, unknown>[];
}) {
  const { name, description, slug, faqs, extraNodes } = options;
  const calculatorUrl = `${SITE_URL}/calculadoras/${slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calculadoras",
          item: `${SITE_URL}/calculadoras`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: calculatorUrl,
        },
      ],
    },
    {
      "@type": "WebApplication",
      name,
      description,
      url: calculatorUrl,
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      inLanguage: "es-CO",
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "COP",
      },
      publisher: PUBLISHER_ORG,
    },
  ];

  const validFaqs = (faqs ?? []).filter((item) => item.title && item.description);
  if (validFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: validFaqs.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.description,
        },
      })),
    });
  }

  for (const node of extraNodes ?? []) {
    if (node && typeof node === "object") {
      graph.push(node);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function buildInterestRateValue(rates?: number[]) {
  const validRates = Array.isArray(rates)
    ? rates.filter((r) => typeof r === "number" && Number.isFinite(r) && r > 0)
    : [];
  if (validRates.length === 0) return undefined;

  const minPercent = Number((Math.min(...validRates) * 100).toFixed(2));
  const maxPercent = Number((Math.max(...validRates) * 100).toFixed(2));

  if (minPercent === maxPercent) {
    return {
      "@type": "QuantitativeValue",
      value: maxPercent,
      unitText: "% EA",
    };
  }

  return {
    "@type": "QuantitativeValue",
    minValue: minPercent,
    maxValue: maxPercent,
    unitText: "% EA",
  };
}

/**
 * Construye un nodo Schema.org `FinancialProduct` para cuentas de ahorro remuneradas en Colombia.
 */
export function buildBankFinancialProductNode(options: {
  name: string;
  providerName: string;
  slug: string;
  description: string;
  rates?: number[];
}): Record<string, unknown> {
  const { name, providerName, slug, description, rates } = options;
  const interestRate = buildInterestRateValue(rates);

  return {
    "@type": "FinancialProduct",
    additionalType: "https://schema.org/BankAccount",
    category: "SavingsAccount",
    name,
    description,
    url: `${SITE_URL}/calculadoras/${slug}`,
    provider: {
      "@type": "BankOrCreditUnion",
      name: providerName,
    },
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    feesAndCommissionsSpecification:
      "Cuenta de ahorros digital en COP; aplica retención en la fuente del 7% sobre rendimientos y 4x1000 salvo cuenta marcada exenta.",
    ...(interestRate ? { interestRate } : {}),
  };
}

/**
 * Construye un `ItemList` de `FinancialProduct` con las 7 cuentas remuneradas del comparador.
 */
export function buildRentabilidadComparisonJsonLd(
  profitability: Partial<ProfitabilityRatesMap> | null | undefined,
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    name: "Comparador de Cuentas de Ahorro Rentables en Colombia",
    itemListElement: BANK_DIRECTORY.map((bank, idx) => {
      const rates = profitability?.[bank.key];
      const interestRate = buildInterestRateValue(rates);
      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "FinancialProduct",
          additionalType: "https://schema.org/BankAccount",
          category: "SavingsAccount",
          name: `Cuenta de Ahorros ${bank.label}`,
          url: `${SITE_URL}${bank.href}`,
          provider: {
            "@type": "BankOrCreditUnion",
            name: bank.label,
          },
          areaServed: {
            "@type": "Country",
            name: "Colombia",
          },
          ...(interestRate ? { interestRate } : {}),
        },
      };
    }),
  };
}

/**
 * Construye un `ItemList` de `FinancialProduct` para tarjetas de crédito y débito en Colombia.
 */
export function buildCardComparisonJsonLd(
  cards: Card[],
  limit = 20,
): Record<string, unknown> {
  const validCards = (cards ?? [])
    .filter((card) => Boolean(card?.name?.trim()))
    .slice(0, limit);

  return {
    "@type": "ItemList",
    name: "Tarjetas de Crédito y Débito Comparadas en Colombia",
    itemListElement: validCards.map((card, idx) => {
      const feeText =
        typeof card.cuotaManejo === "number" && Number.isFinite(card.cuotaManejo)
          ? card.cuotaManejo === 0
            ? "Cuota de manejo $0 COP"
            : `Cuota de manejo $${Math.round(card.cuotaManejo).toLocaleString("es-CO")} COP`
          : undefined;

      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "FinancialProduct",
          category: "CreditCard",
          name: card.name.trim(),
          url: `${SITE_URL}/calculadoras/comparador-de-tarjetas`,
          ...(card.bank?.title
            ? {
                provider: {
                  "@type": "BankOrCreditUnion",
                  name: card.bank.title,
                },
              }
            : {}),
          ...(typeof card.tasaInteresEfectivaAnual === "number" &&
          Number.isFinite(card.tasaInteresEfectivaAnual) &&
          card.tasaInteresEfectivaAnual > 0
            ? {
                annualPercentageRate: Number(
                  card.tasaInteresEfectivaAnual.toFixed(2),
                ),
              }
            : {}),
          ...(feeText ? { feesAndCommissionsSpecification: feeText } : {}),
          areaServed: {
            "@type": "Country",
            name: "Colombia",
          },
        },
      };
    }),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Monopolombiano",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Monopolombiano",
        description:
          "Educación financiera, noticias económicas, calculadoras y comparadores gratuitos para Colombia.",
        inLanguage: "es-CO",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}

export interface CollectionItemEntry {
  name: string;
  url: string;
  description?: string;
}

export function buildCollectionPageJsonLd(options: {
  name: string;
  description: string;
  path: string;
  parent?: {
    name: string;
    path: string;
  };
  items?: CollectionItemEntry[];
}) {
  const { name, description, path, parent, items } = options;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = `${SITE_URL}${cleanPath}`;

  const breadcrumbItems: Array<Record<string, unknown>> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
  ];

  if (parent) {
    const cleanParentPath = parent.path.startsWith("/")
      ? parent.path
      : `/${parent.path}`;
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: parent.name,
      item: `${SITE_URL}${cleanParentPath}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name,
    item: pageUrl,
  });

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    {
      "@type": "CollectionPage",
      name,
      description,
      url: pageUrl,
      inLanguage: "es-CO",
      isPartOf: {
        "@type": "WebSite",
        url: SITE_URL,
        name: "Monopolombiano",
      },
      publisher: PUBLISHER_ORG,
    },
  ];

  const validItems = (items ?? []).filter((item) => item.name && item.url);
  if (validItems.length > 0) {
    graph.push({
      "@type": "ItemList",
      name,
      itemListElement: validItems.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
        ...(item.description ? { description: item.description } : {}),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Construye metadata SEO estandarizada para las subcategorías editoriales de Monopolombiano.
 */
export function buildSubcategoryMetadata(options: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  openGraphDescription?: string;
  twitterDescription?: string;
}): Metadata {
  const {
    title,
    description,
    keywords,
    path,
    openGraphDescription,
    twitterDescription,
  } = options;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  return {
    title,
    description,
    keywords,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: `${title} | Monopolombiano`,
      description: openGraphDescription ?? description,
      url: canonicalUrl,
      siteName: "Monopolombiano",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 600,
          height: 600,
          alt: title,
        },
      ],
      locale: "es_CO",
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Monopolombiano`,
      description: twitterDescription ?? description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

/**
 * Construye metadata SEO estandarizada para páginas institucionales y legales de Monopolombiano.
 */
export const buildInstitutionalPageMetadata = buildSubcategoryMetadata;

/**
 * Construye JSON-LD (`BreadcrumbList` + `AboutPage` o `WebPage`) para páginas institucionales y legales.
 */
export function buildInstitutionalPageJsonLd(options: {
  name: string;
  description: string;
  path: string;
  pageType?: "AboutPage" | "WebPage";
}) {
  const { name, description, path, pageType = "WebPage" } = options;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = `${SITE_URL}${cleanPath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": pageType,
        name,
        description,
        url: pageUrl,
        inLanguage: "es-CO",
        isPartOf: {
          "@type": "WebSite",
          url: SITE_URL,
          name: "Monopolombiano",
        },
        publisher: PUBLISHER_ORG,
      },
    ],
  };
}
