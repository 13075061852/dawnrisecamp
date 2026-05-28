import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { NewsPage } from "../pages/NewsPage";
import { NewsDetailPage } from "../pages/NewsDetailPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { ProductsPage } from "../pages/ProductsPage";
import { TrekkingPolePage } from "../pages/TrekkingPolePage";
import type { Locale, NewsItem, ProductNode, ProductProfile } from "../types";

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
  homeSourcing: {
    title: string;
    body: string;
    cta: string;
    steps: {
      title: string;
      body: string;
      label: string;
    }[];
    gallery: {
      imageUrl: string;
      alt: string;
      caption: string;
    }[];
  };
  qualityService: {
    title: string;
    body: string;
    cta: string;
    assurances: {
      title: string;
      body: string;
      imageUrl: string;
      alt: string;
    }[];
    responseSteps: {
      title: string;
      body: string;
    }[];
  };
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
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
    supplierTitle: string;
    supplierBody: string;
    supplierChannels: {
      name: string;
      imageUrl: string;
    }[];
    qualificationsEyebrow: string;
    qualificationsTitle: string;
    qualificationsBody: string;
    qualifications: {
      title: string;
      body: string;
      imageUrl: string;
      imageAlt: string;
      badge: string;
      updatedLabel: string;
      availability: string;
    }[];
    qualificationsPanel: {
      title: string;
      body: string;
      items: string[];
    };
    reportsEyebrow: string;
    reportsTitle: string;
    reportsBody: string;
    reports: {
      title: string;
      body: string;
      label: string;
      imageUrl: string;
      imageAlt: string;
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
  productProfiles: Record<string, ProductProfile>;
  news: NewsItem[];
  onPlayVideo: () => void;
};

export function SiteRoutes({
  locale,
  copy,
  products,
  productProfiles,
  news,
  onPlayVideo,
}: SiteRoutesProps) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="route-transition">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <HomePage
              hero={copy.hero}
              featuredProducts={copy.featuredProducts}
              homeSourcing={copy.homeSourcing}
              qualityService={copy.qualityService}
              newsletter={copy.newsletter}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage
              about={copy.about}
              newsletter={copy.newsletter}
              onPlayVideo={onPlayVideo}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              productsCopy={copy.products}
              newsletter={copy.newsletter}
              products={products}
              productProfiles={productProfiles}
            />
          }
        />
        <Route
          path="/products/trekking-poles"
          element={<TrekkingPolePage product={copy.trekkingPole} />}
        />
        <Route
          path="/products/:slug"
          element={
            <GenericProductRoute
              products={products}
              labels={copy.products}
              productProfiles={productProfiles}
            />
          }
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
    </div>
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
  productProfiles,
}: {
  products: ProductNode[];
  labels: SiteCopy["products"];
  productProfiles: Record<string, ProductProfile>;
}) {
  const { slug } = useParams();

  return (
    <ProductDetailPage
      slug={slug}
      products={products}
      labels={labels}
      productProfiles={productProfiles}
    />
  );
}
