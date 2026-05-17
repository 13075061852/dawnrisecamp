export type Locale = "en" | "zh";

export type ProductNode = {
  slug: string;
  name: string;
  children: ProductNode[];
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

