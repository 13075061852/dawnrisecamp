import { fallbackProducts as legacyFallbackProducts, productProfiles as legacyProductProfiles } from "./content";
import type { Locale, ProductNode, ProductProfile } from "./types";

const tentsTree: Record<Locale, ProductNode> = {
  en: {
    slug: "tents-shelter-systems",
    name: "Tents & Shelter Systems",
    children: [
      {
        slug: "camping-tents",
        name: "Camping Tents",
        children: [
          { slug: "portable-quick-setup-waterproof-camping-tent", name: "Portable Quick-Setup Waterproof Camping Tent", children: [] },
          { slug: "stormproof-lightweight-single-hiking-tent", name: "Stormproof Lightweight Single Hiking Tent", children: [] },
          { slug: "large-capacity-two-room-camping-tent", name: "Large-Capacity Two-Room Camping Tent with Living Area", children: [] },
          { slug: "quick-open-hybrid-canopy-camping-tent", name: "Quick-Open Hybrid Canopy Camping Tent with Detachable Shelter", children: [] },
        ],
      },
      {
        slug: "tarps-canopies",
        name: "Tarps & Canopies",
        children: [
          { slug: "quick-open-pop-up-screen-house-gazebo", name: "Quick-Open Pop-Up Screen House Gazebo", children: [] },
          { slug: "portable-lycra-beach-sunshade-canopy", name: "Portable Lycra Beach Sunshade Canopy", children: [] },
          { slug: "outdoor-waterproof-sunshade-tarp-shelter", name: "Outdoor Waterproof Sunshade Tarp Shelter", children: [] },
        ],
      },
      {
        slug: "tent-shelter-accessories",
        name: "Tent & Shelter Accessories",
        children: [
          { slug: "aluminum-alloy-self-locking-guyline-tensioner", name: "Aluminum Alloy Self-Locking Guyline Tensioner", children: [] },
          { slug: "s-shaped-open-guyline-rope-buckle", name: "S-Shaped Open Guyline Rope Buckle", children: [] },
          { slug: "4mm-heavy-duty-reflective-windproof-guyline-rope", name: "4mm Heavy-Duty Reflective Windproof Guyline Rope", children: [] },
          { slug: "high-strength-aluminum-alloy-question-mark-tent-stake", name: "High-Strength Aluminum Alloy Question Mark Tent Stake", children: [] },
          { slug: "solid-steel-heavy-duty-tent-stake-with-glow-ring", name: "Solid Steel Heavy-Duty Tent Stake with Glow Ring", children: [] },
        ],
      },
    ],
  },
  zh: {
    slug: "tents-shelter-systems",
    name: "帐篷与遮蔽系统",
    children: [
      {
        slug: "camping-tents",
        name: "露营帐篷",
        children: [
          { slug: "portable-quick-setup-waterproof-camping-tent", name: "便携快搭防水露营帐篷", children: [] },
          { slug: "stormproof-lightweight-single-hiking-tent", name: "防暴雨轻量单人徒步帐篷", children: [] },
          { slug: "large-capacity-two-room-camping-tent", name: "大容量两室一厅露营帐篷", children: [] },
          { slug: "quick-open-hybrid-canopy-camping-tent", name: "快开式天幕帐一体帐篷", children: [] },
        ],
      },
      {
        slug: "tarps-canopies",
        name: "天幕与遮阳棚",
        children: [
          { slug: "quick-open-pop-up-screen-house-gazebo", name: "快开式网纱凉亭帐", children: [] },
          { slug: "portable-lycra-beach-sunshade-canopy", name: "便携莱卡沙滩遮阳篷", children: [] },
          { slug: "outdoor-waterproof-sunshade-tarp-shelter", name: "户外防水遮阳天幕", children: [] },
        ],
      },
      {
        slug: "tent-shelter-accessories",
        name: "帐篷与遮蔽配件",
        children: [
          { slug: "aluminum-alloy-self-locking-guyline-tensioner", name: "铝合金自锁风绳调节片", children: [] },
          { slug: "s-shaped-open-guyline-rope-buckle", name: "S形开口风绳扣", children: [] },
          { slug: "4mm-heavy-duty-reflective-windproof-guyline-rope", name: "4mm 加厚反光防风绳", children: [] },
          { slug: "high-strength-aluminum-alloy-question-mark-tent-stake", name: "高强度铝合金问号地钉", children: [] },
          { slug: "solid-steel-heavy-duty-tent-stake-with-glow-ring", name: "实心钢制夜光环重型地钉", children: [] },
        ],
      },
    ],
  },
};

