import { FeaturedProducts } from "../components/FeaturedProducts";
import { Hero } from "../components/Hero";
import { HomeSourcing } from "../components/HomeSourcing";

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
};

export function HomePage({ hero, featuredProducts, homeSourcing }: HomePageProps) {
  return (
    <main>
      <Hero {...hero} />
      <FeaturedProducts {...featuredProducts} />
      <HomeSourcing {...homeSourcing} />
    </main>
  );
}
