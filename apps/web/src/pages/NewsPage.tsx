import { News } from "../components/News";
import type { Locale, NewsItem } from "../types";

type NewsPageProps = {
  newsCopy: {
    eyebrow: string;
    title: string;
    readMore: string;
  };
  locale: Locale;
  news: NewsItem[];
};

export function NewsPage({ newsCopy, locale, news }: NewsPageProps) {
  return (
    <main className="page-shell">
      <News {...newsCopy} locale={locale} items={news} />
    </main>
  );
}

