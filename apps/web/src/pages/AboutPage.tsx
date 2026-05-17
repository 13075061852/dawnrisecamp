import { About } from "../components/About";

type AboutPageProps = {
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    features: string[];
    stats: {
      value: string;
      label: string;
    }[];
    pillarsTitle: string;
    pillars: {
      title: string;
      body: string;
    }[];
    processTitle: string;
    process: {
      title: string;
      body: string;
    }[];
    galleryTitle: string;
    gallery: {
      imageUrl: string;
      alt: string;
    }[];
  };
  onPlayVideo: () => void;
};

export function AboutPage({ about, onPlayVideo }: AboutPageProps) {
  return (
    <main className="page-shell">
      <About {...about} onPlay={onPlayVideo} />
    </main>
  );
}