const folder = "/images/Tents & Shelter Systems";

const tentProfilesEn: Record<string, ProductProfile> = {
  "portable-quick-setup-waterproof-camping-tent": profile(
    "portable-quick-setup-waterproof-camping-tent",
    "TSS-CT-001",
    "A quick-setup waterproof camping tent with blackout sun protection and a portable storage format.",
    ["Quick setup", "Blackout sun protection", "Double-layer rain protection", "210D Oxford fabric"],
    "Designed for fast outdoor assembly.",
    "This camping tent combines a fast setup structure, mosquito-proof mesh windows, reinforced fiberglass poles, and a compact pack-down for camping, hiking, and outdoor travel programs.",
    [
      ["Fabric", "210D waterproof Oxford fabric"],
      ["Coating", "Blackout sun protection coating"],
      ["Frame", "8.5 mm high-strength fiberglass poles"],
      ["Window", "Mosquito-proof mesh"],
    ],
    `${folder}/Camping Tents/1-帐篷`,
    3,
  ),
  "stormproof-lightweight-single-hiking-tent": profile(
    "stormproof-lightweight-single-hiking-tent",
    "TSS-CT-002",
    "A lightweight single hiking tent built for heavy rain protection and compact carrying.",
    ["PU3000 mm waterproofing", "Fully seam-taped", "Lightweight hiking format", "B3 mosquito mesh"],
    "Rain protection for solo routes.",
    "The tent uses small-grid Oxford fabric, double-layer PU waterproof coating, fully sealed seams, and a high-strength fiber composite frame for hiking, trekking, and solo camping.",
    [
      ["Outer tent", "Small-grid Oxford fabric with PU coating"],
      ["Inner tent", "Small-grid Oxford fabric with B3 mosquito mesh"],
      ["Seams", "Fully seam-taped and glue-sealed"],
      ["Frame", "High-strength fiber composite poles"],
    ],
    `${folder}/Camping Tents/2-帐篷`,
    3,
  ),
  "large-capacity-two-room-camping-tent": profile(
    "large-capacity-two-room-camping-tent",
    "TSS-CT-003",
    "A spacious two-room family tent with an integrated living area and extended awning.",
    ["Two-room layout", "Extended front awning", "Panoramic mesh skylight", "Reinforced steel frame"],
    "More room for family camping.",
    "This large-capacity tent creates separate sleeping and living zones with high-density mesh ventilation, sun and rain resistance, a six-leg support structure, and a built-in lantern hook.",
    [
      ["Outer tent", "210D Oxford fabric with PU2000 mm coating"],
      ["Inner tent", "210D Oxford fabric with transparent mesh"],
      ["Floor", "Thickened wear-resistant PE, 3000 mm hydrostatic pressure"],
      ["Frame", "Reinforced heavy-duty steel tube frame"],
    ],
    `${folder}/Camping Tents/3-帐篷`,
    3,
  ),
  "quick-open-hybrid-canopy-camping-tent": profile(
    "quick-open-hybrid-canopy-camping-tent",
    "TSS-CT-004",
    "A quick-open hybrid canopy and camping tent system with a detachable shelter structure.",
    ["Canopy and tent hybrid", "Automatic quick-open frame", "Detachable double-layer cover", "Heat-sealed seams"],
    "Flexible shade and sleeping space.",
    "The combined canopy and tent can be used together or separately, with UV-protective black-coated fabric, zipper connection, mesh windows, and reinforced pull loops for outdoor stability.",
    [
      ["Fabric", "UV-protective black-coated fabric"],
      ["Top cover", "Double-layer detachable cover"],
      ["Mesh", "Thickened high-density anti-mosquito mesh"],
      ["Frame", "Automatic quick-open support frame"],
    ],
    `${folder}/Camping Tents/4-帐篷`,
    3,
  ),
  "quick-open-pop-up-screen-house-gazebo": profile(
    "quick-open-pop-up-screen-house-gazebo",
    "TSS-CT-005",
    "A no-assembly pop-up screen house gazebo for ventilated insect-protected outdoor shelter.",
    ["No-assembly quick open", "Eight mesh windows", "360 x 360 cm shelter", "Accessory set included"],
    "Fast shelter with panoramic airflow.",
    "The screen house uses high-density breathable mesh, dual-way zippers, high-strength fiber poles, stakes, guy ropes, sandbags, and a support frame for campsite and garden shelter programs.",
    [
      ["Outer fabric", "300D Oxford fabric"],
      ["Mesh", "High-density breathable anti-mosquito mesh"],
      ["Frame", "High-strength fiber poles"],
      ["Accessories", "Ground stakes, guy ropes, sandbags, support frame"],
    ],
    `${folder}/Tarps & Canopies/1-天幕`,
    3,
  ),
  "portable-lycra-beach-sunshade-canopy": profile(
    "portable-lycra-beach-sunshade-canopy",
    "TSS-CT-006",
    "A portable Lycra beach canopy with stretch fabric, UV protection, and compact storage.",
    ["Stretch Lycra fabric", "UV sun protection", "Quick assembly", "Multiple colors available"],
    "Light shade for beach programs.",
    "The flexible Lycra canopy supports fast beach and outdoor setup with simple support poles, compact carry size, and a complete accessory set.",
    [
      ["Canopy fabric", "Lycra stretch fabric"],
      ["Carry bag", "Wear-resistant Oxford fabric"],
      ["Accessories", "Support poles, stakes, guy ropes, storage bag"],
      ["Best use", "Beach shade and outdoor leisure"],
    ],
    `${folder}/Tarps & Canopies/2-天幕`,
    3,
  ),
  "outdoor-waterproof-sunshade-tarp-shelter": profile(
    "outdoor-waterproof-sunshade-tarp-shelter",
    "TSS-CT-007",
    "A waterproof outdoor sunshade tarp shelter with multiple pitching modes and attachment points.",
    ["PU3000+ waterproof coating", "150D Oxford ripstop", "19 attachment points", "8 stakes and guy ropes"],
    "One tarp for many campsite layouts.",
    "The tarp shelter is built for UV resistance, rain coverage, compact storage, and flexible configurations with wear-resistant fabric and multiple hanging points.",
    [
      ["Outer fabric", "150D Oxford ripstop fabric"],
      ["Coating", "PU3000+ waterproof coating"],
      ["Setup", "Multiple pitching modes"],
      ["Accessories", "Ground stakes and guy ropes"],
    ],
    `${folder}/Tarps & Canopies/3-天幕`,
    3,
  ),
  "aluminum-alloy-self-locking-guyline-tensioner": profile(
    "aluminum-alloy-self-locking-guyline-tensioner",
    "TSS-CT-008",
    "A lightweight aluminum self-locking tensioner for quick tent guyline adjustment.",
    ["Self-locking adjustment", "One-piece die-cast aluminum", "Corrosion resistant", "Multiple sizes available"],
    "Small hardware for cleaner shelter setup.",
    "The tensioner helps adjust tent guylines and wind ropes quickly across tents, tarps, canopies, awnings, and other outdoor shelters.",
    [
      ["Material", "Aluminum alloy"],
      ["Structure", "One-piece die-cast construction"],
      ["Use", "Tent guylines and wind ropes"],
      ["Fit", "Multiple rope diameters available"],
    ],
    `${folder}/Tent & Shelter Accessories/1-配件`,
    2,
  ),
  "s-shaped-open-guyline-rope-buckle": profile(
    "s-shaped-open-guyline-rope-buckle",
    "TSS-CT-009",
    "An S-shaped open rope buckle for fast guyline adjustment and outdoor shelter setup.",
    ["S-shaped open design", "Fast rope adjustment", "One-piece aluminum alloy", "Compact and durable"],
    "Quick control for wind ropes.",
    "The buckle is easy to install and suited to tents, tarps, canopies, awnings, and outdoor wind ropes where compact adjustment hardware is needed.",
    [
      ["Material", "Aluminum alloy"],
      ["Structure", "One-piece integrated structure"],
      ["Use", "Guyline and wind rope adjustment"],
      ["Best use", "Camping and shelter setup"],
    ],
    `${folder}/Tent & Shelter Accessories/2-配件`,
    2,
    [`${folder}/Tent & Shelter Accessories/2-配件/ChatGPT Image 2026年5月27日 12_57_09.png`],
  ),
  "4mm-heavy-duty-reflective-windproof-guyline-rope": profile(
    "4mm-heavy-duty-reflective-windproof-guyline-rope",
    "TSS-CT-010",
    "A 4 mm heavy-duty reflective guyline rope for tents, tarps, and canopies.",
    ["Reflective night visibility", "16-strand nylon core", "Solid braided structure", "Custom length and color"],
    "Stronger visibility and tension support.",
    "The braided reflective rope is flexible, smooth to handle, easy to coil, and suitable for customized color, length, and packaging programs.",
    [
      ["Outer layer", "Reflective braided nylon"],
      ["Inner core", "16-strand nylon core"],
      ["Diameter", "4 mm"],
      ["Customization", "Length, color, and packaging available"],
    ],
    `${folder}/Tent & Shelter Accessories/3-配件`,
    2,
  ),
  "high-strength-aluminum-alloy-question-mark-tent-stake": profile(
    "high-strength-aluminum-alloy-question-mark-tent-stake",
    "TSS-CT-011",
    "A high-strength aluminum question mark tent stake for secure rope and guyline anchoring.",
    ["Solid aluminum alloy", "Question mark hook", "Pointed insertion tip", "Lightweight and corrosion resistant"],
    "Secure anchoring for tents and tarps.",
    "The stake combines a portable aluminum body with a hooked top for rope fixing and a pointed tip for easier ground insertion.",
    [
      ["Material", "Solid aluminum alloy"],
      ["Shape", "Question mark hook design"],
      ["Use", "Tent, tarp, and canopy anchoring"],
      ["Surface", "Corrosion-resistant finish"],
    ],
    `${folder}/Tent & Shelter Accessories/4-配件`,
    2,
  ),
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": profile(
    "solid-steel-heavy-duty-tent-stake-with-glow-ring",
    "TSS-CT-012",
    "A solid steel heavy-duty tent stake with a glow ring for stronger night-visible anchoring.",
    ["Solid steel body", "Glow ring visibility", "Sharp angled tip", "Quick-pull removal hole"],
    "Heavy-duty ground hold with night visibility.",
    "This stake is designed for hard-ground anchoring, safer handling, quick removal, and reliable use with tents, tarps, canopies, and awnings.",
    [
      ["Material", "Solid steel"],
      ["Top", "Glow ring and quick-pull hole"],
      ["Tip", "Sharp angled tip"],
      ["Use", "Heavy-duty outdoor anchoring"],
    ],
    `${folder}/Tent & Shelter Accessories/5-配件`,
    2,
  ),
};

