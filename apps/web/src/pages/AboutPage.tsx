import { About } from "../components/About";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";

type AboutPageProps = {
  about: {
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
  };
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
  onPlayVideo: () => void;
};

export function AboutPage({ about, newsletter, onPlayVideo }: AboutPageProps) {
  return (
    <main className="page-shell">
      <About {...about} onPlay={onPlayVideo} />
      <section className="section about-newsletter">
        <div className="shell">
          <NewsletterSubscribe emailInputId="about-subscribe-email" copy={newsletter} />
        </div>
      </section>
    </main>
  );
}
