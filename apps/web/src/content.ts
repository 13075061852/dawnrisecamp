import type { Locale, NewsItem, ProductNode, ProductProfile } from "./types";

export const copy = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      news: "News",
      contact: "Contact Us",
    },
    hero: {
      title: "OEM / ODM outdoor gear supplier for camping brands.",
      body: "Source camping furniture, trekking gear, wagons, coolers, and shelter products with sampling, inspection, and export-ready support.",
      primaryCta: "Explore Categories",
      secondaryCta: "Send Inquiry",
      points: ["10+ outdoor categories", "OEM / ODM development", "Inspection before shipment"],
    },
    featuredProducts: {
      eyebrow: "",
      title: "Start with high-demand outdoor categories",
      body: "",
      cta: "View All Products",
      items: [
        {
          name: "Trekking Poles",
          description: "Lightweight support for hiking, trekking, and long-distance outdoor travel.",
          highlight: "Portable / export-friendly",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.webp",
        },
        {
          name: "Camping Wagons",
          description: "Foldable hauling solutions for campsites, beaches, gardens, and family trips.",
          highlight: "High demand / practical utility",
          href: "/products/camping-wagons",
          imageUrl: "/images/products/camping-wagons-studio.webp",
        },
        {
          name: "Folding Camping Chairs",
          description: "Comfort-focused seating built for leisure camping, events, and retail programs.",
          highlight: "Core furniture line",
          href: "/products/folding-camping-chairs",
          imageUrl: "/images/products/folding-camping-chairs-studio.webp",
        },
        {
          name: "Hard Cooler Boxes",
          description: "Rugged chilled storage for campsites, picnics, and road-trip assortments.",
          highlight: "Utility anchor",
          href: "/products/hard-cooler-boxes",
          imageUrl: "/images/products/hard-cooler-boxes-studio.webp",
        },
      ],
    },
    homeSourcing: {
      title: "A calmer path from sample to shipment.",
      body: "We keep each order moving through three visible handoffs: aligned samples, controlled production, and shipment-ready checks.",
      cta: "Discuss Your Order",
      steps: [
        {
          label: "Before production",
          title: "Sample alignment",
          body: "Materials, color, packaging, and target cost are confirmed before the order moves forward.",
        },
        {
          label: "During production",
          title: "Visible checkpoints",
          body: "Key requirements stay clear while production, packing, and inspection points are coordinated.",
        },
        {
          label: "Before handoff",
          title: "Export-ready delivery",
          body: "Final checks, cartons, documents, and shipment details are prepared for buyer review.",
        },
      ],
      gallery: [
        {
          imageUrl: "/images/about/factory-inspection.png",
          alt: "Factory worker inspecting outdoor fabric",
          caption: "Sample and material checks",
        },
        {
          imageUrl: "/images/about/factory-sewing.png",
          alt: "Factory sewing line producing outdoor bags",
          caption: "Controlled production line",
        },
        {
          imageUrl: "/images/about/factory-packing.png",
          alt: "Factory team packing outdoor products for shipment",
          caption: "Packing for export handoff",
        },
      ],
    },
    trekkingPole: {
      eyebrow: "TP-AL-001",
      title: "Aluminum Alloy Trekking Poles",
      subtitle: "A lightweight beginner-friendly trekking pole set built for stable support on everyday hiking routes.",
      primaryCta: "Request Quote",
      secondaryCta: "View Specifications",
      backToProducts: "Back to Products",
      highlights: [
        "Approx. 259 g each",
        "51–110 cm adjustable length",
        "4-section telescopic storage",
        "Hidden internal lock",
      ],
      featureTitle: "Designed for easy, confident hiking.",
      featureBody:
        "TP-AL-001 balances portability, simple adjustment, and durable everyday materials for first-time hikers, retail programs, and outdoor starter kits.",
      specsTitle: "Product Details",
      specs: [
        { label: "Material", value: "Aluminum alloy shaft" },
        { label: "Handle", value: "TPR straight handle" },
        { label: "Tip", value: "Carbon steel" },
        { label: "Best use", value: "Beginner hiking" },
        { label: "Included", value: "Mud basket + tip protector" },
        { label: "Pack", value: "Set of 2" },
      ],
    },
    about: {
      eyebrow: "About Us",
      title: "Built for dependable sourcing.",
      body: "Dawnrise Camp works with overseas buyers on camping gear development, stable production, and export-ready fulfillment.",
      cta: "Watch Company Video",
      videoError: "Company video will appear here after the R2 asset is uploaded.",
      features: ["OEM / ODM Support", "Quality Inspection", "Global Shipping"],
      stats: [
        { value: "10+", label: "Core outdoor categories" },
        { value: "3-step", label: "Sampling to shipment workflow" },
        { value: "Global", label: "Buyer-oriented service" },
      ],
      pillarsTitle: "What we build around",
      pillars: [
        {
          title: "Product development",
          body: "We help refine materials, structure, packaging, and specifications so products are easier to source, sell, and repeat.",
        },
        {
          title: "Stable execution",
          body: "From sampling to bulk production, we focus on clear communication, repeatable quality, and export-ready coordination.",
        },
        {
          title: "Long-term partnership",
          body: "We work as an extension of the buyer team, helping product lines grow with fewer surprises over time.",
        },
      ],
      processTitle: "How we work",
      process: [
        {
          title: "Understand",
          body: "Confirm market, positioning, target cost, and functional requirements.",
        },
        {
          title: "Develop",
          body: "Align samples, materials, packaging, and production details before scale-up.",
        },
        {
          title: "Deliver",
          body: "Coordinate inspection, packing, documentation, and shipment for export.",
        },
      ],
      galleryTitle: "Inside the factory",
      gallery: [
        {
          imageUrl: "/images/about/factory-inspection.png",
          alt: "Factory worker inspecting outdoor fabric",
        },
        {
          imageUrl: "/images/about/factory-sewing.png",
          alt: "Factory sewing line producing outdoor bags",
        },
        {
          imageUrl: "/images/about/factory-packing.png",
          alt: "Factory team packing outdoor products for shipment",
        },
      ],
    },
    products: {
      eyebrow: "Products",
      title: "Product Categories",
      cta: "Request Catalog",
      productLinesLabel: "product lines available",
      partOfLabel: "Part of",
      searchPlaceholder: "Search products or categories",
      noResults: "No matching products found.",
      genericSubtitle:
        "A reliable outdoor product line built for buyer programs, retail assortments, and export-ready sourcing.",
      genericPrimaryCta: "Request Quote",
      genericBackCta: "Back to Products",
    },
    news: {
      eyebrow: "News",
      title: "Company updates and product progress.",
      readMore: "Read More",
      backToNews: "Back to news",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Start your sourcing conversation.",
      body: "Tell us what you are developing, sourcing, or comparing. Our team will help you move from product idea to export-ready supply.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      phone: "+86 571 8888 6688",
      addressLabel: "Office",
      address: "No. 88 Yunhe Road, Yuhang District, Hangzhou, Zhejiang, China",
      hoursLabel: "Business Hours",
      hours: "Mon–Fri · 09:00–18:00",
      mapTitle: "Visit Dawnrise Camp",
      mapCta: "Open map",
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Message",
      submit: "Send Inquiry",
      submitting: "Sending...",
      success: "Inquiry sent. We will get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      promise: "Reliable outdoor products for global buyers.",
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      products: "产品",
      news: "新闻",
      contact: "联系我们",
    },
    hero: {
      title: "面向露营品牌的 OEM / ODM 户外装备供应商。",
      body: "覆盖露营家具、徒步装备、拖车、保温箱和遮蔽类产品，支持打样、验货与出口交付。",
      primaryCta: "查看产品分类",
      secondaryCta: "发送询盘",
      points: ["10+ 户外品类", "OEM / ODM 开发", "出货前验货"],
    },
    featuredProducts: {
      eyebrow: "",
      title: "从高需求户外品类开始",
      body: "",
      cta: "查看全部产品",
      items: [
        {
          name: "登山杖",
          description: "适合徒步、登山与长距离户外出行的轻量支撑装备。",
          highlight: "便携 / 易出口",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.webp",
        },
        {
          name: "露营拖车",
          description: "适用于营地、海滩、庭院和家庭出游的折叠运输产品。",
          highlight: "需求高 / 实用性强",
          href: "/products/camping-wagons",
          imageUrl: "/images/products/camping-wagons-studio.webp",
        },
        {
          name: "折叠露营椅",
          description: "面向休闲露营、活动场景和零售渠道的舒适坐具。",
          highlight: "家具主力线",
          href: "/products/folding-camping-chairs",
          imageUrl: "/images/products/folding-camping-chairs-studio.webp",
        },
        {
          name: "硬壳保温箱",
          description: "适用于露营、野餐与自驾组合的耐用储冷产品。",
          highlight: "实用核心款",
          href: "/products/hard-cooler-boxes",
          imageUrl: "/images/products/hard-cooler-boxes-studio.webp",
        },
      ],
    },
    homeSourcing: {
      title: "从样品到出货，让链路更清晰。",
      body: "每个订单围绕三个关键交接点推进：样品确认、生产节点、出货检查，让买家知道货物正走到哪一步。",
      cta: "沟通您的订单",
      steps: [
        {
          label: "量产前",
          title: "样品确认",
          body: "材质、颜色、包装和目标成本先对齐，再进入订单执行。",
        },
        {
          label: "生产中",
          title: "节点可见",
          body: "围绕生产、包装和验货节点协调，减少过程中的不确定。",
        },
        {
          label: "交接前",
          title: "出货准备",
          body: "完成最终检查、装箱信息、单证和运输细节，方便买家复核。",
        },
      ],
      gallery: [
        {
          imageUrl: "/images/about/factory-inspection.png",
          alt: "工厂人员检查户外面料",
          caption: "样品与材料检查",
        },
        {
          imageUrl: "/images/about/factory-sewing.png",
          alt: "工厂缝制户外包袋",
          caption: "生产过程协调",
        },
        {
          imageUrl: "/images/about/factory-packing.png",
          alt: "工厂团队进行出货包装",
          caption: "出货包装交接",
        },
      ],
    },
    trekkingPole: {
      eyebrow: "TP-AL-001",
      title: "铝合金登山杖",
      subtitle: "面向入门徒步场景的轻量双支装登山杖，兼顾稳定支撑、便携收纳与日常耐用性。",
      primaryCta: "咨询报价",
      secondaryCta: "查看参数",
      backToProducts: "返回产品中心",
      highlights: [
        "单支约 259 g",
        "51–110 cm 可调长度",
        "四节伸缩收纳",
        "隐藏式内锁",
      ],
      featureTitle: "为轻松、安心的徒步体验而设计。",
      featureBody:
        "TP-AL-001 在便携性、易调节和耐用材质之间取得平衡，适合新手徒步、零售配套和户外入门产品线。",
      specsTitle: "产品详情",
      specs: [
        { label: "材质", value: "铝合金杖身" },
        { label: "手柄", value: "TPR 直柄" },
        { label: "杖尖", value: "碳钢" },
        { label: "适用场景", value: "入门徒步" },
        { label: "配件", value: "泥托 + 杖尖保护套" },
        { label: "包装", value: "2 支装" },
      ],
    },
    about: {
      eyebrow: "关于我们",
      title: "让采购更稳定、更放心。",
      body: "Dawnrise Camp 面向海外客户提供露营装备开发、稳定生产与出口交付支持。",
      cta: "观看企业视频",
      videoError: "将企业视频上传到 R2 后，会在这里自动显示。",
      features: ["OEM / ODM 支持", "品质检验", "全球发运"],
      stats: [
        { value: "10+", label: "核心户外品类" },
        { value: "3 步", label: "从打样到出货流程" },
        { value: "全球", label: "面向海外买家服务" },
      ],
      pillarsTitle: "我们长期坚持的三件事",
      pillars: [
        {
          title: "产品开发",
          body: "协助优化材质、结构、包装与参数，让产品更容易采购、销售和持续复购。",
        },
        {
          title: "稳定执行",
          body: "从样品到大货，重视清晰沟通、可重复品质与出口交付协同。",
        },
        {
          title: "长期合作",
          body: "把自己当作客户团队的一部分，帮助产品线在更少意外中持续成长。",
        },
      ],
      processTitle: "我们的合作方式",
      process: [
        {
          title: "了解需求",
          body: "确认市场、定位、目标成本与核心功能要求。",
        },
        {
          title: "开发方案",
          body: "在量产前对齐样品、材质、包装和生产细节。",
        },
        {
          title: "交付出货",
          body: "协同验货、包装、单证与出口运输安排。",
        },
      ],
      galleryTitle: "工厂实景",
      gallery: [
        {
          imageUrl: "/images/about/factory-inspection.png",
          alt: "工厂人员检查户外面料",
        },
        {
          imageUrl: "/images/about/factory-sewing.png",
          alt: "工厂缝制户外包袋",
        },
        {
          imageUrl: "/images/about/factory-packing.png",
          alt: "工厂团队进行出货包装",
        },
      ],
    },
    products: {
      eyebrow: "产品",
      title: "产品分类",
      cta: "索取产品目录",
      productLinesLabel: "个产品系列",
      partOfLabel: "所属分类：",
      searchPlaceholder: "搜索产品或分类",
      noResults: "没有找到匹配的产品。",
      genericSubtitle: "面向采购项目、零售组合与出口交付需求的可靠户外产品系列。",
      genericPrimaryCta: "咨询报价",
      genericBackCta: "返回产品中心",
    },
    news: {
      eyebrow: "新闻",
      title: "了解我们的新品与工厂动态。",
      readMore: "查看详情",
      backToNews: "返回新闻列表",
    },
    contact: {
      eyebrow: "联系我们",
      title: "开启您的采购沟通。",
      body: "无论您正在开发新品、筛选供应商，还是比较产品方案，我们都可以帮助您更快进入可执行阶段。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      phone: "+86 571 8888 6688",
      addressLabel: "办公地址",
      address: "中国浙江省杭州市余杭区运河路 88 号",
      hoursLabel: "工作时间",
      hours: "周一至周五 · 09:00–18:00",
      mapTitle: "到访 Dawnrise Camp",
      mapCta: "打开地图",
      name: "姓名",
      email: "邮箱",
      company: "公司",
      message: "需求说明",
      submit: "发送询盘",
      submitting: "发送中...",
      success: "询盘已发送，我们会尽快回复您。",
      error: "提交失败，请稍后重试。",
    },
    footer: {
      promise: "为全球买家提供可靠的户外产品。",
    },
  },
} satisfies Record<Locale, unknown>;