function mergeTentsTree(locale: Locale) {
  return [
    tentsTree[locale],
    ...legacyFallbackProducts[locale].filter((item) => item.slug !== "tents-shelter-systems"),
  ];
}

function profile(
  slug: string,
  code: string,
  subtitle: string,
  highlights: string[],
  featureTitle: string,
  featureBody: string,
  specs: [string, string][],
  imageFolder: string,
  imageCount: number,
  extraImages: string[] = [],
): ProductProfile {
  const images = [
    ...Array.from({ length: imageCount }, (_, index) => `${imageFolder}/${index + 1}.png`),
    ...extraImages,
  ];
  return {
    slug,
    code,
    subtitle,
    highlights,
    featureTitle,
    featureBody,
    specs: specs.map(([label, value]) => ({ label, value })),
    gallery: {
      studio: images[0],
      lifestyle: images[1] ?? images[0],
      images,
    },
  };
}

const zhSubtitles: Record<string, string> = {
  "portable-quick-setup-waterproof-camping-tent": "快搭防水露营帐篷，具备黑胶防晒、双层防雨和便携收纳设计。",
  "stormproof-lightweight-single-hiking-tent": "适合徒步和单人露营的轻量帐篷，强调 PU3000 防水和紧凑携带。",
  "large-capacity-two-room-camping-tent": "带客厅区的大容量两室帐篷，适合家庭和多人露营。",
  "quick-open-hybrid-canopy-camping-tent": "天幕与帐篷可组合使用的快开式遮蔽系统。",
  "quick-open-pop-up-screen-house-gazebo": "免组装快开网纱凉亭帐，兼顾通风、防蚊和大面积遮蔽。",
  "portable-lycra-beach-sunshade-canopy": "便携莱卡沙滩遮阳篷，适合海滩和户外休闲遮阳。",
  "outdoor-waterproof-sunshade-tarp-shelter": "多搭建方式的防水遮阳天幕，适合营地遮阳和防雨。",
  "aluminum-alloy-self-locking-guyline-tensioner": "用于帐篷风绳快速调节的铝合金自锁调节片。",
  "s-shaped-open-guyline-rope-buckle": "S 形开口风绳扣，便于快速安装和调节。",
  "4mm-heavy-duty-reflective-windproof-guyline-rope": "4mm 加厚反光防风绳，适用于帐篷、天幕和遮阳棚。",
  "high-strength-aluminum-alloy-question-mark-tent-stake": "高强度铝合金问号地钉，用于风绳与地面固定。",
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": "带夜光环的实心钢制重型地钉，适合更强锚固需求。",
};

