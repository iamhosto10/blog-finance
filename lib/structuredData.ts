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
