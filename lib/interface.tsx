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
