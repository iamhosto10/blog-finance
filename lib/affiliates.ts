import type { ProfitabilityBankKey } from "./profitabilityCopy";

export interface AffiliateLinkConfig {
  url: string;
  ctaLabel: string;
}

export const AFFILIATE_DISCLOSURE_TEXT =
  "Transparencia financiera: algunos enlaces de solicitud o apertura pueden ser de afiliado o referido sin costo adicional para ti. Monopolombiano no es una entidad financiera ni otorga productos bancarios; verifica siempre las tasas, comisiones y condiciones vigentes directamente con la entidad emisora.";

const BANK_AFFILIATE_MAP: Record<
  ProfitabilityBankKey,
  { bankName: string; envUrl: string | undefined; defaultLabel: string }
> = {
  nu: {
    bankName: "Nu Colombia",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_NU_URL,
    defaultLabel: "Abrir cuenta en Nu",
  },
  lulo: {
    bankName: "Lulo Bank",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_LULO_URL,
    defaultLabel: "Abrir cuenta en Lulo Bank",
  },
  pibank: {
    bankName: "Pibank",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_PIBANK_URL,
    defaultLabel: "Abrir cuenta en Pibank",
  },
  global66: {
    bankName: "Global66",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_GLOBAL66_URL,
    defaultLabel: "Crear cuenta en Global66",
  },
  bold: {
    bankName: "Bold",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_BOLD_URL,
    defaultLabel: "Abrir cuenta en Bold",
  },
  rappi: {
    bankName: "RappiPay",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_RAPPI_URL,
    defaultLabel: "Abrir cuenta en RappiPay",
  },
  popular: {
    bankName: "Banco Popular",
    envUrl: process.env.NEXT_PUBLIC_AFFILIATE_POPULAR_URL,
    defaultLabel: "Ver cuenta en Banco Popular",
  },
};

export function isSafeExternalUrl(rawUrl?: string | null): rawUrl is string {
  if (typeof rawUrl !== "string") return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function getBankAffiliateConfig(
  bankKey: ProfitabilityBankKey,
): (AffiliateLinkConfig & { bankName: string }) | null {
  const entry = BANK_AFFILIATE_MAP[bankKey];
  if (!entry || !isSafeExternalUrl(entry.envUrl)) {
    return null;
  }
  return {
    bankName: entry.bankName,
    url: entry.envUrl.trim(),
    ctaLabel: entry.defaultLabel,
  };
}
