import { buildImageUrl } from "../lib/api";
import { MountainMark, ShieldIcon } from "../icons";
import type { SVGProps } from "react";

type AboutProps = {
  introSections: {
    title: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
  }[];
  supplierTitle: string;
  supplierBody: string;
  supplierChannels: {
    name: string;
    imageUrl: string;
  }[];
};

const missionItems = [
  {
    title: "Practical Products",
    body: "Designed for real outdoor use to meet the needs of campers, hikers, and adventurers.",
    Icon: BackpackIcon,
  },
  {
    title: "Stable Quality",
    body: "Strict quality control and secondary inspection ensure consistent and reliable products.",
    Icon: ShieldIcon,
  },
  {
    title: "Responsive Service",
    body: "Quick communication and efficient support to help our partners grow with confidence.",
    Icon: HeadsetIcon,
  },
  {
    title: "Long-term Cooperation",
    body: "We value trust and partnership, committed to long-term success with our business partners.",
    Icon: HandshakeIcon,
  },
];

export function About({
  introSections,
  supplierTitle,
  supplierBody,
  supplierChannels,
}: AboutProps) {
  return (
    <section className="section about">
      <figure className="about-hero-banner">
        <img src={buildImageUrl("/images/about-hero.webp")} alt="Outdoor gear sourcing review at camp" />
      </figure>

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

      <div className="shell about-intro-section">
        {introSections.map((section, index) => (
          index === 1 ? (
            <article className="about-mission-panel" key={section.title}>
              <div className="about-mission-heading">
                <MountainMark />
                <h3>{section.title}</h3>
                <span aria-hidden="true" />
                <p>{section.body}</p>
              </div>

              <div className="about-mission-flow">
                {missionItems.map(({ title, body, Icon }) => (
                  <article className="about-mission-card" key={title}>
                    <div className="about-mission-icon">
                      <Icon />
                    </div>
                    <h4>{title}</h4>
                    <span aria-hidden="true" />
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </article>
          ) : (
            <article
              className={`about-intro-panel about-intro-panel-${index + 1}`}
              key={section.title}
            >
              <div className="about-intro-copy">
                <h3>{section.title}</h3>
                {section.body.split("\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {index === 2 ? (
                <div className="about-custom-list" aria-hidden="true">
                  {["Logo", "Packaging", "Color", "Material", "Size", "Product Combination"].map(
                    (item) => (
                      <span key={item}>{item}</span>
                    ),
                  )}
                </div>
              ) : null}

              <figure className="about-intro-media">
                <img src={buildImageUrl(section.imageUrl)} alt={section.imageAlt} />
              </figure>
            </article>
          )
        ))}
      </div>
    </section>
  );
}

function BackpackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        d="M16 15v-2c0-4 3-7 8-7s8 3 8 7v2M15 18h18c4 0 7 3 7 7v14c0 4-3 7-7 7H15c-4 0-7-3-7-7V25c0-4 3-7 7-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 30h9v11M40 30h-9v11M18 24h12M24 18v28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 32h8"
        fill="none"
        stroke="#f06b1a"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeadsetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        d="M10 29v-5c0-8 6-14 14-14s14 6 14 14v5M10 29h5v10h-3c-2 0-4-2-4-4v-2c0-2 1-4 2-4Zm28 0h-5v10h3c2 0 4-2 4-4v-2c0-2-1-4-2-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 39h5"
        fill="none"
        stroke="#f06b1a"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandshakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        d="m18 21 5-5 7 7 2-2c2-2 5-2 7 0l2 2-9 11c-2 2-5 2-7 0L14 24l4-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m7 19 7-7 7 7-7 7-7-7Zm34 0-7-7-5 5 7 7 5-5Z"
        fill="none"
        stroke="#f06b1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
