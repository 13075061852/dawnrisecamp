import { useEffect, useState } from "react";
import { fallbackNews } from "../content";
import { fetchBootstrap } from "../lib/api";
import { fallbackProducts } from "../productCatalog";
import type { BootstrapPayload, Locale, NewsItem, ProductNode, ProductProfile } from "../types";

export function useSiteData(locale: Locale) {
  const [products, setProducts] = useState<ProductNode[]>(fallbackProducts[locale]);
  const [productProfiles, setProductProfiles] = useState<Record<string, ProductProfile>>({});
  const [news, setNews] = useState<NewsItem[]>(fallbackNews[locale]);
  const [siteContent, setSiteContent] = useState<BootstrapPayload["siteContent"]>({});
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    setProducts(fallbackProducts[locale]);
    setProductProfiles({});
    setNews(fallbackNews[locale]);
    setSiteContent({});
    setUsingFallback(false);

    fetchBootstrap(locale)
      .then((payload) => {
        if (!active) return;
        setProducts(
          countLeafProducts(payload.products) >= countLeafProducts(fallbackProducts[locale])
            ? payload.products
            : fallbackProducts[locale],
        );
        setNews(
          payload.news.length >= fallbackNews[locale].length ? payload.news : fallbackNews[locale],
        );
        setSiteContent(payload.siteContent ?? {});
        setProductProfiles(payload.productProfiles ?? {});
      })
      .catch(() => {
        if (!active) return;
        setUsingFallback(true);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return { products, news, productProfiles, siteContent, usingFallback };
}

function countLeafProducts(products: ProductNode[]): number {
  return products.reduce((total, product) => {
    if (product.children.length === 0) {
      return total + 1;
    }

    return total + countLeafProducts(product.children);
  }, 0);
}
