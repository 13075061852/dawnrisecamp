import { useState, type FormEvent } from "react";
import { buildImageUrl, submitInquiry } from "../lib/api";
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
  const supportItems =
    locale === "zh"
      ? [
          { title: "产品咨询", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
          { title: "订单支持", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
          { title: "商务合作", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
        ]
      : [
          {
            title: "Product Consultation",
            note: "Please send email to",
            email: "sales@dawnrisecamp.com",
          },
          { title: "Order Support", note: "Please send email to", email: "sales@dawnrisecamp.com" },
          { title: "Business Inquiry", note: "Please send email to", email: "sales@dawnrisecamp.com" },
        ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("submitting");

    try {
      await submitInquiry({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: "Website inquiry",
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
      <figure className="contact-hero-banner">
        <img src={buildImageUrl("/images/contact-hero.webp")} alt="Outdoor gear customer support desk" />
      </figure>

      <div className="shell contact-shell">
        <div className="contact-lead">
          <h2>{labels.title}</h2>
          <p>{labels.body}</p>
          <div className="contact-meta">
            <a href={`tel:${labels.phone.replace(/\s+/g, "")}`}>{labels.phone}</a>
            <span>{labels.hours}</span>
          </div>
        </div>

        <div className="contact-support-grid">
          {supportItems.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <span>{item.note}</span>
              <a href={`mailto:${item.email}`}>{item.email}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="shell contact-form-shell">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>{locale === "zh" ? "留言给我们" : "Leave a Message"}</h3>
          <label>
            {labels.name}
            <input name="name" required />
          </label>
          <label>
            {labels.email}
            <input name="email" type="email" required />
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
