import { Contact } from "../components/Contact";
import type { Locale } from "../types";

type ContactPageProps = {
  locale: Locale;
  contact: {
    eyebrow: string;
    title: string;
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
};

export function ContactPage({ locale, contact }: ContactPageProps) {
  return (
    <main className="page-shell">
      <Contact locale={locale} labels={contact} />
    </main>
  );
}

