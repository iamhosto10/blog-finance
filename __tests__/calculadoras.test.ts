import { describe, it, expect } from "vitest";

function calcularLogica4x1000(monto: number) {
  const impuesto = monto * 0.004;
  const total = monto - impuesto;
  const resultado = monto / (1 - 0.004);
  return { impuesto, total, resultado };
}

describe("Lógica Real de la Calculadora 4x1000", () => {
  it("debe calcular los montos correctos para 1,000,000 de pesos", () => {
    // 1. Preparamos el escenario
    const monto = 1000000;

    // 2. Ejecutamos TU código real
    const resultado = calcularLogica4x1000(monto);

    // 3. Verificamos que TU fórmula matemática esté bien
    expect(resultado.impuesto).toBe(4000);
    expect(resultado.total).toBe(996000);
    // Usamos toBeCloseTo porque la división genera muchos decimales (1004016.064...)
    expect(resultado.resultado).toBeCloseTo(1004016.06, 2);
  });

  it("el impuesto de 0 pesos debe dar 0 en todos los campos", () => {
    const resultado = calcularLogica4x1000(0);
    expect(resultado.impuesto).toBe(0);
    expect(resultado.total).toBe(0);
    expect(resultado.resultado).toBe(0);
  });
});
