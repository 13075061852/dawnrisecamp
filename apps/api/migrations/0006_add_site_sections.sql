CREATE TABLE IF NOT EXISTS site_sections (
  section_key TEXT PRIMARY KEY,
  content_en TEXT NOT NULL DEFAULT '{}',
  content_zh TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
