import { createHash } from "node:crypto";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubscriberInput {
  email: string;
  source?: string;
  name?: string;
  interest?: string;
}

export interface ExistingSubscriberDoc {
  _id: string;
  source?: string;
  sources?: string[];
  status?: string;
  name?: string;
  interest?: string;
}

export interface SanityPatchBuilder {
  set: (attrs: Record<string, unknown>) => SanityPatchBuilder;
  commit: () => Promise<unknown>;
}

export interface SanitySubscriberClient {
  fetch: <T = ExistingSubscriberDoc | null>(
    query: string,
    params?: Record<string, unknown>,
  ) => Promise<T>;
  createIfNotExists: (doc: Record<string, unknown>) => Promise<unknown>;
  patch: (id: string) => SanityPatchBuilder;
}

export interface UpsertSubscriberResult {
  id: string;
  email: string;
  source: string;
  alreadySubscribed: boolean;
  persisted: boolean;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function sanitizeSource(source?: unknown, fallback = "footer_newsletter"): string {
  if (typeof source !== "string") return fallback;
  const cleaned = source.trim().slice(0, 80);
  return cleaned || fallback;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatColombiaDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(date);
}

/**
 * Genera un _id determinístico para evitar duplicados incluso bajo peticiones concurrentes.
 */
export function buildSubscriberId(normalizedEmail: string): string {
  const digest = createHash("sha256").update(normalizedEmail).digest("hex").slice(0, 32);
  return `subscriber-${digest}`;
}

/**
 * Inserta o actualiza un suscriptor en Sanity evitando registros duplicados por correo.
 */
export async function upsertSubscriber(
  input: SubscriberInput,
  sanityClient: SanitySubscriberClient,
  now: Date = new Date(),
): Promise<UpsertSubscriberResult> {
  const email = normalizeEmail(input.email);
  const source = sanitizeSource(input.source);
  const name = typeof input.name === "string" ? input.name.trim().slice(0, 120) : "";
  const interest =
    typeof input.interest === "string" ? input.interest.trim().slice(0, 160) : "";
  const nowIso = now.toISOString();

  const existing = await sanityClient.fetch<ExistingSubscriberDoc | null>(
    `*[_type == "subscriber" && lower(email) == $email][0]{
      _id,
      source,
      sources,
      status,
      name,
      interest
    }`,
    { email },
  );

  if (existing?._id) {
    const mergedSources = Array.from(
      new Set([...(existing.sources ?? []), ...(existing.source ? [existing.source] : []), source]),
    );

    const patchPayload: Record<string, unknown> = {
      email,
      lastSeenAt: nowIso,
      sources: mergedSources,
    };

    if (name && !existing.name) {
      patchPayload.name = name;
    }
    if (interest) {
      patchPayload.interest = interest;
    }
    if (!existing.status) {
      patchPayload.status = "active";
    }

    await sanityClient.patch(existing._id).set(patchPayload).commit();

    return {
      id: existing._id,
      email,
      source,
      alreadySubscribed: true,
      persisted: true,
    };
  }

  const deterministicId = buildSubscriberId(email);
  await sanityClient.createIfNotExists({
    _id: deterministicId,
    _type: "subscriber",
    email,
    source,
    sources: [source],
    status: "active",
    ...(name ? { name } : {}),
    ...(interest ? { interest } : {}),
    createdAt: nowIso,
    lastSeenAt: nowIso,
  });

  return {
    id: deterministicId,
    email,
    source,
    alreadySubscribed: false,
    persisted: true,
  };
}
