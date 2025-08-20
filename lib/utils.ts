import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
    let start = Math.max(i - size, 0);
    result.unshift(str.slice(start, i));
    i -= size;
  }

  return result;
}

export function convertNumbertoString(number: number | string) {
  const cadena = number + "";
  const [integer, decimal] = cadena.split(".");
  const newInteger = splitFromEnd(integer, 3).join(",");
  console.log(integer);
  console.log(decimal, "decimaaaal");
  if (decimal === undefined) return newInteger;
  console.log("paso");
  return newInteger + "." + decimal.substring(0, 2);
}

export function validarNumero(input: string) {
  // Permite vacío o un número con comas y un punto opcional
  const regex = /^$|^\d+(?:,\d+)*(?:\.\d*)?$/;
  return regex.test(input);
}
