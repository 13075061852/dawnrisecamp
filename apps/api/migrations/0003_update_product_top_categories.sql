UPDATE products
SET
  slug = 'tents-shelter-systems',
  sort_order = 10,
  name_en = 'Tents & Shelter Systems',
  name_zh = '帐篷与遮蔽系统'
WHERE slug = 'tents-tarps-awnings';

UPDATE products
SET
  parent_slug = 'tents-shelter-systems',
  sort_order = 11
WHERE slug = 'camping-tarps';

UPDATE products
SET
  parent_slug = 'tents-shelter-systems',
  sort_order = 12
WHERE slug = 'car-awnings';

UPDATE products
SET
  slug = 'camping-sleep-systems',
  sort_order = 20,
  name_en = 'Camping Sleep Systems',
  name_zh = '露营睡眠系统'
WHERE slug = 'camping-furniture-sleeping-gear';

UPDATE products
SET
  parent_slug = 'camping-sleep-systems',
  sort_order = 21
WHERE slug = 'inflatable-sleeping-pads';

UPDATE products
SET
  parent_slug = 'camping-sleep-systems',
  sort_order = 22
WHERE slug = 'camping-cots';

UPDATE products
SET
  slug = 'camping-furniture-accessories',
  sort_order = 30,
  name_en = 'Camping Furniture & Accessories',
  name_zh = '露营家具与配件'
WHERE slug = 'camp-kitchen-accessories';

UPDATE products
SET
  parent_slug = 'camping-furniture-accessories',
  sort_order = 31
WHERE slug = 'folding-camping-chairs';

UPDATE products
SET
  parent_slug = 'camping-furniture-accessories',
  sort_order = 32
WHERE slug = 'folding-camping-tables';

UPDATE products
SET
  slug = 'camping-wagons-utility-carts',
  sort_order = 40,
  name_en = 'Camping Wagons & Utility Carts',
  name_zh = '露营拖车与工具车'
WHERE slug = 'camping-wagons-transport';

UPDATE products
SET
  parent_slug = 'camping-wagons-utility-carts',
  sort_order = 41
WHERE slug = 'camping-wagons';

INSERT OR IGNORE INTO products (slug, parent_slug, sort_order, name_en, name_zh) VALUES
  ('camp-kitchen-hydration-gear', NULL, 50, 'Camp Kitchen & Hydration Gear', '营地厨房与饮水装备'),
  ('backpacks-storage-solutions', NULL, 60, 'Backpacks & Storage Solutions', '背包与收纳解决方案'),
  ('outdoor-lighting-utility-tools', NULL, 70, 'Outdoor Lighting & Utility Tools', '户外照明与实用工具');

UPDATE products
SET
  parent_slug = 'camp-kitchen-hydration-gear',
  sort_order = 51
WHERE slug = 'hard-cooler-boxes';

UPDATE products
SET
  sort_order = 80,
  name_en = 'Hiking & Trekking Gear',
  name_zh = '徒步与登山装备'
WHERE slug = 'hiking-trekking-gear';

UPDATE products
SET
  parent_slug = 'hiking-trekking-gear',
  sort_order = 81
WHERE slug = 'trekking-poles';
