import { useMemo, useState } from "react";
import { ArrowIcon, ChevronIcon, ChevronLeftIcon } from "../icons";
import type { ProductNode, ProductProfile } from "../types";
import { Link } from "react-router-dom";

type ProductsProps = {
  eyebrow: string;
  title: string;
  cta: string;
  productLinesLabel: string;
  partOfLabel: string;
  searchPlaceholder: string;
  noResults: string;
  products: ProductNode[];
  productProfiles: Record<string, ProductProfile>;
};

export function Products({
  eyebrow,
  title,
  cta,
  productLinesLabel,
  partOfLabel,
  searchPlaceholder,
  noResults,
  products,
  productProfiles,
}: ProductsProps) {
  const firstCategory = products[0];
  const [expandedSlug, setExpandedSlug] = useState<string | null>(firstCategory?.slug ?? null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    firstCategory?.children[0]?.slug ?? firstCategory?.slug ?? null,
  );
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(
    () => filterProducts(products, normalizedQuery),
    [normalizedQuery, products],
  );

  const selectedCategory = useMemo(
    () =>
      filteredProducts.find(
        (category) =>
          category.slug === selectedSlug ||
          category.children.some((child) => child.slug === selectedSlug),
      ) ?? filteredProducts[0],
    [filteredProducts, selectedSlug],
  );

  const selectedProduct = useMemo(() => {
    if (!selectedCategory) {
      return undefined;
    }

    return (
      selectedCategory.children.find((child) => child.slug === selectedSlug) ?? selectedCategory
    );
  }, [selectedCategory, selectedSlug]);

  const categoryProducts = selectedCategory?.children ?? [];
  const selectedProductIndex = categoryProducts.findIndex((child) => child.slug === selectedSlug);
  const hasMultipleProducts = categoryProducts.length > 1;
  const selectedProductProfile = selectedProduct ? productProfiles[selectedProduct.slug] : undefined;

  function handleCategoryClick(category: ProductNode) {
    setExpandedSlug((current) => (current === category.slug ? null : category.slug));
    setSelectedSlug(category.children[0]?.slug ?? category.slug);
  }

  function handleSearchChange(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setExpandedSlug(firstCategory?.slug ?? null);
      setSelectedSlug(firstCategory?.children[0]?.slug ?? firstCategory?.slug ?? null);
      return;
    }

    const nextCategory = filterProducts(products, value.trim().toLowerCase())[0];
    if (nextCategory) {
      setExpandedSlug(nextCategory.slug);
      setSelectedSlug(nextCategory.children[0]?.slug ?? nextCategory.slug);
    }
  }

  function selectAdjacentProduct(direction: -1 | 1) {
    if (!hasMultipleProducts) {
      return;
    }

    const currentIndex = selectedProductIndex >= 0 ? selectedProductIndex : 0;
    const nextIndex =
      (currentIndex + direction + categoryProducts.length) % categoryProducts.length;
    setSelectedSlug(categoryProducts[nextIndex]?.slug ?? null);
  }

  return (
    <section className="section products">
      <div className="shell">
        <div className="products-heading-row">
          <div className="section-copy products-heading">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
          </div>

          <label className="product-search">
            <span className="sr-only">{searchPlaceholder}</span>
            <input
              value={query}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
            />
          </label>
        </div>

        <div className="products-grid">
          <div className="taxonomy-panel">
            <ul className="taxonomy-list">
              {filteredProducts.map((category) => (
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

            {filteredProducts.length === 0 && <p className="taxonomy-empty">{noResults}</p>}

            <Link className="button button-primary" to="/contact">
              {cta}
              <ArrowIcon />
            </Link>
          </div>

          <div className="product-showcase">
            {selectedCategory && selectedProduct && (
              <>
                <Link
                  className="product-image product-showcase-fade"
                  key={`image-${selectedProduct.slug}`}
                  to={`/products/${selectedProduct.slug}`}
                >
                  <img
                    src={
                      selectedProduct.slug === "trekking-poles"
                        ? "/images/products/trekking-poles-lifestyle.webp"
                        : selectedProductProfile?.gallery.lifestyle ?? "/images/products.webp"
                    }
                    alt=""
                  />
                </Link>

                <div className="product-selection">
                  <div className="product-selection-copy product-showcase-fade" key={selectedProduct.slug}>
                    <span>{selectedCategory.name}</span>
                    <h3>{selectedProduct.name}</h3>
                    <p>
                      {selectedProduct === selectedCategory
                        ? `${selectedCategory.children.length} ${productLinesLabel}`
                        : `${partOfLabel} ${selectedCategory.name}`}
                    </p>
                  </div>

                  {hasMultipleProducts && (
                    <div className="product-carousel-controls">
                      <button
                        type="button"
                        aria-label="Previous product"
                        onClick={() => selectAdjacentProduct(-1)}
                      >
                        <ChevronLeftIcon />
                      </button>
                      <span>
                        {selectedProductIndex + 1} / {categoryProducts.length}
                      </span>
                      <button
                        type="button"
                        aria-label="Next product"
                        onClick={() => selectAdjacentProduct(1)}
                      >
                        <ChevronIcon />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function filterProducts(products: ProductNode[], normalizedQuery: string) {
  if (!normalizedQuery) {
    return products;
  }

  return products
    .map((category) => {
      const categoryMatches = category.name.toLowerCase().includes(normalizedQuery);
      const matchingChildren = category.children.filter((child) =>
        child.name.toLowerCase().includes(normalizedQuery),
      );

      if (!categoryMatches && matchingChildren.length === 0) {
        return null;
      }

      return {
        ...category,
        children: categoryMatches ? category.children : matchingChildren,
      };
    })
    .filter((category): category is ProductNode => Boolean(category));
}