const zhHighlights: Record<string, string[]> = {
  "portable-quick-setup-waterproof-camping-tent": ["快速搭建", "黑胶防晒", "双层防雨", "210D 牛津布"],
  "stormproof-lightweight-single-hiking-tent": ["PU3000 防水", "全压胶接缝", "轻量徒步款", "B3 防蚊网"],
  "large-capacity-two-room-camping-tent": ["两室布局", "延伸前厅天幕", "全景网纱天窗", "加固钢管支架"],
  "quick-open-hybrid-canopy-camping-tent": ["天幕帐一体", "自动快开支架", "双层可拆顶盖", "热压防水接缝"],
  "quick-open-pop-up-screen-house-gazebo": ["免组装快开", "八面网窗", "360 x 360 cm 空间", "配件齐全"],
  "portable-lycra-beach-sunshade-canopy": ["莱卡弹力面料", "户外防晒", "快速组装", "多色可选"],
  "outdoor-waterproof-sunshade-tarp-shelter": ["PU3000+ 防水", "150D 防撕裂牛津布", "19 个挂点", "含地钉和风绳"],
  "aluminum-alloy-self-locking-guyline-tensioner": ["自锁调节", "一体压铸铝合金", "耐腐蚀", "多尺寸可选"],
  "s-shaped-open-guyline-rope-buckle": ["S 形开口", "快速调绳", "一体铝合金", "小巧耐用"],
  "4mm-heavy-duty-reflective-windproof-guyline-rope": ["夜间反光", "16 股尼龙内芯", "实心编织", "长度颜色可定制"],
  "high-strength-aluminum-alloy-question-mark-tent-stake": ["实心铝合金", "问号挂钩", "尖头易插入", "轻量耐腐蚀"],
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": ["实心钢材", "夜光环", "斜切尖头", "快拔孔设计"],
};

