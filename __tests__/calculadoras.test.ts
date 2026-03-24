import { describe, it, expect } from "vitest";

// Aquí simulamos la función matemática que usarías en tus componentes
function calcular4x1000(monto: number): number {
  return (monto * 4) / 1000;
}

describe("Calculadoras Financieras", () => {
  it("debe calcular correctamente el 4x1000 para un millón de pesos", () => {
    const monto = 1000000;
    const resultado = calcular4x1000(monto);

    // Le decimos a Vitest qué resultado esperamos que dé la matemática
    expect(resultado).toBe(4000);
  });

  it("el impuesto de cero pesos debe ser cero", () => {
    expect(calcular4x1000(0)).toBe(0);
  });
});
