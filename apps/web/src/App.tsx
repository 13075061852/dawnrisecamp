import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { VideoModal } from "./components/VideoModal";
import { copy } from "./content";
import { useSiteData } from "./hooks/useSiteData";
import { ScrollToTop } from "./routing/ScrollToTop";
import { SiteRoutes } from "./routing/SiteRoutes";
import type { Locale } from "./types";

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [videoOpen, setVideoOpen] = useState(false);
  const t = copy[locale];
  const { products, news } = useSiteData(locale);

  return (
    <>
      <ScrollToTop />
      <Header locale={locale} onLocaleChange={setLocale} labels={t.nav} />
      <SiteRoutes
        locale={locale}
        copy={t}
        products={products}
        news={news}
        onPlayVideo={() => setVideoOpen(true)}
      />
      <Footer promise={t.footer.promise} />
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        errorMessage={t.about.videoError}
      />
    </>
  );
}
