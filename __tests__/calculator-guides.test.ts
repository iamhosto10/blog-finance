import { describe, expect, it, vi } from "vitest";
import type { Blog } from "../lib/interface";
import {
  resolveCalculatorGuides,
  type CalculatorSlug,
} from "../lib/calculatorGuides";

vi.mock("@/lib/sanity", () => ({
  client: {
    fetch: vi.fn().mockResolvedValue([]),
  },
}));

const MOCK_BLOGS: Blog[] = [
  {
    _id: "b-1",
    _type: "blog",
    title: "Cómo evitar el",
    focusTitle: "4x1000",
    continueTitle: "en cuentas exentas",
    slug: { current: "como-evitar-el-4x1000" },
    publishedAt: "2026-11-10T10:00:00Z",
    excerpt: "Marca tu cuenta exenta hasta 350 UVT y ahorra en GMF.",
    body: [],
    categories: [
      { _id: "c-1", title: "Economia Hoy", slug: { current: "economia-hoy" } },
      { _id: "c-2", title: "Impuestos", slug: { current: "impuestos" } },
    ],
  },
  {
    _id: "b-2",
    _type: "blog",
    title: "Cajitas de",
    focusTitle: "Nu Colombia",
    continueTitle: "y rentabilidad EA",
    slug: { current: "cajitas-nu-colombia-rentabilidad" },
    publishedAt: "2026-11-12T10:00:00Z",
    excerpt: "Comparativa de cuentas remuneradas en Colombia.",
    body: [],
    categories: [
      { _id: "c-1", title: "Economia Hoy", slug: { current: "economia-hoy" } },
      { _id: "c-3", title: "Bancos en Colombia", slug: { current: "bancos-en-colombia" } },
    ],
  },
  {
    _id: "b-3",
    _type: "blog",
    title: "Guía para",
    focusTitle: "comprar vivienda",
    continueTitle: "VIS y leasing",
    slug: { current: "guia-comprar-vivienda-vis-leasing" },
    publishedAt: "2026-11-08T10:00:00Z",
    excerpt: "Diferencias entre crédito hipotecario y leasing habitacional.",
    body: [],
    categories: [
      { _id: "c-4", title: "Finanzas Personales", slug: { current: "finanzas-personales" } },
      { _id: "c-5", title: "Comprar vivienda", slug: { current: "comprar-vivienda" } },
    ],
  },
  {
    _id: "b-4",
    _type: "blog",
    title: "Cómo entender el",
    focusTitle: "dólar TRM",
    continueTitle: "al viajar al exterior",
    slug: { current: "entender-dolar-trm-viajes" },
    publishedAt: "2026-11-15T10:00:00Z",
    excerpt: "Consejos para pagar en USD y manejar divisas.",
    body: [],
    categories: [
      { _id: "c-6", title: "Tips Financieros", slug: { current: "tips-financieros" } },
      { _id: "c-7", title: "Manejo de dinero en el extranjero", slug: { current: "manejo-de-dinero-en-el-extranjero" } },
    ],
  },
];

describe("Enlazado interno calculadoras -> artículos (resolveCalculatorGuides)", () => {
  it("prioriza los artículos más relevantes por tema para cada calculadora", () => {
    const g4x1000 = resolveCalculatorGuides("4x1000", MOCK_BLOGS, 3);
    expect(g4x1000.articles[0].href).toBe("/economia-hoy/como-evitar-el-4x1000");
    expect(g4x1000.categoryLinks[0].href).toBe("/economia-hoy/impuestos");

    const gNu = resolveCalculatorGuides("nu", MOCK_BLOGS, 3);
    expect(gNu.articles[0].href).toBe("/economia-hoy/cajitas-nu-colombia-rentabilidad");
    expect(gNu.articles[0].categoryLabel).toBe("Bancos en Colombia");

    const gVivienda = resolveCalculatorGuides("simulador-de-leasing-y-vivienda", MOCK_BLOGS, 3);
    expect(gVivienda.articles[0].href).toBe(
      "/finanzas-personales/guia-comprar-vivienda-vis-leasing",
    );

    const gDolar = resolveCalculatorGuides("conversor-dolares", MOCK_BLOGS, 3);
    expect(gDolar.articles[0].href).toBe("/tips-financieros/entender-dolar-trm-viajes");
  });

  it("resuelve guías y enlaces de categoría válidos para las 15 calculadoras incluso sin artículos", () => {
    const allSlugs: CalculatorSlug[] = [
      "4x1000",
      "nu",
      "lulo",
      "pibank",
      "global66",
      "bold",
      "rappi",
      "popular",
      "calculadora-de-rentabilidad",
      "calculadora-de-credito",
      "calculadora-de-ahorro",
      "simulador-de-inversion",
      "simulador-de-leasing-y-vivienda",
      "comparador-de-tarjetas",
      "conversor-dolares",
    ];

    for (const slug of allSlugs) {
      const result = resolveCalculatorGuides(slug, []);
      expect(result.sectionTitle.length).toBeGreaterThan(10);
      expect(result.categoryLinks).toHaveLength(2);
      for (const link of result.categoryLinks) {
        expect(link.href.startsWith("/")).toBe(true);
      }
      expect(result.articles).toEqual([]);
    }
  });
});
