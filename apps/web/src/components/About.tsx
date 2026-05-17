import { CompassIcon, GlobeIcon, PlayIcon, ShieldIcon } from "../icons";

type AboutProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  features: string[];
  stats: {
    value: string;
    label: string;
  }[];
  pillarsTitle: string;
  pillars: {
    title: string;
    body: string;
  }[];
  processTitle: string;
  process: {
    title: string;
    body: string;
  }[];
  galleryTitle: string;
  gallery: {
    imageUrl: string;
    alt: string;
  }[];
  onPlay: () => void;
};

const featureIcons = [CompassIcon, ShieldIcon, GlobeIcon];

export function About({
  eyebrow,
  title,
  body,
  cta,
  features,
  stats,
  pillarsTitle,
  pillars,
  processTitle,
  process,
  galleryTitle,
  gallery,
  onPlay,
}: AboutProps) {
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

      <div className="shell about-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="shell about-gallery">
        <div className="section-copy">
          <h2>{galleryTitle}</h2>
        </div>

        <div className="about-gallery-grid">
          {gallery.map((item) => (
            <figure key={item.imageUrl}>
              <img src={item.imageUrl} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>

      <div className="shell about-story-grid">
        <section className="about-panel">
          <div className="section-copy">
            <h2>{pillarsTitle}</h2>
          </div>

          <div className="about-pillar-list">
            {pillars.map((pillar) => (
              <article key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel about-process-panel">
          <div className="section-copy">
            <h2>{processTitle}</h2>
          </div>

          <ol className="about-process-list">
            {process.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
