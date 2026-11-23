import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildAnunciateConfirmationEmail,
  buildRecursosConfirmationEmail,
  buildSubscriberWelcomeEmail,
  getEmailFrom,
  resolveLeadMagnetForSource,
} from "../lib/emails";

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

import { POST as postSubscribe } from "../app/api/subscribe/route";
import { POST as postRecursos } from "../app/api/recursos/route";

describe("Correos automáticos de bienvenida y confirmación (Resend)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    mockUpsertSubscriber.mockReset();
    mockResendSend.mockReset();
    delete process.env.EMAIL_FROM;
    delete process.env.SITE_URL;
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.EMAIL_TO = "dueno@monopolombiano.com";
    process.env.SANITY_TOKEN = "sk_test";
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "proj_test";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("usa info@monopolombiano.com como remitente por defecto y respeta EMAIL_FROM si está definido", () => {
    expect(getEmailFrom()).toBe("Monopolombiano <info@monopolombiano.com>");
    expect(getEmailFrom("Monopolombiano Leads")).toBe(
      "Monopolombiano Leads <info@monopolombiano.com>",
    );

    process.env.EMAIL_FROM = "hola@monopolombiano.com";
    expect(getEmailFrom("Monopolombiano")).toBe("Monopolombiano <hola@monopolombiano.com>");

    process.env.EMAIL_FROM = "Equipo <equipo@monopolombiano.com>";
    expect(getEmailFrom("Monopolombiano")).toBe("Equipo <equipo@monopolombiano.com>");
  });

  it("selecciona el lead magnet correcto según el origen de suscripción", () => {
    const vivienda = resolveLeadMagnetForSource("calc_leasing-vivienda_lead_magnet");
    expect(vivienda.isCalculatorLead).toBe(true);
    expect(vivienda.leadMagnet.slug).toBe("checklist-vivienda-vis-colombia");

    const presupuesto = resolveLeadMagnetForSource("footer_newsletter");
    expect(presupuesto.isCalculatorLead).toBe(false);
    expect(presupuesto.leadMagnet.slug).toBe("guia-presupuesto-50-30-20-colombia");
  });

  it("escapa HTML en las plantillas de confirmación de /recursos y /anunciate", () => {
    const rec = buildRecursosConfirmationEmail({
      name: "<script>alert(1)</script>Ana",
      productTitle: "Plantilla PRO",
      priceFormatted: "$39.000 COP",
      paymentPreference: "PSE / Nequi",
    });
    expect(rec.html).not.toContain("<script>");
    expect(rec.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;Ana");

    const b2b = buildAnunciateConfirmationEmail({
      contactName: "Carlos",
      company: "<b>Banco</b>",
      packageTitle: "Patrocinio",
      priceLabel: "$650.000 COP / mes",
    });
    expect(b2b.html).not.toContain("<b>Banco</b>");
    expect(b2b.html).toContain("&lt;b&gt;Banco&lt;/b&gt;");

    const welcome = buildSubscriberWelcomeEmail({
      source: "calc_leasing-vivienda_lead_magnet",
      alreadySubscribed: false,
    });
    expect(welcome.html).toContain("/api/files/checklist-vivienda-vis-colombia");
  });

  it("POST /api/subscribe envía alerta al dueño y correo de bienvenida al suscriptor desde info@monopolombiano.com", async () => {
    mockUpsertSubscriber.mockResolvedValueOnce({
      id: "subscriber-123",
      email: "lector@ejemplo.co",
      source: "footer_newsletter",
      alreadySubscribed: false,
      persisted: true,
    });
    mockResendSend.mockResolvedValue({ id: "email-ok" });

    const req = new Request("https://monopolombiano.com/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "Lector@Ejemplo.co",
        source: "footer_newsletter",
      }),
    });

    const res = await postSubscribe(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.welcomeEmailSent).toBe(true);

    expect(mockResendSend).toHaveBeenCalledTimes(2);
    expect(mockResendSend.mock.calls[0][0]).toMatchObject({
      from: "Monopolombiano Leads <info@monopolombiano.com>",
      to: "dueno@monopolombiano.com",
      replyTo: "lector@ejemplo.co",
    });
    expect(mockResendSend.mock.calls[1][0]).toMatchObject({
      from: "Monopolombiano <info@monopolombiano.com>",
      to: "lector@ejemplo.co",
      replyTo: "dueno@monopolombiano.com",
    });
    expect(mockResendSend.mock.calls[1][0].html).toContain(
      "https://monopolombiano.com/api/files/guia-presupuesto-50-30-20-colombia",
    );
  });

  it("POST /api/subscribe no falla si el correo de bienvenida al usuario devuelve error", async () => {
    mockUpsertSubscriber.mockResolvedValueOnce({
      id: "subscriber-456",
      email: "otro@ejemplo.co",
      source: "footer_newsletter",
      alreadySubscribed: false,
      persisted: true,
    });
    mockResendSend
      .mockResolvedValueOnce({ id: "admin-ok" })
      .mockRejectedValueOnce(new Error("Bounce"));

    const req = new Request("https://monopolombiano.com/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "otro@ejemplo.co",
        source: "footer_newsletter",
      }),
    });

    const res = await postSubscribe(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.welcomeEmailSent).toBe(false);
  });

  it("POST /api/recursos envía alerta al dueño y confirmación al comprador desde info@monopolombiano.com", async () => {
    mockUpsertSubscriber.mockResolvedValueOnce({
      id: "subscriber-789",
      email: "comprador@ejemplo.co",
      source: "recursos_plantilla-finanzas-colombia",
      alreadySubscribed: false,
      persisted: true,
    });
    mockResendSend.mockResolvedValue({ id: "email-rec" });

    const req = new Request("https://monopolombiano.com/api/recursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Laura Martínez",
        email: "comprador@ejemplo.co",
        productId: "plantilla-finanzas-colombia",
        paymentPreference: "Nequi",
      }),
    });

    const res = await postRecursos(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.confirmationEmailSent).toBe(true);

    expect(mockResendSend).toHaveBeenCalledTimes(2);
    expect(mockResendSend.mock.calls[0][0]).toMatchObject({
      from: "Monopolombiano Recursos <info@monopolombiano.com>",
      to: "dueno@monopolombiano.com",
      replyTo: "comprador@ejemplo.co",
    });
    expect(mockResendSend.mock.calls[1][0]).toMatchObject({
      from: "Monopolombiano <info@monopolombiano.com>",
      to: "comprador@ejemplo.co",
      replyTo: "dueno@monopolombiano.com",
    });
    expect(mockResendSend.mock.calls[1][0].html).toContain("Laura Mart");
  });
});
