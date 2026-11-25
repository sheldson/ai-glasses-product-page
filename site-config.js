/**
 * ============================================================================
 * 网站全局配置文件 (SITE_CONFIG)
 * ----------------------------------------------------------------------------
 * 你可以在这里一站式修改所有文案、品牌信息、联系方式、产品说明、价格、起订量(MOQ)、
 * 图片路径、客户评价和新闻文章，无需修改 HTML 或 CSS 代码！
 *
 * 【如何开启/显示产品价格】
 * 将下方 pricing.showPrices 改为 true，即可在首页热销产品卡片上直接展示价格与起订量。
 * 保持 false 则与原站 B2B 询盘风格完全一致（点击产品卡片查看详情时依然可看到价格与参数）。
 * ============================================================================
 */

window.SITE_CONFIG = {
  // 1. 品牌与基础信息
  brand: {
    pageTitle: "AISmart Technology Co.,Ltd | Smart Ring & Smart Glasses Manufacturer | OEM/ODM Wearable Devices",
    name: "AISmart",
    companyName: "AISmart Technology Co.,Ltd",
    contactPerson: "Iris Kuang",
    // 如果你有自己的 Logo 图片，填入路径如 "assets/images/my-logo.jpg"；留空则使用内置矢量 Logo
    logoImage: "",
    phone: "+86 13575128559",
    whatsapp: "+86 13575128559",
    emails: ["dearsonethel@gmail.com", "Chinaaismart@gmail.com"],
    wechatId: "15675449128",
    // 如果你有自己的微信二维码图片，填入路径如 "assets/images/wechat-qr.jpg"；留空则使用内置占位二维码
    wechatQrImage: "",
    address: "2F, A2 building, the first Industrial Road of Xinwei Community, Fuyong street, Bao'an District, Shenzhen City, China",
    copyright: "© 2026 AISmart Technology Co.,Ltd All rights reserved",
    socials: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com"
    }
  },

  // 2. 价格与询盘配置（改为 true 即可在首页卡片直接显示价格）
  pricing: {
    showPrices: false,        // 设为 true 将在首页热销产品卡片直接展示价格与 MOQ
    currencySymbol: "$",      // 货币符号，如 "$" 或 "¥"
    defaultQuoteQty: 10       // 点击 "Inquire Now" 默认加入询盘清单的数量
  },

  // 3. 顶部多语言列表（与原站 11 种国旗一致）
  languages: [
    { code: "ar", label: "Arabic", native: "العربية" },
    { code: "zh-CN", label: "Chinese (Simplified)", native: "简体中文" },
    { code: "nl", label: "Dutch", native: "Nederlands" },
    { code: "en", label: "English", native: "English" },
    { code: "fr", label: "French", native: "Français" },
    { code: "de", label: "German", native: "Deutsch" },
    { code: "it", label: "Italian", native: "Italiano" },
    { code: "ja", label: "Japanese", native: "日本語" },
    { code: "pt", label: "Portuguese", native: "Português" },
    { code: "ru", label: "Russian", native: "Русский" },
    { code: "es", label: "Spanish", native: "Español" }
  ],

  // 4. 导航与 All Products 下拉大菜单 (Mega Menu)
  megaMenu: [
    {
      id: "smart-glasses",
      name: "Smart Glasses",
      items: [
        { name: "Optical Waveguide AR Glasses", image: "assets/images/prod-g3pro.jpg", targetProductId: "g3pro" },
        { name: "Monocular AR Smart Glasses", image: "assets/images/prod-m12.jpg", targetProductId: "m12" },
        { name: "AI Camera Smart Glasses", image: "assets/images/prod-m10.jpg", targetProductId: "m10" },
        { name: "Live Streaming POV Glasses", image: "assets/images/prod-ag188.jpg", targetProductId: "ag188" }
      ]
    },
    {
      id: "smart-rings",
      name: "Smart Rings",
      items: [
        { name: "AI Recording Smart Ring", image: "assets/images/prod-sr116.jpg", targetProductId: "sr116" },
        { name: "Vibration Alert Health Ring", image: "assets/images/prod-sy15.jpg", targetProductId: "sy15" },
        { name: "TFT Touch Display Ring", image: "assets/images/prod-sr16.jpg", targetProductId: "sr16" },
        { name: "ECG Stainless Steel Ring", image: "assets/images/prod-tk30.jpg", targetProductId: "tk30" }
      ]
    },
    {
      id: "smart-bands",
      name: "Smart Bands",
      items: [
        { name: "Screenless Health Band", image: "assets/images/cat-bands.jpg", targetCategory: "smart-bands" },
        { name: "Sleep & HRV Recovery Band", image: "assets/images/cat-bands.jpg", targetCategory: "smart-bands" }
      ]
    },
    {
      id: "charging-cases",
      name: "Charging Cases for Smart Rings",
      items: [
        { name: "Transparent Portable Case", image: "assets/images/cat-cases.jpg", targetCategory: "charging-cases" },
        { name: "Magnetic Fast-Charge Case", image: "assets/images/cat-cases.jpg", targetCategory: "charging-cases" }
      ]
    }
  ],

  // 5. 首屏轮播图 (Hero Carousel - 4 屏，所有文字均可自由编辑)
  heroSlides: [
    {
      id: "slide-1",
      layout: "classic",
      title: "YOUR WORLD,\nCONNECTED.",
      subtitle: "Smart AR Glasses & Biometric Ring |\nThe Future at Your Command",
      calloutTop: "AR Vision & AI Assistant",
      calloutBottom: "Health Tracking &\nGesture Control",
      image: "assets/images/hero-1.jpg"
    },
    {
      id: "slide-2",
      layout: "bullets",
      title: "SMART WEARABLES",
      subtitle: "Smart Glasses & Smart Rings",
      bullets: [
        { icon: "heart", text: "Health Monitoring" },
        { icon: "activity", text: "Activity Tracking" },
        { icon: "hand", text: "Hands-Free" },
        { icon: "phone", text: "Hands-Free Calls" }
      ],
      image: "assets/images/hero-2.jpg"
    },
    {
      id: "slide-3",
      layout: "classic",
      title: "SYNCED.\nSEAMLESS.\nSUPERIOR.",
      subtitle: "Orchestrate Your Digital Life Across All Devices",
      calloutTop: "Multi-Device Ecosystem",
      calloutBottom: "Real-Time AI Sync",
      image: "assets/images/hero-3.jpg"
    },
    {
      id: "slide-4",
      layout: "classic",
      title: "NEXT-GEN\nOPTICAL AR.",
      subtitle: "Binocular Waveguide Eyewear & OEM/ODM Solutions",
      calloutTop: "Ultra-Light 38g Frame",
      calloutBottom: "CE / FCC / RoHS Ready",
      image: "assets/images/hero-4.jpg"
    }
  ],

  // 6. 关于我们 (About Us)
  about: {
    badge: "About Us",
    paragraphs: [
      "AISmart Technology Co.,Ltd, we're redefining wearable technology by merging cutting-edge AI innovation with timeless fashion. We specialize in premium smart glasses, smart rings, and smart bands that don't just track your life—they elevate it.",
      "Gone are the days of clunky, one-size-fits-all wearables. Our products are meticulously designed to be ultra-lightweight, comfortable, and effortlessly stylish, blending seamlessly into any outfit or occasion. From crystal-encrusted smart rings to sleek audio glasses, we create devices that are as much a fashion statement as they are a tech essential.",
      "As a nimble, customer-centric manufacturer, we offer flexible OEM/ODM services tailored to your brand's vision. With strict quality control and fast turnaround times, we help you bring exceptional smart wearables to market quickly and efficiently."
    ],
    features: [
      {
        icon: "rd",
        title: "R&D & Customization Capability",
        description: "In-house design and engineering team supports custom molds, logo branding and tailored specifications to meet your unique project requirements."
      },
      {
        icon: "service",
        title: "Customized Service & Fast Support",
        description: "Low MOQ, fast prototyping and dedicated account managers to support your projects from design to delivery."
      }
    ],
    factoryImage: "assets/images/about-factory.jpg",
    // 可替换为你自己的工厂宣传片 MP4 路径或外链；留空则弹出内置视频预览说明
    videoUrl: "",
    videoCaption: "AISmart Shenzhen Smart Wearables Manufacturing Facility & Cleanroom Line",
    labImage: "assets/images/about-lab.jpg",
    certCard: {
      title: "Trusted & Certified Manufacturer",
      description: "We provide custom ODM & OEM solutions for smart rings and smart glasses. Backed by complete industry-standard certifications, we build long-term win-win partnerships with global brand clients."
    }
  },

  // 7. 产品系列 (Discover Our Signature Series)
  signatureSeries: {
    bannerTitle: "Discover Our Signature Series",
    categories: [
      {
        id: "smart-glasses",
        title: "Smart Glasses",
        image: "assets/images/cat-glasses.jpg"
      },
      {
        id: "smart-rings",
        title: "Smart Rings",
        image: "assets/images/cat-rings.jpg"
      },
      {
        id: "smart-bands",
        title: "Smart Bands",
        image: "assets/images/cat-bands.jpg"
      },
      {
        id: "charging-cases",
        title: "Charging case for Smart rings",
        image: "assets/images/cat-cases.jpg"
      }
    ]
  },

  // 8. 热销产品 (Bestselling Products — 8 款产品，均可自由修改名称、说明、价格、起订量、参数和图片)
  bestselling: {
    title: "Bestselling Products",
    subtitle: "Our most popular OEM/ODM products, ready for bulk orders and tailored modifications.",
    backdropImage: "assets/images/bestselling-bg.jpg",
    products: [
      {
        id: "g3pro",
        sku: "G3pro",
        category: "smart-glasses",
        title: "Binocular Optical Waveguide AR Smart Glasses with 20MP Sony Camera & Real-Time AI Translation",
        shortDesc: "Dual-eye diffractive optical waveguide display with 20MP Sony sensor, real-time 100+ language teleprompter & AI voice assistant.",
        price: "189.00",
        comparePrice: "239.00",
        moq: "MOQ 50 pcs",
        hasVideo: true,
        image: "assets/images/prod-g3pro.jpg",
        specs: [
          { label: "Display", value: "Binocular Micro-LED Optical Waveguide" },
          { label: "Camera", value: "20MP Sony IMX Sensor, 1080P EIS" },
          { label: "AI Features", value: "ChatGPT / Real-Time Translation / Teleprompter" },
          { label: "Weight", value: "42g Ultra-Lightweight Frame" },
          { label: "Customization", value: "Logo, Packaging, SDK & App White-Label" }
        ]
      },
      {
        id: "m12",
        sku: "M12",
        category: "smart-glasses",
        title: "Monocular Optical Waveguide AR Smart Glasses with camera for Navigation & Smart Prompts",
        shortDesc: "Single-eye high-brightness waveguide AR glasses engineered for everyday all-day wear, turn-by-turn navigation, and instant notifications.",
        price: "145.00",
        comparePrice: "179.00",
        moq: "MOQ 50 pcs",
        hasVideo: true,
        image: "assets/images/prod-m12.jpg",
        specs: [
          { label: "Display", value: "Monocular Waveguide (1500 nits peak)" },
          { label: "Camera", value: "12MP First-Person HD Capture" },
          { label: "Battery", value: "Up to 8 Hours Continuous Use" },
          { label: "Weight", value: "38g Prescription-Ready Frame" },
          { label: "Customization", value: "OEM Colorways, Lens Tint & Firmware" }
        ]
      },
      {
        id: "m10",
        sku: "M10",
        category: "smart-glasses",
        title: "ChatGPT 20MP AI Smart Glasses, 2026 New 20MP Ultra HD AI Smart Eyewear with Open-Ear Audio",
        shortDesc: "Classic everyday optical frame housing a 20MP ultra-HD POV camera, dual directional open-ear speakers, and one-tap multimodal AI.",
        price: "68.00",
        comparePrice: "89.00",
        moq: "MOQ 100 pcs",
        hasVideo: true,
        image: "assets/images/prod-m10.jpg",
        specs: [
          { label: "Camera", value: "20MP Photo / 2K Video Stabilization" },
          { label: "Audio", value: "Dual Directional Open-Ear Speakers + ENC Mic" },
          { label: "Connectivity", value: "Bluetooth 5.4 + Wi-Fi Fast Transfer" },
          { label: "Storage", value: "32GB Built-In Flash Memory" },
          { label: "Water Resistance", value: "IP54 Daily Splash Proof" }
        ]
      },
      {
        id: "ag188",
        sku: "AG188",
        category: "smart-glasses",
        title: "Live Streaming Smart Glasses with Camera & Audio – AI Wearable POV Sunglasses",
        shortDesc: "Polarized UV400 smart sunglasses built for hands-free outdoor live streaming, vlogging, cycling, and crystal-clear Bluetooth calling.",
        price: "59.00",
        comparePrice: "78.00",
        moq: "MOQ 100 pcs",
        hasVideo: false,
        image: "assets/images/prod-ag188.jpg",
        specs: [
          { label: "Lenses", value: "UV400 Polarized Gradient Lenses (Interchangeable)" },
          { label: "Streaming", value: "Direct RTMP / App POV Live Broadcast" },
          { label: "Microphones", value: "Dual Wind-Noise Reduction Mics" },
          { label: "Charging", value: "Magnetic Fast Charge (45 mins full)" },
          { label: "Certifications", value: "CE, FCC, RoHS, UN38.3" }
        ]
      },
      {
        id: "sr116",
        sku: "SR116",
        category: "smart-rings",
        title: "Recording Smart Ring with AI Transcription & Translation – Titanium Voice Wearable",
        shortDesc: "Ultra-thin titanium smart ring featuring one-touch discreet voice recording, AI meeting summaries, and 24/7 biometric health tracking.",
        price: "36.00",
        comparePrice: "49.00",
        moq: "MOQ 100 pcs",
        hasVideo: true,
        image: "assets/images/prod-sr116.jpg",
        specs: [
          { label: "Material", value: "Aerospace-Grade Matte Titanium Alloy" },
          { label: "AI Voice", value: "Built-in MEMS Mic + AI Summary & Translation" },
          { label: "Health Sensors", value: "HR, SpO2, Sleep Staging, Stress" },
          { label: "Waterproof", value: "5ATM / IP68 Swim-Ready" },
          { label: "Sizes", value: "US Sizes #7 – #13" }
        ]
      },
      {
        id: "sy15",
        sku: "SY15",
        category: "smart-rings",
        title: "Smart Wearable Ring with Vibration Alert & 24/7 Health Monitoring – OEM/ODM Ready",
        shortDesc: "Sleek fashion-forward smart ring with gentle haptic vibration alerts for calls, alarms, sedentary reminders, and cycle/sleep insights.",
        price: "28.00",
        comparePrice: "39.00",
        moq: "MOQ 100 pcs",
        hasVideo: true,
        image: "assets/images/prod-sy15.jpg",
        specs: [
          { label: "Haptics", value: "Micro Linear Vibration Motor for Smart Alerts" },
          { label: "Sensors", value: "Optical PPG Heart Rate, SpO2, Skin Temp" },
          { label: "Battery Life", value: "5–7 Days + Portable Charging Case" },
          { label: "Finish", value: "Champagne Gold, Silver, Obsidian Black" },
          { label: "App Support", value: "iOS & Android Custom Branded App" }
        ]
      },
      {
        id: "sr16",
        sku: "SR16",
        category: "smart-rings",
        title: "Wearable Health Smart Ring With TFT Touch Display – Time, Steps & Heart Rate at a Glance",
        shortDesc: "Innovative micro-display smart ring allowing instant glanceable access to time, steps, heart rate, battery, and touch gesture control.",
        price: "32.00",
        comparePrice: "45.00",
        moq: "MOQ 100 pcs",
        hasVideo: true,
        image: "assets/images/prod-sr16.jpg",
        specs: [
          { label: "Screen", value: "Micro High-Contrast OLED/TFT Touch Display" },
          { label: "Controls", value: "Touch Swipe + Remote Camera & Short-Video Control" },
          { label: "Tracking", value: "Multi-Sport Modes, HR, Blood Oxygen, Sleep" },
          { label: "Waterproof", value: "IP68 Waterproof Rating" },
          { label: "Charging", value: "Magnetic Charging Dock / Case" }
        ]
      },
      {
        id: "tk30",
        sku: "TK30",
        category: "smart-rings",
        title: "OEM ODM Stainless Steel Smart Ring with AI ECG, Body Temperature & HRV Analytics",
        shortDesc: "Precision-machined 316L stainless steel biometric ring combining clinical-grade ECG electrodes, temperature trends, and recovery scores.",
        price: "39.00",
        comparePrice: "55.00",
        moq: "MOQ 100 pcs",
        hasVideo: false,
        image: "assets/images/prod-tk30.jpg",
        specs: [
          { label: "Material", value: "316L Brushed Stainless Steel + PVD Coating" },
          { label: "Biometrics", value: "ECG + PPG + NTC Temperature + HRV" },
          { label: "Weight", value: "3.2g Featherlight Comfort Fit" },
          { label: "SDK", value: "Full BLE Protocol & iOS/Android SDK Available" },
          { label: "Warranty", value: "12-Month Manufacturer Warranty" }
        ]
      }
    ]
  },

  // 9. 定制咨询与方案设计 (Custom Consultation & Solution Design)
  consultation: {
    badge: "Custom Consultation & Solution Design",
    subtitle: "Share your smart wearable demands with us. We craft customized smart ring & smart glasses solutions matching your technical specs, budget and project schedule.",
    ctaText: "Inquire Now",
    cards: [
      {
        image: "assets/images/consult-design.jpg",
        title: "Custom Solution Design",
        description: "Share your smart wearable requirements with our team, and we will provide a tailored solution for smart rings and AI smart glasses based on your specifications, budget and timeline."
      },
      {
        image: "assets/images/consult-prototype.jpg",
        title: "Fast Prototyping & Sample Approval",
        description: "Quick turnaround for prototype development and sampling of smart wearables. Validate functions, sensors and appearance performance of smart rings & AI AR glasses before formal mass production."
      },
      {
        image: "assets/images/consult-warehouse.jpg",
        title: "Mass Production & Reliable Delivery",
        description: "Stable production capacity for smart rings and smart glasses with strict quality control. We support flexible lead times and complete global shipping arrangements for your orders."
      }
    ]
  },

  // 10. 为什么品牌选择我们 (Why Brands Choose Us)
  whyChooseUs: {
    title: "Why Brands Choose Us",
    subtitle: "Proven track record, reliable wearable-tech expertise, and client-centric support for your custom smart ring & AI glasses OEM/ODM projects.",
    cards: [
      {
        title: "Hundreds of OEM/ODM Projects",
        subLabel: "OEM/ODM Projects Delivered",
        description: "With years of focus on smart wearable hardware manufacturing, we follow international standards and support CE, FCC, RoHS and other global market certifications for smart rings, AR eyewear AI glasses, and smart bands."
      },
      {
        title: "10+ Years of Industry Expertise",
        subLabel: "Years of experience",
        description: "Deep manufacturing experience across optical waveguide integration, miniaturized PCB layout, low-power biometric sensing, and precision CNC/PVD metal craftsmanship for global consumer tech brands."
      },
      {
        title: "50+ In-House Engineering Specialists",
        subLabel: "In-House Engineering Experts",
        description: "Our dedicated in-house engineers and technicians deliver end-to-end support for smart rings, AR AI smart glasses, and smart bands—covering industrial design, sensor tuning, SDK & APP development, testing and after-sales technical assistance."
      }
    ]
  },

  // 11. 客户评价 (What Our Clients Say)
  testimonials: {
    badge: "What Our Clients Say",
    subtitle: "Trusted feedback from global partners who have chosen AISmart Technology Co.,Ltd as their smart wearable manufacturer.",
    items: [
      {
        quote: "We required ODM smart rings with custom health-tracking sensors and a minimalist metal casing for our premium brand. AISmart's R&D team collaborated closely to refine the design, and the prototype passed all durability tests on the first attempt. The mass production met our high-end positioning perfectly.",
        author: "Liam O'Connor",
        role: "Customer"
      },
      {
        quote: "Our end users love the seamless AR experience of AISmart's smart glasses, and the smart ring's health tracking features have become a daily essential. The quality is consistent, and the after-sales support is responsive.",
        author: "Elena Petrova",
        role: "Customer"
      },
      {
        quote: "Partnering with AISmart cut our go-to-market timeline in half. Their low MOQ flexibility allowed us to test two optical frame styles before scaling to 10,000 units with zero quality defects across shipments.",
        author: "Ahmed Khan",
        role: "Customer"
      },
      {
        quote: "From custom app white-labeling to CE/FCC certification documentation, their engineering account managers guided us through every milestone smoothly. Highly recommended for serious wearable brands.",
        author: "Rajiv Gupta",
        role: "Customer"
      }
    ]
  },

  // 12. 博客与新闻 (Blog & News)
  blog: {
    title: "Blog & News",
    subtitle: "Smart Wearable Tech Insights & Company Latest Updates",
    posts: [
      {
        id: "blog-1",
        date: "24 11 月, 2026",
        comments: 0,
        title: "How to Choose the Right Smart Ring Manufacturer for Your Brand",
        image: "assets/images/blog-1.jpg",
        content: "Selecting an OEM/ODM smart ring partner requires evaluating far more than unit pricing. Key technical factors include optical PPG sensor accuracy across skin tones, CNC titanium sealing for true 5ATM waterproofing, stable BLE firmware architecture, and transparent compliance with CE, FCC, and RoHS standards. Before committing to tooling, always verify sample turnaround speed, SDK documentation quality, and in-house reliability testing capabilities."
      },
      {
        id: "blog-2",
        date: "13 11 月, 2026",
        comments: 0,
        title: "Discover Our New Dual-Eye Optical Waveguide AR Smart Glasses with 20MP Sony Camera",
        image: "assets/images/blog-2.jpg",
        content: "Our flagship binocular optical waveguide AR smart glasses bring featherweight everyday aesthetics together with high-luminance micro-LED projection and a crisp 20MP Sony camera. Designed for real-time multilingual translation, hands-free navigation, teleprompting, and multimodal AI assistance, the platform is now open for global OEM/ODM customization and brand white-labeling."
      },
      {
        id: "blog-3",
        date: "5 11 月, 2026",
        comments: 0,
        title: "The 2026 Smart Wearables Blueprint: How Leading Smart Glasses Brands Are Shaping the Market",
        image: "assets/images/blog-3.jpg",
        content: "In 2026, consumers are moving rapidly from screen-heavy smartwatches toward invisible, fashion-first AI wearables. Pairing audio/camera AI smart glasses with discreet biometric smart rings creates an always-ready personal intelligence loop—delivering all-day comfort, multi-day battery life, and zero social friction."
      }
    ]
  },

  // 13. 页脚链接 (Footer)
  footer: {
    quickLinks: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" }
    ],
    productLinks: [
      { label: "Smart Glasses", category: "smart-glasses" },
      { label: "Smart Rings", category: "smart-rings" },
      { label: "Smart Bands", category: "smart-bands" },
      { label: "Charging Cases for Smart Rings", category: "charging-cases" }
    ]
  },

  // 14. 中英文常用界面词典（切换语言下拉框或国旗时生效）
  i18n: {
    en: {
      searchPlaceholder: "Search products...",
      leaveMessageBtn: "Leave a Message",
      leaveMessageBar: "Leave a message",
      navHome: "Home",
      navAllProducts: "All Products",
      navBlog: "Blog",
      navAbout: "About Us",
      navContact: "Contact",
      inquireNow: "Inquire Now",
      alreadyInQuote: "Already in quote list",
      addToQuote: "Add to quote",
      quickLinks: "Quick Links",
      productTitle: "Product",
      getInTouch: "Get in Touch Now",
      yourName: "Your Name",
      emailAddress: "Email Address",
      message: "Message",
      submitInquiry: "Submit Inquiry",
      submit: "Submit",
      support: "Support"
    },
    "zh-CN": {
      searchPlaceholder: "搜索产品...",
      leaveMessageBtn: "在线留言",
      leaveMessageBar: "在线留言 / 询盘",
      navHome: "首页",
      navAllProducts: "全部产品",
      navBlog: "新闻动态",
      navAbout: "关于我们",
      navContact: "联系我们",
      inquireNow: "立即询盘",
      alreadyInQuote: "已加入询盘清单",
      addToQuote: "加入询盘",
      quickLinks: "快速导航",
      productTitle: "产品中心",
      getInTouch: "立即联系我们",
      yourName: "您的姓名",
      emailAddress: "电子邮箱",
      message: "留言内容",
      submitInquiry: "提交询盘",
      submit: "提交留言",
      support: "技术支持"
    }
  }
};
