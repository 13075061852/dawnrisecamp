import type { BootstrapPayload, InquiryPayload, Locale } from "../types";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const defaultBaseUrl = import.meta.env.DEV ? "http://127.0.0.1:8787" : "";
export const apiBaseUrl = (configuredBaseUrl || defaultBaseUrl).replace(/\/$/, "");

export async function fetchBootstrap(locale: Locale): Promise<BootstrapPayload> {
  const response = await fetch(`${apiBaseUrl}/api/bootstrap?lang=${locale}`);

  if (!response.ok) {
    throw new Error(`Bootstrap request failed with ${response.status}`);
  }

  return response.json() as Promise<BootstrapPayload>;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Inquiry request failed with ${response.status}`);
  }
}

export function buildMediaUrl(key: string): string {
  return `${apiBaseUrl}/media/${key}`;
}
