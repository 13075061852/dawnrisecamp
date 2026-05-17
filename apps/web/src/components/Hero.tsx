import { ArrowIcon } from "../icons";
import { Link } from "react-router-dom";

type HeroProps = {
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

export function Hero({ title, body, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="shell hero-content">
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/products">
            {primaryCta}
            <ArrowIcon />
          </Link>
          <Link className="button button-secondary" to="/contact">
            {secondaryCta}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
