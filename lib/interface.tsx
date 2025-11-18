export interface Blog {
  _id: string;
  _type: "blog";
  title: string;
  continueTitle?: string;
  focusTitle?: string;
  slug: {
    current: string;
  };
  publishedAt?: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  miniatureImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  excerpt?: string;
  audio?: {
    asset: {
      _ref: string;
      _type: "reference";
      url: string;
    };
  };
  body: BodySection[];
  categories?: { _id: string; title: string; slug: { current: string } }[];
  relatedNews?: Blog[];
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  description?: string;
  slug: {
    current: string;
  };
}
export interface Dolar {
  _id: string;
  valor: number;
  fecha: string;
}

export interface Bank {
  _id: string;
  _type: "banks";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  asset?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface Franchise {
  _id: string;
  _type: "franchises";
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface Card {
  _id: string;
  _type: "cards";
  name: string;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  bank?: Bank;
  interesUnaCuota?: boolean;
  franchise?: Franchise;
  cardType?: "clasica" | "oro" | "platino" | "black" | "otros";
  cuotaManejo?: number;
  cuotaManejoExohonerable?: string;
  tasaInteresEfectivaAnual?: number;
  seguroFraude?: string;
  costoAvance?: string;
  costoTransaccionesInternacionales?: number;
  benefits?: string[];
  programaRecompensas?: "cashback" | "millas" | "platino";
  alianzas?: string[];
  ingresoMinimo?: number;
  edadMinima?: number;
  cupoMaximo?: number;
  comprasInternacionales?: boolean;
  bancaDigital?: boolean;
  seguridad?: string[];
  score?: number;
}

export interface BodySection {
  title?: string;
  body?: PortableTextBlock[];
  asset?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface PortableTextChild {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style?: "normal" | "h1" | "h2" | "blockquote";
  children: PortableTextChild[];
  markDefs?: {
    _key: string;
    _type: "link";
    href: string;
  }[];
}

export interface Profitability {
  _id: string;
  _type: "profitability";
  nu: number[];
  lulo: number[];
  global66: number[];
  popular: number[];
  rappi: number[];
  bold: number[];
  pibank: number[];
}

export interface DailyGrowth {
  day: number;
  amount: number;
  interest: number;
  retencion: number;
}

export type Payment = {
  cuota: number;
  cuotaCapital: number;
  interesMensual: number;
  saldoPendiente: number;
  seguro: number;
  cuotaTotal: number;
};

export interface Totales {
  totalCuotaCapital: number;
  totalinteresMensual: number;
  totalseguro: number;
  totalcuotaTotal: number;
  totalsaldoPendiente: number;
}

export interface table {
  tabla: Payment[];
  total: Totales;
}

export type AmortizationRow = {
  month: number;
  abonoCapital: number;
  interes: number;
  seguroVida: number;
  cuota: number;
  saldoCapital: number;
};

// /lib/finance.ts
export type Frequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "annually";

export type Compounding = "daily" | "monthly" | "quarterly" | "annually";

export type ContributionTiming = "start" | "end";

export interface CalcInputs {
  initialAmount: number; // monto inicial (ej: 950)
  years: number; // años (ej: 10)
  annualRatePct: number; // porcentaje anual en % (ej: 0.25 para 0.25%)
  additionalContribution: number; // cantidad por periodo de contribución (ej: 50)
  contributionFrequency: Frequency; // frecuencia de la contribución (ej: 'weekly')
  compounding: Compounding; // compounding (ej: 'monthly')
  timing?: ContributionTiming; // 'start' (annuity-due) o 'end' (annuity-immediate). Default 'end'
}

export interface YearRow {
  year: number; // 0..N (0 = initial row)
  additions: number; // total aportado ese año (suma de contribuciones)
  interest: number; // interés ganado ese año
  balanceEnd: number; // balance al final del año
}

export interface CalcResult {
  rows: YearRow[]; // filas año a año (year 0 = initial)
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
}

export interface CalcResultTotales {
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
}

// SIMULADOR DE INVERSION

export type InvestmentRow = {
  month: number;
  year: number;
  initialBalance: number;
  contribution: number;
  interest: number;
  finalBalance: number;
};

export type SimulationResult = {
  table: InvestmentRow[];
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
};

export type SimuladorInput = {
  valorVivienda: number;
  cuotaInicialPorcentaje: number;
  tasaInteresAnual: number;
  plazoAnios: number;
  seguroMensual?: number;
  gastosFijos?: number;
};

export type Cuota = {
  mes: number;
  cuota: number;
  interes: number;
  abonoCapital: number;
  saldo: number;
  seguro?: number;
  gastos?: number;
};

export type ResultadoSimulacion = {
  montoPrestamo: number;
  cuotaMensual: number;
  totalPagado: number;
  totalIntereses: number;
  totalGastos: number;
  totalSeguros: number;
  tabla: Cuota[];
};

export type TotalesVivienda = {
  montoPrestamo: number;
  cuotaMensual: number;
  totalPagado: number;
  totalIntereses: number;
  totalGastos: number;
  totalSeguros: number;
};
