import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { findAdPackageById, MEDIA_KIT_PACKAGES } from "../lib/anunciate";
import { rankProfitabilityBanks } from "../lib/profitabilityRanking";

const { mockUpsertSubscriber, mockResendSend } = vi.hoisted(() => ({
  mockUpsertSubscriber: vi.fn(),
  mockResendSend: vi.fn(),
}));

vi.mock("@/lib/sanity", () => ({
  client: {
    fetch: vi.fn(),
    createIfNotExists: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock("@/lib/subscribers", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../lib/subscribers")>();
  return {
    ...actual,
    upsertSubscriber: mockUpsertSubscriber,
  };
});

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: mockResendSend,
    };
  },
}));

import { POST as postAnunciate } from "../app/api/anunciate/route";

describe("Media Kit /anunciate y endpoint /api/anunciate", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    mockUpsertSubscriber.mockReset();
    mockResendSend.mockReset();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.EMAIL_TO = "dueno@monopolombiano.com";
    process.env.SANITY_TOKEN = "sk_test";
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "proj_test";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("expone paquetes B2B válidos y permite resolverlos por ID", () => {
    expect(MEDIA_KIT_PACKAGES.length).toBeGreaterThanOrEqual(4);
    for (const pkg of MEDIA_KIT_PACKAGES) {
      expect(findAdPackageById(pkg.id)?.title).toBe(pkg.title);
    }
    expect(findAdPackageById("inexistente")).toBeUndefined();
  });

  it("rechaza solicitudes B2B incompletas o con correo inválido", async () => {
    const req = new Request("https://monopolombiano.com/api/anunciate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "Fintech CO",
        contactName: "Ana",
        email: "correo-invalido",
        packageId: MEDIA_KIT_PACKAGES[0].id,
      }),
    });

    const res = await postAnunciate(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it("persiste contacto B2B en Sanity sin duplicar y envía correo HTML por Resend", async () => {
    mockUpsertSubscriber.mockResolvedValueOnce({
      id: "subscriber-abc",
      email: "mercadeo@neobanco.co",
      source: "anunciate_b2b_patrocinio-calculadoras",
      alreadySubscribed: false,
      persisted: true,
    });
    mockResendSend.mockResolvedValue({ id: "email-123" });

    const req = new Request("https://monopolombiano.com/api/anunciate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "Neobanco Colombia",
        contactName: "Camila Gómez",
        email: "Mercadeo@Neobanco.co",
        website: "neobanco.co",
        packageId: "patrocinio-calculadoras",
        budgetRange: "$500.000 – $1.500.000 COP",
        notes: "Queremos pautar en rentabilidad.",
      }),
    });

    const res = await postAnunciate(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.persisted).toBe(true);
    expect(data.confirmationEmailSent).toBe(true);

    expect(mockUpsertSubscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "mercadeo@neobanco.co",
        source: "anunciate_b2b_patrocinio-calculadoras",
        name: "Camila Gómez (Neobanco Colombia)",
      }),
      expect.anything(),
    );

    expect(mockResendSend).toHaveBeenCalledTimes(2);
    const emailPayload = mockResendSend.mock.calls[0][0];
    expect(emailPayload.from).toContain("info@monopolombiano.com");
    expect(emailPayload.to).toBe("dueno@monopolombiano.com");
    const confirmationPayload = mockResendSend.mock.calls[1][0];
    expect(confirmationPayload.from).toContain("info@monopolombiano.com");
    expect(confirmationPayload.to).toBe("mercadeo@neobanco.co");
    expect(emailPayload.subject).toContain("Neobanco Colombia");
    expect(emailPayload.html).toContain("https://neobanco.co");
  });
});

describe("Comparador cruzado de rentabilidad (ranking neto + retención + 4x1000)", () => {
  const sampleRates = {
    nu: [0.093],
    lulo: [0.075, 0.0925],
    pibank: [0.11],
    global66: [0.11],
    bold: [0.095],
    rappi: [0.09],
    popular: [0.09],
  };

  it("ordena las entidades por mayor ganancia neta usando la tasa máxima de Sanity", () => {
    const ranked = rankProfitabilityBanks({
      profitability: sampleRates,
      capitalCop: 10_000_000,
      months: 6,
      applyGmf4x1000: false,
    });

    expect(ranked).toHaveLength(7);
    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].topRateDecimal).toBe(0.11);
    expect(ranked[ranked.length - 1].topRateDecimal).toBe(0.09);

    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].netGainCop).toBeGreaterThanOrEqual(ranked[i].netGainCop);
    }
  });

  it("aplica retención en la fuente del 7% en capitales altos y descuenta 4x1000 cuando está activo", () => {
    const withoutGmf = rankProfitabilityBanks({
      profitability: sampleRates,
      capitalCop: 25_000_000,
      months: 1,
      applyGmf4x1000: false,
    });

    const withGmf = rankProfitabilityBanks({
      profitability: sampleRates,
      capitalCop: 25_000_000,
      months: 1,
      applyGmf4x1000: true,
    });

    expect(withoutGmf[0].retentionCop).toBeGreaterThan(0);
    expect(withoutGmf[0].gmf4x1000Cop).toBe(0);
    expect(withGmf[0].gmf4x1000Cop).toBeGreaterThan(0);
    expect(withGmf[0].netGainCop).toBeLessThan(withoutGmf[0].netGainCop);
  });

  it("omite entidades sin tasas válidas sin lanzar errores", () => {
    const ranked = rankProfitabilityBanks({
      profitability: { nu: [0.093], lulo: [] },
      capitalCop: 5_000_000,
      months: 3,
    });
    expect(ranked).toHaveLength(1);
    expect(ranked[0].key).toBe("nu");
  });
});
