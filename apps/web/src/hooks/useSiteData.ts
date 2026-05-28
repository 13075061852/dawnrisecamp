import { useEffect, useState } from "react";
import { fallbackNews } from "../content";
import { fetchBootstrap } from "../lib/api";
import { fallbackProducts } from "../productCatalog";
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
        setProducts(
          countLeafProducts(payload.products) >= countLeafProducts(fallbackProducts[locale])
            ? payload.products
            : fallbackProducts[locale],
        );
        setNews(
          payload.news.length >= fallbackNews[locale].length ? payload.news : fallbackNews[locale],
        );
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

function countLeafProducts(products: ProductNode[]): number {
  return products.reduce((total, product) => {
    if (product.children.length === 0) {
      return total + 1;
    }

    return total + countLeafProducts(product.children);
  }, 0);
}
