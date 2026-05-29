export interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  ALLOWED_ORIGINS?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

type Locale = "en" | "zh";
type AdminSectionKey = "home" | "about" | "products" | "quality" | "news" | "contact";

type ProductRow = {
  slug: string;
  parent_slug: string | null;
  sort_order: number;
  name_en: string;
  name_zh: string;
  is_listed: number;
};

type ProductProfileRow = {
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

type NewsRow = {
  slug: string;
  published_at: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  image_url: string;
};

type SiteSectionRow = {
  section_key: AdminSectionKey;
  content_en: string;
  content_zh: string;
  updated_at: string;
};

type InquiryRow = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  locale: Locale;
  status: InquiryStatus;
  created_at: string;
};

type InquiryStatus = "待处理" | "已回复" | "已合作";

const inquiryStatuses: InquiryStatus[] = ["待处理", "已回复", "已合作"];
const adminSessionDurationMs = 1000 * 60 * 60 * 24 * 30;

type ProductNode = {
  slug: string;
  name: string;
  children: ProductNode[];
};

function getLocale(url: URL): Locale {
  return url.searchParams.get("lang") === "zh" ? "zh" : "en";
}

function parseAllowedOrigins(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function isOriginAllowed(origin: string, allowedOrigins: Set<string>) {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);

    return [...allowedOrigins].some((allowedOrigin) => {
      if (!allowedOrigin.includes("*.")) {
        return false;
      }

      const parsedAllowedOrigin = new URL(allowedOrigin);
      const suffix = parsedAllowedOrigin.hostname.replace("*.", "");

      return (
        parsedOrigin.protocol === parsedAllowedOrigin.protocol &&
        parsedOrigin.hostname.endsWith(`.${suffix}`)
      );
    });
  } catch {
    return false;
  }
}

function buildCorsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get("Origin");
  const allowedOrigins = parseAllowedOrigins(env);

  if (origin && isOriginAllowed(origin, allowedOrigins)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      Vary: "Origin",
    };
  }

  return {};
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
}

function jsonWithCors(request: Request, env: Env, data: unknown, init?: ResponseInit) {
  return json(data, {
    ...init,
    headers: {
      ...buildCorsHeaders(request, env),
      ...init?.headers,
    },
  });
}

function getAdminSecret(env: Env) {
  return (env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || "").trim();
}

function toBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signAdminToken(payload: Record<string, unknown>, secret: string) {
  const encodedPayload = btoa(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encodedPayload));

  return `${encodedPayload}.${toBase64Url(signature)}`;
}

async function verifyAdminToken(token: string, secret: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const expected = await signAdminToken(JSON.parse(atob(encodedPayload)), secret);
  if (expected !== token) {
    return false;
  }

  const payload = JSON.parse(atob(encodedPayload)) as { exp?: number };
  return typeof payload.exp === "number" && payload.exp > Date.now();
}

async function requireAdmin(request: Request, env: Env) {
  const secret = getAdminSecret(env);
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

  if (!secret || !token || !(await verifyAdminToken(token, secret).catch(() => false))) {
    return jsonWithCors(request, env, { error: "Unauthorized." }, { status: 401 });
  }

  return null;
}

function localizeProductName(row: ProductRow, locale: Locale) {
  return locale === "zh" ? row.name_zh : row.name_en;
}