const zhFeatureTitles: Record<string, string> = {
  "portable-quick-setup-waterproof-camping-tent": "为快速户外搭建而设计。",
  "stormproof-lightweight-single-hiking-tent": "面向单人路线的防雨保护。",
  "large-capacity-two-room-camping-tent": "给家庭露营更多活动空间。",
  "quick-open-hybrid-canopy-camping-tent": "遮阳与睡眠空间灵活组合。",
  "quick-open-pop-up-screen-house-gazebo": "快速形成通风防蚊的户外空间。",
  "portable-lycra-beach-sunshade-canopy": "适合沙滩项目的轻量遮阳。",
  "outdoor-waterproof-sunshade-tarp-shelter": "一块天幕适配多种营地布局。",
  "aluminum-alloy-self-locking-guyline-tensioner": "让风绳调节更利落的小五金。",
  "s-shaped-open-guyline-rope-buckle": "快速控制风绳松紧。",
  "4mm-heavy-duty-reflective-windproof-guyline-rope": "提升夜间可见度与拉力支撑。",
  "high-strength-aluminum-alloy-question-mark-tent-stake": "帐篷和天幕的稳定锚点。",
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": "重型锚固，也更容易夜间识别。",
};

const zhFeatureBodies: Record<string, string> = {
  "portable-quick-setup-waterproof-camping-tent": "该帐篷结合快搭结构、防蚊网窗、加固玻纤支架和紧凑收纳，适合露营、徒步和户外旅行采购项目。",
  "stormproof-lightweight-single-hiking-tent": "采用小格牛津布、双层 PU 防水涂层、全压胶接缝和高强度复合纤维支架，适合徒步、登山和单人露营。",
  "large-capacity-two-room-camping-tent": "通过睡眠区与客厅区分区、高密度网纱通风、六脚支撑和内置挂灯钩，为多人露营提供更完整空间。",
  "quick-open-hybrid-canopy-camping-tent": "天幕与帐篷可合并或分开使用，配备黑胶防晒面料、拉链连接、网窗和加固拉环。",
  "quick-open-pop-up-screen-house-gazebo": "使用高密度透气网纱、双向拉链、高强度纤维杆，并配地钉、风绳、沙袋和支架。",
  "portable-lycra-beach-sunshade-canopy": "弹力莱卡篷布配简洁支撑杆和完整配件套装，便于快速搭建和紧凑收纳。",
  "outdoor-waterproof-sunshade-tarp-shelter": "面料兼顾防晒、防雨、耐磨和便携收纳，19 个挂点支持多种搭建方式。",
  "aluminum-alloy-self-locking-guyline-tensioner": "适用于帐篷、天幕、遮阳棚和车边帐的风绳调节，轻量且耐腐蚀。",
  "s-shaped-open-guyline-rope-buckle": "适合帐篷、天幕、遮阳棚和户外风绳使用，安装方便，适合配件化采购。",
  "4mm-heavy-duty-reflective-windproof-guyline-rope": "反光编织绳柔韧顺滑、易收卷，可按长度、颜色和包装进行定制。",
  "high-strength-aluminum-alloy-question-mark-tent-stake": "铝合金钉身轻便耐用，问号挂钩便于固定风绳，尖头更易插入地面。",
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": "适合硬地锚固，表面顺滑，顶部快拔孔和夜光环兼顾拆卸与夜间识别。",
};

