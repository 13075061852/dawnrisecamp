INSERT OR IGNORE INTO products (slug, parent_slug, sort_order, name_en, name_zh) VALUES
  ('camp-kitchen-accessories', NULL, 50, 'Camp Kitchen & Accessories', '营地厨房与配件'),
  ('folding-camping-tables', 'camp-kitchen-accessories', 51, 'Folding Camping Tables', '折叠露营桌'),
  ('hard-cooler-boxes', 'camp-kitchen-accessories', 52, 'Hard Cooler Boxes', '硬壳保温箱');
