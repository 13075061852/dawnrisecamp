import { useEffect, useState } from "react";
import { fallbackNews, fallbackProducts } from "../content";
import { fetchBootstrap } from "../lib/api";
import type { Locale, NewsItem, ProductNode } from "../types";

export function useSiteData(locale: Locale) {
  const [products, setProducts] = useState<ProductNode[]>(fallbackProducts[locale]);
  const [news, setNews] = useState<NewsItem[]>(fallbackNews[locale]);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    setProducts(fallbackProducts[locale]);
    setNews(fallbackNews[locale]);
    setUsingFallback(false);

    fetchBootstrap(locale)
      .then((payload) => {
        if (!active) return;
        setProducts(payload.products);
        setNews(payload.news);
      })
      .catch(() => {
        if (!active) return;
        setUsingFallback(true);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return { products, news, usingFallback };
}

