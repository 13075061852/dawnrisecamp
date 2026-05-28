import { FeaturedProducts } from "../components/FeaturedProducts";
import { Hero } from "../components/Hero";
import { HomeSourcing } from "../components/HomeSourcing";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";
import { QualityService } from "../components/QualityService";

type HomePageProps = {
  hero: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    points: string[];
  };
  featuredProducts: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    items: {
      name: string;
      description: string;
      highlight: string;
      href: string;
      imageUrl: string;
    }[];
  };
  homeSourcing: {
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
  qualityService: {
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
  newsletter: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
};

export function HomePage({
  hero,
  featuredProducts,
  homeSourcing,
  qualityService,
  newsletter,
}: HomePageProps) {
  return (
    <main>
      <Hero {...hero} />
      <FeaturedProducts {...featuredProducts} />
      <HomeSourcing {...homeSourcing} />
      <QualityService variant="preview" {...qualityService} />
      <section className="section home-newsletter">
        <div className="shell">
          <NewsletterSubscribe emailInputId="home-subscribe-email" copy={newsletter} />
        </div>
      </section>
    </main>
  );
}
