export interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  ALLOWED_ORIGINS?: string;
}

type Locale = "en" | "zh";

type ProductRow = {
  slug: string;
  parent_slug: string | null;
  sort_order: number;
  name_en: string;
  name_zh: string;
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
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      Vary: "Origin",
    };
  }

  return {};
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
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
      nodes.get(row.parent_slug)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

async function handleBootstrap(request: Request, env: Env) {
  const locale = getLocale(new URL(request.url));

  const [productResult, newsResult] = await Promise.all([
    env.DB.prepare(
      `SELECT slug, parent_slug, sort_order, name_en, name_zh
       FROM products
       ORDER BY sort_order ASC`,
    ).all<ProductRow>(),
    env.DB.prepare(
      `SELECT slug, published_at, title_en, title_zh, excerpt_en, excerpt_zh, image_url
       FROM news
       ORDER BY published_at DESC`,
    ).all<NewsRow>(),
  ]);

  return json(
    {
      products: buildProductTree(productResult.results ?? [], locale),
      news: (newsResult.results ?? []).map((row) => ({
        slug: row.slug,
        publishedAt: row.published_at,
        title: locale === "zh" ? row.title_zh : row.title_en,
        excerpt: locale === "zh" ? row.excerpt_zh : row.excerpt_en,
        imageUrl: row.image_url,
      })),
    },
    {
      headers: buildCorsHeaders(request, env),
    },
  );
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
