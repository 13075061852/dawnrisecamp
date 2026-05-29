import type { BootstrapPayload, InquiryPayload, Locale } from "../types";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const defaultBaseUrl = "https://dawnrisecamp-api.1308715689.workers.dev";
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

export type AdminSectionKey = "home" | "about" | "products" | "quality" | "news" | "contact";

export type AdminSectionRow = {
  section_key: AdminSectionKey;
  content_en: string;
  content_zh: string;
  updated_at: string;
};

export type AdminProductRow = {
  slug: string;
  parent_slug: string | null;
  sort_order: number;
  name_en: string;
  name_zh: string;
  is_listed: number;
};

export type AdminProductProfileRow = {
  slug: string;
  code: string;
  subtitle_en: string;
  subtitle_zh: string;
  highlights_en: string;
  highlights_zh: string;
  feature_title_en: string;
  feature_title_zh: string;
  feature_body_en: string;
  feature_body_zh: string;
  specs_en: string;
  specs_zh: string;
  gallery_json: string;
};

export type AdminInquiryRow = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  locale: Locale;
  status: AdminInquiryStatus;
  created_at: string;
};

export type AdminInquiryStatus = "待处理" | "已回复" | "已合作";

export type AdminInquirySummary = {
  total: number;
  today: number;
  zh: number;
  en: number;
};

export async function loginAdmin(password: string): Promise<string> {
  const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with ${response.status}`);
  }

  const payload = (await response.json()) as { token: string };
  return payload.token;
}

export async function fetchAdminSections(token: string): Promise<AdminSectionRow[]> {
  const response = await fetch(`${apiBaseUrl}/api/admin/sections`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Sections request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { sections: AdminSectionRow[] };
  return payload.sections;
}

export async function fetchAdminInquiries(token: string): Promise<{
  inquiries: AdminInquiryRow[];
  summary: AdminInquirySummary;
}> {
  const response = await fetch(`${apiBaseUrl}/api/admin/inquiries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Inquiries request failed with ${response.status}`);
  }

  return response.json() as Promise<{
    inquiries: AdminInquiryRow[];
    summary: AdminInquirySummary;
  }>;
}

export async function deleteAdminInquiry(token: string, inquiryId: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/admin/inquiries/${inquiryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Inquiry delete failed with ${response.status}`);
  }
}

export async function updateAdminInquiryStatus(
  token: string,
  inquiryId: number,
  status: AdminInquiryStatus,
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/admin/inquiries/${inquiryId}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Inquiry status update failed with ${response.status}`);
  }
}

export async function saveAdminSection(
  token: string,
  section: AdminSectionKey,
  contentEn: unknown,
  contentZh: unknown,
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/admin/sections/${section}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contentEn, contentZh }),
  });

  if (!response.ok) {
    throw new Error(`Save request failed with ${response.status}`);
  }
}

export async function uploadAdminMedia(token: string, file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${apiBaseUrl}/api/admin/media`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with ${response.status}`);
  }

  const payload = (await response.json()) as { url: string };
  return payload.url;
}

export async function fetchAdminProductCatalog(token: string): Promise<{
  products: AdminProductRow[];
  profiles: AdminProductProfileRow[];
}> {
  const response = await fetch(`${apiBaseUrl}/api/admin/product-catalog`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Product catalog request failed with ${response.status}`);
  }

  return response.json() as Promise<{
    products: AdminProductRow[];
    profiles: AdminProductProfileRow[];
  }>;
}

export async function saveAdminProductCatalog(
  token: string,
  products: AdminProductRow[],
  profiles: AdminProductProfileRow[],
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/admin/product-catalog`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products, profiles }),
  });

  if (!response.ok) {
    throw new Error(`Product catalog save failed with ${response.status}`);
  }
}

export function buildMediaUrl(key: string): string {
  const normalizedKey = key.replace(/^\/+/, "");
  return `${apiBaseUrl}/media/${normalizedKey}`;
}

export function buildImageUrl(path: string): string {
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  if (path.startsWith("/images/")) {
    return encodeURI(path);
  }

  if (path.startsWith("/media/")) {
    return `${apiBaseUrl}${path}`;
  }

  const normalizedPath = path.replace(/^\/+/, "");
  const key = normalizedPath.startsWith("images/")
    ? normalizedPath
    : `images/${normalizedPath}`;

  return buildMediaUrl(key);
}
