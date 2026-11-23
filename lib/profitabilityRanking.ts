import { calculatefinalAmountLulo } from "./utils";
import {
  formatEaPercent,
  formatEaRangeLabel,
  type ProfitabilityBankKey,
} from "./profitabilityCopy";

export type ProfitabilityRatesMap = Record<ProfitabilityBankKey, number[] | undefined>;

export interface BankDirectoryEntry {
  key: ProfitabilityBankKey;
  label: string;
  href: string;
  icon: string;
  tierNote?: string;
}

export const BANK_DIRECTORY: BankDirectoryEntry[] = [
  {
    key: "lulo",
    label: "Lulo Bank",
    href: "/calculadoras/lulo",
    icon: "/assets/calculadoras/rentabilidad/luloBank.png",
    tierNote: "Tasa máxima sujeta a bolsillos o plan Lulo Pro",
  },
  {
    key: "nu",
    label: "Nu bank",
    href: "/calculadoras/nu",
    icon: "/assets/calculadoras/rentabilidad/nu.png",
    tierNote: "Cajitas de ahorro sin monto mínimo",
  },
  {
    key: "popular",
    label: "Banco Popular",
    href: "/calculadoras/popular",
    icon: "/assets/calculadoras/rentabilidad/bancoPopular.png",
  },
  {
    key: "pibank",
    label: "Pibank",
    href: "/calculadoras/pibank",
    icon: "/assets/calculadoras/rentabilidad/pibank.png",
    tierNote: "Cuenta remunerada 100% digital",
  },
  {
    key: "global66",
    label: "Global 66",
    href: "/calculadoras/global66",
    icon: "/assets/calculadoras/rentabilidad/global66.png",
  },
  {
    key: "rappi",
    label: "Rappi",
    href: "/calculadoras/rappi",
    icon: "/assets/calculadoras/rentabilidad/rapi.png",
  },
  {
    key: "bold",
    label: "Bold",
    href: "/calculadoras/bold",
    icon: "/assets/calculadoras/rentabilidad/bold.png",
  },
];

export interface RankedBankProjection {
  rank: number;
  key: ProfitabilityBankKey;
  label: string;
  href: string;
  icon: string;
  tierNote?: string;
  topRateDecimal: number;
  topRateLabel: string;
  rateRangeLabel: string;
  grossInterestCop: number;
  retentionCop: number;
  gmf4x1000Cop: number;
  netGainCop: number;
  netFinalCop: number;
  annualizedNetYieldPercent: number;
}

export function rankProfitabilityBanks(options: {
  profitability: Partial<ProfitabilityRatesMap> | null | undefined;
  capitalCop: number;
  months: number;
  applyGmf4x1000?: boolean;
}): RankedBankProjection[] {
  const { profitability, capitalCop, months, applyGmf4x1000 = false } = options;
  const safeCapital = Number.isFinite(capitalCop) && capitalCop > 0 ? capitalCop : 0;
  const safeMonths = Number.isFinite(months) && months > 0 ? Math.floor(months) : 1;

  const entries: Omit<RankedBankProjection, "rank">[] = [];

  for (const bank of BANK_DIRECTORY) {
    const rawRates = profitability?.[bank.key];
    const validRates = Array.isArray(rawRates)
      ? rawRates.filter((r) => typeof r === "number" && Number.isFinite(r) && r > 0)
      : [];

    if (validRates.length === 0) continue;

    const topRateDecimal = Math.max(...validRates);
    const calc = calculatefinalAmountLulo(topRateDecimal * 100, safeMonths, safeCapital);
    if (!calc) continue;

    const grossInterestCop = Math.max(0, Math.round(calc.montoBruto - safeCapital));
    const retentionCop = calc.retencion;
    const gmf4x1000Cop = applyGmf4x1000 ? Math.round(calc.montoFinal * 0.004) : 0;
    const netFinalCop = Math.max(0, calc.montoFinal - gmf4x1000Cop);
    const netGainCop = netFinalCop - safeCapital;

    const annualizedNetYieldPercent =
      safeCapital > 0 && netFinalCop > 0
        ? (Math.pow(netFinalCop / safeCapital, 12 / safeMonths) - 1) * 100
        : 0;

    entries.push({
      key: bank.key,
      label: bank.label,
      href: bank.href,
      icon: bank.icon,
      tierNote: bank.tierNote,
      topRateDecimal,
      topRateLabel: formatEaPercent(topRateDecimal),
      rateRangeLabel: formatEaRangeLabel(validRates),
      grossInterestCop,
      retentionCop,
      gmf4x1000Cop,
      netGainCop,
      netFinalCop,
      annualizedNetYieldPercent,
    });
  }

  entries.sort((a, b) => {
    if (b.netGainCop !== a.netGainCop) return b.netGainCop - a.netGainCop;
    return b.topRateDecimal - a.topRateDecimal;
  });

  return entries.map((entry, idx) => ({
    ...entry,
    rank: idx + 1,
  }));
}
