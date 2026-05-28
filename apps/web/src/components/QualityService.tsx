import { CompassIcon, GlobeIcon, ShieldIcon } from "../icons";
import { buildImageUrl } from "../lib/api";

type QualityServiceProps = {
  variant: "preview" | "full";
  title: string;
  body: string;
  cta: string;
  assurances: {
    title: string;
    body: string;
    imageUrl: string;
    alt: string;
  }[];
  responseSteps: {
    title: string;
    body: string;
  }[];
};

const assuranceIcons = [ShieldIcon, CompassIcon, ShieldIcon, GlobeIcon];

function getServiceImageUrl(path: string): string {
  if (path.startsWith("/images/service/")) {
    return path;
  }

  return buildImageUrl(path);
}

export function QualityService({
  variant,
  title,
  body,
  assurances,
  responseSteps,
}: QualityServiceProps) {
  const isFull = variant === "full";

  return (
    <section className={`section quality-service quality-service-${variant}`}>
      <div className="shell quality-service-shell">
        <div className="quality-service-copy">
          <div className="section-copy">
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </div>

        <div className="quality-assurance-grid">
          {assurances.map((item, index) => {
            const Icon = assuranceIcons[index] ?? ShieldIcon;

            return (
              <article key={item.title} className="quality-assurance-card">
                <div className="quality-assurance-image">
                  <img src={getServiceImageUrl(item.imageUrl)} alt={item.alt} loading="lazy" />
                </div>
                <Icon />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>

        {isFull && (
          <div className="quality-response-panel">
            <div className="quality-response-media">
              <img src={getServiceImageUrl(assurances[1]?.imageUrl ?? "/images/service/after-sales-review.png")} alt="" />
            </div>

            <div className="quality-response-content">
              <ol className="quality-response-list">
                {responseSteps.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
