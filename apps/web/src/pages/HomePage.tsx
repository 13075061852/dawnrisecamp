import { Hero } from "../components/Hero";

type HomePageProps = {
  hero: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export function HomePage({ hero }: HomePageProps) {
  return (
    <main>
      <Hero {...hero} />
    </main>
  );
}

