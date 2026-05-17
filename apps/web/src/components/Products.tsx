import { useMemo, useState } from "react";
import { ArrowIcon, ChevronIcon } from "../icons";
import type { ProductNode } from "../types";
import { Link } from "react-router-dom";

type ProductsProps = {
  eyebrow: string;
  title: string;
  cta: string;
  productLinesLabel: string;
  partOfLabel: string;
  products: ProductNode[];
};

export function Products({
  eyebrow,
  title,
  cta,
  productLinesLabel,
  partOfLabel,
  products,
}: ProductsProps) {
  const firstCategory = products[0];
  const [expandedSlug, setExpandedSlug] = useState<string | null>(firstCategory?.slug ?? null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    firstCategory?.children[0]?.slug ?? firstCategory?.slug ?? null,
  );

  const selectedCategory = useMemo(
    () =>
      products.find(
        (category) =>
          category.slug === selectedSlug ||
          category.children.some((child) => child.slug === selectedSlug),
      ) ?? firstCategory,
    [firstCategory, products, selectedSlug],
  );

  const selectedProduct = useMemo(() => {
    if (!selectedCategory) {
      return undefined;
    }

    return (
      selectedCategory.children.find((child) => child.slug === selectedSlug) ?? selectedCategory
    );
  }, [selectedCategory, selectedSlug]);

  function handleCategoryClick(category: ProductNode) {
    setExpandedSlug((current) => (current === category.slug ? null : category.slug));
    setSelectedSlug(category.slug);
  }

  return (
    <section className="section products">
      <div className="shell">
        <div className="section-copy products-heading">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        <div className="products-grid">
          <div className="taxonomy-panel">
            <ul className="taxonomy-list">
              {products.map((category) => (
                <li key={category.slug}>
                  <button
                    className={`taxonomy-category ${
                      selectedSlug === category.slug ? "active" : ""
                    }`}
                    type="button"
                    aria-expanded={expandedSlug === category.slug}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <strong>{category.name}</strong>
                    {category.children.length > 0 && (
                      <ChevronIcon
                        className={expandedSlug === category.slug ? "expanded" : undefined}
                      />
                    )}
                  </button>
                  {category.children.length > 0 && (
                    <ul className={expandedSlug === category.slug ? "expanded" : undefined}>
                      {category.children.map((child) => (
                        <li key={child.slug}>
                          <button
                            className={selectedSlug === child.slug ? "active" : undefined}
                            type="button"
                            onClick={() => setSelectedSlug(child.slug)}
                          >
                            {child.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <Link className="button button-primary" to="/contact">
              {cta}
              <ArrowIcon />
            </Link>
          </div>

          <div className="product-showcase">
            <figure className="product-image">
              <img src="/images/products.webp" alt="" />
            </figure>

            {selectedCategory && selectedProduct && (
              <div className="product-selection">
                <span>{selectedCategory.name}</span>
                <h3>{selectedProduct.name}</h3>
                <p>
                  {selectedProduct === selectedCategory
                    ? `${selectedCategory.children.length} ${productLinesLabel}`
                    : `${partOfLabel} ${selectedCategory.name}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
