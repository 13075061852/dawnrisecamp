import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { VideoModal } from "./components/VideoModal";
import { Link } from "react-router-dom";
import { copy } from "./content";
import { useSiteData } from "./hooks/useSiteData";
import { productProfiles } from "./productCatalog";
import { ScrollToTop } from "./routing/ScrollToTop";
import { SiteRoutes } from "./routing/SiteRoutes";
import type { Locale } from "./types";

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [videoOpen, setVideoOpen] = useState(false);
  const t = copy[locale];
  const { products, news } = useSiteData(locale);

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
        productProfiles={productProfiles[locale]}
        news={news}
        onPlayVideo={() => setVideoOpen(true)}
      />
      <Footer promise={t.footer.promise} />
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        errorMessage={t.about.videoError}
      />
    </div>
  );
}
