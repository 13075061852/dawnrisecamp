import { CompassIcon, GlobeIcon, PlayIcon, ShieldIcon } from "../icons";
import { buildImageUrl } from "../lib/api";

type AboutProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  features: string[];
  supplierTitle: string;
  supplierBody: string;
  supplierChannels: {
    name: string;
    imageUrl: string;
  }[];
  qualificationsEyebrow: string;
  qualificationsTitle: string;
  qualificationsBody: string;
  qualifications: {
    title: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    badge: string;
    updatedLabel: string;
    availability: string;
  }[];
  qualificationsPanel: {
    title: string;
    body: string;
    items: string[];
  };
  reportsEyebrow: string;
  reportsTitle: string;
  reportsBody: string;
  reports: {
    title: string;
    body: string;
    label: string;
    imageUrl: string;
    imageAlt: string;
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
  supplierTitle,
  supplierBody,
  supplierChannels,
  qualificationsTitle,
  qualificationsBody,
  qualifications,
  qualificationsPanel,
  reportsTitle,
  reportsBody,
  reports,
  onPlay,
}: AboutProps) {
  return (
    <section className="section about">
      <div className="shell about-hero">
        <div className="about-grid">
          <button type="button" className="video-card" onClick={onPlay}>
            <img src={buildImageUrl("/images/about-poster.webp")} alt="" />
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
      </div>

      <div className="shell about-supplier-section">
        <div className="about-section-heading about-section-heading-centered">
          <h2>{supplierTitle}</h2>
          <p>{supplierBody}</p>
        </div>

        <div className="supplier-channel-grid">
          {supplierChannels.map((channel) => (
            <article className="supplier-channel-card" key={channel.name}>
              <img src={channel.imageUrl} alt={`${channel.name} logo`} />
              <span>{channel.name}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="shell about-document-section">
        <section className="about-document-block">
          <div className="about-section-heading about-section-heading-centered">
            <h2>{qualificationsTitle}</h2>
            <p>{qualificationsBody}</p>
          </div>

          <div className="qualification-module">
            <div className="qualification-card-grid">
              {qualifications.map((item) => (
                <article key={item.title} className="qualification-card">
                  <figure>
                    <img src={item.imageUrl} alt={item.imageAlt} />
                  </figure>
                  <div className="qualification-card-copy">
                    <div>
                      <h3>{item.title}</h3>
                      <span>{item.badge}</span>
                    </div>
                    <p>{item.body}</p>
                    <dl>
                      <div>
                        <dt>{item.updatedLabel}</dt>
                        <dd>{item.availability}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>

            <aside className="qualification-panel">
              <strong>{qualificationsPanel.title}</strong>
              <p>{qualificationsPanel.body}</p>
              <ul>
                {qualificationsPanel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="about-document-block">
          <div className="about-section-heading about-section-heading-centered">
            <h2>{reportsTitle}</h2>
            <p>{reportsBody}</p>
          </div>

          <div className="report-module">
            {reports.map((report) => (
              <article key={report.title} className="about-report-card">
                <figure className="report-card-visual">
                  <img src={report.imageUrl} alt={report.imageAlt} />
                  <span>{report.label}</span>
                </figure>
                <div>
                  <strong>{report.label}</strong>
                  <h3>{report.title}</h3>
                  <p>{report.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
