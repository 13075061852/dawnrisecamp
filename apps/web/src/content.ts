import type { Locale, NewsItem, ProductNode } from "./types";

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
      title: "Outdoor gear built for the road ahead.",
      body: "From trekking poles to camp furniture, we help global buyers source dependable outdoor products with confidence.",
      primaryCta: "Explore Products",
      secondaryCta: "Contact Us",
      points: ["Outdoor essentials", "Stable supply", "OEM / ODM support"],
    },
    featuredProducts: {
      eyebrow: "",
      title: "OUR POPULAR PRODUCTS",
      body: "",
      cta: "View All Products",
      items: [
        {
          name: "Trekking Poles",
          description: "Lightweight support for hiking, trekking, and long-distance outdoor travel.",
          highlight: "Portable / export-friendly",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "$29.90",
        },
        {
          name: "Camping Wagons",
          description: "Foldable hauling solutions for campsites, beaches, gardens, and family trips.",
          highlight: "High demand / practical utility",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "$29.90",
        },
        {
          name: "Folding Camping Chairs",
          description: "Comfort-focused seating built for leisure camping, events, and retail programs.",
          highlight: "Core furniture line",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "$29.90",
        },
        {
          name: "Outdoor Product",
          description: "Temporary placeholder product.",
          highlight: "Coming soon",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "$29.90",
        },
      ],
    },
    trekkingPole: {
      eyebrow: "TP-AL-001",
      title: "Aluminum Alloy Trekking Poles",
      subtitle: "A lightweight beginner-friendly trekking pole set built for stable support on everyday hiking routes.",
      primaryCta: "Request Quote",
      secondaryCta: "View Specifications",
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
    },
    products: {
      eyebrow: "Products",
      title: "Product Categories",
      cta: "Request Catalog",
      productLinesLabel: "product lines available",
      partOfLabel: "Part of",
    },
    news: {
      eyebrow: "News",
      title: "Company updates and product progress.",
      readMore: "Read More",
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
      title: "为远方打造可靠露营装备。",
      body: "从登山杖到露营家具，我们帮助全球买家更安心地采购稳定、可靠的户外产品。",
      primaryCta: "查看产品",
      secondaryCta: "联系我们",
      points: ["户外主力产品", "稳定供应", "支持 OEM / ODM"],
    },
    featuredProducts: {
      eyebrow: "",
      title: "热门产品",
      body: "",
      cta: "查看全部产品",
      items: [
        {
          name: "登山杖",
          description: "适合徒步、登山与长距离户外出行的轻量支撑装备。",
          highlight: "便携 / 易出口",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "29.90 美元",
        },
        {
          name: "露营拖车",
          description: "适用于营地、海滩、庭院和家庭出游的折叠运输产品。",
          highlight: "需求高 / 实用性强",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "29.90 美元",
        },
        {
          name: "折叠露营椅",
          description: "面向休闲露营、活动场景和零售渠道的舒适坐具。",
          highlight: "家具主力线",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "29.90 美元",
        },
        {
          name: "户外产品",
          description: "临时占位产品。",
          highlight: "即将更新",
          href: "/products/trekking-poles",
          imageUrl: "/images/products/trekking-poles-spec.png",
          price: "29.90 美元",
        },
      ],
    },
    trekkingPole: {
      eyebrow: "TP-AL-001",
      title: "铝合金登山杖",
      subtitle: "面向入门徒步场景的轻量双支装登山杖，兼顾稳定支撑、便携收纳与日常耐用性。",
      primaryCta: "咨询报价",
      secondaryCta: "查看参数",
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
    },
    products: {
      eyebrow: "产品",
      title: "产品分类",
      cta: "索取产品目录",
      productLinesLabel: "个产品系列",
      partOfLabel: "所属分类：",
    },
    news: {
      eyebrow: "新闻",
      title: "了解我们的新品与工厂动态。",
      readMore: "查看详情",
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
  ],
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
