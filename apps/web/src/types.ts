export type Locale = "en" | "zh";

export type ProductNode = {
  slug: string;
  name: string;
  children: ProductNode[];
};

export type ProductProfile = {
  slug: string;
  code: string;
  subtitle: string;
  highlights: string[];
  featureTitle: string;
  featureBody: string;
  specs: {
    label: string;
    value: string;
  }[];
  gallery: {
    lifestyle: string;
    studio: string;
    images?: string[];
  };
};

export type NewsItem = {
  slug: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  imageUrl: string;
};

export type BootstrapPayload = {
  products: ProductNode[];
  news: NewsItem[];
};

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  locale: Locale;
};
