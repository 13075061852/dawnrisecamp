import { ArrowIcon } from "../icons";
import type { ProductNode } from "../types";
import { Link } from "react-router-dom";

type ProductsProps = {
  eyebrow: string;
  title: string;
  cta: string;
  products: ProductNode[];
};

export function Products({ eyebrow, title, cta, products }: ProductsProps) {
  return (
    <section className="section products">
      <div className="shell">
        <div className="section-copy products-heading">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        <div className="products-grid">
          <div className="taxonomy-panel">
            <ul>
              {products.map((category) => (
                <li key={category.slug}>
                  <strong>{category.name}</strong>
                  {category.children.length > 0 && (
                    <ul>
                      {category.children.map((child) => (
                        <li key={child.slug}>{child.name}</li>
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

          <figure className="product-image">
            <img src="/images/products.webp" alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}
