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
    },
    about: {
      eyebrow: "About Us",
      title: "Built for dependable sourcing.",
      body: "Dawnrise Camp works with overseas buyers on camping gear development, stable production, and export-ready fulfillment.",
      cta: "Watch Company Video",
      videoError: "Company video will appear here after the R2 asset is uploaded.",
      features: ["OEM / ODM Support", "Quality Inspection", "Global Shipping"],
    },
    products: {
      eyebrow: "Products",
      title: "Product Categories",
      cta: "Request Catalog",
    },
    news: {
      eyebrow: "News",
      title: "Company updates and product progress.",
      readMore: "Read More",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Start your sourcing conversation.",
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
    },
    about: {
      eyebrow: "关于我们",
      title: "让采购更稳定、更放心。",
      body: "Dawnrise Camp 面向海外客户提供露营装备开发、稳定生产与出口交付支持。",
      cta: "观看企业视频",
      videoError: "将企业视频上传到 R2 后，会在这里自动显示。",
      features: ["OEM / ODM 支持", "品质检验", "全球发运"],
    },
    products: {
      eyebrow: "产品",
      title: "产品分类",
      cta: "索取产品目录",
    },
    news: {
      eyebrow: "新闻",
      title: "了解我们的新品与工厂动态。",
      readMore: "查看详情",
    },
    contact: {
      eyebrow: "联系我们",
      title: "开启您的采购沟通。",
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
