import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DailyGrowth } from "./interface";

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
