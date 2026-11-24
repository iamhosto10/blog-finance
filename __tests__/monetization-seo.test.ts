import { describe, expect, it, vi } from "vitest";
import {
  CALCULATOR_CTA_CONFIG,
  getCalculatorCtaConfig,
  getLeadMagnetBySlug,
  type CalculatorCtaId,
} from "../lib/leadMagnets";
import {
  buildArticleJsonLd,
  buildCalculatorJsonLd,
  buildCollectionPageJsonLd,
  buildWebSiteJsonLd,
  formatArticleTitle,
  SITE_URL,
} from "../lib/structuredData";
import { findRecursoById } from "../lib/recursos";
import {
  buildBankPageCopy,
  estimateMonthlyExample,
  formatEaRangeLabel,
  formatRentabilidadCardInterest,
  formatSelectedRateLabel,
} from "../lib/profitabilityCopy";
import { isSafeExternalUrl } from "../lib/affiliates";
import { GET as getFileRoute } from "../app/api/files/[slug]/route";
import type { Blog } from "../lib/interface";

vi.mock("@/lib/sanity", () => ({
  client: {
    fetch: vi.fn().mockResolvedValue(null),
    patch: vi.fn(),
  },
}));

describe("Lead Magnets y /api/files/[slug]", () => {
  it("genera CSV UTF-8 con BOM y contenido real para presupuesto 50/30/20 + 4x1000 y vivienda VIS", () => {
    const presupuesto = getLeadMagnetBySlug("guia-presupuesto-50-30-20-colombia");
    expect(presupuesto).toBeDefined();
    const csvPresupuesto = presupuesto!.buildContent();
    expect(csvPresupuesto.startsWith("\uFEFF")).toBe(true);
    expect(csvPresupuesto).toContain("50/30/20");
    expect(csvPresupuesto).toContain("4x1000");
    expect(csvPresupuesto).toContain("350 UVT");

    const vivienda = getLeadMagnetBySlug("checklist-vivienda-vis-colombia");
    expect(vivienda).toBeDefined();
    const csvVivienda = vivienda!.buildContent();
    expect(csvVivienda.startsWith("\uFEFF")).toBe(true);
    expect(csvVivienda).toContain("Leasing Habitacional");
    expect(csvVivienda).toContain("Boleta fiscal");

    expect(getLeadMagnetBySlug("slug-que-no-existe")).toBeUndefined();
  });

  it("asocia cada calculadora a un lead magnet válido y un producto existente de /recursos", () => {
    const ids = Object.keys(CALCULATOR_CTA_CONFIG) as CalculatorCtaId[];
    expect(ids).toEqual([
      "4x1000",
      "credito",
      "ahorro",
      "leasing-vivienda",
      "rentabilidad",
      "inversion",
      "comparador-tarjetas",
      "conversor-dolares",
    ]);

    for (const id of ids) {
      const cfg = getCalculatorCtaConfig(id);
      expect(getLeadMagnetBySlug(cfg.leadMagnetSlug)).toBeDefined();
      expect(findRecursoById(cfg.proProductId)).toBeDefined();
      expect(cfg.proHref).toContain(cfg.proProductId);
    }
  });

  it("sirve el archivo descargable desde /api/files/[slug] y devuelve 404 para slugs desconocidos", async () => {
    const okResponse = await getFileRoute(new Request("https://monopolombiano.com/api/files/guia-presupuesto-50-30-20-colombia"), {
      params: Promise.resolve({ slug: "guia-presupuesto-50-30-20-colombia" }),
    });
    expect(okResponse.status).toBe(200);
    expect(okResponse.headers.get("content-type")).toContain("text/csv");
    expect(okResponse.headers.get("content-disposition")).toContain("attachment;");
    expect(okResponse.headers.get("content-disposition")).toContain(".csv");
    const body = await okResponse.text();
    expect(body).toContain("MONOPOLOMBIANO.COM");

    const notFoundResp = await getFileRoute(new Request("https://monopolombiano.com/api/files/no-existe"), {
      params: Promise.resolve({ slug: "no-existe" }),
    });
    expect(notFoundResp.status).toBe(404);
  });
});

