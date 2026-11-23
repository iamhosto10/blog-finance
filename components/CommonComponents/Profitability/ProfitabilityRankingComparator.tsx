"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Award, Calculator, ExternalLink, Info, Scale } from "lucide-react";
import { getBankAffiliateConfig } from "@/lib/affiliates";
import { trackEvent } from "@/lib/gtag";
import {
  rankProfitabilityBanks,
  type ProfitabilityRatesMap,
} from "@/lib/profitabilityRanking";
import {
  convertNumbertoString,
  convertStringtoNumber,
  formatCOP,
  validarNumero,
} from "@/lib/utils";

const AMOUNT_PRESETS = [
  { label: "$1M", value: 1_000_000 },
  { label: "$5M", value: 5_000_000 },
  { label: "$10M", value: 10_000_000 },
  { label: "$25M", value: 25_000_000 },
  { label: "$50M", value: 50_000_000 },
];

const MONTH_PRESETS = [1, 3, 6, 12, 24];

export default function ProfitabilityRankingComparator({
  profitability,
}: {
  profitability: Partial<ProfitabilityRatesMap> | null | undefined;
}) {
  const [amountInput, setAmountInput] = useState("5,000,000");
  const [months, setMonths] = useState(6);
  const [applyGmf4x1000, setApplyGmf4x1000] = useState(false);

  const capitalCop = useMemo(() => {
    const parsed = Number(convertStringtoNumber(amountInput));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [amountInput]);

  const rankedBanks = useMemo(
    () =>
      rankProfitabilityBanks({
        profitability,
        capitalCop,
        months,
        applyGmf4x1000,
      }),
    [profitability, capitalCop, months, applyGmf4x1000],
  );

  const topBank = rankedBanks[0];

  function handleAmountChange(value: string) {
    if (!validarNumero(value)) return;
    const normalized = convertStringtoNumber(value);
    setAmountInput(normalized ? convertNumbertoString(normalized) : "");
  }

  function handleSelectPresetAmount(presetValue: number) {
    setAmountInput(convertNumbertoString(presetValue));
    trackEvent("profitability_comparator_preset", {
      capital_cop: presetValue,
      months,
    });
  }

  return (
    <section
      aria-labelledby="comparador-cruzado-titulo"
      className="rounded-3xl border border-secondary/20 bg-white p-5 md:p-8 shadow-md space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-secondary/10 pb-5">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 text-secondary px-3 py-1 text-xs font-agrandir font-bold uppercase">
            <Scale className="size-3.5" />
            Ranking neto automático hoy
          </span>
          <h2
            id="comparador-cruzado-titulo"
            className="font-agrandir font-bold text-2xl md:text-3xl text-secondary"
          >
            ¿Qué cuenta te deja más plata neta hoy?
          </h2>
          <p className="font-canva-sans text-sm text-tertiary/80">
            Compara los 7 bancos ordenados por ganancia neta real después de retención en la fuente
            (7%) y opcionalmente 4x1000.
          </p>
        </div>

        {topBank && capitalCop > 0 && (
          <div className="rounded-2xl bg-primary-background text-background px-4 py-3 shrink-0 space-y-0.5">
            <p className="text-[11px] font-agrandir uppercase tracking-wide text-primary font-bold">
              Mejor opción hoy ({months} {months === 1 ? "mes" : "meses"})
            </p>
            <p className="font-agrandir font-bold text-lg">
              {topBank.label} · {topBank.topRateLabel} EA
            </p>
            <p className="font-canva-sans text-xs text-background/90">
              Ganancia neta estimada:{" "}
              <strong>{formatCOP(topBank.netGainCop)}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Controles de simulación cruzada */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-5 space-y-2">
          <label
            htmlFor="ranking-capital-input"
            className="block text-xs font-agrandir font-bold text-secondary uppercase"
          >
            Monto a ahorrar (COP)
          </label>
          <div className="flex items-center gap-2 rounded-xl border-2 border-secondary/20 bg-background px-3 py-2.5 focus-within:border-secondary">
            <span className="font-agrandir font-bold text-secondary">$</span>
            <input
              id="ranking-capital-input"
              type="text"
              inputMode="numeric"
              value={amountInput}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="5,000,000"
              className="w-full font-agrandir font-bold text-tertiary outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {AMOUNT_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handleSelectPresetAmount(preset.value)}
                className={`rounded-lg px-2.5 py-1 text-xs font-agrandir font-bold cursor-pointer transition-colors ${
                  capitalCop === preset.value
                    ? "bg-secondary text-white"
                    : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-2">
          <span className="block text-xs font-agrandir font-bold text-secondary uppercase">
            Plazo estimado
          </span>
          <div className="flex flex-wrap gap-2">
            {MONTH_PRESETS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={`rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-agrandir font-bold cursor-pointer transition-colors ${
                  months === m
                    ? "bg-secondary text-white"
                    : "border border-secondary/20 bg-primary-foreground text-tertiary hover:border-secondary"
                }`}
              >
                {m} {m === 1 ? "mes" : "meses"}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <label className="flex items-start gap-2.5 rounded-xl border border-secondary/20 bg-primary-foreground p-3 cursor-pointer">
            <input
              type="checkbox"
              checked={applyGmf4x1000}
              onChange={(e) => setApplyGmf4x1000(e.target.checked)}
              className="mt-0.5 size-4 accent-secondary cursor-pointer"
            />
            <span className="font-canva-sans text-xs text-tertiary leading-snug">
              <strong>Descontar 4x1000</strong> al retirar (si esta cuenta no está marcada como
              exenta).
            </span>
          </label>
        </div>
      </div>

      {/* Tabla / Ranking de resultados */}
      {capitalCop <= 0 ? (
        <div className="rounded-2xl bg-primary-foreground p-5 text-center font-canva-sans text-sm text-tertiary/80">
          Ingresa un monto mayor a $0 COP para calcular el ranking neto de rentabilidad.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-secondary/15 text-[11px] font-agrandir uppercase tracking-wider text-tertiary/70">
                <th className="py-3 pr-3">Pos.</th>
                <th className="py-3 px-3">Entidad</th>
                <th className="py-3 px-3">Tasa EA vigente</th>
                <th className="py-3 px-3">Interés bruto</th>
                <th className="py-3 px-3">Retención (7%)</th>
                {applyGmf4x1000 && <th className="py-3 px-3">4x1000 (0.4%)</th>}
                <th className="py-3 px-3">Ganancia neta</th>
                <th className="py-3 pl-3 text-right">Siguiente paso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10 font-canva-sans text-sm">
              {rankedBanks.map((bank) => {
                const affiliate = getBankAffiliateConfig(bank.key);
                const isWinner = bank.rank === 1;
                return (
                  <tr
                    key={bank.key}
                    className={isWinner ? "bg-primary/10" : "hover:bg-primary-foreground/60"}
                  >
                    <td className="py-3.5 pr-3">
                      <span
                        className={`inline-flex items-center justify-center size-7 rounded-full font-agrandir font-bold text-xs ${
                          isWinner
                            ? "bg-secondary text-white"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        #{bank.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-agrandir font-bold text-tertiary">
                            {bank.label}
                          </span>
                          {isWinner && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-agrandir font-bold text-white">
                              <Award className="size-3" />
                              Mejor hoy
                            </span>
                          )}
                        </div>
                        {bank.tierNote && (
                          <span className="text-[11px] text-tertiary/70">{bank.tierNote}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-agrandir font-bold text-secondary">
                        {bank.topRateLabel} EA
                      </div>
                      {bank.rateRangeLabel !== `${bank.topRateLabel} EA` && (
                        <div className="text-[11px] text-tertiary/70">{bank.rateRangeLabel}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-tertiary">
                      {formatCOP(bank.grossInterestCop)}
                    </td>
                    <td className="py-3.5 px-3 text-tertiary/80">
                      -{formatCOP(bank.retentionCop)}
                    </td>
                    {applyGmf4x1000 && (
                      <td className="py-3.5 px-3 text-red-700">
                        -{formatCOP(bank.gmf4x1000Cop)}
                      </td>
                    )}
                    <td className="py-3.5 px-3">
                      <span
                        className={`font-agrandir font-bold ${
                          bank.netGainCop >= 0 ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {formatCOP(bank.netGainCop)}
                      </span>
                      <div className="text-[11px] text-tertiary/70">
                        Final: {formatCOP(bank.netFinalCop)}
                      </div>
                    </td>
                    <td className="py-3.5 pl-3 text-right">
                      <div className="inline-flex flex-wrap items-center justify-end gap-1.5">
                        {affiliate && (
                          <a
                            href={affiliate.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored nofollow"
                            onClick={() =>
                              trackEvent("affiliate_click", {
                                item_type: "savings_account",
                                item_name: bank.label,
                                bank_key: bank.key,
                                placement: "rentabilidad_ranking_table",
                                destination_url: affiliate.url,
                              })
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-agrandir font-bold text-secondary hover:bg-primary/90"
                          >
                            Abrir
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                        <Link
                          href={bank.href}
                          onClick={() =>
                            trackEvent("calculator_compare_click", {
                              source: "rentabilidad_ranking_table",
                              target_bank: bank.key,
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-secondary/25 px-2.5 py-1.5 text-xs font-agrandir font-bold text-secondary hover:bg-secondary/5"
                        >
                          <Calculator className="size-3" />
                          Simular
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="flex items-start gap-2 font-canva-sans text-xs text-tertiary/75">
        <Info className="size-4 shrink-0 text-secondary mt-0.5" />
        <span>
          Estimación referencial calculada sobre la tasa máxima vigente de cada entidad en Sanity,
          aplicando retención en la fuente del 7% cuando el rendimiento diario supera el umbral UVT
          vigente. Si marcas 4x1000, se descuenta el 0,4% sobre el saldo retirado.
        </span>
      </p>
    </section>
  );
}
