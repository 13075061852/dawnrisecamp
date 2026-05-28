import { CompassIcon, GlobeIcon, ShieldIcon } from "../icons";
import { buildImageUrl } from "../lib/api";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";

type QualityAssurancePageProps = {
  quality: {
    eyebrow: string;
    title: string;
    subtitle: string;
    processTitle: string;
    reportsTitle: string;
    qualificationsTitle: string;
    process: {
      title: string;
      body: string;
    }[];
    reports: {
      title: string;
      body: string;
      label: string;
      imageUrl: string;
      imageAlt: string;
    }[];
    qualifications: {
      title: string;
      body: string;
      imageUrl: string;
      imageAlt: string;
      badge: string;
    }[];
  };
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
};

const processIcons = [ShieldIcon, CompassIcon, GlobeIcon, ShieldIcon, CompassIcon];
const processVisuals = [
  {
    imageUrl: "/images/quality/material-review.png",
    alt: "Material quality inspection at an outdoor gear factory",
  },
  {
    imageUrl: "/images/quality/production-check.png",
    alt: "Outdoor gear production workmanship check",
  },
  {
    imageUrl: "/images/quality/secondary-inspection.png",
    alt: "Finished goods secondary inspection review",
  },
  {
    imageUrl: "/images/quality/report-record.png",
    alt: "Inspection report records and product notes",
  },
  {
    imageUrl: "/images/quality/shipment-approval.png",
    alt: "Cartons prepared for shipment approval",
  },
];

export function QualityAssurancePage({ quality, newsletter }: QualityAssurancePageProps) {
  return (
    <main className="page-shell quality-page">
      <section className="section quality-hero">
        <figure className="quality-hero-banner">
          <img
            src={buildImageUrl("/images/quality/production-check.png")}
            alt="Dawnrise Camp production quality control workshop"
          />
          <figcaption className="quality-hero-copy">
            <h1>{quality.title}</h1>
            <p>{quality.subtitle}</p>
          </figcaption>
        </figure>
      </section>

      <section className="section quality-process-section">
        <div className="shell">
          <div className="about-section-heading quality-process-heading">
            <span>{quality.eyebrow}</span>
            <h2>{quality.processTitle}</h2>
          </div>

          <div className="quality-process-timeline">
            {quality.process.map((step, index) => {
              const Icon = processIcons[index] ?? ShieldIcon;
              const visual = processVisuals[index] ?? processVisuals[0];
              const isCopyFirst = index % 2 === 0;
              const copyPanel = (
                <div className="quality-process-copy">
                  <Icon />
                  <div>
                    <h3>{step.title}</h3>
                    <span aria-hidden="true" />
                    <p>{step.body}</p>
                  </div>
                </div>
              );
              const visualPanel = (
                <figure className="quality-process-visual">
                  <img src={buildImageUrl(visual.imageUrl)} alt={visual.alt} />
                </figure>
              );

              return (
                <article
                  className={`quality-process-step ${
                    isCopyFirst ? "quality-process-step-copy-left" : "quality-process-step-copy-right"
                  }`}
                  key={step.title}
                >
                  <div className="quality-process-side quality-process-left">
                    {isCopyFirst ? copyPanel : visualPanel}
                  </div>

                  <div className="quality-process-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="quality-process-side quality-process-right">
                    {isCopyFirst ? visualPanel : copyPanel}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section quality-documents">
        <div className="shell about-document-section">
          <section className="about-document-block">
            <div className="about-section-heading about-section-heading-centered">
              <h2>{quality.reportsTitle}</h2>
            </div>

            <div className="report-module">
              {quality.reports.map((report) => (
                <article key={report.title} className="about-report-card">
                  <figure className="report-card-visual">
                    <img src={buildImageUrl(report.imageUrl)} alt={report.imageAlt} />
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

          <section className="about-document-block">
            <div className="about-section-heading about-section-heading-centered">
              <h2>{quality.qualificationsTitle}</h2>
            </div>

            <div className="qualification-card-grid">
              {quality.qualifications.map((item) => (
                <article key={item.title} className="qualification-card">
                  <figure>
                    <img src={buildImageUrl(item.imageUrl)} alt={item.imageAlt} />
                  </figure>
                  <div className="qualification-card-copy">
                    <div>
                      <h3>{item.title}</h3>
                      <span>{item.badge}</span>
                    </div>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="section quality-newsletter">
        <div className="shell">
          <NewsletterSubscribe emailInputId="quality-subscribe-email" copy={newsletter} />
        </div>
      </section>
    </main>
  );
}
