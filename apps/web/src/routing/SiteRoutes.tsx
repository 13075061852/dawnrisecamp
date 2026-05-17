import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { NewsPage } from "../pages/NewsPage";
import { NewsDetailPage } from "../pages/NewsDetailPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { ProductsPage } from "../pages/ProductsPage";
import { TrekkingPolePage } from "../pages/TrekkingPolePage";
import type { Locale, NewsItem, ProductNode } from "../types";

type SiteCopy = {
  hero: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    points: string[];
  };
  featuredProducts: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    items: {
      name: string;
      description: string;
      highlight: string;
      href: string;
      imageUrl: string;
    }[];
  };
  trekkingPole: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    backToProducts: string;
    highlights: string[];
    featureTitle: string;
    featureBody: string;
    specsTitle: string;
    specs: {
      label: string;
      value: string;
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    videoError: string;
    features: string[];
    stats: {
      value: string;
      label: string;
    }[];
    pillarsTitle: string;
    pillars: {
      title: string;
      body: string;
    }[];
    processTitle: string;
    process: {
      title: string;
      body: string;
    }[];
    galleryTitle: string;
    gallery: {
      imageUrl: string;
      alt: string;
    }[];
  };
  products: {
    eyebrow: string;
    title: string;
    cta: string;
    productLinesLabel: string;
    partOfLabel: string;
    searchPlaceholder: string;
    noResults: string;
    genericSubtitle: string;
    genericPrimaryCta: string;
    genericBackCta: string;
  };
  news: {
    eyebrow: string;
    title: string;
    readMore: string;
    backToNews: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    phone: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    mapTitle: string;
    mapCta: string;
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
      <Route
        path="/"
        element={<HomePage hero={copy.hero} featuredProducts={copy.featuredProducts} />}
      />
      <Route path="/about" element={<AboutPage about={copy.about} onPlayVideo={onPlayVideo} />} />
      <Route
        path="/products"
        element={<ProductsPage productsCopy={copy.products} products={products} />}
      />
      <Route
        path="/products/trekking-poles"
        element={<TrekkingPolePage product={copy.trekkingPole} />}
      />
      <Route
        path="/products/:slug"
        element={<GenericProductRoute products={products} labels={copy.products} />}
      />
      <Route
        path="/news"
        element={<NewsPage newsCopy={copy.news} locale={locale} news={news} />}
      />
      <Route
        path="/news/:slug"
        element={
          <NewsDetailRoute locale={locale} news={news} backLabel={copy.news.backToNews} />
        }
      />
      <Route path="/contact" element={<ContactPage locale={locale} contact={copy.contact} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function NewsDetailRoute({
  locale,
  news,
  backLabel,
}: {
  locale: Locale;
  news: NewsItem[];
  backLabel: string;
}) {
  const { slug } = useParams();

  return <NewsDetailPage locale={locale} news={news} slug={slug} backLabel={backLabel} />;
}

function GenericProductRoute({
  products,
  labels,
}: {
  products: ProductNode[];
  labels: SiteCopy["products"];
}) {
  const { slug } = useParams();

  return <ProductDetailPage slug={slug} products={products} labels={labels} />;
}
