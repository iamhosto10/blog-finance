import { calculateDailyGrowth, formatCOP } from "./utils";

export type ProfitabilityBankKey =
  | "nu"
  | "lulo"
  | "pibank"
  | "global66"
  | "bold"
  | "rappi"
  | "popular";

export interface InfoEntry {
  title: string;
  description: string;
}

export interface BankCopyBundle {
  rateBadge: string;
  cardDescription: string;
  info: InfoEntry[];
  faq: InfoEntry[];
}

interface BankStaticMeta {
  name: string;
  exampleCapital: number;
  whatIsTitle: string;
  whatIsDescription: string;
  howWorksTitle: string;
  howWorksDescription: string;
  prosTitle: string;
  prosDescription: string;
  consTitle: string;
  consDescription: string;
  exampleNote: string;
  faqRateQuestion: string;
  faqSafetyQuestion: string;
  faqSafetyAnswer: string;
  faqOpenQuestion: string;
  faqOpenAnswer: string;
  faqCostQuestion: string;
  faqCostAnswer: string;
  faqWithdrawQuestion: string;
  faqWithdrawAnswer: string;
  cardHeadline: string;
  cardBullets: string[];
}

function normalizeValidRates(rates: number[] | undefined): number[] {
  if (!Array.isArray(rates)) return [];
  return rates.filter((r) => typeof r === "number" && Number.isFinite(r) && r > 0);
}

export function formatEaPercent(rateDecimal: number): string {
  return `${(rateDecimal * 100).toFixed(2)}%`;
}

export function formatEaRangeLabel(rates: number[] | undefined): string {
  const valid = normalizeValidRates(rates);
  if (valid.length === 0) return "tasa variable vigente";

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  if (min === max) {
    return `${formatEaPercent(max)} EA`;
  }
  return `entre ${formatEaPercent(min)} y ${formatEaPercent(max)} EA`;
}

export function formatRentabilidadCardInterest(rates: number[] | undefined): string {
  const valid = normalizeValidRates(rates);
  if (valid.length === 0) return "";
  if (valid.length === 1) {
    return (valid[0] * 100).toFixed(2);
  }
  return `${(valid[0] * 100).toFixed(2)} a ${(valid[1] * 100).toFixed(2)}`;
}

export function formatSelectedRateLabel(
  rates: number[] | undefined,
  selectedIndex: number,
): string {
  const valid = normalizeValidRates(rates);
  if (valid.length === 0) return "Tasa variable vigente";
  const rate = valid[selectedIndex] ?? valid[0];
  return `Tasa de ${(rate * 100).toFixed(2)} % EA`;
}

export function estimateMonthlyExample(
  capitalCop: number,
  rates: number[] | undefined,
): {
  capitalFormatted: string;
  rateFormatted: string;
  monthlyInterestCop: number;
  monthlyInterestFormatted: string;
} | null {
  const valid = normalizeValidRates(rates);
  if (valid.length === 0 || !Number.isFinite(capitalCop) || capitalCop <= 0) {
    return null;
  }
  const topRate = Math.max(...valid);
  const dailyRows = calculateDailyGrowth(capitalCop, 30, topRate);
  const finalAmount = dailyRows[dailyRows.length - 1]?.amount ?? capitalCop;
  const monthlyInterestCop = Math.max(0, Math.round(finalAmount - capitalCop));

  return {
    capitalFormatted: formatCOP(capitalCop),
    rateFormatted: formatEaPercent(topRate),
    monthlyInterestCop,
    monthlyInterestFormatted: formatCOP(monthlyInterestCop),
  };
}

