import { FeaturedProducts } from "../components/FeaturedProducts";
import { Hero } from "../components/Hero";

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
      price: string;
    }[];
  };
};

export function HomePage({ hero, featuredProducts }: HomePageProps) {
  return (
    <main>
      <Hero {...hero} />
      <FeaturedProducts {...featuredProducts} />
    </main>
  );
}
