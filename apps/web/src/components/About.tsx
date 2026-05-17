import { CompassIcon, GlobeIcon, PlayIcon, ShieldIcon } from "../icons";

type AboutProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  features: string[];
  onPlay: () => void;
};

const featureIcons = [CompassIcon, ShieldIcon, GlobeIcon];

export function About({ eyebrow, title, body, cta, features, onPlay }: AboutProps) {
  return (
    <section className="section about">
      <div className="shell about-grid">
        <button type="button" className="video-card" onClick={onPlay}>
          <img src="/images/about-poster.webp" alt="" />
          <span className="play-button" aria-hidden="true">
            <PlayIcon />
          </span>
        </button>

        <div className="section-copy">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{body}</p>
          <button type="button" className="button button-primary watch-button" onClick={onPlay}>
            <PlayIcon />
            {cta}
          </button>

          <div className="feature-row">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div className="feature" key={feature}>
                  <Icon />
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
