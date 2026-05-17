import { useState, type FormEvent } from "react";
import { submitInquiry } from "../lib/api";
import type { Locale } from "../types";

type ContactProps = {
  locale: Locale;
  labels: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    phone: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    mapTitle: string;
    mapCta: string;
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

export function Contact({ locale, labels }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("submitting");

    try {
      await submitInquiry({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        message: String(form.get("message") ?? ""),
        locale,
      });
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact">
      <div className="shell contact-grid">
        <div className="contact-intro">
          <div className="section-copy">
            <span>{labels.eyebrow}</span>
            <h2>{labels.title}</h2>
            <p>{labels.body}</p>
          </div>

          <div className="contact-details">
            <div>
              <span>{labels.emailLabel}</span>
              <a href="mailto:sales@dawnrisecamp.com">sales@dawnrisecamp.com</a>
            </div>
            <div>
              <span>{labels.phoneLabel}</span>
              <a href={`tel:${labels.phone.replace(/\s+/g, "")}`}>{labels.phone}</a>
            </div>
            <div>
              <span>{labels.addressLabel}</span>
              <p>{labels.address}</p>
            </div>
            <div>
              <span>{labels.hoursLabel}</span>
              <p>{labels.hours}</p>
            </div>
          </div>
        </div>

        <div className="contact-map-card">
          <div className="contact-map-heading">
            <h3>{labels.mapTitle}</h3>
            <a
              href="https://www.openstreetmap.org/?mlat=30.2741&mlon=120.1551#map=13/30.2741/120.1551"
              target="_blank"
              rel="noreferrer"
            >
              {labels.mapCta}
            </a>
          </div>
          <iframe
            title={labels.mapTitle}
            src="https://www.openstreetmap.org/export/embed.html?bbox=120.0330%2C30.2040%2C120.2770%2C30.3440&layer=mapnik&marker=30.2741%2C120.1551"
            loading="lazy"
          />
        </div>
      </div>

      <div className="shell contact-form-shell">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {labels.name}
            <input name="name" required />
          </label>
          <label>
            {labels.email}
            <input name="email" type="email" required />
          </label>
          <label>
            {labels.company}
            <input name="company" required />
          </label>
          <label>
            {labels.message}
            <textarea name="message" rows={5} required />
          </label>

          <button className="button button-primary" disabled={status === "submitting"}>
            {status === "submitting" ? labels.submitting : labels.submit}
          </button>

          {status === "success" && <p className="form-message success">{labels.success}</p>}
          {status === "error" && <p className="form-message error">{labels.error}</p>}
        </form>
      </div>
    </section>
  );
}
