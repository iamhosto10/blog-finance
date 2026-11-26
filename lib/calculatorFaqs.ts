import type { FaqEntry } from "./structuredData";

export type NonBankCalculatorFaqKey =
  | "calculadora-de-rentabilidad"
  | "calculadora-de-credito"
  | "calculadora-de-ahorro"
  | "simulador-de-inversion"
  | "simulador-de-leasing-y-vivienda"
  | "comparador-de-tarjetas"
  | "conversor-dolares";

export const CALCULATOR_FAQS: Record<NonBankCalculatorFaqKey, FaqEntry[]> = {
  "calculadora-de-rentabilidad": [
    {
      title: "¿Cómo saber qué cuenta de ahorros paga más en Colombia hoy?",
      description:
        "No basta con mirar la tasa Efectiva Anual (EA) bruta: debes comparar la ganancia neta descontando la retención en la fuente del 7% sobre rendimientos financieros y, si tu cuenta no está exenta, el 4x1000 (0,4%) al retirar tu dinero.",
    },
    {
      title: "¿Las cuentas de Nu, Lulo, Pibank, Bold, Global66, Rappi y Banco Popular tienen seguro Fogafín?",
      description:
        "Las cuentas de ahorro de entidades vigiladas por la Superintendencia Financiera de Colombia cuentan con el seguro de depósitos de Fogafín hasta por $50 millones por depositante en cada entidad, lo que te permite diversificar montos mayores entre varios bancos.",
    },
    {
      title: "¿Puedo tener más de una cuenta exenta del 4x1000?",
      description:
        "Por regla general solo puedes marcar una cuenta bancaria exenta del 4x1000 (hasta 350 UVT mensuales por titular según la Ley 2277). Por eso conviene revisar si los rendimientos de una cuenta nueva compensan el 0,4% del retiro.",
    },
  ],
  "calculadora-de-credito": [
    {
      title: "¿Qué diferencia hay entre tasa Efectiva Anual (EA) y Tasa Mensual Vencida (MV)?",
      description:
        "En Colombia los bancos expresan los créditos en Tasa Efectiva Anual (EA) o Nominal Anual, pero la cuota se liquida mes a mes usando la tasa mensual equivalente: (1 + EA)^(1/12) - 1. Nuestra calculadora realiza esa conversión automáticamente.",
    },
    {
      title: "¿Conviene más cuota fija o abono constante a capital?",
      description:
        "La cuota fija facilita el presupuesto porque pagas lo mismo cada mes (sin contar seguros variables), mientras que el abono constante a capital empieza con cuotas más altas pero reduce más rápido el saldo y te ahorra intereses totales.",
    },
    {
      title: "¿Cómo afecta el seguro de vida deudores a la cuota mensual?",
      description:
        "Además de capital e intereses, las entidades financieras cobran mensualmente un seguro de vida deudores (y otros seguros según el crédito). Ingresarlo en el simulador te muestra el valor real que saldrá de tu bolsillo cada mes.",
    },
  ],
  "calculadora-de-ahorro": [
    {
      title: "¿Cómo funciona el interés compuesto en una meta de ahorro?",
      description:
        "El interés compuesto reinvierte los rendimientos generados cada periodo para que empiecen a producir nuevos intereses sobre el capital acumulado y tus aportes mensuales, acelerando el crecimiento de tu ahorro con el tiempo.",
    },
    {
      title: "¿Qué tasa EA debería usar para simular mi ahorro en Colombia?",
      description:
        "Puedes ingresar la tasa Efectiva Anual (EA) real de tu cuenta remunerada, cajita, bolsillo o CDT vigente en Colombia (por ejemplo entre 7% y 11% EA) para proyectar escenarios conservadores y compararlos antes de invertir.",
    },
    {
      title: "¿Cuánto debería ahorrar al mes según la regla 50/30/20?",
      description:
        "Como referencia práctica en Colombia, destina el 50% de tu ingreso neto a necesidades básicas, 30% a deseos o estilo de vida y al menos el 20% a ahorro, fondo de emergencia o abono extra a deudas.",
    },
  ],
  "simulador-de-inversion": [
    {
      title: "¿Qué diferencia hay entre ahorrar en una cuenta EA y simular una inversión a largo plazo?",
      description:
        "Una cuenta remunerada ofrece liquidez diaria con tasa variable, mientras que inversiones como CDTs, fondos de inversión colectiva (FIC) o ETFs buscan preservar o multiplicar capital a mediano y largo plazo asumiendo distintos plazos y volatilidad.",
    },
    {
      title: "¿Debo descontar inflación e impuestos en mis proyecciones de inversión?",
      description:
        "Sí. Para conocer tu rentabilidad real, compara la tasa proyectada frente a la inflación anual en Colombia (IPC) y ten en cuenta la retención en la fuente aplicable según el vehículo de inversión.",
    },
    {
      title: "¿Cómo influyen los aportes mensuales periódicos en el resultado final?",
      description:
        "Mantener aportes constantes cada mes suaviza el impacto de la tasa y multiplica el efecto del interés compuesto; incluso montos pequeños sostenidos durante varios años superan a un aporte único inicial.",
    },
  ],
  "simulador-de-leasing-y-vivienda": [
    {
      title: "¿Cuál es la principal diferencia entre crédito hipotecario y leasing habitacional en Colombia?",
      description:
        "En el crédito hipotecario el inmueble queda a tu nombre desde el inicio con financiación habitual de hasta el 70% (80% en VIS), mientras que en el leasing habitacional el banco es propietario durante el contrato y te permite financiar hasta el 80% u 85% con opción de compra al final.",
    },
    {
      title: "¿Qué gastos adicionales debo contemplar al comprar vivienda además de la cuota?",
      description:
        "Debes incluir cuota inicial, avalúo, estudio de títulos, gastos notariales de escrituración, impuesto de registro, boleta fiscal/beneficencia y los seguros obligatorios de vida e incendio y terremoto.",
    },
    {
      title: "¿Es mejor financiar vivienda en Pesos Cuota Fija o en UVR?",
      description:
        "En Pesos Cuota Fija conoces desde el primer día el valor exacto de tu cuota de capital e intereses. En UVR la cuota inicial suele ser más baja, pero tanto la cuota como el saldo en pesos suben o bajan según la inflación (IPC).",
    },
  ],
  "comparador-de-tarjetas": [
    {
      title: "¿En qué debo fijarme antes de elegir una tarjeta de crédito en Colombia?",
      description:
        "Revisa cuatro variables clave: cuota de manejo (y si tiene exoneración por compras o por los primeros meses), tasa de interés EA frente a la tasa de usura vigente, comisiones por avances y beneficios reales como cashback o millas.",
    },
    {
      title: "¿Si pago mis compras a 1 sola cuota pago intereses?",
      description:
        "En la mayoría de tarjetas de crédito en Colombia, las compras diferidas a 1 cuota pagadas antes de la fecha límite no generan intereses corrientes (excepto en avances en efectivo o tarjetas que cobran interés desde el día 1; revisa el contrato de tu banco).",
    },
    {
      title: "¿Cómo elegir entre tarjeta con cashback, millas o cero cuota de manejo?",
      description:
        "Si gastas poco al mes o estás construyendo historial crediticio, prioriza cero cuota de manejo. Si concentras gastos altos y pagas todo a 1 cuota, calcula si el porcentaje de cashback o millas supera el costo anual de la cuota de manejo.",
    },
  ],
  "conversor-dolares": [
    {
      title: "¿Qué es la TRM y cada cuánto cambia en Colombia?",
      description:
        "La Tasa Representativa del Mercado (TRM) es el indicador oficial del valor del dólar estadounidense frente al peso colombiano calculado por la Superintendencia Financiera con base en las operaciones cambiarias del día hábil anterior.",
    },
    {
      title: "¿Por qué mi banco o tarjeta me cobra un dólar distinto a la TRM oficial?",
      description:
        "Los bancos, billeteras y casas de cambio aplican su propia tasa de compra/venta o un margen (spread) sobre la TRM vigente en el momento en que se liquida la compra internacional, transferencia o retiro.",
    },
    {
      title: "¿Cómo ahorrar dinero al pagar compras o suscripciones en dólares desde Colombia?",
      description:
        "Compara siempre la TRM del día contra la tasa que aplica tu tarjeta, evita la conversión dinámica de divisas en datáfonos del exterior (elige pagar en USD) y evalúa cuentas multimoneda o tarjetas sin recargo por compras internacionales.",
    },
  ],
};
