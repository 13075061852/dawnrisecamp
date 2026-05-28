import { MountainMark } from "../icons";
import { Link } from "react-router-dom";
import type { Locale, ProductNode } from "../types";

type FooterProps = {
  locale: Locale;
  promise: string;
  nav: {
    home: string;
    about: string;
    products: string;
    quality: string;
    news: string;
    contact: string;
  };
  contact: {
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    phone: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    submit: string;
  };
  products: ProductNode[];
};

const navLinks = [
  ["home", "/"],
  ["about", "/about"],
  ["products", "/products"],
  ["quality", "/quality-assurance"],
  ["news", "/news"],
  ["contact", "/contact"],
] as const;

function getProductLinks(products: ProductNode[]) {
  return products
    .flatMap((category) => (category.children.length ? category.children : [category]))
    .slice(0, 6)
    .map((product) => ({
      name: product.name,
      href: `/products/${product.slug}`,
    }));
}

export function Footer({ locale, promise, nav, contact, products }: FooterProps) {
  const productLinks = getProductLinks(products);

  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-message">
          <Link className="brand footer-brand" to="/" aria-label="Dawnrise Camp home">
            <MountainMark className="brand-mark" />
            <span>Dawnrise Camp</span>
          </Link>
          <h2>{locale === "zh" ? "给我们留言" : "Leave Us A Message"}</h2>
          <p>{contact.body}</p>
          <Link className="footer-cta" to="/contact">
            {contact.submit}
          </Link>
        </div>

        <nav className="footer-column" aria-label={locale === "zh" ? "页脚导航" : "Footer navigation"}>
          <h3>{locale === "zh" ? "网站信息" : "Information"}</h3>
          {navLinks.map(([key, to]) => (
            <Link key={key} to={to}>
              {nav[key]}
            </Link>
          ))}
        </nav>

        <div className="footer-column">
          <h3>{nav.products}</h3>
          {productLinks.map((product) => (
            <Link key={product.href} to={product.href}>
              {product.name}
            </Link>
          ))}
        </div>

        <address className="footer-column footer-contact">
          <h3>{nav.contact}</h3>
          <p>
            <span>{contact.addressLabel}</span>
            {contact.address}
          </p>
          <p>
            <span>{contact.phoneLabel}</span>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
          </p>
          <p>
            <span>{contact.emailLabel}</span>
            <a href="mailto:sales@dawnrisecamp.com">sales@dawnrisecamp.com</a>
          </p>
          <p>
            <span>{contact.hoursLabel}</span>
            {contact.hours}
          </p>
        </address>
      </div>

      <div className="shell footer-bottom">
        <p>{promise}</p>
        <div>
          <span>Copyright © 2026 Dawnrise Camp.</span>
          <span>{locale === "zh" ? "全球户外装备 OEM / ODM 供应支持。" : "OEM / ODM support for global outdoor buyers."}</span>
        </div>
      </div>
    </footer>
  );
}
