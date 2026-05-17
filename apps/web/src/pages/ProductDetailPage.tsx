import { Link, Navigate } from "react-router-dom";
import { ArrowIcon } from "../icons";
import type { ProductNode } from "../types";

type ProductDetailPageProps = {
  slug: string | undefined;
  products: ProductNode[];
  labels: {
    eyebrow: string;
    genericSubtitle: string;
    genericPrimaryCta: string;
    genericBackCta: string;
    partOfLabel: string;
  };
};

export function ProductDetailPage({ slug, products, labels }: ProductDetailPageProps) {
  const match = findProduct(products, slug);

  if (!match) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main className="page-shell product-detail-page generic-product-page">
      <section className="product-hero">
        <div className="shell product-hero-grid">
          <div className="product-hero-copy">
            <span>{labels.eyebrow}</span>
            <h1>{match.product.name}</h1>
            <p>{labels.genericSubtitle}</p>

            <div className="product-hero-actions">
              <Link className="button button-primary" to="/contact">
                {labels.genericPrimaryCta}
                <ArrowIcon />
              </Link>
              <Link className="button button-secondary" to="/products">
                {labels.genericBackCta}
              </Link>
            </div>

            <div className="product-highlight-row">
              <strong>
                {labels.partOfLabel} {match.category.name}
              </strong>
            </div>
          </div>

          <figure className="product-lifestyle generic-product-image">
            <img src="/images/products.webp" alt="" />
          </figure>
        </div>
      </section>
    </main>
  );
}

function findProduct(products: ProductNode[], slug: string | undefined) {
  if (!slug) {
    return undefined;
  }

  for (const category of products) {
    if (category.slug === slug) {
      return { category, product: category };
    }

    const product = category.children.find((child) => child.slug === slug);
    if (product) {
      return { category, product };
    }
  }

  return undefined;
}
