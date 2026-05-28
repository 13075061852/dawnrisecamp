UPDATE products
SET
  sort_order = 10,
  name_en = 'Tents & Shelter Systems',
  name_zh = '帐篷与遮蔽系统',
  parent_slug = NULL
WHERE slug = 'tents-shelter-systems';

DELETE FROM products
WHERE slug IN (
  'camping-tarps',
  'car-awnings',
  'camping-tents',
  'tarps-canopies',
  'tent-shelter-accessories',
  'portable-quick-setup-waterproof-camping-tent',
  'stormproof-lightweight-single-hiking-tent',
  'large-capacity-two-room-camping-tent',
  'quick-open-hybrid-canopy-camping-tent',
  'quick-open-pop-up-screen-house-gazebo',
  'portable-lycra-beach-sunshade-canopy',
  'outdoor-waterproof-sunshade-tarp-shelter',
  'aluminum-alloy-self-locking-guyline-tensioner',
  's-shaped-open-guyline-rope-buckle',
  '4mm-heavy-duty-reflective-windproof-guyline-rope',
  'high-strength-aluminum-alloy-question-mark-tent-stake',
  'solid-steel-heavy-duty-tent-stake-with-glow-ring'
);

INSERT INTO products (slug, parent_slug, sort_order, name_en, name_zh) VALUES
  ('camping-tents', 'tents-shelter-systems', 11, 'Camping Tents', '露营帐篷'),
  ('portable-quick-setup-waterproof-camping-tent', 'camping-tents', 111, 'Portable Quick-Setup Waterproof Camping Tent', '便携快搭防水露营帐篷'),
  ('stormproof-lightweight-single-hiking-tent', 'camping-tents', 112, 'Stormproof Lightweight Single Hiking Tent', '防暴雨轻量单人徒步帐篷'),
  ('large-capacity-two-room-camping-tent', 'camping-tents', 113, 'Large-Capacity Two-Room Camping Tent with Living Area', '大容量两室一厅露营帐篷'),
  ('quick-open-hybrid-canopy-camping-tent', 'camping-tents', 114, 'Quick-Open Hybrid Canopy Camping Tent with Detachable Shelter', '快开式天幕帐一体帐篷'),
  ('tarps-canopies', 'tents-shelter-systems', 12, 'Tarps & Canopies', '天幕与遮阳棚'),
  ('quick-open-pop-up-screen-house-gazebo', 'tarps-canopies', 121, 'Quick-Open Pop-Up Screen House Gazebo', '快开式网纱凉亭帐'),
  ('portable-lycra-beach-sunshade-canopy', 'tarps-canopies', 122, 'Portable Lycra Beach Sunshade Canopy', '便携莱卡沙滩遮阳篷'),
  ('outdoor-waterproof-sunshade-tarp-shelter', 'tarps-canopies', 123, 'Outdoor Waterproof Sunshade Tarp Shelter', '户外防水遮阳天幕'),
  ('tent-shelter-accessories', 'tents-shelter-systems', 13, 'Tent & Shelter Accessories', '帐篷与遮蔽配件'),
  ('aluminum-alloy-self-locking-guyline-tensioner', 'tent-shelter-accessories', 131, 'Aluminum Alloy Self-Locking Guyline Tensioner', '铝合金自锁风绳调节片'),
  ('s-shaped-open-guyline-rope-buckle', 'tent-shelter-accessories', 132, 'S-Shaped Open Guyline Rope Buckle', 'S形开口风绳扣'),
  ('4mm-heavy-duty-reflective-windproof-guyline-rope', 'tent-shelter-accessories', 133, '4mm Heavy-Duty Reflective Windproof Guyline Rope', '4mm 加厚反光防风绳'),
  ('high-strength-aluminum-alloy-question-mark-tent-stake', 'tent-shelter-accessories', 134, 'High-Strength Aluminum Alloy Question Mark Tent Stake', '高强度铝合金问号地钉'),
  ('solid-steel-heavy-duty-tent-stake-with-glow-ring', 'tent-shelter-accessories', 135, 'Solid Steel Heavy-Duty Tent Stake with Glow Ring', '实心钢制夜光环重型地钉');
