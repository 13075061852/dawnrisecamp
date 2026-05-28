import { Navigate, Link } from "react-router-dom";
import { buildImageUrl } from "../lib/api";
import type { Locale, NewsItem } from "../types";

type NewsDetailPageProps = {
  locale: Locale;
  news: NewsItem[];
  slug: string | undefined;
  backLabel: string;
};

export function NewsDetailPage({ locale, news, slug, backLabel }: NewsDetailPageProps) {
  const article = news.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const formatter = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "numeric" : "long",
    day: "numeric",
  });

  return (
    <main className="page-shell news-detail-page">
      <article className="shell news-detail">
        <Link className="text-link news-detail-back" to="/news">
          ← {backLabel}
        </Link>

        <header className="news-detail-header">
          <time dateTime={article.publishedAt}>
            {formatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}
          </time>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </header>

        <figure className="news-detail-image">
          <img src={buildImageUrl(article.imageUrl)} alt="" />
        </figure>

        <div className="news-detail-body">
          <p>{article.excerpt}</p>
        </div>
      </article>
    </main>
  );
}
