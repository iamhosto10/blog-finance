export interface Blog {
  _id: string;
  _type: "blog";
  title: string;
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
  excerpt?: string;
  body: Array<
    | {
        _type: "block";
        children: { text: string }[];
      }
    | {
        _type: "image";
        asset: {
          _ref: string;
        };
      }
  >;
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
