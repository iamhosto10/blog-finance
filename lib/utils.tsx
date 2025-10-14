import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CalcInputs,
  CalcResult,
  Compounding,
  Cuota,
  DailyGrowth,
  Frequency,
  InvestmentRow,
  Payment,
  ResultadoSimulacion,
  SimuladorInput,
  SimulationResult,
  table,
  YearRow,
} from "./interface";
import { client } from "./sanity";
import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    miniatureImage,
    excerpt,
    audio,
    body,
    categories[]->{
      _id,
      title,
      slug
    },
    relatedNews[]->{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }
  }`,
    { slug }
  );
}

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <>
        <p className="whitespace-pre-line font-canva-sans text-tertiary">
          {children}
        </p>
        <br />
      </>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-tertiary font-canva-sans my-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-tertiary font-canva-sans my-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-tertiary font-canva-sans my-2">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-2 marker:font-bold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-tertiary font-canva-sans">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded">
        {children}
      </code>
    ),
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertCurrency(
  amount: number,
  rate: number,
  to: "USD" | "COP"
): number {
  if (to === "COP") {
    return amount * rate;
  } else {
    return amount / rate;
  }
}

export function convertStringtoNumber(number: string) {
  if (number.substring(0, 1) === "0" && number.length === 1) {
    return "0";
  }
  if (number.substring(0, 1) === "0" && number.substring(1, 2) !== ".") {
    const [integer, decimal] = number.substring(1).split(".");
    const intsplited = integer.split(",").join("");
    if (decimal === undefined) return intsplited;

    return intsplited + "." + decimal;
  } else {
    const [integer, decimal] = number.split(".");

    const intsplited = integer.split(",").join("");
    if (decimal === undefined) return intsplited;

    return intsplited + "." + decimal;
  }
}

export function splitFromEnd(str: string, size: number) {
  const result = [];
  let i = str.length;

  while (i > 0) {
    const start = Math.max(i - size, 0);
    result.unshift(str.slice(start, i));
    i -= size;
  }

  return result;
}

export function convertNumbertoString(number: number | string) {
  const cadena = number + "";
  const [integer, decimal] = cadena.split(".");
  const newInteger = splitFromEnd(integer, 3).join(",");
  if (decimal === undefined) return newInteger;
  return newInteger + "." + decimal.substring(0, 2);
}

export function validarNumero(input: string) {
  const regex = /^$|^\d+(?:,\d+)*(?:\.\d*)?$/;
  return regex.test(input);
}

export const calculateDailyGrowth = (
  initialAmount: number,
  days: number,
  annualRate: number
): DailyGrowth[] => {
  const results: DailyGrowth[] = [];
  const dailyRate = Math.pow(1 + annualRate, 1 / 365) - 1;
  let amount = initialAmount;

  for (let i = 1; i <= days; i++) {
    const inte = amount * (1 + dailyRate) - amount;
    const retem = inte > 2588.58 ? parseFloat((inte * 0.07).toFixed(2)) : 0;
    amount = amount + inte - retem;
    results.push({
      day: i,
      amount: parseFloat(amount.toFixed(2)), // redondeo a 2 decimales
      interest: parseFloat(inte.toFixed(2)),
      retencion: retem,
    });
  }

  return results;
};

export const calculateFinalAmount = (
  initialAmount: number,
  days: number,
  annualRate: number
): number => {
  return parseFloat(
    (initialAmount * Math.pow(1 + annualRate, days / 365)).toFixed(2)
  );
};

export const calculatefinalAmountLulo = (
  eaPercent: number,
  monthsCount: number,
  capital: number
) => {
  const EA = Number(eaPercent) / 100;
  const n = Math.max(0, Math.floor(Number(monthsCount)));
  const P = Number(capital);
  if (!isFinite(EA) || !isFinite(n) || !isFinite(P) || P < 0 || n < 0)
    return null;

  const i_mes = Math.pow(1 + EA, 1 / 12) - 1;
  const daysPerMonth = 30;

  const montoBruto = P * Math.pow(1 + i_mes, n);

  let retencion = 0;
  for (let m = 0; m < n; m++) {
    const saldoInicioMes = P * Math.pow(1 + i_mes, m);
    const gananciaDiaria = (saldoInicioMes * i_mes) / daysPerMonth;
    if (gananciaDiaria > 2739) {
      const retDiaria = 0.07 * gananciaDiaria;
      retencion += daysPerMonth * retDiaria;
    }
  }

  const retencionRounded = Math.round(retencion);
  const montoFinal = Math.round(montoBruto - retencionRounded);

  return {
    eaPercent: Number(eaPercent),
    i_mes,
    gananciaDiariaAprox: (P * i_mes) / daysPerMonth,
    montoBruto,
    retencion: retencionRounded,
    montoFinal,
  };
};

export const formatCOP = (valor: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

export function generarPlanPagos(
  monto: number,
  tasaEA: number,
  meses: number,
  seguro: number = 0
): table {
  // Convertir EA -> NMV (tasa nominal mensual vencida)
  const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;

  const cuotaCapital = monto / meses;
  let saldoPendiente = monto;

  const pagos: Payment[] = [];

  const total = {
    totalCuotaCapital: 0,
    totalinteresMensual: 0,
    totalseguro: 0,
    totalcuotaTotal: 0,
    totalsaldoPendiente: 0,
  };

  for (let i = 1; i <= meses; i++) {
    const interesMensual = saldoPendiente * tasaMensual;

    saldoPendiente -= cuotaCapital;

    const cuotaTotal = cuotaCapital + interesMensual + seguro;

    // Calcular fecha de corte sumando i meses

    total.totalCuotaCapital += Number(cuotaCapital.toFixed(0));
    total.totalcuotaTotal += Number(cuotaTotal.toFixed(0));
    total.totalseguro += seguro;
    total.totalsaldoPendiente += Number(Math.max(saldoPendiente, 0).toFixed(0));
    total.totalinteresMensual += Number(interesMensual.toFixed(0));

    pagos.push({
      cuota: i,
      cuotaCapital: Number(cuotaCapital.toFixed(0)),
      interesMensual: Number(interesMensual.toFixed(0)),
      saldoPendiente: Number(Math.max(saldoPendiente, 0).toFixed(0)),
      seguro: seguro,
      cuotaTotal: Number(cuotaTotal.toFixed(0)),
    });
  }

  return { tabla: pagos, total };
}

export function calcularAmortizacionFrancesa(
  monto: number,
  tasaAnual: number,
  meses: number,
  seguroVida: number = 0
): table {
  const tasaMensual = Math.pow(1 + tasaAnual, 1 / 12) - 1;
  const cuotaFija =
    (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

  let saldo = monto;
  const tabla: Payment[] = [];

  const total = {
    totalCuotaCapital: 0,
    totalinteresMensual: 0,
    totalseguro: 0,
    totalcuotaTotal: 0,
    totalsaldoPendiente: 0,
  };

  for (let mes = 1; mes <= meses; mes++) {
    const interes = saldo * tasaMensual;
    const abonoCapital = cuotaFija - interes;
    saldo -= abonoCapital;

    total.totalCuotaCapital += Math.round(abonoCapital);
    total.totalcuotaTotal += Math.round(cuotaFija + seguroVida);
    total.totalseguro += seguroVida;
    total.totalsaldoPendiente += Math.max(Math.round(saldo), 0);
    total.totalinteresMensual += Math.round(interes);

    tabla.push({
      cuota: mes,
      cuotaCapital: Math.round(abonoCapital),
      interesMensual: Math.round(interes),
      seguro: seguroVida,
      cuotaTotal: Math.round(cuotaFija + seguroVida),
      saldoPendiente: Math.max(Math.round(saldo), 0),
    });
  }

  return { tabla, total };
}

/**
 * Map frecuencia a contribuciones por año.
 */
const contributionsPerYearMap: Record<Frequency, number> = {
  daily: 365,
  weekly: 52,
  biweekly: 26,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

/**
 * Map compounding a periodos por año.
 */
const compoundingPeriodsPerYear: Record<Compounding, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

/**
 * Calcula la tabla de ahorros.
 *
 * Método:
 * 1) Convierte la contribución (ej. $50 semanal) a un total anual.
 * 2) Distribuye ese total anual en pagos iguales por cada periodo de capitalización
 *    (ej. si compounding = monthly --> 12 pagos iguales/ año).
 * 3) Simula periodo a periodo (period = 1/periodsPerYear) aplicando:
 *     - si timing = 'start' añade aporte antes de calcular interés del periodo
 *     - calcula interés del periodo como balance * periodicRate
 *     - si timing = 'end' añade aporte después de calcular interés
 * 4) Resume año a año para devolver la tabla.
 */
export function calcSavingsSchedule(inputs: CalcInputs): CalcResult {
  const {
    initialAmount,
    years,
    annualRatePct,
    additionalContribution,
    contributionFrequency,
    compounding,
    timing = "end",
  } = inputs;

  if (years <= 0) {
    throw new Error("years must be > 0");
  }
  if (initialAmount < 0 || additionalContribution < 0) {
    throw new Error("Amounts must be >= 0");
  }

  const contribsPerYear = contributionsPerYearMap[contributionFrequency];
  const compPerYear = compoundingPeriodsPerYear[compounding];

  // total aporte anual (ej: 50 * 52 = 2600)
  const annualContribution = additionalContribution * contribsPerYear;

  // pago por periodo de capitalización (ej: 2600 / 12 si compounding = monthly)
  const contributionPerCompPeriod = annualContribution / compPerYear;

  // tasa periódica (= tasa anual / compounding periods)
  const rPeriodic = annualRatePct / 100 / compPerYear;

  const totalPeriods = years * compPerYear;

  let balance = round2(initialAmount);
  let accumulatedContribution = round2(initialAmount); // incluye inicial
  let accumulatedInterest = 0;

  const rows: YearRow[] = [];

  // fila year 0 (estado inicial)
  rows.push({
    year: 0,
    additions: round2(initialAmount),
    interest: 0,
    balanceEnd: round2(balance),
  });

  let yearIndex = 1;
  let additionsThisYear = 0;
  let interestThisYear = 0;
  let periodsCountedThisYear = 0;

  for (let p = 1; p <= totalPeriods; p++) {
    // Si timing = 'start' se añade aporte al inicio del periodo
    if (timing === "start") {
      balance = round2(balance + contributionPerCompPeriod);
      additionsThisYear = round2(additionsThisYear + contributionPerCompPeriod);
      accumulatedContribution = round2(
        accumulatedContribution + contributionPerCompPeriod
      );
    }

    // interés del periodo
    const interest = round2(balance * rPeriodic);
    balance = round2(balance + interest);
    interestThisYear = round2(interestThisYear + interest);
    accumulatedInterest = round2(accumulatedInterest + interest);

    // Si timing = 'end' añade aporte después de interés
    if (timing === "end") {
      balance = round2(balance + contributionPerCompPeriod);
      additionsThisYear = round2(additionsThisYear + contributionPerCompPeriod);
      accumulatedContribution = round2(
        accumulatedContribution + contributionPerCompPeriod
      );
    }

    periodsCountedThisYear++;

    // Si completamos un año (compPerYear periodos) guardamos fila
    if (periodsCountedThisYear === compPerYear) {
      rows.push({
        year: yearIndex,
        additions: round2(additionsThisYear),
        interest: round2(interestThisYear),
        balanceEnd: round2(balance),
      });

      // reset para siguiente año
      yearIndex++;
      additionsThisYear = 0;
      interestThisYear = 0;
      periodsCountedThisYear = 0;
    }
  }

  const finalBalance = round2(balance);
  const totalContributed = round2(accumulatedContribution);
  const totalInterest = round2(accumulatedInterest);

  return {
    rows,
    totalContributed,
    totalInterest,
    finalBalance,
  };
}

/** redondeo a 2 decimales */
function round2(v: number) {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}

// SIMULADOR DE INVERSION
export const simulateInvestment = (
  initialInvestment: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): SimulationResult => {
  const monthlyRate = annualRate / 12 / 100; // convertir % anual a decimal mensual
  const months = years * 12;

  let balance = initialInvestment;
  let totalContributions = initialInvestment;
  let totalInterest = 0;

  const table: InvestmentRow[] = [];

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;

    if (m > 1) {
      totalContributions += monthlyContribution; // el inicial ya se contó
    }
    totalInterest += interest;

    table.push({
      month: m,
      year: Math.ceil(m / 12),
      initialBalance: parseFloat(
        (balance - interest - monthlyContribution).toFixed(2)
      ),
      contribution: monthlyContribution,
      interest: parseFloat(interest.toFixed(2)),
      finalBalance: parseFloat(balance.toFixed(2)),
    });
  }

  return {
    table,
    totalContributed: parseFloat(totalContributions.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    finalBalance: parseFloat(balance.toFixed(2)),
  };
};

/**
 * Calcula la tabla de amortización mes a mes para un crédito de vivienda
 */
export const simularCreditoVivienda = ({
  valorVivienda,
  cuotaInicialPorcentaje,
  tasaInteresAnual,
  plazoAnios,
  seguroMensual = 0,
  gastosFijos = 0,
}: SimuladorInput): ResultadoSimulacion => {
  const meses = plazoAnios * 12;
  const tasaMensual = tasaInteresAnual / 100 / 12;
  const cuotaInicial = (valorVivienda * cuotaInicialPorcentaje) / 100;
  const montoPrestamo = valorVivienda - cuotaInicial;

  // Fórmula de amortización: cuota fija mensual
  const cuotaBase =
    (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

  let saldo = montoPrestamo;
  const tabla: Cuota[] = [];

  for (let mes = 1; mes <= meses; mes++) {
    const interes = saldo * tasaMensual;
    const abonoCapital = cuotaBase - interes;
    saldo -= abonoCapital;

    const seguro =
      typeof seguroMensual === "number" && seguroMensual < 1
        ? saldo * seguroMensual // Si se da como porcentaje
        : seguroMensual;

    const cuotaTotal = cuotaBase + (seguro ?? 0) + gastosFijos;

    tabla.push({
      mes,
      cuota: cuotaTotal,
      interes,
      abonoCapital,
      saldo: saldo > 0 ? saldo : 0,
      seguro,
      gastos: gastosFijos,
    });
  }

  const totalPagado = tabla.reduce((acc, c) => acc + c.cuota, 0);
  const totalIntereses = tabla.reduce((acc, c) => acc + c.interes, 0);
  const totalGastos = tabla.reduce((acc, c) => acc + (c.gastos ?? 0), 0);
  const totalSeguros = tabla.reduce((acc, c) => acc + (c.seguro ?? 0), 0);

  return {
    montoPrestamo,
    cuotaMensual: cuotaBase + seguroMensual + gastosFijos,
    totalPagado,
    totalIntereses,
    totalGastos,
    totalSeguros,
    tabla,
  };
};
