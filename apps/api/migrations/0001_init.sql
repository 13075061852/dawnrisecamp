CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  parent_slug TEXT,
  sort_order INTEGER NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  published_at TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_zh TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO products (slug, parent_slug, sort_order, name_en, name_zh) VALUES
  ('hiking-trekking-gear', NULL, 10, 'Hiking & Trekking Gear', '徒步与登山装备'),
  ('trekking-poles', 'hiking-trekking-gear', 11, 'Trekking Poles', '登山杖'),
  ('camping-wagons-transport', NULL, 20, 'Camping Wagons & Transport', '露营拖车与运输'),
  ('camping-wagons', 'camping-wagons-transport', 21, 'Camping Wagons', '露营拖车'),
  ('tents-tarps-awnings', NULL, 30, 'Tents, Tarps & Awnings', '帐篷、天幕与车边帐'),
  ('camping-tarps', 'tents-tarps-awnings', 31, 'Camping Tarps', '露营天幕'),
  ('car-awnings', 'tents-tarps-awnings', 32, 'Car Awnings', '车边帐'),
  ('camping-furniture-sleeping-gear', NULL, 40, 'Camping Furniture & Sleeping Gear', '露营家具与睡眠装备'),
  ('folding-camping-chairs', 'camping-furniture-sleeping-gear', 41, 'Folding Camping Chairs', '折叠露营椅'),
  ('inflatable-sleeping-pads', 'camping-furniture-sleeping-gear', 42, 'Inflatable Sleeping Pads', '充气睡垫'),
  ('camping-cots', 'camping-furniture-sleeping-gear', 43, 'Camping Cots', '露营行军床');

INSERT OR IGNORE INTO news (
  slug,
  published_at,
  title_en,
  title_zh,
  excerpt_en,
  excerpt_zh,
  image_url
) VALUES
  (
    'trade-fair-preview',
    '2026-05-12',
    'Trade Fair Preview: New Camping Furniture Line',
    '展会预告：全新露营家具系列',
    'We will showcase our latest camping furniture collection for buyers seeking durable, export-ready outdoor products.',
    '我们将展示全新露营家具系列，面向需要稳定出口交付的海外客户。',
    '/images/news-furniture.webp'
  ),
  (
    'wagon-capacity-update',
    '2026-04-28',
    'Factory Update: Expanded Wagon Assembly Capacity',
    '工厂动态：露营拖车装配产能提升',
    'Our wagon production line has been upgraded to support steadier bulk fulfillment and shorter lead times.',
    '拖车生产线已完成升级，可更稳定地支持大货订单与更短交期。',
    '/images/news-wagons.webp'
  );

