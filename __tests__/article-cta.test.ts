import { describe, expect, it } from "vitest";
import { resolveArticleCta, resolveSubcategoryCta } from "../lib/articleCta";
import { resolveLeadMagnetForSource } from "../lib/emails";
import { getLeadMagnetBySlug } from "../lib/leadMagnets";
import { findRecursoById } from "../lib/recursos";
import type { Blog } from "../lib/interface";

function makePost(
  overrides: Partial<Pick<Blog, "title" | "focusTitle" | "continueTitle" | "slug" | "categories">>,
): Pick<Blog, "title" | "focusTitle" | "continueTitle" | "slug" | "categories"> {
  return {
    title: "Artículo de prueba",
    slug: { current: "articulo-de-prueba" },
    ...overrides,
  };
}

describe("CTA contextual para artículos del blog (resolveArticleCta)", () => {
  it("recomienda simulador y checklist de vivienda VIS cuando el artículo trata de vivienda o leasing", () => {
    const post = makePost({
      title: "Cómo financiar",
      focusTitle: "vivienda VIS",
      continueTitle: "en Colombia",
      categories: [{ _id: "1", title: "Comprar vivienda", slug: { current: "comprar-vivienda" } }],
    });

    const cta = resolveArticleCta(post, "finanzas-personales");
    expect(cta.topicKey).toBe("vivienda");
    expect(cta.calculatorHref).toBe("/calculadoras/simulador-de-leasing-y-vivienda");
    expect(cta.leadMagnetSlug).toBe("checklist-vivienda-vis-colombia");
    expect(cta.proProductId).toBe("kit-comprador-vivienda");
    expect(cta.subscribeSource).toBe("article_finanzas-personales_vivienda_lead");
    expect(resolveLeadMagnetForSource(cta.subscribeSource).leadMagnet.slug).toBe(
      "checklist-vivienda-vis-colombia",
    );
  });

  it("asigna la calculadora 4x1000 en artículos sobre impuestos o GMF", () => {
    const post = makePost({
      title: "Todo sobre el",
      focusTitle: "4x1000",
      categories: [{ _id: "2", title: "Impuestos", slug: { current: "impuestos" } }],
    });

    const cta = resolveArticleCta(post, "economia-hoy");
    expect(cta.topicKey).toBe("impuestos");
    expect(cta.calculatorHref).toBe("/calculadoras/4x1000");
    expect(cta.leadMagnetSlug).toBe("guia-presupuesto-50-30-20-colombia");
    expect(getLeadMagnetBySlug(cta.leadMagnetSlug)).toBeDefined();
    expect(findRecursoById(cta.proProductId)).toBeDefined();
  });

  it("diferencia entre comparador de tarjetas y calculadora de crédito en artículos de deuda", () => {
    const tarjetaPost = makePost({
      title: "Mejores tarjetas con cashback",
      categories: [{ _id: "3", title: "Historial crediticio", slug: { current: "historial-crediticio" } }],
    });
    const tarjetaCta = resolveArticleCta(tarjetaPost, "tips-financieros");
    expect(tarjetaCta.topicKey).toBe("deuda-tarjetas");
    expect(tarjetaCta.calculatorHref).toBe("/calculadoras/comparador-de-tarjetas");

    const creditoPost = makePost({
      title: "Cómo bajar la cuota de tu préstamo personal",
      categories: [{ _id: "4", title: "Deudas y créditos", slug: { current: "deudas-y-creditos" } }],
    });
    const creditoCta = resolveArticleCta(creditoPost, "finanzas-personales");
    expect(creditoCta.topicKey).toBe("deuda-tarjetas");
    expect(creditoCta.calculatorHref).toBe("/calculadoras/calculadora-de-credito");
  });

  it("asigna conversor de dólares, simulador de inversión y rentabilidad como respaldo", () => {
    const usdPost = makePost({
      title: "Cómo protegerte de la subida del dólar y la TRM",
      categories: [{ _id: "5", title: "Manejo de dinero en el extranjero", slug: { current: "manejo-de-dinero-en-el-extranjero" } }],
    });
    expect(resolveArticleCta(usdPost, "tips-financieros").calculatorHref).toBe(
      "/calculadoras/conversor-dolares",
    );

    const invPost = makePost({
      title: "Invertir en CDT o ETF desde Colombia",
      categories: [{ _id: "6", title: "Inversión", slug: { current: "inversion" } }],
    });
    expect(resolveArticleCta(invPost, "finanzas-personales").calculatorHref).toBe(
      "/calculadoras/simulador-de-inversion",
    );

    const defaultPost = makePost({
      title: "Tasas de cuentas de ahorro en Colombia",
      categories: [{ _id: "7", title: "Bancos en Colombia", slug: { current: "bancos-en-colombia" } }],
    });
    const defaultCta = resolveArticleCta(defaultPost, "economia-hoy");
    expect(defaultCta.topicKey).toBe("rentabilidad");
    expect(defaultCta.calculatorHref).toBe("/calculadoras/calculadora-de-rentabilidad");
    expect(defaultCta.subscribeSource.length).toBeLessThanOrEqual(80);
  });

  it("resuelve calculadoras y lead magnets contextuales para subcategorías editoriales", () => {
    const ahorro = resolveSubcategoryCta(
      "finanzas-personales",
      "ahorro-y-presupuesto",
      "Ahorro y Presupuesto",
    );
    expect(ahorro.calculatorHref).toBe("/calculadoras/calculadora-de-ahorro");
    expect(ahorro.subscribeSource).toBe("category_finanzas-personales_rentabilidad_lead");
    expect(getLeadMagnetBySlug(ahorro.leadMagnetSlug)).toBeDefined();

    const regulaciones = resolveSubcategoryCta(
      "economia-hoy",
      "regulaciones",
      "Regulaciones",
    );
    expect(regulaciones.calculatorHref).toBe("/calculadoras/4x1000");

    const vivienda = resolveSubcategoryCta(
      "finanzas-personales",
      "comprar-vivienda",
      "Comprar Vivienda",
    );
    expect(vivienda.calculatorHref).toBe("/calculadoras/simulador-de-leasing-y-vivienda");
    expect(vivienda.leadMagnetSlug).toBe("checklist-vivienda-vis-colombia");

    const cripto = resolveSubcategoryCta(
      "economia-hoy",
      "cripto-y-nuevas-tecnologias",
      "Cripto y Nuevas Tecnologías",
    );
    expect(cripto.calculatorHref).toBe("/calculadoras/simulador-de-inversion");
  });
});
