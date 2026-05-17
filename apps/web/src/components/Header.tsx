import { MountainMark } from "../icons";
import type { Locale } from "../types";
import { Link, NavLink } from "react-router-dom";

type HeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  labels: {
    home: string;
    about: string;
    products: string;
    news: string;
    contact: string;
  };
};

const navItems = [
  ["home", "/"],
  ["about", "/about"],
  ["products", "/products"],
  ["news", "/news"],
  ["contact", "/contact"],
] as const;

export function Header({ locale, onLocaleChange, labels }: HeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Dawnrise Camp home">
        <MountainMark className="brand-mark" />
        <span>Dawnrise Camp</span>
      </Link>

      <nav aria-label="Primary navigation">
        {navItems.map(([key, to]) => (
          <NavLink key={key} to={to} end={to === "/"}>
            {labels[key]}
          </NavLink>
        ))}
      </nav>

      <div className="locale-switcher" aria-label="Language switcher">
        <button
          type="button"
          className={locale === "en" ? "active" : ""}
          onClick={() => onLocaleChange("en")}
        >
          EN
        </button>
        <span />
        <button
          type="button"
          className={locale === "zh" ? "active" : ""}
          onClick={() => onLocaleChange("zh")}
        >
          中文
        </button>
      </div>
    </header>
  );
}
