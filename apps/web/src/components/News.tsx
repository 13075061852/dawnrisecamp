import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon } from "../icons";
import type { Locale, NewsItem } from "../types";
import { buildImageUrl } from "../lib/api";
import { Link } from "react-router-dom";

const NEWS_PER_PAGE = 3;

type NewsProps = {
  eyebrow: string;
  title: string;
  readMore: string;
  locale: Locale;
  items: NewsItem[];
};

export function News({ title, readMore, locale, items }: NewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const headingRef = useRef<HTMLDivElement>(null);
  const formatter = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "numeric" : "short",
    day: "numeric",
  });
  const totalPages = Math.max(1, Math.ceil(items.length / NEWS_PER_PAGE));
  const pageItems = useMemo(() => {
    const pageStart = (currentPage - 1) * NEWS_PER_PAGE;

    return items.slice(pageStart, pageStart + NEWS_PER_PAGE);
  }, [currentPage, items]);
  const paginationLabels =
    locale === "zh"
      ? { previous: "上一页", next: "下一页", page: "第" }
      : { previous: "Previous", next: "Next", page: "Page" };

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    setCurrentPage(nextPage);
    window.requestAnimationFrame(() => {
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="section news">
      <figure className="news-hero-banner">
        <img src={buildImageUrl("/images/industry-hero.webp")} alt="Outdoor product market research table" />
      </figure>

      <div className="shell">
        <div className="section-copy news-heading" ref={headingRef}>
          <h2>{title}</h2>
        </div>

        <div className="news-list">
          {pageItems.map((item) => (
            <article className="news-card" key={item.slug}>
              <img src={buildImageUrl(item.imageUrl)} alt="" />
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

        {totalPages > 1 ? (
          <nav className="news-pagination" aria-label={locale === "zh" ? "行业洞察分页" : "Industry insights pagination"}>
            <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              {paginationLabels.previous}
            </button>
            <div className="news-pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    type="button"
                    key={page}
                    className={page === currentPage ? "active" : undefined}
                    onClick={() => goToPage(page)}
                    aria-label={`${paginationLabels.page} ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              {paginationLabels.next}
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