export const fallbackProducts: Record<Locale, ProductNode[]> = {
  en: [
    {
      slug: "hiking-trekking-gear",
      name: "Hiking & Trekking Gear",
      children: [{ slug: "trekking-poles", name: "Trekking Poles", children: [] }],
    },
    {
      slug: "camping-wagons-transport",
      name: "Camping Wagons & Transport",
      children: [{ slug: "camping-wagons", name: "Camping Wagons", children: [] }],
    },
    {
      slug: "tents-tarps-awnings",
      name: "Tents, Tarps & Awnings",
      children: [
        { slug: "camping-tarps", name: "Camping Tarps", children: [] },
        { slug: "car-awnings", name: "Car Awnings", children: [] },
      ],
    },
    {
      slug: "camping-furniture-sleeping-gear",
      name: "Camping Furniture & Sleeping Gear",
      children: [
        { slug: "folding-camping-chairs", name: "Folding Camping Chairs", children: [] },
        { slug: "inflatable-sleeping-pads", name: "Inflatable Sleeping Pads", children: [] },
        { slug: "camping-cots", name: "Camping Cots", children: [] },
      ],
    },
    {
      slug: "camp-kitchen-accessories",
      name: "Camp Kitchen & Accessories",
      children: [
        { slug: "folding-camping-tables", name: "Folding Camping Tables", children: [] },
        { slug: "hard-cooler-boxes", name: "Hard Cooler Boxes", children: [] },
      ],
    },
  ],
  zh: [
    {
      slug: "hiking-trekking-gear",
      name: "徒步与登山装备",
      children: [{ slug: "trekking-poles", name: "登山杖", children: [] }],
    },
    {
      slug: "camping-wagons-transport",
      name: "露营拖车与运输",
      children: [{ slug: "camping-wagons", name: "露营拖车", children: [] }],
    },
    {
      slug: "tents-tarps-awnings",
      name: "帐篷、天幕与车边帐",
      children: [
        { slug: "camping-tarps", name: "露营天幕", children: [] },
        { slug: "car-awnings", name: "车边帐", children: [] },
      ],
    },
    {
      slug: "camping-furniture-sleeping-gear",
      name: "露营家具与睡眠装备",
      children: [
        { slug: "folding-camping-chairs", name: "折叠露营椅", children: [] },
        { slug: "inflatable-sleeping-pads", name: "充气睡垫", children: [] },
        { slug: "camping-cots", name: "露营行军床", children: [] },
      ],
    },
    {
      slug: "camp-kitchen-accessories",
      name: "营地厨房与配件",
      children: [
        { slug: "folding-camping-tables", name: "折叠露营桌", children: [] },
        { slug: "hard-cooler-boxes", name: "硬壳保温箱", children: [] },
      ],
    },
  ],
};