const BANK_META: Record<ProfitabilityBankKey, BankStaticMeta> = {
  nu: {
    name: "Nu",
    exampleCapital: 1_000_000,
    whatIsTitle: "¿Qué es Nu en Colombia?",
    whatIsDescription:
      "Nu es un banco digital que llegó a Colombia ofreciendo productos financieros 100% digitales. Su cuenta de ahorros y Cajitas permiten a los usuarios ganar intereses diarios sobre el dinero depositado.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros Nu?",
    howWorksDescription:
      "Tu dinero genera rendimientos diarios con una tasa efectiva anual competitiva en el mercado colombiano. Todo se maneja desde la aplicación móvil sin necesidad de oficinas físicas.",
    prosTitle: "Ventajas de Nu",
    prosDescription:
      "✔ Rendimientos diarios sobre tu saldo.\n✔ Sin cuota de manejo.\n✔ Apertura y uso totalmente digital.\n✔ Transferencias gratuitas a otros bancos en Colombia.\n✔ Transparencia y control desde la app.",
    consTitle: "Desventajas de Nu",
    consDescription:
      "❌ No tiene oficinas físicas, todo es digital.\n❌ La tarjeta débito física puede tardar en llegar.\n❌ Todavía no ofrece todos los productos de un banco tradicional (créditos hipotecarios, CDT, etc.).",
    exampleNote: "que se suman automáticamente a tu saldo.",
    faqRateQuestion: "¿Cuánto paga Nu por ahorrar en Colombia?",
    faqSafetyQuestion: "¿Es seguro ahorrar en Nu?",
    faqSafetyAnswer:
      "Sí, Nu está vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por el seguro de depósitos de Fogafín.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en Nu?",
    faqOpenAnswer:
      "Solo necesitas descargar la app de Nu, registrarte con tu cédula y verificar tu identidad. En minutos puedes abrir tu cuenta sin papeleo.",
    faqCostQuestion: "¿Tiene costos ocultos?",
    faqCostAnswer:
      "No. La cuenta Nu no tiene cuota de manejo ni costos por transferencias, lo que la hace muy competitiva frente a bancos tradicionales.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, tu dinero siempre está disponible. Puedes transferirlo a otros bancos o retirarlo con tu tarjeta débito Nu en cajeros.",
    cardHeadline: "No solo ahorres, ¡haz crecer tu dinero en Cajitas Nu!",
    cardBullets: [
      "Sin mínimos, sin plazos y sin enredos.",
      "Calcula hoy el poder de tu ahorro diario.",
    ],
  },
  lulo: {
    name: "Lulo Bank",
    exampleCapital: 2_000_000,
    whatIsTitle: "¿Qué es Lulo Bank?",
    whatIsDescription:
      "Lulo Bank es un banco 100% digital colombiano que busca ofrecer productos simples y transparentes. Su cuenta de ahorros y bolsillos permiten que tu dinero genere intereses diarios.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros Lulo?",
    howWorksDescription:
      "Al depositar tu dinero en Lulo Bank, este genera rendimientos diarios con una tasa efectiva anual atractiva según tu plan o bolsillos. Todo se maneja desde la app móvil, sin necesidad de sucursales físicas.",
    prosTitle: "Ventajas de Lulo Bank",
    prosDescription:
      "✔ Rendimientos diarios sobre el saldo en bolsillos.\n✔ Sin cuota de manejo ni costos por transferencias.\n✔ Apertura fácil desde el celular.\n✔ Notificaciones en tiempo real y control desde la app.\n✔ Respaldado por el seguro de Fogafín.",
    consTitle: "Desventajas de Lulo Bank",
    consDescription:
      "❌ Solo opera de manera digital, no tiene oficinas físicas.\n❌ La tasa máxima suele requerir usar bolsillos o cumplir condiciones de Lulo Pro.\n❌ Oferta de productos limitada frente a bancos tradicionales.",
    exampleNote: "los cuales se suman automáticamente a tu saldo.",
    faqRateQuestion: "¿Cuánto paga Lulo Bank por ahorrar?",
    faqSafetyQuestion: "¿Es seguro ahorrar en Lulo Bank?",
    faqSafetyAnswer:
      "Sí, Lulo Bank está vigilado por la Superintendencia Financiera de Colombia y tu dinero cuenta con la protección de Fogafín hasta por $50 millones de pesos.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en Lulo Bank?",
    faqOpenAnswer:
      "Debes descargar la app de Lulo Bank, registrarte con tu cédula y realizar el proceso de validación. La apertura es gratuita y 100% digital.",
    faqCostQuestion: "¿Qué costos tiene la cuenta Lulo?",
    faqCostAnswer:
      "No tiene cuota de manejo ni costos por transferencias. Todo está diseñado para ser transparente y sin comisiones ocultas.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, el dinero está disponible en todo momento. Puedes transferir a otros bancos o usar la tarjeta débito Lulo para compras y retiros.",
    cardHeadline: "Ahorra fácil en tu Lulo Cuenta y crea bolsillos para tus metas.",
    cardBullets: [
      "Sin montos mínimos, sin plazos y con tu dinero siempre disponible.",
      "Simula tus ahorros y mira cuánto puedes ganar.",
    ],
  },
  pibank: {
    name: "Pibank",
    exampleCapital: 5_000_000,
    whatIsTitle: "¿Qué es Pibank?",
    whatIsDescription:
      "Pibank es un banco 100% digital que hace parte de Banco Pichincha. En Colombia ofrece una cuenta de ahorros de alta rentabilidad con tasas competitivas y manejo completamente en línea.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros Pibank?",
    howWorksDescription:
      "La cuenta Pibank permite que tu dinero genere intereses diarios con una tasa efectiva anual destacada. Se abre en minutos desde la app o página web y no requiere papeleo ni visitas a oficinas.",
    prosTitle: "Ventajas de Pibank",
    prosDescription:
      "✔ Intereses altos comparados con bancos tradicionales.\n✔ Sin cuota de manejo.\n✔ Apertura y manejo 100% digital.\n✔ Respaldado por Banco Pichincha y protegido por Fogafín.\n✔ Transferencias sin costo a otros bancos.",
    consTitle: "Desventajas de Pibank",
    consDescription:
      "❌ No tiene oficinas físicas en Colombia.\n❌ No ofrece tarjeta débito tradicional para pagos presenciales.\n❌ Su portafolio de productos es limitado frente a bancos más grandes.",
    exampleNote: "los cuales se abonan directamente a tu saldo.",
    faqRateQuestion: "¿Cuánto paga Pibank por ahorrar?",
    faqSafetyQuestion: "¿Es seguro ahorrar en Pibank?",
    faqSafetyAnswer:
      "Sí, Pibank pertenece al Banco Pichincha y está vigilado por la Superintendencia Financiera de Colombia. Además, tu dinero está protegido por Fogafín hasta $50 millones.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en Pibank?",
    faqOpenAnswer:
      "Puedes abrir tu cuenta descargando la app de Pibank o desde su página web. Solo necesitas tu cédula y completar el proceso de validación en línea.",
    faqCostQuestion: "¿Qué costos tiene la cuenta Pibank?",
    faqCostAnswer:
      "La cuenta no tiene cuota de manejo ni cobros por transferencias nacionales, lo que la hace muy competitiva frente a bancos tradicionales.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, tu dinero siempre está disponible. Puedes transferirlo a cualquier banco en Colombia de forma gratuita.",
    cardHeadline: "Tu Cuenta Pibank hace crecer tu dinero desde el primer peso.",
    cardBullets: [
      "Ingresa o retira cuando quieras, sin plazos ni restricciones.",
      "Transferencias sin costo y manejo 100% digital.",
    ],
  },
  global66: {
    name: "Global66",
    exampleCapital: 2_000_000,
    whatIsTitle: "¿Qué es Global66?",
    whatIsDescription:
      "Global66 es una fintech internacional que opera en varios países de Latinoamérica, incluyendo Colombia. Su propuesta principal es ofrecer una cuenta digital y servicios de transferencias internacionales rápidos y económicos.",
    howWorksTitle: "¿Cómo funciona la cuenta Global66?",
    howWorksDescription:
      "Puedes abrir una cuenta 100% digital desde la aplicación o página web. Global66 permite recibir dinero, hacer transferencias internacionales y obtener rendimientos sobre el saldo disponible en pesos según las condiciones vigentes.",
    prosTitle: "Ventajas de Global66",
    prosDescription:
      "✔ Enfoque en transferencias internacionales con costos reducidos.\n✔ Apertura 100% digital y rápida.\n✔ Posibilidad de manejar diferentes monedas.\n✔ Intereses competitivos en el saldo disponible (según condiciones del mercado).\n✔ Transparencia en las tasas de cambio.",
    consTitle: "Desventajas de Global66",
    consDescription:
      "❌ No cuenta con oficinas físicas en Colombia.\n❌ Algunas tasas promocionales pueden requerir condiciones de uso mensual.\n❌ La cobertura de servicios locales es más acotada frente a bancos tradicionales.",
    exampleNote: "además de poder transferir el dinero al exterior con comisiones bajas.",
    faqRateQuestion: "¿Cuánto paga Global66 por ahorrar?",
    faqSafetyQuestion: "¿Es seguro usar Global66?",
    faqSafetyAnswer:
      "Sí, Global66 opera bajo regulación financiera en los países donde está presente. En Colombia, cumple con las normativas locales para proteger a los usuarios.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en Global66?",
    faqOpenAnswer:
      "Solo necesitas registrarte en la app o página web de Global66, validar tu identidad y en minutos tendrás tu cuenta digital lista para usar.",
    faqCostQuestion: "¿Qué costos tiene Global66?",
    faqCostAnswer:
      "Abrir y mantener la cuenta es gratis. Las transferencias internacionales tienen una comisión transparente y competitiva frente a la banca tradicional.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, puedes transferir tu dinero a bancos locales o usarlo para pagos y envíos internacionales en cualquier momento.",
    cardHeadline: "Haz crecer tu saldo en pesos con rendimientos diarios en Global66.",
    cardBullets: [
      "Sin montos mínimos y disponible 24/7.",
      "Ideal si también recibes o envías dinero al exterior.",
    ],
  },
  bold: {
    name: "Bold",
    exampleCapital: 1_500_000,
    whatIsTitle: "¿Qué es Bold?",
    whatIsDescription:
      "Bold es una fintech colombiana que nació enfocada en ofrecer soluciones de pagos digitales para comercios, y ahora también ofrece una cuenta digital con bolsillos de ahorro de alta rentabilidad.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros Bold?",
    howWorksDescription:
      "Tu dinero en los bolsillos de Bold genera rendimientos diarios gracias a su tasa efectiva anual. Puedes abrir tu cuenta de forma digital y manejar todo desde la aplicación móvil.",
    prosTitle: "Ventajas de Bold",
    prosDescription:
      "✔ Intereses competitivos con abono diario.\n✔ Sin cuota de manejo ni costos por transferencias.\n✔ Todo el manejo se hace desde el celular.\n✔ Posibilidad de integrar servicios financieros para negocios y comercios.\n✔ Respaldado por Fogafín.",
    consTitle: "Desventajas de Bold",
    consDescription:
      "❌ Es un banco digital en crecimiento, con menor trayectoria frente a bancos tradicionales.\n❌ No cuenta con oficinas físicas.\n❌ Oferta de productos financieros limitada en comparación con entidades grandes.",
    exampleNote: "que se suman automáticamente a tu saldo.",
    faqRateQuestion: "¿Cuánto paga Bold por ahorrar?",
    faqSafetyQuestion: "¿Es seguro ahorrar en Bold?",
    faqSafetyAnswer:
      "Sí, Bold está vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por Fogafín hasta por $50 millones.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en Bold?",
    faqOpenAnswer:
      "Solo necesitas descargar la aplicación de Bold, registrarte con tu cédula y seguir el proceso de validación en línea. Todo el trámite es 100% digital.",
    faqCostQuestion: "¿Tiene costos la cuenta de Bold?",
    faqCostAnswer:
      "No. Bold no cobra cuota de manejo ni comisiones por transferencias, lo que la hace atractiva para personas y negocios.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, tu dinero siempre está disponible. Puedes transferir a otros bancos o usar los servicios de Bold para pagos y transacciones.",
    cardHeadline: "Haz crecer tu dinero desde el primer peso en tus Bolsillos Bold.",
    cardBullets: [
      "Liquidez total para retirar o mover tu dinero cuando quieras.",
      "Sin plazos ni montos mínimos de apertura.",
    ],
  },
  rappi: {
    name: "RappiPay",
    exampleCapital: 1_000_000,
    whatIsTitle: "¿Qué es RappiPay?",
    whatIsDescription:
      "RappiPay es el banco digital de Rappi en alianza con Davivienda. Ofrece una cuenta de ahorros 100% digital con tarjeta débito y bóvedas o bolsillos con rentabilidad diaria.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros RappiPay?",
    howWorksDescription:
      "Puedes abrir una cuenta desde la app de Rappi, recibir tu tarjeta débito y empezar a ahorrar. Tu dinero en bolsillos genera intereses diarios con una tasa competitiva y puedes usarlo para compras, pagos y transferencias.",
    prosTitle: "Ventajas de RappiPay",
    prosDescription:
      "✔ Rendimientos diarios sobre tu saldo en bóvedas/bolsillos.\n✔ Sin cuota de manejo.\n✔ Integración con la app de Rappi para pagos y compras rápidas.\n✔ Transferencias gratuitas a otros bancos.\n✔ Respaldado por Davivienda y Fogafín.",
    consTitle: "Desventajas de RappiPay",
    consDescription:
      "❌ Dependencia de la app de Rappi o RappiPay para la gestión.\n❌ La tasa alta suele aplicar al dinero apartado en bóvedas o bolsillos.\n❌ Aún no tiene la misma variedad de productos financieros que un banco tradicional.",
    exampleNote: "abonados directamente a tu cuenta.",
    faqRateQuestion: "¿Cuánto paga RappiPay por ahorrar?",
    faqSafetyQuestion: "¿Es seguro ahorrar en RappiPay?",
    faqSafetyAnswer:
      "Sí, RappiPay opera como entidad vigilada por la Superintendencia Financiera de Colombia. Además, tu dinero está protegido por Fogafín hasta por $50 millones.",
    faqOpenQuestion: "¿Cómo abrir una cuenta en RappiPay?",
    faqOpenAnswer:
      "Debes descargar la aplicación de Rappi o RappiPay, ingresar a la sección financiera y registrar tu cuenta con tu cédula. El proceso es 100% digital.",
    faqCostQuestion: "¿Tiene costos la cuenta de RappiPay?",
    faqCostAnswer:
      "No. La cuenta de RappiPay no tiene cuota de manejo ni comisiones por transferencias. Solo revisa las condiciones para retiros en cajeros de otras redes.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, puedes usar tu tarjeta débito RappiPay para compras, retiros en cajeros y transferencias sin restricciones.",
    cardHeadline: "Haz que tu dinero en RappiCuenta crezca en Bóvedas o Bolsillos.",
    cardBullets: [
      "Aparta tu ahorro para recibir la tasa alta desde el primer peso.",
      "Liquidez inmediata dentro del ecosistema Rappi y transferencias.",
    ],
  },
  popular: {
    name: "Banco Popular",
    exampleCapital: 3_000_000,
    whatIsTitle: "¿Qué es el Banco Popular?",
    whatIsDescription:
      "El Banco Popular es una de las entidades financieras más tradicionales de Colombia. Forma parte del Grupo Aval y ofrece una amplia gama de productos, incluyendo cuentas de ahorro y bolsillos de alta rentabilidad.",
    howWorksTitle: "¿Cómo funciona la cuenta de ahorros Banco Popular?",
    howWorksDescription:
      "Con la cuenta de ahorros y bolsillos del Banco Popular puedes generar intereses sobre tu saldo con tasas competitivas en el mercado. Además, tienes acceso a una red amplia de oficinas y cajeros en todo el país.",
    prosTitle: "Ventajas del Banco Popular",
    prosDescription:
      "✔ Respaldo de un banco tradicional del Grupo Aval.\n✔ Intereses competitivos en sus cuentas y bolsillos de ahorro.\n✔ Acceso a oficinas físicas y amplia red de cajeros.\n✔ Variedad de productos adicionales (CDT, créditos, tarjetas).\n✔ Protección de Fogafín.",
    consTitle: "Desventajas del Banco Popular",
    consDescription:
      "❌ Puede cobrar comisiones por retiros o manejo si no se cumplen ciertas condiciones del producto.\n❌ Procesos más tradicionales frente a neobancos 100% digitales.\n❌ La tasa alta puede aplicar solo en modalidades o montos específicos.",
    exampleNote: "dependiendo de las condiciones del producto.",
    faqRateQuestion: "¿Cuánto paga el Banco Popular por ahorrar?",
    faqSafetyQuestion: "¿Es seguro ahorrar en el Banco Popular?",
    faqSafetyAnswer:
      "Sí, el Banco Popular es vigilado por la Superintendencia Financiera de Colombia y tu dinero está protegido por Fogafín hasta por $50 millones.",
    faqOpenQuestion: "¿Cómo abrir una cuenta de ahorros en el Banco Popular?",
    faqOpenAnswer:
      "Puedes abrirla en línea a través de su página web o acercándote a cualquiera de sus oficinas en Colombia. Debes presentar tu cédula y diligenciar el formulario correspondiente.",
    faqCostQuestion: "¿Qué costos tiene la cuenta del Banco Popular?",
    faqCostAnswer:
      "Dependiendo del tipo de cuenta, puede tener cuota de manejo o cobros por retiros y transferencias. Sin embargo, algunos productos digitales ofrecen exenciones especiales.",
    faqWithdrawQuestion: "¿Puedo retirar mi dinero en cualquier momento?",
    faqWithdrawAnswer:
      "Sí, tu dinero siempre está disponible. Puedes retirarlo en cajeros de la red Aval, hacer transferencias o usar tu tarjeta débito.",
    cardHeadline: "Recibe rentabilidad diaria sobre tu saldo con respaldo Grupo Aval.",
    cardBullets: [
      "Gana intereses compuestos sin esperar al fin de mes.",
      "Tu plata siempre disponible y con acceso a red física y digital.",
    ],
  },
};

