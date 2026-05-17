import { MountainMark } from "../icons";

type FooterProps = {
  promise: string;
};

export function Footer({ promise }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="brand footer-brand">
          <MountainMark className="brand-mark" />
          <span>Dawnrise Camp</span>
        </div>
        <p>{promise}</p>
      </div>
    </footer>
  );
}

