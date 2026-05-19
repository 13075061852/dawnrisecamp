import { Link } from "react-router-dom";
import { ArrowIcon } from "../icons";

type FeaturedProduct = {
  name: string;
  description: string;
  highlight: string;
  href: string;
  imageUrl: string;
};

type FeaturedProductsProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  items: FeaturedProduct[];
};

export function FeaturedProducts({
  eyebrow,
  title,
  body,
  cta,
  items,
}: FeaturedProductsProps) {
  return (
    <section className="section featured-products">
      <div className="shell featured-products-shell">
        <div className="featured-products-intro">
          <div className="section-copy featured-products-heading">
            {eyebrow && <span>{eyebrow}</span>}
            <h2>{title}</h2>
            {body && <p>{body}</p>}
          </div>
        </div>

        <div className="featured-products-gallery">
          {items.map((item) => (
            <Link className="featured-product-tile" key={item.name} to={item.href}>
              <figure>
                <img src={item.imageUrl} alt="" />
              </figure>
              <div>
                <strong>{item.highlight}</strong>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-products-action">
          <Link className="button button-primary" to="/products">
            {cta}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
