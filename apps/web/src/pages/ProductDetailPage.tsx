import { Link, Navigate } from "react-router-dom";
import { ArrowIcon } from "../icons";
import type { ProductNode, ProductProfile } from "../types";

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
  productProfiles: Record<string, ProductProfile>;
};

export function ProductDetailPage({
  slug,
  products,
  labels,
  productProfiles,
}: ProductDetailPageProps) {
  const match = findProduct(products, slug);
  const profile = slug ? productProfiles[slug] : undefined;

  if (!match || !profile) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main className="page-shell product-detail-page generic-product-page">
      <section className="product-hero">
        <div className="shell product-hero-grid">
          <div className="product-hero-copy">
            <span>{profile.code}</span>
            <h1>{match.product.name}</h1>
            <p>{profile.subtitle}</p>

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
              {profile.highlights.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>
          </div>

          <figure className="product-lifestyle generic-product-image">
            <img src={profile.gallery.lifestyle} alt="" />
          </figure>
        </div>
      </section>

      <section className="section product-story">
        <div className="shell product-story-grid">
          <figure className="product-spec-sheet generic-product-image">
            <img src={profile.gallery.studio} alt="" />
          </figure>

          <div className="product-story-copy">
            <div className="section-copy">
              <h2>{profile.featureTitle}</h2>
              <p>{profile.featureBody}</p>
            </div>

            <div className="product-spec-list">
              <h3>{labels.partOfLabel} {match.category.name}</h3>
              <dl>
                {profile.specs.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
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
