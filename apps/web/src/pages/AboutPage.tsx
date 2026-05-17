import { About } from "../components/About";

type AboutPageProps = {
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    features: string[];
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

