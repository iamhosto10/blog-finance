import { describe, expect, it, vi } from "vitest";
import {
  buildSubscriberId,
  escapeHtml,
  isValidEmail,
  normalizeEmail,
  upsertSubscriber,
  type SanitySubscriberClient,
} from "../lib/subscribers";
import { findRecursoById, RECURSOS_CATALOG } from "../lib/recursos";

describe("Suscriptores y deduplicación en Sanity", () => {
  it("normaliza correos y valida formatos correctamente", () => {
    expect(normalizeEmail("  Usuario@Dominio.CO ")).toBe("usuario@dominio.co");
    expect(isValidEmail("lector@monopolombiano.com")).toBe(true);
    expect(isValidEmail("correo-invalido")).toBe(false);
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it("genera un _id determinístico para evitar duplicados concurrentes", () => {
    const id1 = buildSubscriberId("persona@correo.com");
    const id2 = buildSubscriberId("persona@correo.com");
    const id3 = buildSubscriberId("otra@correo.com");
    expect(id1).toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id1.startsWith("subscriber-")).toBe(true);
  });

  it("crea un nuevo suscriptor en Sanity cuando no existe", async () => {
    const createIfNotExists = vi.fn().mockResolvedValue({});
    const commit = vi.fn().mockResolvedValue({});
    const set = vi.fn().mockReturnValue({ commit });

    const mockClient: SanitySubscriberClient = {
      fetch: vi.fn().mockResolvedValue(null),
      createIfNotExists,
      patch: vi.fn().mockReturnValue({ set, commit }),
    };

    const fixedDate = new Date("2026-11-20T09:00:00.000Z");
    const res = await upsertSubscriber(
      { email: "  Nuevo@Correo.CO ", source: "footer_newsletter" },
      mockClient,
      fixedDate,
    );

    expect(res.alreadySubscribed).toBe(false);
    expect(res.persisted).toBe(true);
    expect(res.email).toBe("nuevo@correo.co");
    expect(createIfNotExists).toHaveBeenCalledTimes(1);
    expect(createIfNotExists).toHaveBeenCalledWith({
      _id: buildSubscriberId("nuevo@correo.co"),
      _type: "subscriber",
      email: "nuevo@correo.co",
      source: "footer_newsletter",
      sources: ["footer_newsletter"],
      status: "active",
      createdAt: "2026-11-20T09:00:00.000Z",
      lastSeenAt: "2026-11-20T09:00:00.000Z",
    });
  });

  it("actualiza el suscriptor existente sin duplicar documentos", async () => {
    const createIfNotExists = vi.fn().mockResolvedValue({});
    const commit = vi.fn().mockResolvedValue({});
    const set = vi.fn().mockReturnValue({ commit });
    const patch = vi.fn().mockReturnValue({ set, commit });

    const mockClient: SanitySubscriberClient = {
      fetch: vi.fn().mockResolvedValue({
        _id: "subscriber-existing-1",
        source: "footer_newsletter",
        sources: ["footer_newsletter"],
        status: "active",
      }),
      createIfNotExists,
      patch,
    };

    const fixedDate = new Date("2026-11-20T10:30:00.000Z");
    const res = await upsertSubscriber(
      {
        email: "Existente@Correo.com",
        source: "recursos_plantilla-finanzas-colombia",
        name: "Camila",
        interest: "Plantilla Maestra",
      },
      mockClient,
      fixedDate,
    );

    expect(res.alreadySubscribed).toBe(true);
    expect(res.id).toBe("subscriber-existing-1");
    expect(createIfNotExists).not.toHaveBeenCalled();
    expect(patch).toHaveBeenCalledWith("subscriber-existing-1");
    expect(set).toHaveBeenCalledWith({
      email: "existente@correo.com",
      lastSeenAt: "2026-11-20T10:30:00.000Z",
      sources: ["footer_newsletter", "recursos_plantilla-finanzas-colombia"],
      name: "Camila",
      interest: "Plantilla Maestra",
    });
    expect(commit).toHaveBeenCalledTimes(1);
  });
});

describe("Catálogo de vitrina /recursos", () => {
  it("contiene los 3 productos y servicios PRO esperados en COP", () => {
    expect(RECURSOS_CATALOG).toHaveLength(3);
    expect(findRecursoById("plantilla-finanzas-colombia")?.priceCop).toBe(39000);
    expect(findRecursoById("kit-comprador-vivienda")?.priceCop).toBe(39000);
    expect(findRecursoById("diagnostico-financiero-1a1")?.priceCop).toBe(110000);
    expect(findRecursoById("inexistente")).toBeUndefined();
  });
});
