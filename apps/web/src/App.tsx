import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Link, useLocation } from "react-router-dom";
import { copy } from "./content";
import { useSiteData } from "./hooks/useSiteData";
import { productProfiles } from "./productCatalog";
import { ScrollToTop } from "./routing/ScrollToTop";
import { SiteRoutes } from "./routing/SiteRoutes";
import type { Locale } from "./types";

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const location = useLocation();
  const { products, news, productProfiles: remoteProductProfiles, siteContent } = useSiteData(locale);
  const t = mergeSiteContent(copy[locale], siteContent);
  const mergedProductProfiles = {
    ...productProfiles[locale],
    ...remoteProductProfiles,
  };
  const isAdminRoute = location.pathname === "/login";

  if (isAdminRoute) {
    return (
      <div className="app-shell admin-app-shell">
        <ScrollToTop />
        <SiteRoutes
          locale={locale}
          copy={t}
          products={products}
          productProfiles={mergedProductProfiles}
          news={news}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header locale={locale} onLocaleChange={setLocale} labels={t.nav} />
      <div className="floating-actions">
        <Link className="floating-contact" to="/contact">
          {t.nav.contact}
        </Link>
        <button
          className="floating-top"
          type="button"
          aria-label={locale === "zh" ? "返回顶部" : "Back to top"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
      <SiteRoutes
        locale={locale}
        copy={t}
        products={products}
        productProfiles={mergedProductProfiles}
        news={news}
      />
      <Footer locale={locale} promise={t.footer.promise} nav={t.nav} contact={t.contact} products={products} />
    </div>
  );
}

function mergeSiteContent<T>(base: T, sections: Record<string, unknown> | undefined): T {
  if (!sections) {
    return base;
  }

  return Object.values(sections).reduce<T>((current, section) => deepMerge(current, section), base);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : override) as T;
  }

  const merged: Record<string, unknown> = { ...base };

  Object.entries(override).forEach(([key, value]) => {
    const baseValue = merged[key];
    merged[key] = isPlainObject(baseValue) && isPlainObject(value) ? deepMerge(baseValue, value) : value;
  });

  return merged as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
