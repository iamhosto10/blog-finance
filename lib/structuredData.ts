import type { Metadata } from "next";
import type { Blog } from "./interface";

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
}) {
  const { name, description, slug, faqs } = options;
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

  return {
    "@context": "https://schema.org",
    "@graph": graph,
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
