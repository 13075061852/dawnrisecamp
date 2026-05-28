import { Link, Navigate } from "react-router-dom";
import { ArrowIcon } from "../icons";
import { buildImageUrl } from "../lib/api";
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

  const galleryImages = getGalleryImages(profile);
  const specImage = galleryImages[0];
  const heroImage = galleryImages[1] ?? galleryImages[0];
  const supportImage = galleryImages[2];

  return (
    <main
      className={`page-shell product-detail-page generic-product-page ${
        supportImage ? "product-detail-page-three" : "product-detail-page-two"
      }`}
    >
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

          <figure className="product-lifestyle product-clean-image generic-product-image">
            <img src={buildImageUrl(heroImage)} alt="" />
          </figure>
        </div>
      </section>

      <section className="section product-story product-detail-sections">
        <div className="shell product-detail-layout">
          <article className="product-detail-panel product-detail-panel-spec">
            <figure className="product-spec-sheet generic-product-image">
              <img src={buildImageUrl(specImage)} alt="" />
            </figure>

            <div className="product-story-copy">
              {!supportImage && (
                <div className="section-copy">
                  <h2>{profile.featureTitle}</h2>
                  <p>{profile.featureBody}</p>
                </div>
              )}

              <div className="product-spec-list">
                <h3>
                  {labels.partOfLabel} {match.category.name}
                </h3>
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
          </article>

          {supportImage && (
            <article className="product-detail-panel product-detail-panel-feature">
              <div className="product-story-copy">
                <div className="section-copy">
                  <h2>{profile.featureTitle}</h2>
                  <p>{profile.featureBody}</p>
                </div>
              </div>

              <figure className="product-support-image generic-product-image">
                <img src={buildImageUrl(supportImage)} alt="" />
              </figure>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

function getGalleryImages(profile: ProductProfile) {
  const images = profile.gallery.images?.length
    ? profile.gallery.images
    : [profile.gallery.studio, profile.gallery.lifestyle];

  return images.filter((image, index) => images.indexOf(image) === index);
}

function findProduct(products: ProductNode[], slug: string | undefined) {
  if (!slug) {
    return undefined;
  }

  for (const category of products) {
    const match = findProductInNode(category, slug, category);
    if (match) {
      return match;
    }
  }

  return undefined;
}

function findProductInNode(
  node: ProductNode,
  slug: string,
  parent: ProductNode,
): { category: ProductNode; product: ProductNode } | undefined {
  if (node.slug === slug) {
    return { category: parent, product: node };
  }

  for (const child of node.children) {
    const match = findProductInNode(child, slug, node);
    if (match) {
      return match;
    }
  }

  return undefined;
}
