import { Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { NewsPage } from "../pages/NewsPage";
import { ProductsPage } from "../pages/ProductsPage";
import type { Locale, NewsItem, ProductNode } from "../types";

type SiteCopy = {
  hero: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    videoError: string;
    features: string[];
  };
  products: {
    eyebrow: string;
    title: string;
    cta: string;
  };
  news: {
    eyebrow: string;
    title: string;
    readMore: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
};

type SiteRoutesProps = {
  locale: Locale;
  copy: SiteCopy;
  products: ProductNode[];
  news: NewsItem[];
  onPlayVideo: () => void;
};

export function SiteRoutes({
  locale,
  copy,
  products,
  news,
  onPlayVideo,
}: SiteRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<HomePage hero={copy.hero} />} />
      <Route path="/about" element={<AboutPage about={copy.about} onPlayVideo={onPlayVideo} />} />
      <Route
        path="/products"
        element={<ProductsPage productsCopy={copy.products} products={products} />}
      />
      <Route
        path="/news"
        element={<NewsPage newsCopy={copy.news} locale={locale} news={news} />}
      />
      <Route path="/contact" element={<ContactPage locale={locale} contact={copy.contact} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

