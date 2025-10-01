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
