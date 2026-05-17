import { Link } from "react-router-dom";
import { ArrowIcon } from "../icons";

type TrekkingPolePageProps = {
  product: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    backToProducts: string;
    highlights: string[];
    featureTitle: string;
    featureBody: string;
    specsTitle: string;
    specs: {
      label: string;
      value: string;
    }[];
  };
};

export function TrekkingPolePage({ product }: TrekkingPolePageProps) {
  return (
    <main className="page-shell product-detail-page">
      <section className="product-hero">
        <div className="shell product-hero-grid">
          <div className="product-hero-copy">
            <div>
              <Link className="text-link product-detail-back" to="/products">
                ← {product.backToProducts}
              </Link>
            </div>
            <span>{product.eyebrow}</span>
            <h1>{product.title}</h1>
            <p>{product.subtitle}</p>

            <div className="product-hero-actions">
              <Link className="button button-primary" to="/contact">
                {product.primaryCta}
                <ArrowIcon />
              </Link>
              <a className="button button-secondary" href="#product-specs">
                {product.secondaryCta}
              </a>
            </div>

            <div className="product-highlight-row">
              {product.highlights.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>
          </div>

          <figure className="product-lifestyle">
            <img src="/images/products/trekking-poles-lifestyle.png" alt="" />
          </figure>
        </div>
      </section>

      <section className="section product-story">
        <div className="shell product-story-grid">
          <figure className="product-spec-sheet">
            <img src="/images/products/trekking-poles-spec.png" alt="" />
          </figure>

          <div className="product-story-copy" id="product-specs">
            <div className="section-copy">
              <h2>{product.featureTitle}</h2>
              <p>{product.featureBody}</p>
            </div>

            <div className="product-spec-list">
              <h3>{product.specsTitle}</h3>
              <dl>
                {product.specs.map((item) => (
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
