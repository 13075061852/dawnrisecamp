import { useState, type FormEvent } from "react";
import { submitInquiry } from "../lib/api";
import type { Locale } from "../types";

type ContactProps = {
  locale: Locale;
  labels: {
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
        <div className="section-copy">
          <span>{labels.eyebrow}</span>
          <h2>{labels.title}</h2>
          <p>sales@dawnrisecamp.com</p>
        </div>

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