export const productProfiles: Record<Locale, Record<string, ProductProfile>> = {
  en: {
    "camping-wagons": {
      slug: "camping-wagons",
      code: "WG-FD-220",
      subtitle: "A foldable utility wagon built for smoother hauling across campsites, beaches, and family trips.",
      highlights: ["120 kg load rating", "All-terrain wheels", "Quick-fold frame", "Removable liner"],
      featureTitle: "More carrying capacity, less effort.",
      featureBody:
        "WG-FD-220 balances rugged transport with compact storage, making it a versatile line for campsite logistics and outdoor retail assortments.",
      specs: [
        { label: "Frame", value: "Powder-coated steel" },
        { label: "Fabric", value: "600D polyester" },
        { label: "Capacity", value: "120 kg" },
        { label: "Wheel", value: "Wide PU all-terrain wheels" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-wagons-lifestyle.webp",
        studio: "/images/products/camping-wagons-studio.webp",
      },
    },
    "folding-camping-chairs": {
      slug: "folding-camping-chairs",
      code: "CH-LW-018",
      subtitle: "A refined low chair for relaxed camping, outdoor events, and premium leisure collections.",
      highlights: ["Walnut-tone armrests", "Compact fold", "Comfort seat angle", "Retail-ready styling"],
      featureTitle: "Comfort that looks considered.",
      featureBody:
        "CH-LW-018 gives a familiar outdoor staple a more polished posture, pairing practical portability with a warmer furniture-like feel.",
      specs: [
        { label: "Frame", value: "Steel tube" },
        { label: "Seat", value: "Canvas fabric" },
        { label: "Armrest", value: "Wood-look composite" },
        { label: "Best use", value: "Leisure camping" },
      ],
      gallery: {
        lifestyle: "/images/products/folding-camping-chairs-lifestyle.webp",
        studio: "/images/products/folding-camping-chairs-studio.webp",
      },
    },
    "inflatable-sleeping-pads": {
      slug: "inflatable-sleeping-pads",
      code: "SP-SI-040",
      subtitle: "A self-inflating sleeping pad designed for better campsite comfort without bulky packing.",
      highlights: ["Self-inflating core", "Compact carry sack", "Ribbed support surface", "Easy campsite setup"],
      featureTitle: "A softer night, packed smaller.",
      featureBody:
        "SP-SI-040 is tuned for practical comfort, helping buyers offer an accessible sleep upgrade for car camping and light travel programs.",
      specs: [
        { label: "Construction", value: "Foam-core self-inflating" },
        { label: "Surface", value: "Ribbed polyester" },
        { label: "Valve", value: "Single quick-release valve" },
        { label: "Best use", value: "Camping sleep systems" },
      ],
      gallery: {
        lifestyle: "/images/products/inflatable-sleeping-pads-lifestyle.webp",
        studio: "/images/products/inflatable-sleeping-pads-studio.webp",
      },
    },
    "camping-cots": {
      slug: "camping-cots",
      code: "CT-AL-090",
      subtitle: "A compact camping cot that keeps sleep surfaces elevated, stable, and easy to pack.",
      highlights: ["Elevated sleep deck", "Aluminum support frame", "Fast assembly", "Compact carry size"],
      featureTitle: "Stable rest above uneven ground.",
      featureBody:
        "CT-AL-090 gives campsites a cleaner, more structured sleep setup while staying manageable for storage and transport.",
      specs: [
        { label: "Frame", value: "Aluminum alloy" },
        { label: "Fabric", value: "Oxford polyester" },
        { label: "Load", value: "150 kg" },
        { label: "Pack", value: "Carry bag included" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-cots-lifestyle.webp",
        studio: "/images/products/camping-cots-studio.webp",
      },
    },
    "camping-tarps": {
      slug: "camping-tarps",
      code: "TP-SH-300",
      subtitle: "A versatile tarp shelter for shade, rain coverage, and adaptable campsite layouts.",
      highlights: ["Large shade area", "Reinforced corners", "Multi-pitch setup", "Weather-ready fabric"],
      featureTitle: "One shelter, many camp layouts.",
      featureBody:
        "TP-SH-300 supports flexible pitching styles, giving outdoor assortments a highly usable shelter product with broad seasonal appeal.",
      specs: [
        { label: "Fabric", value: "150D ripstop polyester" },
        { label: "Coating", value: "PU waterproof coating" },
        { label: "Corners", value: "Reinforced webbing loops" },
        { label: "Best use", value: "Shade and rain cover" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-tarps-lifestyle.webp",
        studio: "/images/products/camping-tarps-studio.webp",
      },
    },
    "car-awnings": {
      slug: "car-awnings",
      code: "AW-VE-250",
      subtitle: "A vehicle-mounted awning for fast roadside shade and simple overland camp setups.",
      highlights: ["Vehicle mount", "Quick deployment", "Integrated storage sleeve", "Road-trip friendly"],
      featureTitle: "Shade that travels with the vehicle.",
      featureBody:
        "AW-VE-250 extends usable camp space in minutes, making it a strong option for overland and automotive outdoor lines.",
      specs: [
        { label: "Mount", value: "Roof rack compatible" },
        { label: "Canopy", value: "Ripstop polyester" },
        { label: "Frame", value: "Aluminum support arms" },
        { label: "Best use", value: "Vehicle camping" },
      ],
      gallery: {
        lifestyle: "/images/products/car-awnings-lifestyle.webp",
        studio: "/images/products/car-awnings-studio.webp",
      },
    },
    "folding-camping-tables": {
      slug: "folding-camping-tables",
      code: "TB-RL-060",
      subtitle: "A compact roll-top table for camp kitchens, coffee setups, and lightweight outdoor dining.",
      highlights: ["Roll-top surface", "Fast pack-down", "Stable cross frame", "Warm tabletop finish"],
      featureTitle: "A small table that earns its footprint.",
      featureBody:
        "TB-RL-060 brings structure to campsite routines without adding visual weight, making it easy to pair with chairs and kitchen accessories.",
      specs: [
        { label: "Top", value: "Roll-top aluminum slats" },
        { label: "Frame", value: "Powder-coated steel" },
        { label: "Assembly", value: "Tool-free" },
        { label: "Best use", value: "Camp dining and prep" },
      ],
      gallery: {
        lifestyle: "/images/products/folding-camping-tables-lifestyle.webp",
        studio: "/images/products/folding-camping-tables-studio.webp",
      },
    },
    "hard-cooler-boxes": {
      slug: "hard-cooler-boxes",
      code: "CL-HD-035",
      subtitle: "A rugged hard cooler for chilled storage across camping, picnic, and overland use.",
      highlights: ["35 L capacity", "Heavy-duty latches", "Textured grip lid", "Long-hold insulation"],
      featureTitle: "Built to keep essentials colder, longer.",
      featureBody:
        "CL-HD-035 adds a durable utility anchor to the assortment, suited to campsites, road trips, and practical outdoor bundles.",
      specs: [
        { label: "Capacity", value: "35 L" },
        { label: "Shell", value: "Rotomolded polyethylene" },
        { label: "Latch", value: "Rubber T-latch" },
        { label: "Best use", value: "Food and drink storage" },
      ],
      gallery: {
        lifestyle: "/images/products/hard-cooler-boxes-lifestyle.webp",
        studio: "/images/products/hard-cooler-boxes-studio.webp",
      },
    },
  },
  zh: {
    "camping-wagons": {
      slug: "camping-wagons",
      code: "WG-FD-220",
      subtitle: "适用于营地、海滩与家庭出游的折叠运输拖车，兼顾承载力与便携收纳。",
      highlights: ["120 kg 承重", "全地形宽轮", "快速折叠", "可拆洗内衬"],
      featureTitle: "装得更多，拖得更轻松。",
      featureBody: "WG-FD-220 在大容量运输和紧凑收纳之间取得平衡，适合营地搬运与户外零售组合。",
      specs: [
        { label: "车架", value: "喷粉钢管" },
        { label: "面料", value: "600D 涤纶" },
        { label: "承重", value: "120 kg" },
        { label: "车轮", value: "宽幅 PU 全地形轮" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-wagons-lifestyle.webp",
        studio: "/images/products/camping-wagons-studio.webp",
      },
    },
    "folding-camping-chairs": {
      slug: "folding-camping-chairs",
      code: "CH-LW-018",
      subtitle: "适合休闲露营、户外活动与精品陈列的低座折叠椅。",
      highlights: ["木纹扶手", "便携折叠", "舒适坐姿", "更适合零售陈列"],
      featureTitle: "把舒适和质感放在一起。",
      featureBody: "CH-LW-018 让高频户外单品拥有更克制的家具感，兼顾便携性与更好的视觉完成度。",
      specs: [
        { label: "框架", value: "钢管" },
        { label: "坐面", value: "帆布面料" },
        { label: "扶手", value: "木纹复合材质" },
        { label: "适用场景", value: "休闲露营" },
      ],
      gallery: {
        lifestyle: "/images/products/folding-camping-chairs-lifestyle.webp",
        studio: "/images/products/folding-camping-chairs-studio.webp",
      },
    },
    "inflatable-sleeping-pads": {
      slug: "inflatable-sleeping-pads",
      code: "SP-SI-040",
      subtitle: "兼顾舒适度与收纳体积的自充气睡垫，适合基础露营睡眠系统。",
      highlights: ["自充气结构", "便携收纳袋", "波纹支撑面", "快速铺设"],
      featureTitle: "睡得更舒服，带得更轻巧。",
      featureBody: "SP-SI-040 为自驾露营和轻量出行提供更容易接受的舒适升级。",
      specs: [
        { label: "结构", value: "泡棉自充气" },
        { label: "表面", value: "波纹涤纶" },
        { label: "气阀", value: "单个快放气阀" },
        { label: "适用场景", value: "露营睡眠系统" },
      ],
      gallery: {
        lifestyle: "/images/products/inflatable-sleeping-pads-lifestyle.webp",
        studio: "/images/products/inflatable-sleeping-pads-studio.webp",
      },
    },
    "camping-cots": {
      slug: "camping-cots",
      code: "CT-AL-090",
      subtitle: "让睡眠面离地、更稳定、也更易收纳的便携行军床。",
      highlights: ["离地睡眠", "铝合金支架", "快速组装", "紧凑收纳"],
      featureTitle: "在不平整地面上，也能睡得更稳。",
      featureBody: "CT-AL-090 让营地睡眠更整洁有序，同时保持较好的运输与储存效率。",
      specs: [
        { label: "框架", value: "铝合金" },
        { label: "床面", value: "牛津布" },
        { label: "承重", value: "150 kg" },
        { label: "包装", value: "含便携收纳袋" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-cots-lifestyle.webp",
        studio: "/images/products/camping-cots-studio.webp",
      },
    },
    "camping-tarps": {
      slug: "camping-tarps",
      code: "TP-SH-300",
      subtitle: "适用于遮阳、防雨与多种搭建方式的露营天幕。",
      highlights: ["大面积遮蔽", "加固角位", "多种搭建", "防雨面料"],
      featureTitle: "一顶天幕，适配更多营地布局。",
      featureBody: "TP-SH-300 具备灵活搭建能力，是覆盖季节更广、适配性更强的营地遮蔽产品。",
      specs: [
        { label: "面料", value: "150D 防撕裂涤纶" },
        { label: "涂层", value: "PU 防水涂层" },
        { label: "角位", value: "加固织带环" },
        { label: "适用场景", value: "遮阳与防雨" },
      ],
      gallery: {
        lifestyle: "/images/products/camping-tarps-lifestyle.webp",
        studio: "/images/products/camping-tarps-studio.webp",
      },
    },
    "car-awnings": {
      slug: "car-awnings",
      code: "AW-VE-250",
      subtitle: "为车载露营与自驾场景准备的快速展开式车边帐。",
      highlights: ["车顶安装", "快速展开", "一体式收纳套", "适合自驾露营"],
      featureTitle: "跟着车辆一起移动的阴凉。",
      featureBody: "AW-VE-250 可在短时间内扩展营地可用空间，是车载户外产品线里的高辨识度单品。",
      specs: [
        { label: "安装", value: "兼容车顶行李架" },
        { label: "篷布", value: "防撕裂涤纶" },
        { label: "支架", value: "铝合金支撑臂" },
        { label: "适用场景", value: "车载露营" },
      ],
      gallery: {
        lifestyle: "/images/products/car-awnings-lifestyle.webp",
        studio: "/images/products/car-awnings-studio.webp",
      },
    },
    "folding-camping-tables": {
      slug: "folding-camping-tables",
      code: "TB-RL-060",
      subtitle: "适合营地厨房、咖啡冲煮和轻量餐食场景的便携卷桌。",
      highlights: ["卷式桌面", "快速收纳", "稳定交叉支架", "温润木色"],
      featureTitle: "占地不大，却很有用。",
      featureBody: "TB-RL-060 让营地生活更有秩序，也更容易与椅子、厨房配件形成完整组合。",
      specs: [
        { label: "桌面", value: "卷式铝片桌面" },
        { label: "框架", value: "喷粉钢架" },
        { label: "组装", value: "免工具" },
        { label: "适用场景", value: "营地用餐与备餐" },
      ],
      gallery: {
        lifestyle: "/images/products/folding-camping-tables-lifestyle.webp",
        studio: "/images/products/folding-camping-tables-studio.webp",
      },
    },
    "hard-cooler-boxes": {
      slug: "hard-cooler-boxes",
      code: "CL-HD-035",
      subtitle: "适用于露营、野餐与自驾场景的耐用硬壳保温箱。",
      highlights: ["35 L 容量", "重型锁扣", "防滑箱盖", "长效保冷"],
      featureTitle: "让重要补给保持更久的新鲜。",
      featureBody: "CL-HD-035 为产品线补上了耐用、实用且适合组合销售的营地储冷单品。",
      specs: [
        { label: "容量", value: "35 L" },
        { label: "箱体", value: "滚塑聚乙烯" },
        { label: "锁扣", value: "橡胶 T 型锁扣" },
        { label: "适用场景", value: "食物与饮品保冷" },
      ],
      gallery: {
        lifestyle: "/images/products/hard-cooler-boxes-lifestyle.webp",
        studio: "/images/products/hard-cooler-boxes-studio.webp",
      },
    },
  },
};

export const fallbackNews: Record<Locale, NewsItem[]> = {
  en: [
    {
      slug: "trade-fair-preview",
      publishedAt: "2026-05-12",
      title: "Trade Fair Preview: New Camping Furniture Line",
      excerpt:
        "We will showcase our latest camping furniture collection for buyers seeking durable, export-ready outdoor products.",
      imageUrl: "/images/news-furniture.webp",
    },
    {
      slug: "wagon-capacity-update",
      publishedAt: "2026-04-28",
      title: "Factory Update: Expanded Wagon Assembly Capacity",
      excerpt:
        "Our wagon production line has been upgraded to support steadier bulk fulfillment and shorter lead times.",
      imageUrl: "/images/news-wagons.webp",
    },
  ],
  zh: [
    {
      slug: "trade-fair-preview",
      publishedAt: "2026-05-12",
      title: "展会预告：全新露营家具系列",
      excerpt: "我们将展示全新露营家具系列，面向需要稳定出口交付的海外客户。",
      imageUrl: "/images/news-furniture.webp",
    },
    {
      slug: "wagon-capacity-update",
      publishedAt: "2026-04-28",
      title: "工厂动态：露营拖车装配产能提升",
      excerpt: "拖车生产线已完成升级，可更稳定地支持大货订单与更短交期。",
      imageUrl: "/images/news-wagons.webp",
    },
  ],
};