const zhSpecs: Record<string, [string, string][]> = {
  "portable-quick-setup-waterproof-camping-tent": [["面料", "210D 防水牛津布"], ["涂层", "黑胶防晒涂层"], ["支架", "8.5 mm 高强度玻纤杆"], ["窗户", "防蚊网纱"]],
  "stormproof-lightweight-single-hiking-tent": [["外帐", "小格牛津布 PU 涂层"], ["内帐", "小格牛津布 + B3 防蚊网"], ["接缝", "全压胶 / 涂胶密封"], ["支架", "高强度复合纤维杆"]],
  "large-capacity-two-room-camping-tent": [["外帐", "210D 牛津布 PU2000 mm 防泼水涂层"], ["内帐", "210D 牛津布 + 透明网纱"], ["地布", "加厚耐磨 PE，3000 mm 静水压"], ["支架", "加固重型钢管支架"]],
  "quick-open-hybrid-canopy-camping-tent": [["面料", "UV 防护黑胶面料"], ["顶盖", "双层可拆顶盖"], ["网纱", "加厚高密度防蚊网"], ["支架", "自动快开支撑架"]],
  "quick-open-pop-up-screen-house-gazebo": [["外层面料", "300D 牛津布"], ["网纱", "高密度透气防蚊网"], ["支架", "高强度纤维杆"], ["配件", "地钉、风绳、沙袋、支架"]],
  "portable-lycra-beach-sunshade-canopy": [["篷布", "莱卡弹力面料"], ["收纳袋", "耐磨牛津布"], ["配件", "支撑杆、地钉、风绳、收纳袋"], ["适用场景", "沙滩遮阳与户外休闲"]],
  "outdoor-waterproof-sunshade-tarp-shelter": [["外层面料", "150D 防撕裂牛津布"], ["涂层", "PU3000+ 防水涂层"], ["搭建", "支持多种搭建方式"], ["配件", "地钉和风绳"]],
  "aluminum-alloy-self-locking-guyline-tensioner": [["材质", "铝合金"], ["结构", "一体压铸结构"], ["用途", "帐篷风绳调节"], ["适配", "多种绳径可选"]],
  "s-shaped-open-guyline-rope-buckle": [["材质", "铝合金"], ["结构", "一体成型结构"], ["用途", "风绳调节"], ["适用场景", "露营与遮蔽搭建"]],
  "4mm-heavy-duty-reflective-windproof-guyline-rope": [["外层", "反光编织尼龙"], ["内芯", "16 股尼龙芯"], ["直径", "4 mm"], ["定制", "长度、颜色和包装可定制"]],
  "high-strength-aluminum-alloy-question-mark-tent-stake": [["材质", "实心铝合金"], ["造型", "问号挂钩设计"], ["用途", "帐篷、天幕和遮阳棚锚固"], ["表面", "耐腐蚀处理"]],
  "solid-steel-heavy-duty-tent-stake-with-glow-ring": [["材质", "实心钢"], ["顶部", "夜光环和快拔孔"], ["尖端", "斜切尖头"], ["用途", "重型户外锚固"]],
};

const tentProfilesZh: Record<string, ProductProfile> = Object.fromEntries(
  Object.entries(tentProfilesEn).map(([slug, item]) => [
    slug,
    {
      ...item,
      subtitle: zhSubtitles[slug],
      highlights: zhHighlights[slug],
      featureTitle: zhFeatureTitles[slug],
      featureBody: zhFeatureBodies[slug],
      specs: zhSpecs[slug].map(([label, value]) => ({ label, value })),
    },
  ]),
);

export const fallbackProducts: Record<Locale, ProductNode[]> = {
  en: mergeTentsTree("en"),
  zh: mergeTentsTree("zh"),
};

export const productProfiles: Record<Locale, Record<string, ProductProfile>> = {
  en: {
    ...legacyProductProfiles.en,
    ...tentProfilesEn,
  },
  zh: {
    ...legacyProductProfiles.zh,
    ...tentProfilesZh,
  },
};