describe("Datos estructurados JSON-LD (Schema.org)", () => {
  it("construye BreadcrumbList + Article válidos para artículos de blog", () => {
    const mockPost: Blog = {
      _id: "blog-1",
      _type: "blog",
      title: "Cómo evitar el",
      focusTitle: "4x1000",
      continueTitle: "en Colombia",
      slug: { current: "como-evitar-el-4x1000" },
      publishedAt: "2026-11-15T12:00:00Z",
      excerpt: "Guía práctica sobre cuentas exentas del GMF en Colombia.",
      body: [],
      categories: [{ _id: "cat-1", title: "Impuestos", slug: { current: "impuestos" } }],
    };

    expect(formatArticleTitle(mockPost)).toBe("Cómo evitar el 4x1000 en colombia");

    const jsonLd = buildArticleJsonLd({
      post: mockPost,
      sectionPath: "economia-hoy",
      sectionLabel: "Economía Hoy",
      imageUrl: "https://cdn.sanity.io/images/test/portada.jpg",
    });

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@graph"]).toHaveLength(2);

    const breadcrumb = jsonLd["@graph"][0] as Record<string, unknown>;
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");

    const article = jsonLd["@graph"][1] as Record<string, unknown>;
    expect(article["@type"]).toBe("Article");
    expect(article.inLanguage).toBe("es-CO");
    expect(article.articleSection).toBe("Impuestos");
    expect(article.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": `${SITE_URL}/economia-hoy/como-evitar-el-4x1000`,
    });
  });

  it("construye BreadcrumbList + WebApplication + FAQPage filtrando entradas vacías", () => {
    const withFaq = buildCalculatorJsonLd({
      name: "Calculadora 4x1000 en Colombia",
      description: "Calcula el impuesto GMF en Colombia.",
      slug: "4x1000",
      faqs: [
        { title: "¿Qué es el 4x1000?", description: "Un impuesto financiero." },
        { title: "", description: "" },
      ],
    });

    expect(withFaq["@graph"]).toHaveLength(3);
    const webApp = withFaq["@graph"][1] as Record<string, unknown>;
    expect(webApp["@type"]).toBe("WebApplication");
    expect(webApp.applicationCategory).toBe("FinanceApplication");

    const faqPage = withFaq["@graph"][2] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(1);
    expect(faqPage.mainEntity[0].name).toBe("¿Qué es el 4x1000?");

    const withoutFaq = buildCalculatorJsonLd({
      name: "Calculadora de Crédito",
      description: "Simula cuotas.",
      slug: "calculadora-de-credito",
    });
    expect(withoutFaq["@graph"]).toHaveLength(2);
  });

  it("construye WebSite y CollectionPage con ItemList para Home y hubs de categorías", () => {
    const website = buildWebSiteJsonLd();
    expect(website["@context"]).toBe("https://schema.org");
    expect(website["@graph"]).toHaveLength(2);
    expect((website["@graph"][1] as Record<string, unknown>)["@type"]).toBe("WebSite");

    const collection = buildCollectionPageJsonLd({
      name: "Calculadoras Financieras",
      description: "Herramientas financieras para Colombia.",
      path: "/calculadoras",
      items: [
        { name: "Calculadora 4x1000", url: "/calculadoras/4x1000" },
        { name: "Conversor de dólares", url: "/calculadoras/conversor-dolares" },
      ],
    });
    expect(collection["@graph"]).toHaveLength(3);
    const itemList = collection["@graph"][2] as {
      "@type": string;
      itemListElement: Array<{ url: string }>;
    };
    expect(itemList["@type"]).toBe("ItemList");
    expect(itemList.itemListElement[0].url).toBe(`${SITE_URL}/calculadoras/4x1000`);
  });
});

describe("Copy dinámico de tasas (profitabilityCopy) y validación de URLs de afiliado", () => {
  it("calcula tasas y ejemplos mensuales dinámicos desde Sanity sin porcentajes hardcodeados", () => {
    expect(formatEaRangeLabel([0.093])).toBe("9.30% EA");
    expect(formatEaRangeLabel([0.075, 0.0925])).toBe("entre 7.50% y 9.25% EA");
    expect(formatEaRangeLabel([])).toBe("tasa variable vigente");

    expect(formatRentabilidadCardInterest([0.075, 0.0925])).toBe("7.50 a 9.25");
    expect(formatSelectedRateLabel([], 0)).toBe("Tasa variable vigente");
    expect(formatSelectedRateLabel([0.093], 0)).toBe("Tasa de 9.30 % EA");

    const nuCopy = buildBankPageCopy("nu", [0.093]);
    expect(nuCopy.cardDescription).toContain("9.30% EA");
    expect(nuCopy.cardDescription).not.toContain("8.25%");
    expect(nuCopy.faq[0].description).toContain("9.30% EA");
    expect(nuCopy.info[4].description).toContain("9.30%");

    const example = estimateMonthlyExample(1_000_000, [0.093]);
    expect(example).not.toBeNull();
    expect(example!.monthlyInterestCop).toBeGreaterThan(7000);
    expect(example!.monthlyInterestCop).toBeLessThan(8000);
  });

  it("valida URLs externas seguras para botones de afiliado o solicitud", () => {
    expect(isSafeExternalUrl("https://www.banco.com.co/tarjeta?ref=123")).toBe(true);
    expect(isSafeExternalUrl("http://ejemplo.com/oferta")).toBe(true);
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("/ruta-relativa")).toBe(false);
    expect(isSafeExternalUrl("")).toBe(false);
    expect(isSafeExternalUrl(undefined)).toBe(false);
  });
});
