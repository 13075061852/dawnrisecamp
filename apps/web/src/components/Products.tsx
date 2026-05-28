import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronIcon } from "../icons";
import { buildImageUrl } from "../lib/api";
import type { ProductNode, ProductProfile } from "../types";
import { Link } from "react-router-dom";
import { NewsletterSubscribe } from "./NewsletterSubscribe";

type ProductsProps = {
  eyebrow: string;
  title: string;
  productLinesLabel: string;
  searchPlaceholder: string;
  noResults: string;
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
  products: ProductNode[];
  productProfiles: Record<string, ProductProfile>;
};

export function Products({
  title,
  searchPlaceholder,
  noResults,
  newsletter,
  products,
  productProfiles,
}: ProductsProps) {
  const firstCategory = products[0];
  const [expandedSlug, setExpandedSlug] = useState<string | null>(firstCategory?.slug ?? null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    firstCategory ? findFirstMenuItem(firstCategory)?.slug ?? firstCategory.slug : null,
  );
  const [isTaxonomyOpen, setIsTaxonomyOpen] = useState(false);
  const [shouldRenderTaxonomy, setShouldRenderTaxonomy] = useState(false);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(
    () => filterProducts(products, normalizedQuery),
    [normalizedQuery, products],
  );

  const selectedCategory = useMemo(
    () => findNodeContext(filteredProducts, selectedSlug)?.category ?? filteredProducts[0],
    [filteredProducts, selectedSlug],
  );

  const selectedProduct = useMemo(() => {
    return findNodeContext(filteredProducts, selectedSlug)?.node ?? selectedCategory;
  }, [filteredProducts, selectedCategory, selectedSlug]);

  const selectedProductCards = getLeafProducts(selectedProduct).map((product) => {
    const profile = productProfiles[product.slug];
    const image = getCatalogImage(product, profile);
    return {
      ...image,
      product,
    };
  });

  function handleCategoryClick(category: ProductNode) {
    setExpandedSlug((current) => (current === category.slug ? null : category.slug));
    setSelectedSlug(findFirstMenuItem(category)?.slug ?? category.slug);
  }

  function handleProductClick(slug: string) {
    setSelectedSlug(slug);
    setIsTaxonomyOpen(false);
  }

  useEffect(() => {
    if (isTaxonomyOpen) {
      setShouldRenderTaxonomy(true);
      return;
    }

    const timeoutId = window.setTimeout(() => setShouldRenderTaxonomy(false), 260);
    return () => window.clearTimeout(timeoutId);
  }, [isTaxonomyOpen]);

  function handleSearchChange(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setExpandedSlug(firstCategory?.slug ?? null);
      setSelectedSlug(firstCategory ? findFirstMenuItem(firstCategory)?.slug ?? firstCategory.slug : null);
      return;
    }

    const nextCategory = filterProducts(products, value.trim().toLowerCase())[0];
    if (nextCategory) {
      setExpandedSlug(nextCategory.slug);
      setSelectedSlug(findFirstMenuItem(nextCategory)?.slug ?? nextCategory.slug);
      setIsTaxonomyOpen(true);
    }
  }

  const taxonomyContent = (
    <>
      <ul className="taxonomy-list">
        {filteredProducts.map((category) => (
          <li key={category.slug}>
            <button
              className={`taxonomy-category ${
                selectedCategory?.slug === category.slug ? "active" : ""
              }`}
              type="button"
              aria-expanded={expandedSlug === category.slug}
              onClick={() => handleCategoryClick(category)}
            >
              <strong>{category.name}</strong>
              {category.children.length > 0 && (
                <ChevronIcon className={expandedSlug === category.slug ? "expanded" : undefined} />
              )}
            </button>
            {category.children.length > 0 && (
              <ul className={expandedSlug === category.slug ? "expanded" : undefined}>
                {category.children.map((child) => (
                  <li key={child.slug}>
                    <button
                      className={selectedSlug === child.slug ? "active" : undefined}
                      type="button"
                      onClick={() => handleProductClick(child.slug)}
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

      <label className="product-search taxonomy-search">
        <span className="sr-only">{searchPlaceholder}</span>
        <input
          value={query}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
      </label>
    </>
  );

  return (
    <section className="section products">
      <div className="shell">
        <div className="products-heading-row">
          <div className="section-copy products-heading">
            <button
              className="products-title-toggle"
              type="button"
              aria-controls="product-taxonomy"
              aria-expanded={isTaxonomyOpen}
              onClick={() => setIsTaxonomyOpen((current) => !current)}
            >
              <span>{title}</span>
              <span className="taxonomy-toggle-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

        </div>

        <div className="products-grid">
          <div className="taxonomy-panel taxonomy-panel-inline">
            {taxonomyContent}
          </div>

          <div className="product-catalog">
            {selectedCategory && selectedProduct && (
              <>
                <div className="product-card-grid product-showcase-fade" key={selectedProduct.slug}>
                  {selectedProductCards.map((image) => (
                    <Link
                      className="product-card"
                      key={`${image.product.slug}-${image.src}`}
                      to={`/products/${image.product.slug}`}
                    >
                      <figure>
                        <img src={buildImageUrl(image.src)} alt="" />
                      </figure>
                      <strong>{image.product.name}</strong>
                      <span>{image.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <NewsletterSubscribe emailInputId="product-subscribe-email" copy={newsletter} />
      </div>
      {shouldRenderTaxonomy &&
        createPortal(
          <>
            <button
              className={`taxonomy-backdrop ${isTaxonomyOpen ? "open" : ""}`}
              type="button"
              aria-label="Close product categories"
              onClick={() => setIsTaxonomyOpen(false)}
            />
            <aside
              className={`taxonomy-panel taxonomy-drawer ${isTaxonomyOpen ? "open" : ""}`}
              id="product-taxonomy"
            >
              {taxonomyContent}
            </aside>
          </>,
          document.body,
        )}
    </section>
  );
}

function filterProducts(products: ProductNode[], normalizedQuery: string): ProductNode[] {
  if (!normalizedQuery) {
    return products;
  }

  return products
    .map((category) => {
      const categoryMatches = category.name.toLowerCase().includes(normalizedQuery);
      const matchingChildren = filterProducts(category.children, normalizedQuery);

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

function getCatalogImage(product: ProductNode, profile?: ProductProfile) {
  if (product.slug === "trekking-poles") {
    return { src: "/images/products/trekking-poles-spec.webp", label: "Product view" };
  }

  if (!profile) {
    return { src: "/images/products.webp", label: "Product view" };
  }

  return { src: profile.gallery.images?.[1] ?? profile.gallery.studio, label: profile.code };
}

function findFirstMenuItem(node: ProductNode): ProductNode | undefined {
  return node.children[0] ?? node;
}

function findNodeContext(
  products: ProductNode[],
  slug: string | null,
): { category: ProductNode; node: ProductNode } | undefined {
  if (!slug) {
    return undefined;
  }

  for (const category of products) {
    const node = findNode(category, slug);
    if (node) {
      return { category, node };
    }
  }

  return undefined;
}

function findNode(node: ProductNode, slug: string): ProductNode | undefined {
  if (node.slug === slug) {
    return node;
  }

  for (const child of node.children) {
    const match = findNode(child, slug);
    if (match) {
      return match;
    }
  }

  return undefined;
}

function getLeafProducts(product: ProductNode | undefined): ProductNode[] {
  if (!product) {
    return [];
  }

  if (product.children.length === 0) {
    return [product];
  }

  return product.children.flatMap((child) => getLeafProducts(child));
}
