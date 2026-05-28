import { MountainMark } from "../icons";
import type { Locale } from "../types";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type HeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  labels: {
    home: string;
    about: string;
    products: string;
    quality: string;
    news: string;
    contact: string;
  };
};

const navItems = [
  ["home", "/"],
  ["about", "/about"],
  ["products", "/products"],
  ["quality", "/quality-assurance"],
  ["news", "/news"],
  ["contact", "/contact"],
] as const;

function getNavLabel(locale: Locale, key: (typeof navItems)[number][0], label: string) {
  if (locale === "en" && (key === "quality" || key === "news")) {
    return label.split(" ")[0];
  }

  return label;
}

export function Header({ locale, onLocaleChange, labels }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header${menuOpen ? " menu-open" : ""}`}>
      <Link className="brand" to="/" aria-label="Dawnrise Camp home" onClick={() => setMenuOpen(false)}>
        <MountainMark className="brand-mark" />
        <span>Dawnrise Camp</span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="primary-menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="header-menu" id="primary-menu">
        <nav aria-label="Primary navigation">
          {navItems.map(([key, to]) => {
            const label = labels[key];

            return (
              <NavLink key={key} to={to} end={to === "/"} aria-label={label} onClick={() => setMenuOpen(false)}>
                {getNavLabel(locale, key, label)}
              </NavLink>
            );
          })}
        </nav>

        <div className="locale-switcher" aria-label="Language switcher">
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            onClick={() => {
              onLocaleChange("en");
              setMenuOpen(false);
            }}
          >
            EN
          </button>
          <span />
          <button
            type="button"
            className={locale === "zh" ? "active" : ""}
            onClick={() => {
              onLocaleChange("zh");
              setMenuOpen(false);
            }}
          >
            中文
          </button>
        </div>
      </div>
    </header>
  );
}
