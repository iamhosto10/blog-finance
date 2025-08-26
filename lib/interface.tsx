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
  audioUrl?: string;
  body: BodySection[];
  categories?: { _id: string; title: string }[];
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
  body?: string;
  asset?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
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
