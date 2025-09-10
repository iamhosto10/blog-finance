import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DailyGrowth } from "./interface";
import { client } from "./sanity";
import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

//get post from sanity for Metadata

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
  rate: number, // 1 USD = rate COP
  to: "USD" | "COP"
): number {
  if (to === "COP") {
    // De dólares a pesos
    return amount * rate;
  } else {
    // De pesos a dólares
    return amount / rate;
  }
}

export function convertStringtoNumber(number: string) {
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
  // Permite vacío o un número con comas y un punto opcional
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
  console.log(dailyRate);
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

  const i_mes = Math.pow(1 + EA, 1 / 12) - 1; // tasa mensual efectiva
  const daysPerMonth = 30;

  // Monto bruto compuesto (sin descontar retenciones)
  const montoBruto = P * Math.pow(1 + i_mes, n);

  // Calcular retención acumulada (según regla por día)
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
