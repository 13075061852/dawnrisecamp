import { About } from "../components/About";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";

type AboutPageProps = {
  about: {
    introSections: {
      title: string;
      body: string;
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
};

export function AboutPage({ about, newsletter }: AboutPageProps) {
  return (
    <main className="page-shell about-page">
      <About {...about} />
      <section className="section about-newsletter">
        <div className="shell">
          <NewsletterSubscribe emailInputId="about-subscribe-email" copy={newsletter} />
        </div>
      </section>
    </main>
  );
}
