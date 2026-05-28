import { useState, type FormEvent } from "react";

type NewsletterSubscribeProps = {
  emailInputId: string;
  copy: {
    title: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
};

export function NewsletterSubscribe({ emailInputId, copy }: NewsletterSubscribeProps) {
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubscriptionMessage(copy.success);
  }

  return (
    <form className="product-subscribe" onSubmit={handleSubscribe}>
      <strong>{copy.title}</strong>
      <p>{copy.body}</p>
      <div>
        <label className="sr-only" htmlFor={emailInputId}>
          {copy.emailLabel}
        </label>
        <input
          id={emailInputId}
          name="email"
          type="email"
          placeholder={copy.placeholder}
          required
        />
        <button type="submit">{copy.submit}</button>
      </div>
      {subscriptionMessage && <span>{subscriptionMessage}</span>}
    </form>
  );
}