export function buildBankPageCopy(
  bankKey: ProfitabilityBankKey,
  rates: number[] | undefined,
): BankCopyBundle {
  const meta = BANK_META[bankKey];
  const rateRange = formatEaRangeLabel(rates);
  const example = estimateMonthlyExample(meta.exampleCapital, rates);

  const exampleDescription = example
    ? `Si depositas ${example.capitalFormatted} COP en ${meta.name} con una tasa vigente del ${example.rateFormatted} EA, al cabo de un mes (30 días) podrías recibir aproximadamente ${example.monthlyInterestFormatted} COP en intereses, ${meta.exampleNote}`
    : `Ingresa el monto a invertir y el plazo en nuestra calculadora para estimar cuánto rendirá tu dinero en ${meta.name} según la tasa EA vigente.`;

  const faqRateDescription =
    normalizeValidRates(rates).length > 0
      ? `${meta.name} maneja actualmente una referencia de ${rateRange} registrada en nuestra calculadora, generando intereses diarios según las condiciones de tu cuenta o bolsillo.`
      : `${meta.name} ofrece tasas efectivas anuales variables según las condiciones del mercado colombiano y del producto específico.`;

  const cardDescription =
    normalizeValidRates(rates).length > 0
      ? `${meta.cardHeadline}\nTasa vigente de referencia: ${rateRange}.\n✔ ${meta.cardBullets[0]}\n✨ ${meta.cardBullets[1]}`
      : `${meta.cardHeadline}\n✔ ${meta.cardBullets[0]}\n✨ ${meta.cardBullets[1]}`;

  return {
    rateBadge: rateRange,
    cardDescription,
    info: [
      { title: meta.whatIsTitle, description: meta.whatIsDescription },
      { title: meta.howWorksTitle, description: meta.howWorksDescription },
      { title: meta.prosTitle, description: meta.prosDescription },
      { title: meta.consTitle, description: meta.consDescription },
      { title: "Ejemplo práctico", description: exampleDescription },
    ],
    faq: [
      { title: meta.faqRateQuestion, description: faqRateDescription },
      { title: meta.faqSafetyQuestion, description: meta.faqSafetyAnswer },
      { title: meta.faqOpenQuestion, description: meta.faqOpenAnswer },
      { title: meta.faqCostQuestion, description: meta.faqCostAnswer },
      { title: meta.faqWithdrawQuestion, description: meta.faqWithdrawAnswer },
    ],
  };
}
