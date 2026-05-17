import { ArrowIcon } from "../icons";
import type { Locale, NewsItem } from "../types";
import { Link } from "react-router-dom";

type NewsProps = {
  eyebrow: string;
  title: string;
  readMore: string;
  locale: Locale;
  items: NewsItem[];
};

export function News({ eyebrow, title, readMore, locale, items }: NewsProps) {
  const formatter = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "numeric" : "short",
    day: "numeric",
  });

  return (
    <section className="section news">
      <div className="shell">
        <div className="section-copy news-heading">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        <div className="news-list">
          {items.map((item) => (
            <article className="news-card" key={item.slug}>
              <img src={item.imageUrl} alt="" />
              <div>
                <time dateTime={item.publishedAt}>
                  {formatter.format(new Date(`${item.publishedAt}T00:00:00Z`))}
                </time>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link className="text-link" to={`/news/${item.slug}`}>
                  {readMore}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