function buildProductTree(rows: ProductRow[], locale: Locale): ProductNode[] {
  const nodes = new Map<string, ProductNode>();
  const roots: ProductNode[] = [];

  rows.forEach((row) => {
    nodes.set(row.slug, {
      slug: row.slug,
      name: localizeProductName(row, locale),
      children: [],
    });
  });

  rows.forEach((row) => {
    const node = nodes.get(row.slug);
    if (!node) return;

    if (row.parent_slug) {
      if (row.is_listed === 0) return;
      nodes.get(row.parent_slug)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

async function handleBootstrap(request: Request, env: Env) {
  const locale = getLocale(new URL(request.url));

  const [productResult, profileResult, newsResult, sectionResult] = await Promise.all([
    env.DB.prepare(
      `SELECT slug, parent_slug, sort_order, name_en, name_zh, is_listed
       FROM products
       ORDER BY sort_order ASC`,
    ).all<ProductRow>(),
    env.DB.prepare(
      `SELECT slug, code, subtitle_en, subtitle_zh, highlights_en, highlights_zh,
              feature_title_en, feature_title_zh, feature_body_en, feature_body_zh,
              specs_en, specs_zh, gallery_json
       FROM product_profiles`,
    ).all<ProductProfileRow>(),
    env.DB.prepare(
      `SELECT slug, published_at, title_en, title_zh, excerpt_en, excerpt_zh, image_url
       FROM news
       ORDER BY published_at DESC`,
    ).all<NewsRow>(),
    env.DB.prepare(
      `SELECT section_key, content_en, content_zh, updated_at
       FROM site_sections`,
    ).all<SiteSectionRow>(),
  ]);

  return json(
    {
      products: buildProductTree(productResult.results ?? [], locale),
      productProfiles: buildProductProfiles(profileResult.results ?? [], locale),
      news: (newsResult.results ?? []).map((row) => ({
        slug: row.slug,
        publishedAt: row.published_at,
        title: locale === "zh" ? row.title_zh : row.title_en,
        excerpt: locale === "zh" ? row.excerpt_zh : row.excerpt_en,
        imageUrl: row.image_url,
      })),
      siteContent: buildSiteContent(sectionResult.results ?? [], locale),
    },
    {
      headers: buildCorsHeaders(request, env),
    },
  );
}

function buildProductProfiles(rows: ProductProfileRow[], locale: Locale) {
  return Object.fromEntries(
    rows.map((row) => [
      row.slug,
      {
        slug: row.slug,
        code: row.code,
        subtitle: locale === "zh" ? row.subtitle_zh : row.subtitle_en,
        highlights: parseJsonArray(locale === "zh" ? row.highlights_zh : row.highlights_en),
        featureTitle: locale === "zh" ? row.feature_title_zh : row.feature_title_en,
        featureBody: locale === "zh" ? row.feature_body_zh : row.feature_body_en,
        specs: parseJsonArray(locale === "zh" ? row.specs_zh : row.specs_en),
        gallery: parseJsonObject(row.gallery_json),
      },
    ]),
  );
}

function parseJsonArray(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseJsonObject(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function buildSiteContent(rows: SiteSectionRow[], locale: Locale) {
  const content: Partial<Record<AdminSectionKey, unknown>> = {};

  rows.forEach((row) => {
    const rawContent = locale === "zh" ? row.content_zh : row.content_en;

    try {
      content[row.section_key] = JSON.parse(rawContent);
    } catch {
      content[row.section_key] = {};
    }
  });

  return content;
}

async function handleContact(request: Request, env: Env) {
  const payload = (await request.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        company?: string;
        message?: string;
        locale?: Locale;
      }
    | null;

  if (
    !payload?.name?.trim() ||
    !payload.email?.trim() ||
    !payload.company?.trim() ||
    !payload.message?.trim()
  ) {
    return json(
      { error: "Missing required fields." },
      {
        status: 400,
        headers: buildCorsHeaders(request, env),
      },
    );
  }

  await env.DB.prepare(
    `INSERT INTO inquiries (name, email, company, message, locale)
     VALUES (?1, ?2, ?3, ?4, ?5)`,
  )
    .bind(
      payload.name.trim(),
      payload.email.trim(),
      payload.company.trim(),
      payload.message.trim(),
      payload.locale === "zh" ? "zh" : "en",
    )
    .run();

  return json(
    { ok: true },
    {
      status: 201,
      headers: buildCorsHeaders(request, env),
    },
  );
}

async function handleMedia(pathname: string, request: Request, env: Env) {
  const key = decodeURIComponent(pathname.replace(/^\/media\//, ""));
  const object = await env.MEDIA_BUCKET.get(key);

  if (!object) {
    return new Response("Not found", {
      status: 404,
      headers: buildCorsHeaders(request, env),
    });
  }

  const headers = new Headers(buildCorsHeaders(request, env));
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(request.method === "HEAD" ? null : object.body, { headers });
}

async function handleAdminLogin(request: Request, env: Env) {
  const payload = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = env.ADMIN_PASSWORD?.trim();

  if (!password) {
    return jsonWithCors(request, env, { error: "ADMIN_PASSWORD is not configured." }, { status: 503 });
  }

  if (payload?.password?.trim() !== password) {
    return jsonWithCors(request, env, { error: "Invalid password." }, { status: 401 });
  }

  const token = await signAdminToken(
    {
      sub: "admin",
      exp: Date.now() + adminSessionDurationMs,
    },
    getAdminSecret(env),
  );

  return jsonWithCors(request, env, { token });
}

async function handleAdminSections(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const result = await env.DB.prepare(
    `SELECT section_key, content_en, content_zh, updated_at
     FROM site_sections
     ORDER BY section_key ASC`,
  ).all<SiteSectionRow>();

  return jsonWithCors(request, env, { sections: result.results ?? [] });
}

async function handleAdminInquiries(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const [inquiryResult, summaryResult] = await Promise.all([
    env.DB.prepare(
      `SELECT id, name, email, company, message, locale, status, created_at
       FROM inquiries
       ORDER BY datetime(created_at) DESC, id DESC
       LIMIT 100`,
    ).all<InquiryRow>(),
    env.DB.prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN date(created_at) = date('now') THEN 1 ELSE 0 END) AS today,
         SUM(CASE WHEN locale = 'zh' THEN 1 ELSE 0 END) AS zh,
         SUM(CASE WHEN locale = 'en' THEN 1 ELSE 0 END) AS en
       FROM inquiries`,
    ).first<{ total: number; today: number | null; zh: number | null; en: number | null }>(),
  ]);

  return jsonWithCors(request, env, {
    inquiries: inquiryResult.results ?? [],
    summary: {
      total: Number(summaryResult?.total ?? 0),
      today: Number(summaryResult?.today ?? 0),
      zh: Number(summaryResult?.zh ?? 0),
      en: Number(summaryResult?.en ?? 0),
    },
  });
}

async function handleAdminInquiryDelete(pathname: string, request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const inquiryId = Number(pathname.replace(/^\/api\/admin\/inquiries\//, ""));
  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    return jsonWithCors(request, env, { error: "Invalid inquiry id." }, { status: 400 });
  }

  const result = await env.DB.prepare("DELETE FROM inquiries WHERE id = ?1").bind(inquiryId).run();

  if ((result.meta.changes ?? 0) === 0) {
    return jsonWithCors(request, env, { error: "Inquiry not found." }, { status: 404 });
  }

  return jsonWithCors(request, env, { ok: true });
}

async function handleAdminInquiryStatusUpdate(pathname: string, request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const inquiryId = Number(pathname.replace(/^\/api\/admin\/inquiries\/(\d+)\/status$/, "$1"));
  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    return jsonWithCors(request, env, { error: "Invalid inquiry id." }, { status: 400 });
  }

  const payload = (await request.json().catch(() => null)) as { status?: string } | null;
  if (!payload?.status || !inquiryStatuses.includes(payload.status as InquiryStatus)) {
    return jsonWithCors(request, env, { error: "Invalid inquiry status." }, { status: 400 });
  }

  const result = await env.DB.prepare("UPDATE inquiries SET status = ?1 WHERE id = ?2")
    .bind(payload.status, inquiryId)
    .run();

  if ((result.meta.changes ?? 0) === 0) {
    return jsonWithCors(request, env, { error: "Inquiry not found." }, { status: 404 });
  }

  return jsonWithCors(request, env, { ok: true });
}

async function handleAdminProductCatalog(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const [productResult, profileResult] = await Promise.all([
    env.DB.prepare(
      `SELECT slug, parent_slug, sort_order, name_en, name_zh, is_listed
       FROM products
       ORDER BY sort_order ASC`,
    ).all<ProductRow>(),
    env.DB.prepare(
      `SELECT slug, code, subtitle_en, subtitle_zh, highlights_en, highlights_zh,
              feature_title_en, feature_title_zh, feature_body_en, feature_body_zh,
              specs_en, specs_zh, gallery_json
       FROM product_profiles`,
    ).all<ProductProfileRow>(),
  ]);

  return jsonWithCors(request, env, {
    products: productResult.results ?? [],
    profiles: profileResult.results ?? [],
  });
}

async function handleAdminProductCatalogUpdate(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const payload = (await request.json().catch(() => null)) as
    | { products?: ProductRow[]; profiles?: ProductProfileRow[] }
    | null;

  if (!payload?.products || !payload.profiles) {
    return jsonWithCors(request, env, { error: "Missing catalog payload." }, { status: 400 });
  }

  const statements = [
    env.DB.prepare("DELETE FROM product_profiles"),
    env.DB.prepare("DELETE FROM products"),
    ...payload.products.map((product) =>
      env.DB.prepare(
        `INSERT INTO products (slug, parent_slug, sort_order, name_en, name_zh, is_listed)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
      ).bind(
        product.slug,
        product.parent_slug || null,
        Number(product.sort_order) || 0,
        product.name_en,
        product.name_zh,
        product.is_listed === 0 ? 0 : 1,
      ),
    ),
    ...payload.profiles.map((profile) =>
      env.DB.prepare(
        `INSERT INTO product_profiles (
          slug, code, subtitle_en, subtitle_zh, highlights_en, highlights_zh,
          feature_title_en, feature_title_zh, feature_body_en, feature_body_zh,
          specs_en, specs_zh, gallery_json
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`,
      ).bind(
        profile.slug,
        profile.code,
        profile.subtitle_en,
        profile.subtitle_zh,
        profile.highlights_en,
        profile.highlights_zh,
        profile.feature_title_en,
        profile.feature_title_zh,
        profile.feature_body_en,
        profile.feature_body_zh,
        profile.specs_en,
        profile.specs_zh,
        profile.gallery_json,
      ),
    ),
  ];

  await env.DB.batch(statements);
  return jsonWithCors(request, env, { ok: true });
}

async function handleAdminSectionUpdate(pathname: string, request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const sectionKey = pathname.replace(/^\/api\/admin\/sections\//, "") as AdminSectionKey;
  const allowedSections: AdminSectionKey[] = ["home", "about", "products", "quality", "news", "contact"];

  if (!allowedSections.includes(sectionKey)) {
    return jsonWithCors(request, env, { error: "Unknown section." }, { status: 404 });
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        contentEn?: unknown;
        contentZh?: unknown;
      }
    | null;

  if (!payload || payload.contentEn === undefined || payload.contentZh === undefined) {
    return jsonWithCors(request, env, { error: "Missing section content." }, { status: 400 });
  }

  await env.DB.prepare(
    `INSERT INTO site_sections (section_key, content_en, content_zh, updated_at)
     VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP)
     ON CONFLICT(section_key) DO UPDATE SET
       content_en = excluded.content_en,
       content_zh = excluded.content_zh,
       updated_at = CURRENT_TIMESTAMP`,
  )
    .bind(sectionKey, JSON.stringify(payload.contentEn), JSON.stringify(payload.contentZh))
    .run();

  return jsonWithCors(request, env, { ok: true });
}

async function handleAdminMediaUpload(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return jsonWithCors(request, env, { error: "Missing file." }, { status: 400 });
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  const key = `cms/${Date.now()}-${crypto.randomUUID()}-${safeName || "upload"}`;

  await env.MEDIA_BUCKET.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
    },
  });

  return jsonWithCors(request, env, {
    key,
    url: `/media/${key}`,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(request, env),
      });
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      return json(
        { ok: true },
        {
          headers: buildCorsHeaders(request, env),
        },
      );
    }

    if (request.method === "GET" && url.pathname === "/api/bootstrap") {
      return handleBootstrap(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/admin/login") {
      return handleAdminLogin(request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/sections") {
      return handleAdminSections(request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/inquiries") {
      return handleAdminInquiries(request, env);
    }

    if (request.method === "PUT" && /^\/api\/admin\/inquiries\/\d+\/status$/.test(url.pathname)) {
      return handleAdminInquiryStatusUpdate(url.pathname, request, env);
    }

    if (request.method === "DELETE" && url.pathname.startsWith("/api/admin/inquiries/")) {
      return handleAdminInquiryDelete(url.pathname, request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/product-catalog") {
      return handleAdminProductCatalog(request, env);
    }

    if (request.method === "PUT" && url.pathname === "/api/admin/product-catalog") {
      return handleAdminProductCatalogUpdate(request, env);
    }

    if (request.method === "PUT" && url.pathname.startsWith("/api/admin/sections/")) {
      return handleAdminSectionUpdate(url.pathname, request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/admin/media") {
      return handleAdminMediaUpload(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if ((request.method === "GET" || request.method === "HEAD") && url.pathname.startsWith("/media/")) {
      return handleMedia(url.pathname, request, env);
    }

    return new Response("Not found", {
      status: 404,
      headers: buildCorsHeaders(request, env),
    });
  },
};
