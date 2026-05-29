CREATE TABLE IF NOT EXISTS product_profiles (
  slug TEXT PRIMARY KEY,
  code TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  subtitle_zh TEXT NOT NULL DEFAULT '',
  highlights_en TEXT NOT NULL DEFAULT '[]',
  highlights_zh TEXT NOT NULL DEFAULT '[]',
  feature_title_en TEXT NOT NULL DEFAULT '',
  feature_title_zh TEXT NOT NULL DEFAULT '',
  feature_body_en TEXT NOT NULL DEFAULT '',
  feature_body_zh TEXT NOT NULL DEFAULT '',
  specs_en TEXT NOT NULL DEFAULT '[]',
  specs_zh TEXT NOT NULL DEFAULT '[]',
  gallery_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
