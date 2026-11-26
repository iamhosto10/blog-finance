export interface BuiltInLeadMagnet {
  slug: string;
  title: string;
  filename: string;
  contentType: string;
  buildContent: () => string;
}

export type CalculatorCtaId =
  | "4x1000"
  | "credito"
  | "ahorro"
  | "leasing-vivienda"
  | "rentabilidad"
  | "inversion"
  | "comparador-tarjetas"
  | "conversor-dolares";

export interface CalculatorCtaConfig {
  id: CalculatorCtaId;
  leadMagnetSlug: string;
  badge: string;
  headline: string;
  description: string;
  buttonLabel: string;
  proProductId: string;
  proHref: string;
  proLabel: string;
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv(rows: string[][]): string {
  const body = rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n");
  // BOM UTF-8 para que Excel en Windows/Mac en Colombia reconozca tildes y símbolo $.
  return `\uFEFF${body}\r\n`;
}

export const LEAD_MAGNETS: Record<string, BuiltInLeadMagnet> = {
  "guia-presupuesto-50-30-20-colombia": {
    slug: "guia-presupuesto-50-30-20-colombia",
    title: "Plantilla Gratuita: Presupuesto 50/30/20 + Control 4x1000 Colombia",
    filename: "monopolombiano-presupuesto-50-30-20-y-4x1000-colombia.csv",
    contentType: "text/csv; charset=utf-8",
    buildContent: () =>
      toCsv([
        ["MONOPOLOMBIANO.COM — GUÍA PRESUPUESTO 50/30/20 + CONTROL 4x1000 (COLOMBIA)", "", "", "", ""],
        ["Instrucciones: Abre en Excel o Google Sheets y reemplaza los valores de ejemplo en la columna Monto COP.", "", "", "", ""],
        ["", "", "", "", ""],
        ["1. RESUMEN MENSUAL 50/30/20", "Categoría", "Meta %", "Monto Presupuestado (COP)", "Monto Real (COP)"],
        ["Ingreso Neto Mensual (Salario + Extras)", "Ingreso", "100%", "4000000", "4000000"],
        ["Arriendo o cuota vivienda", "Necesidades (50%)", "25%", "1000000", ""],
        ["Mercado y alimentación básica", "Necesidades (50%)", "12%", "480000", ""],
        ["Servicios públicos, celular e internet", "Necesidades (50%)", "6%", "240000", ""],
        ["Transporte / gasolina / SOAT prorrateado", "Necesidades (50%)", "7%", "280000", ""],
        ["Salidas, restaurantes y entretenimiento", "Deseos (30%)", "15%", "600000", ""],
        ["Suscripciones, compras y viajes", "Deseos (30%)", "15%", "600000", ""],
        ["Fondo de emergencia (Cuentas EA / CDT)", "Ahorro e Inversión (20%)", "10%", "400000", ""],
        ["Abono extra a deuda más cara o inversión", "Ahorro e Inversión (20%)", "10%", "400000", ""],
        ["", "", "", "", ""],
        ["2. CONTROL DE CUENTAS Y 4x1000 (GMF 0.4%)", "Entidad / Cuenta", "¿Marcada Exenta (350 UVT)?", "Movimientos del Mes (COP)", "4x1000 Estimado (COP)"],
        ["Cuenta Principal (Nómina)", "Bancolombia / Davivienda / Otro", "SI (1 sola cuenta por persona)", "3500000", "0"],
        ["Cuenta Remunerada / Cajita", "Nu / Lulo / Pibank / Bold / Global66", "NO", "1500000", "6000"],
        ["Billetera Digital", "Nequi / Daviplata / RappiPay", "Verificar tope UVT", "800000", "3200"],
        ["", "", "", "", ""],
        ["3. INVENTARIO DE DEUDAS (MÉTODO AVALANCHA)", "Entidad", "Saldo Actual (COP)", "Tasa EA %", "Cuota Mínima (COP)"],
        ["Tarjeta de Crédito 1", "Banco", "2500000", "28.5%", "180000"],
        ["Crédito Libre Inversión", "Banco", "8000000", "19.8%", "340000"],
        ["", "", "", "", ""],
        ["¿Quieres la versión PRO automatizada con fórmulas dinámicas, amortización y dashboard? Visita https://monopolombiano.com/recursos", "", "", "", ""],
      ]),
  },
  "checklist-vivienda-vis-colombia": {
    slug: "checklist-vivienda-vis-colombia",
    title: "Checklist Gratis: Compra de Vivienda VIS/No VIS y Leasing Colombia",
    filename: "monopolombiano-checklist-vivienda-vis-y-leasing-colombia.csv",
    contentType: "text/csv; charset=utf-8",
    buildContent: () =>
      toCsv([
        ["MONOPOLOMBIANO.COM — CHECKLIST COMPRADOR DE VIVIENDA VIS / NO VIS Y LEASING (COLOMBIA)", "", "", "", ""],
        ["Instrucciones: Usa esta hoja para validar tus costos reales antes de firmar promesa de compraventa o leasing.", "", "", "", ""],
        ["", "", "", "", ""],
        ["Etapa", "Concepto / Verificación", "Responsable", "Estimado COP", "Estado (Pendiente/Listo)"],
        ["1. Capacidad de Pago", "Cuota mensual máxima <= 30% de ingresos netos del hogar", "Comprador", "0", "Pendiente"],
        ["1. Capacidad de Pago", "Cuota inicial (20% Leasing / 30% Crédito Hipotecario)", "Comprador", "0", "Pendiente"],
        ["1. Capacidad de Pago", "Saldo disponible en Cesantías + Ahorro Programado / AFC", "Comprador / Fondo", "0", "Pendiente"],
        ["2. Comparativo Crédito", "Cotización en Pesos Cuota Fija (tasa EA y seguro de vida/incendio)", "Banco 1", "0", "Pendiente"],
        ["2. Comparativo Crédito", "Cotización en UVR (evaluar riesgo de inflación)", "Banco 2", "0", "Pendiente"],
        ["2. Comparativo Crédito", "Cotización Leasing Habitacional (opción de compra y menor inicial)", "Banco 3", "0", "Pendiente"],
        ["3. Gastos Ocultos de Cierre", "Avalúo comercial y estudio de títulos", "Banco / Perito", "0", "Pendiente"],
        ["3. Gastos Ocultos de Cierre", "Gastos notariales de escrituración (aprox. 0.54% - 1%)", "Notaría", "0", "Pendiente"],
        ["3. Gastos Ocultos de Cierre", "Boleta fiscal / Impuesto de registro + Beneficencia", "Gobernación / Registro", "0", "Pendiente"],
        ["3. Gastos Ocultos de Cierre", "Fondo de reserva para mudanza, adecuaciones y administración", "Comprador", "0", "Pendiente"],
        ["", "", "", "", ""],
        ["¿Quieres el Kit PRO de Vivienda en Excel/Sheets con simulador Pesos vs UVR vs Leasing y abonos a capital? Visita https://monopolombiano.com/recursos", "", "", "", ""],
      ]),
  },
  "plan-salida-deudas-y-tarjetas-colombia": {
    slug: "plan-salida-deudas-y-tarjetas-colombia",
    title: "Plantilla Gratis: Control de Tarjetas y Plan Salida de Deudas Colombia",
    filename: "monopolombiano-control-tarjetas-y-deudas-colombia.csv",
    contentType: "text/csv; charset=utf-8",
    buildContent: () =>
      toCsv([
        ["MONOPOLOMBIANO.COM — CONTROL DE TARJETAS Y PLAN SALIDA DE DEUDAS (COLOMBIA)", "", "", "", "", ""],
        ["Instrucciones: Lista tus tarjetas y créditos vigentes, ordena por tasa EA (Avalancha) o saldo (Bola de Nieve) y asigna un abono extra mensual.", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["1. INVENTARIO DE TARJETAS DE CRÉDITO", "Banco / Franquicia", "Cuota de Manejo Mensual (COP)", "Fecha de Corte / Pago", "Tasa EA %", "Saldo Actual (COP)"],
        ["Tarjeta Principal (1 cuota / cashback)", "Banco 1 / Visa", "0", "Corte 15 / Pago 05", "27.5%", "850000"],
        ["Tarjeta Secundaria (compras diferidas)", "Banco 2 / Mastercard", "29900", "Corte 20 / Pago 10", "28.9%", "3200000"],
        ["", "", "", "", "", ""],
        ["2. PLAN DE ATAQUE (AVALANCHA VS BOLA DE NIEVE)", "Entidad", "Saldo Actual (COP)", "Tasa EA %", "Cuota Mínima (COP)", "Abono Extra Mensual (COP)"],
        ["Prioridad 1 (Mayor Tasa EA / Avalancha)", "Tarjeta Secundaria", "3200000", "28.9%", "210000", "250000"],
        ["Prioridad 2 (Siguiente Tasa EA)", "Crédito Libre Inversión", "7500000", "21.4%", "320000", "0"],
        ["Prioridad 3 (Menor Tasa EA)", "Crédito Vehículo / Libranza", "14000000", "16.5%", "480000", "0"],
        ["", "", "", "", "", ""],
        ["3. CHECKLIST ANTES DE PEDIR COMPRA DE CARTERA O NUEVA TARJETA", "Criterio a Verificar", "Tu Banco Actual", "Oferta Nueva", "Ahorro Estimado", "Decisión"],
        ["Tasa EA efectiva", "Debe bajar al menos 3 a 5 puntos EA reales", "28.9%", "19.5%", "Calcular en /calculadoras/calculadora-de-credito", "Evaluar"],
        ["Cuota de manejo y seguros", "Sumar cuota de manejo + seguro de vida mensual", "29900", "0", "358800/año", "Revisar"],
        ["Plazo total", "No alargar el plazo solo para bajar la cuota si sube el interés total", "18 meses", "18 meses", "Mantener plazo", "Validar"],
        ["", "", "", "", "", ""],
        ["¿Quieres ordenar tus tarjetas y armar tu plan paso a paso en vivo? Reserva tu Diagnóstico Financiero 1-a-1 en https://monopolombiano.com/recursos", "", "", "", "", ""],
      ]),
  },
};

export const CALCULATOR_CTA_CONFIG: Record<CalculatorCtaId, CalculatorCtaConfig> = {
  "4x1000": {
    id: "4x1000",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    badge: "Descarga gratuita",
    headline: "Descarga la Plantilla 50/30/20 + Control de 4x1000 en Colombia",
    description:
      "Lleva el control de tu cuenta exenta (350 UVT), calcula tus movimientos mensuales y organiza tu presupuesto en Excel o Google Sheets.",
    buttonLabel: "Descargar plantilla gratis (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Ver Plantilla PRO ($39.000 COP)",
  },
  credito: {
    id: "credito",
    leadMagnetSlug: "plan-salida-deudas-y-tarjetas-colombia",
    badge: "Plan gratuito",
    headline: "Organiza tus cuotas y arma tu plan para salir de deudas",
    description:
      "Recibe gratis nuestra plantilla de control de tarjetas y deudas (Avalancha vs. Bola de Nieve) para evaluar compra de cartera y abonos a capital sin ahorcarte.",
    buttonLabel: "Recibir plan de deudas gratis (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Plantilla PRO con bola de nieve ($39.000 COP)",
  },
  ahorro: {
    id: "ahorro",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    badge: "Descarga gratuita",
    headline: "Convierte esta proyección en un plan mensual real",
    description:
      "Descarga la plantilla gratuita de presupuesto 50/30/20 para separar tu 20% de ahorro cada quincena y evitar fugas por 4x1000.",
    buttonLabel: "Descargar plantilla gratis (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Ver Plantilla Maestra PRO ($39.000 COP)",
  },
  "leasing-vivienda": {
    id: "leasing-vivienda",
    leadMagnetSlug: "checklist-vivienda-vis-colombia",
    badge: "Checklist gratuito",
    headline: "Descarga el Checklist de Gastos Ocultos de Vivienda y Leasing",
    description:
      "No firmes sin revisar cuota inicial, escrituración, boleta fiscal, registro y comparativo Pesos vs UVR vs Leasing Habitacional en Colombia.",
    buttonLabel: "Descargar checklist gratis (.CSV)",
    proProductId: "kit-comprador-vivienda",
    proHref: "/recursos#kit-comprador-vivienda",
    proLabel: "Ver Kit PRO Comprador de Vivienda ($39.000 COP)",
  },
  rentabilidad: {
    id: "rentabilidad",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    badge: "Descarga gratuita",
    headline: "Compara tus cuentas remuneradas y controla el 4x1000",
    description:
      "Descarga nuestra hoja gratuita para registrar tus cajitas y cuentas EA (Nu, Lulo, Pibank, Bold, Global66) sin que el 4x1000 se coma tu rentabilidad.",
    buttonLabel: "Descargar hoja gratis (.CSV)",
    proProductId: "diagnostico-financiero-1a1",
    proHref: "/recursos#diagnostico-financiero-1a1",
    proLabel: "Diagnóstico 1-a-1 o Plantilla PRO",
  },
  inversion: {
    id: "inversion",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    badge: "Descarga gratuita",
    headline: "Estructura tus aportes mensuales con la regla 50/30/20",
    description:
      "Descarga gratis la plantilla base para definir cuánto destinar cada mes a inversión sin descuidar tu fondo de emergencia ni tus obligaciones.",
    buttonLabel: "Descargar plantilla gratis (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Explorar Plantillas PRO en /recursos",
  },
  "comparador-tarjetas": {
    id: "comparador-tarjetas",
    leadMagnetSlug: "plan-salida-deudas-y-tarjetas-colombia",
    badge: "Plantilla gratuita",
    headline: "Controla tus tarjetas de crédito sin regalar intereses ni cuota de manejo",
    description:
      "Descarga gratis la plantilla de Control de Tarjetas y Plan Salida de Deudas para registrar fechas de corte, cuotas de manejo, tasas EA y evaluar compra de cartera.",
    buttonLabel: "Descargar plantilla de tarjetas (.CSV)",
    proProductId: "diagnostico-financiero-1a1",
    proHref: "/recursos#diagnostico-financiero-1a1",
    proLabel: "Diagnóstico 1-a-1 para ordenar tarjetas",
  },
  "conversor-dolares": {
    id: "conversor-dolares",
    leadMagnetSlug: "guia-presupuesto-50-30-20-colombia",
    badge: "Descarga gratuita",
    headline: "Controla tus gastos en dólares y tu presupuesto mensual en COP",
    description:
      "Descarga gratis la plantilla 50/30/20 + control de 4x1000 para presupuestar compras internacionales, viajes o ingresos en USD sin descuadrar tus cuentas en Colombia.",
    buttonLabel: "Descargar plantilla gratis (.CSV)",
    proProductId: "plantilla-finanzas-colombia",
    proHref: "/recursos#plantilla-finanzas-colombia",
    proLabel: "Ver Plantilla Maestra PRO ($39.000 COP)",
  },
};

export function getLeadMagnetBySlug(slug: string): BuiltInLeadMagnet | undefined {
  return LEAD_MAGNETS[slug.trim()];
}

export function getCalculatorCtaConfig(calculatorId: CalculatorCtaId): CalculatorCtaConfig {
  return CALCULATOR_CTA_CONFIG[calculatorId];
}
