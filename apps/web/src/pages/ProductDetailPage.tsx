import { useEffect, useState } from "react";
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
  const galleryImages = profile ? getGalleryImages(profile) : [];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] ?? "");

  useEffect(() => {
    setSelectedImage(galleryImages[0] ?? "");
  }, [galleryImages[0]]);

  if (!match || !profile) {
    return <Navigate to="/products" replace />;
  }

  const pageCopy = getProductDetailCopy(labels.genericBackCta);
  const primarySpecs = profile.specs.slice(0, 3);
  const overviewImage = galleryImages[2] ?? galleryImages[0] ?? "";

  return (
    <main className="page-shell product-detail-page generic-product-page product-detail-page-redesign">
      <section className="product-hero">
        <div className="shell product-detail-hero">
          <div className="product-detail-hero-copy">
            <div className="product-detail-kicker">
              <span>{match.category.name}</span>
              <strong>{profile.code}</strong>
            </div>

            <div className="product-hero-copy">
              <h1>{match.product.name}</h1>
              <p>{profile.subtitle}</p>
            </div>

            <div className="product-highlight-row product-detail-highlight-row">
              {profile.highlights.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>

            <div className="product-hero-actions">
              <Link className="button button-primary" to="/contact">
                {labels.genericPrimaryCta}
                <ArrowIcon />
              </Link>
              <Link className="button button-secondary" to="/products">
                {labels.genericBackCta}
              </Link>
            </div>
          </div>

          <div className="product-gallery-viewer">
            <figure className="product-lifestyle product-clean-image generic-product-image">
              <img src={buildImageUrl(selectedImage)} alt="" />
            </figure>

            <div className="product-gallery-thumbnails" aria-label="Product images">
              {galleryImages.map((image, index) => (
                <button
                  className={selectedImage === image ? "active" : undefined}
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Show product image ${index + 1}`}
                >
                  <img src={buildImageUrl(image)} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="product-detail-overview" aria-label={pageCopy.overviewLabel}>
        <div className="shell product-detail-overview-grid">
          <aside className="product-detail-snapshot">
            <span>{pageCopy.snapshotLabel}</span>
            <dl>
              <div>
                <dt>{pageCopy.categoryLabel}</dt>
                <dd>{match.category.name}</dd>
              </div>
              <div>
                <dt>{pageCopy.modelLabel}</dt>
                <dd>{profile.code}</dd>
              </div>
              {primarySpecs.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <figure className="product-detail-overview-image">
            <img src={buildImageUrl(overviewImage)} alt="" />
          </figure>
        </div>
      </section>

      <section className="product-detail-spec-section">
        <div className="shell product-detail-spec-grid">
          <div className="product-detail-spec-heading">
            <span>{pageCopy.specLabel}</span>
            <h2>
              {labels.partOfLabel} {match.category.name}
            </h2>
          </div>

          <div className="product-spec-list product-detail-spec-list">
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
      </section>
    </main>
  );
}

function getProductDetailCopy(backCta: string) {
  const isChinese = /[\u4e00-\u9fff]/.test(backCta);

  if (isChinese) {
    return {
      overviewLabel: "产品详情概览",
      snapshotLabel: "产品摘要",
      categoryLabel: "分类",
      modelLabel: "型号",
      detailLabel: "产品说明",
      specLabel: "规格参数",
      notes: [
        {
          title: "适合批量采购",
          body: "围绕常用户外场景整理卖点，便于快速放入渠道商品线。",
        },
        {
          title: "支持项目沟通",
          body: "可结合颜色、包装、配件和出货要求继续确认定制细节。",
        },
        {
          title: "关注品控交付",
          body: "结构、面料、配件和包装信息可作为验货前的基础核对项。",
        },
      ],
    };
  }

  return {
    overviewLabel: "Product overview",
    snapshotLabel: "Product snapshot",
    categoryLabel: "Category",
    modelLabel: "Model",
    detailLabel: "Product details",
    specLabel: "Specifications",
    notes: [
      {
        title: "Built for sourcing",
        body: "Key selling points are organized for outdoor retail lines and volume quotation discussions.",
      },
      {
        title: "Ready to customize",
        body: "Color, packing, accessories, and order details can be aligned around the target channel.",
      },
      {
        title: "Quality-oriented",
        body: "Structure, fabric, accessory, and packing data can support pre-shipment inspection checks.",
      },
    ],
  };
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
