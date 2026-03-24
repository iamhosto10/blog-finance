import { test, expect } from "@playwright/test";

// test("La calculadora del 4x1000 muestra resultados correctos", async ({
//   page,
// }) => {
//   // 1. El robot navega a la ruta de tu calculadora
//   await page.goto("http://localhost:3000/calculadoras/4x1000");

//   // 2. Busca el input (sabemos que es de type="string" en tu código) y escribe 1000000
//   await page.locator('input[type="string"]').fill("1000000");

//   // 3. Hace clic en el botón exacto
//   await page.getByRole("button", { name: "Calcular 4x1000" }).click();

//   // 4. Verifica que la tarjeta de resultados apareció y dice "$4,000"
//   await expect(page.getByText("Impuesto 4x1000:")).toBeVisible();
//   await expect(page.getByText("$4,000")).toBeVisible();

//   // 5. Verifica que el total restante es correcto
//   await expect(page.getByText("$996,000")).toBeVisible();
// });

test("El conversor actualiza COP cuando se escriben USD", async ({ page }) => {
  // 1. Navegar a la página del conversor
  await page.goto("http://localhost:3000/calculadoras/conversor-dolares");

  // 2. Identificar los inputs usando su nuevo ID
  const inputUsd = page.locator("#input-usd");

  // 3. Escribir 10 en el input de dólares
  await inputUsd.click();
  await inputUsd.pressSequentially("10");

  // 4. Verificar que el input de pesos reaccionó y ya no está vacío
  // (Como el valor del dólar cambia cada día, no podemos poner un número exacto estático en el test,
  // pero podemos verificar que haya hecho un cálculo y tenga un valor diferente de "0" o vacío).

  const inputCop = page.locator("#input-cop");

  await expect(inputCop).toHaveValue(/.+/);
  await expect(inputCop).not.toHaveValue("0");

  // Opcional: Imprimir en la consola del test el valor calculado para verlo
  const valorCalculado = await inputCop.inputValue();
  console.log(`El test calculó que 10 USD son: ${valorCalculado} COP`);
});

test("El conversor actualiza USD cuando se escriben COP", async ({ page }) => {
  await page.goto("http://localhost:3000/calculadoras/conversor-dolares");

  const inputCop = page.locator("#input-cop");

  // Escribir 100,000 en el input de pesos
  await inputCop.click();
  await inputCop.pressSequentially("10");

  const inputUsd = page.locator("#input-usd");

  // Verificar que el input de dólares reaccionó
  await expect(inputUsd).toHaveValue(/.+/);
  await expect(inputUsd).not.toHaveValue("0");
});
