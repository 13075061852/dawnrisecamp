import { Link } from "react-router-dom";
import { ArrowIcon } from "../icons";

type HomeSourcingProps = {
  title: string;
  body: string;
  cta: string;
  steps: {
    title: string;
    body: string;
    label: string;
  }[];
  gallery: {
    imageUrl: string;
    alt: string;
    caption: string;
  }[];
};

export function HomeSourcing({
  title,
  cta,
  steps,
  gallery,
}: HomeSourcingProps) {
  return (
    <section className="section home-sourcing">
      <div className="shell home-sourcing-shell">
        <div className="home-sourcing-header">
          <div className="section-copy">
            <h2>{title}</h2>
          </div>
        </div>

        <ol className="home-delivery-chain">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{step.label}</small>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="home-delivery-gallery">
          {gallery.map((item) => (
            <figure key={item.imageUrl}>
              <img src={item.imageUrl} alt={item.alt} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Link className="button button-primary home-sourcing-cta" to="/contact">
          {cta}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
