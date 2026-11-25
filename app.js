/**
 * AISmart B2B Wearables Webpage — Interactive Renderer & State Controller
 * Reads all editable copy, products, pricing & images from window.SITE_CONFIG.
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;
  if (!CFG) return;

  const STORAGE_KEY = "aismart_quote_basket_v1";

  const state = {
    lang: "en",
    heroIndex: 0,
    heroTimer: null,
    sigMobileIndex: 0,
    testiIndex: 0,
    testiTimer: null,
    activeCategory: null,
    activeMegaTab: CFG.megaMenu[0]?.id || "smart-glasses",
    quoteItems: loadQuoteBasket()
  };

  function loadQuoteBasket() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveQuoteBasket() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.quoteItems));
    } catch {
      // Ignore storage restrictions
    }
  }

  function t(key) {
    const dict = CFG.i18n[state.lang] || CFG.i18n.en;
    return dict[key] || CFG.i18n.en[key] || key;
  }

  /* --------------------------------------------------------------------------
     SVG Helpers (Logo, Flags, Socials, Icons, Handshake, QR)
     -------------------------------------------------------------------------- */
  function buildBrandLogoHtml() {
    if (CFG.brand.logoImage) {
      return `<img src="${CFG.brand.logoImage}" alt="${CFG.brand.name}" />`;
    }
    return `
      <svg class="brand-logo-svg" viewBox="0 0 210 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${CFG.brand.name}">
        <defs>
          <linearGradient id="ringGrad" x1="15" y1="8" x2="115" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#D1D5DB"/>
            <stop offset="50%" stop-color="#9CA3AF"/>
            <stop offset="100%" stop-color="#E5E7EB"/>
          </linearGradient>
          <linearGradient id="accentBlue" x1="58" y1="10" x2="178" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="100%" stop-color="#1D398F"/>
          </linearGradient>
        </defs>
        <ellipse cx="64" cy="46" rx="41" ry="38" stroke="url(#ringGrad)" stroke-width="5.5"/>
        <ellipse cx="64" cy="46" rx="34" ry="31" stroke="#CBD5E1" stroke-width="2"/>
        <path d="M98 32C116 28 158 26 177 32C184 34 185 45 180 56C174 68 156 71 140 69" stroke="#9CA3AF" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M55 10C72 6 92 12 102 25" stroke="url(#accentBlue)" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="96" cy="18" r="3.2" fill="#38BDF8"/>
        <text x="108" y="55" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="30" fill="#1D398F" letter-spacing="-0.5">${CFG.brand.name}</text>
      </svg>
    `;
  }

  function getSocialSvg(key) {
    const map = {
      facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>`,
      linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>`,
      tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .593.047.875.14V9.4a6.33 6.33 0 0 0-.875-.06A6.34 6.34 0 0 0 3.14 15.67a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.86-4.48V8.81a8.26 8.26 0 0 0 4.77 1.52V6.89a4.85 4.85 0 0 1-1-.2z"/></svg>`,
      youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`
    };
    return map[key] || "";
  }

  function getFlagSvg(code) {
    const flags = {
      ar: `<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#006C35"/><path d="M6 7h12M8 10h8" stroke="#FFF" stroke-width="1.4" stroke-linecap="round"/></svg>`,
      "zh-CN": `<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#DE2910"/><polygon points="5,2.5 5.8,4.9 8.2,4.9 6.2,6.3 7,8.7 5,7.2 3,8.7 3.8,6.3 1.8,4.9 4.2,4.9" fill="#FFDE00"/><circle cx="10" cy="3.2" r="0.7" fill="#FFDE00"/><circle cx="11.4" cy="4.8" r="0.7" fill="#FFDE00"/><circle cx="11.2" cy="7" r="0.7" fill="#FFDE00"/><circle cx="9.6" cy="8.4" r="0.7" fill="#FFDE00"/></svg>`,
      nl: `<svg viewBox="0 0 24 16"><rect width="24" height="5.33" fill="#AE1C28"/><rect y="5.33" width="24" height="5.34" fill="#FFF"/><rect y="10.67" width="24" height="5.33" fill="#21468B"/></svg>`,
      en: `<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#FFF" stroke-width="3"/><path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" stroke-width="1.5"/><path d="M12 0v16M0 8h24" stroke="#FFF" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#C8102E" stroke-width="3"/></svg>`,
      fr: `<svg viewBox="0 0 24 16"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#FFF"/><rect x="16" width="8" height="16" fill="#ED2939"/></svg>`,
      de: `<svg viewBox="0 0 24 16"><rect width="24" height="5.33" fill="#000"/><rect y="5.33" width="24" height="5.34" fill="#DD0000"/><rect y="10.67" width="24" height="5.33" fill="#FFCE00"/></svg>`,
      it: `<svg viewBox="0 0 24 16"><rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#FFF"/><rect x="16" width="8" height="16" fill="#CE2B37"/></svg>`,
      ja: `<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#FFF"/><circle cx="12" cy="8" r="4.5" fill="#BC002D"/></svg>`,
      pt: `<svg viewBox="0 0 24 16"><rect width="9.5" height="16" fill="#006600"/><rect x="9.5" width="14.5" height="16" fill="#FF0000"/><circle cx="9.5" cy="8" r="3" fill="#FFCC00"/></svg>`,
      ru: `<svg viewBox="0 0 24 16"><rect width="24" height="5.33" fill="#FFF"/><rect y="5.33" width="24" height="5.34" fill="#0039A6"/><rect y="10.67" width="24" height="5.33" fill="#D52B1E"/></svg>`,
      es: `<svg viewBox="0 0 24 16"><rect width="24" height="4" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/><rect y="12" width="24" height="4" fill="#AA151B"/></svg>`
    };
    return flags[code] || flags.en;
  }

  function getAboutFeatureSvg(type) {
    if (type === "service") {
      return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="17" r="6"/><path d="M14 20v-3a10 10 0 0 1 20 0v3"/><path d="M12 19h2v5h-2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z"/><path d="M34 19h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5z"/><path d="M13 36c0-5 5-8 11-8s11 3 11 8"/><rect x="17" y="31" width="14" height="9" rx="1.5" fill="#FFFFFF"/><circle cx="24" cy="35.5" r="1.2"/></svg>`;
    }
    return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="11" width="28" height="20" rx="2"/><path d="M18 37h12"/><path d="M24 31v6"/><circle cx="24" cy="21" r="4"/><path d="M24 14v2M24 26v2M17 21h2M29 21h2M19 16l1.5 1.5M27.5 24.5L29 26M29 16l-1.5 1.5M19 26l1.5-1.5"/></svg>`;
  }

  function getHeroBulletSvg(icon) {
    const map = {
      heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>`,
      activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
      hand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8a6 6 0 0 0 12 0v-3"/></svg>`,
      phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
    };
    return map[icon] || map.heart;
  }

  function getHandshakeSvg() {
    return `
      <svg class="why-handshake-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M28 8v4M17 11l2.5 3M39 11l-2.5 3"/>
        <path d="M8 22l8-4 8 6 7-5 9 4 8-3"/>
        <path d="M11 33l10 9c2 1.8 4.8 1.5 6.3-.4L37 32"/>
        <path d="M24 24l-5 5c-1.5 1.5-1.2 4 .5 5.2l8.5 5.8"/>
        <path d="M31 39l3 2.5M34 35.5l3 2.5M37 32l3 2.5M14 27l-5 6"/>
      </svg>
    `;
  }

  function getQuoteMarkSvg() {
    return `
      <svg class="testimonial-quote-mark" viewBox="0 0 52 42" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M11 6c-5.5 0-9.5 4.2-9.5 9.5 0 4.6 3.1 8.4 7.5 9.2-.6 4.7-3.4 8.6-7 11.1l2.6 2.7C11.7 34.4 18 26.8 18 16.5 18 10.3 15.2 6 11 6z"/>
        <path d="M37 6c-5.5 0-9.5 4.2-9.5 9.5 0 4.6 3.1 8.4 7.5 9.2-.6 4.7-3.4 8.6-7 11.1l2.6 2.7C37.7 34.4 44 26.8 44 16.5 44 10.3 41.2 6 37 6z"/>
      </svg>
    `;
  }

  function buildPlaceholderQrSvg() {
    if (CFG.brand.wechatQrImage) {
      return `<img src="${CFG.brand.wechatQrImage}" alt="WeChat QR Code" />`;
    }
    return `
      <svg viewBox="0 0 100 100" width="116" height="116" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#FFFFFF"/>
        <g fill="#07C160">
          <rect x="6" y="6" width="24" height="24" rx="2"/><rect x="10" y="10" width="16" height="16" fill="#FFF"/><rect x="14" y="14" width="8" height="8"/>
          <rect x="70" y="6" width="24" height="24" rx="2"/><rect x="74" y="10" width="16" height="16" fill="#FFF"/><rect x="78" y="14" width="8" height="8"/>
          <rect x="6" y="70" width="24" height="24" rx="2"/><rect x="10" y="74" width="16" height="16" fill="#FFF"/><rect x="14" y="78" width="8" height="8"/>
          <rect x="38" y="8" width="6" height="6"/><rect x="50" y="8" width="6" height="12"/><rect x="60" y="14" width="6" height="6"/>
          <rect x="38" y="22" width="12" height="6"/><rect x="56" y="26" width="10" height="6"/>
          <rect x="8" y="38" width="10" height="6"/><rect x="24" y="38" width="10" height="10"/><rect x="42" y="38" width="16" height="16" rx="3"/>
          <rect x="46" y="42" width="8" height="8" fill="#FFF"/><rect x="64" y="38" width="8" height="12"/><rect x="78" y="38" width="14" height="6"/>
          <rect x="10" y="52" width="8" height="10"/><rect x="24" y="56" width="12" height="6"/><rect x="42" y="60" width="10" height="8"/>
          <rect x="58" y="56" width="14" height="6"/><rect x="78" y="52" width="12" height="12"/>
          <rect x="38" y="74" width="8" height="18"/><rect x="52" y="72" width="12" height="8"/><rect x="70" y="70" width="10" height="10"/>
          <rect x="84" y="74" width="8" height="18"/><rect x="52" y="86" width="18" height="6"/><rect x="74" y="86" width="6" height="6"/>
        </g>
      </svg>
    `;
  }

  /* --------------------------------------------------------------------------
     Render All Sections from SITE_CONFIG
     -------------------------------------------------------------------------- */
  function renderHeader() {
    document.title = CFG.brand.pageTitle;
    const phoneDigits = CFG.brand.phone.replace(/[^\d+]/g, "");

    const topPhoneLink = document.getElementById("topPhoneLink");
    topPhoneLink.href = `tel:${phoneDigits}`;
    document.getElementById("topPhoneText").textContent = CFG.brand.phone;

    const topEmailLink = document.getElementById("topEmailLink");
    topEmailLink.href = `mailto:${CFG.brand.emails[0]}`;
    document.getElementById("topEmailText").textContent = CFG.brand.emails.join("， ");

    document.getElementById("headerSocials").innerHTML = Object.entries(CFG.brand.socials)
      .map(
        ([k, url]) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-square-btn" aria-label="${k}">${getSocialSvg(k)}</a>`
      )
      .join("");

    document.getElementById("headerLogo").innerHTML = buildBrandLogoHtml();

    // Language flags + select
    const flagGrid = document.getElementById("flagGrid");
    const langSelect = document.getElementById("languageSelect");
    flagGrid.innerHTML = CFG.languages
      .map(
        (l) =>
          `<button type="button" class="flag-btn ${l.code === state.lang ? "active" : ""}" data-lang="${l.code}" title="${l.label}">${getFlagSvg(l.code)}</button>`
      )
      .join("");

    langSelect.innerHTML = CFG.languages
      .map((l) => `<option value="${l.code}" ${l.code === state.lang ? "selected" : ""}>${l.label}</option>`)
      .join("");

    // Dock & WeChat
    document.getElementById("dockPhoneBtn").href = `tel:${phoneDigits}`;
    document.getElementById("dockEmailBtn").href = `mailto:${CFG.brand.emails[0]}`;
    document.getElementById("dockWhatsappBtn").href = `https://wa.me/${CFG.brand.whatsapp.replace(/[^\d]/g, "")}`;
    document.getElementById("wechatQrBox").innerHTML = buildPlaceholderQrSvg();
    document.getElementById("wechatIdText").textContent = CFG.brand.wechatId;
  }

  function renderMegaMenu() {
    const tabsEl = document.getElementById("megaMenuTabs");
    const gridEl = document.getElementById("megaMenuGrid");

    tabsEl.innerHTML = CFG.megaMenu
      .map(
        (cat) => `
        <button type="button" class="mega-tab-btn ${cat.id === state.activeMegaTab ? "active" : ""}" data-mega-tab="${cat.id}">
          <span>${cat.name}</span>
          <span>&rsaquo;</span>
        </button>
      `
      )
      .join("");

    const currentCat = CFG.megaMenu.find((c) => c.id === state.activeMegaTab) || CFG.megaMenu[0];
    gridEl.innerHTML = (currentCat?.items || [])
      .map(
        (item) => `
        <div class="mega-sub-card" data-product-id="${item.targetProductId || ""}" data-category-id="${item.targetCategory || currentCat.id}">
          <div class="mega-sub-thumb">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="mega-sub-name">${item.name}</div>
        </div>
      `
      )
      .join("");
  }

  function renderHero() {
    const track = document.getElementById("heroTrack");
    const dots = document.getElementById("heroDots");

    track.innerHTML = CFG.heroSlides
      .map((s) => {
        const isBullets = s.layout === "bullets";
        const bulletsHtml = isBullets && s.bullets
          ? `<ul class="hero-bullets">${s.bullets
              .map(
                (b) =>
                  `<li><span class="hero-bullet-icon">${getHeroBulletSvg(b.icon)}</span><span>${b.text}</span></li>`
              )
              .join("")}</ul>`
          : "";
        const calloutsHtml = !isBullets
          ? `${s.calloutTop ? `<div class="hero-callout-top">${s.calloutTop}</div>` : ""}
             ${s.calloutBottom ? `<div class="hero-callout-bottom">${s.calloutBottom}</div>` : ""}`
          : "";

        return `
          <div class="hero-slide ${isBullets ? "hero-slide--bullets" : ""}" style="background-image:url('${s.image}')">
            <div class="hero-slide-inner">
              <div class="hero-text-col">
                <h1 class="hero-title">${s.title}</h1>
                <p class="hero-subtitle">${s.subtitle}</p>
                ${bulletsHtml}
              </div>
              ${calloutsHtml}
            </div>
          </div>
        `;
      })
      .join("");

    dots.innerHTML = CFG.heroSlides
      .map(
        (_, i) =>
          `<button type="button" class="hero-dot ${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
      )
      .join("");
  }

  function goToHeroSlide(index) {
    const total = CFG.heroSlides.length;
    state.heroIndex = ((index % total) + total) % total;
    document.getElementById("heroTrack").style.transform = `translateX(-${state.heroIndex * 100}%)`;
    document.querySelectorAll(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === state.heroIndex);
    });
  }

  function renderAbout() {
    document.getElementById("aboutBadgeTitle").textContent = CFG.about.badge;
    document.getElementById("aboutParagraphs").innerHTML = CFG.about.paragraphs
      .map((p) => `<p>${p}</p>`)
      .join("");

    document.getElementById("aboutFeatures").innerHTML = CFG.about.features
      .map(
        (f) => `
        <div class="about-feature-item">
          <div class="about-feature-icon">${getAboutFeatureSvg(f.icon)}</div>
          <div class="about-feature-text">
            <h3>${f.title}</h3>
            <p>${f.description}</p>
          </div>
        </div>
      `
      )
      .join("");

    document.getElementById("aboutFactoryImg").src = CFG.about.factoryImage;
    document.getElementById("aboutLabImg").src = CFG.about.labImage;
    document.getElementById("aboutCertTitle").textContent = CFG.about.certCard.title;
    document.getElementById("aboutCertDesc").textContent = CFG.about.certCard.description;
  }

  function renderSignatureSeries() {
    document.getElementById("signatureBannerTitle").textContent = CFG.signatureSeries.bannerTitle;
    const grid = document.getElementById("signatureGrid");

    grid.innerHTML = CFG.signatureSeries.categories
      .map(
        (c, idx) => `
        <article class="signature-card ${idx === state.sigMobileIndex ? "mobile-active" : ""}" data-category="${c.id}">
          <div class="signature-img-wrap">
            <img src="${c.image}" alt="${c.title}" loading="lazy" />
          </div>
          <h3 class="signature-card-title">${c.title}</h3>
        </article>
      `
      )
      .join("");

    updateSigFraction();
  }

  function updateSigFraction() {
    const total = CFG.signatureSeries.categories.length;
    document.getElementById("sigFraction").textContent = `${state.sigMobileIndex + 1} / ${total}`;
    document.querySelectorAll(".signature-card").forEach((card, i) => {
      card.classList.toggle("mobile-active", i === state.sigMobileIndex);
    });
  }

  function renderBestselling() {
    document.getElementById("bestsellingTitle").textContent = CFG.bestselling.title;
    document.getElementById("bestsellingSubtitle").textContent = CFG.bestselling.subtitle;
    document.getElementById("bestsellingBackdrop").style.backgroundImage = `url('${CFG.bestselling.backdropImage}')`;

    const filterBar = document.getElementById("bestsellingFilterBar");
    const activeFilterLabel = document.getElementById("activeFilterLabel");

    let list = CFG.bestselling.products;
    if (state.activeCategory) {
      const filtered = list.filter((p) => p.category === state.activeCategory);
      const catObj = CFG.signatureSeries.categories.find((c) => c.id === state.activeCategory);
      filterBar.hidden = false;
      activeFilterLabel.textContent = filtered.length
        ? `Category: ${catObj ? catObj.title : state.activeCategory} (${filtered.length})`
        : `Showing all wearables (${catObj ? catObj.title : state.activeCategory} custom OEM/ODM available on inquiry)`;
      if (filtered.length) list = filtered;
    } else {
      filterBar.hidden = true;
    }

    const grid = document.getElementById("productsGrid");
    grid.innerHTML = list
      .map((p) => {
        const inQuote = state.quoteItems.some((item) => item.id === p.id);
        const priceHtml =
          CFG.pricing.showPrices && p.price
            ? `
            <div class="product-price-row">
              <span class="product-price-now">${CFG.pricing.currencySymbol}${p.price}</span>
              ${p.comparePrice ? `<span class="product-price-old">${CFG.pricing.currencySymbol}${p.comparePrice}</span>` : ""}
              ${p.moq ? `<span class="product-moq-tag">${p.moq}</span>` : ""}
            </div>
          `
            : "";

        return `
          <article class="product-card" data-product-id="${p.id}">
            <div class="product-img-box js-open-product" data-product-id="${p.id}">
              <img src="${p.image}" alt="${p.title}" loading="lazy" />
              ${
                p.hasVideo
                  ? `<button type="button" class="product-video-badge js-product-video" data-product-id="${p.id}" aria-label="Watch product preview">
                       <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
                     </button>`
                  : ""
              }
              <button type="button" class="product-quick-quote js-add-quote" data-product-id="${p.id}">
                + ${t("addToQuote")}
              </button>
            </div>
            <h6 class="product-title-link js-open-product" data-product-id="${p.id}" title="${p.title}">${p.title}</h6>
            ${priceHtml}
            <button type="button" class="product-inquire-btn js-inquire-product ${inQuote ? "in-quote" : ""}" data-product-id="${p.id}">
              ${inQuote ? t("alreadyInQuote") : t("inquireNow")}
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderConsultation() {
    document.getElementById("consultBadgeTitle").textContent = CFG.consultation.badge;
    document.getElementById("consultSubtitle").textContent = CFG.consultation.subtitle;
    document.getElementById("consultCtaBtn").textContent = CFG.consultation.ctaText;

    document.getElementById("consultationGrid").innerHTML = CFG.consultation.cards
      .map(
        (c) => `
        <article class="consult-card">
          <img src="${c.image}" alt="${c.title}" class="consult-card-img" loading="lazy" />
          <h3>${c.title}</h3>
          <p>${c.description}</p>
        </article>
      `
      )
      .join("");
  }

  function renderWhyChooseUs() {
    document.getElementById("whyTitle").textContent = CFG.whyChooseUs.title;
    document.getElementById("whySubtitle").textContent = CFG.whyChooseUs.subtitle;

    document.getElementById("whyGrid").innerHTML = CFG.whyChooseUs.cards
      .map(
        (c) => `
        <article class="why-card">
          <div class="why-card-top">
            <h3>${c.title}</h3>
            ${getHandshakeSvg()}
          </div>
          <div class="why-sublabel">${c.subLabel}</div>
          <p>${c.description}</p>
        </article>
      `
      )
      .join("");
  }

  function renderTestimonials() {
    document.getElementById("testimonialsBadgeTitle").textContent = CFG.testimonials.badge;
    document.getElementById("testimonialsSubtitle").textContent = CFG.testimonials.subtitle;

    document.getElementById("testimonialsTrack").innerHTML = CFG.testimonials.items
      .map(
        (item) => `
        <article class="testimonial-card">
          <p class="testimonial-quote">${item.quote}</p>
          <div class="testimonial-footer">
            <div>
              <div class="testimonial-author">${item.author}</div>
              <div class="testimonial-role">${item.role}</div>
            </div>
            ${getQuoteMarkSvg()}
          </div>
        </article>
      `
      )
      .join("");
  }

  function stepTestimonials(delta) {
    const isMobile = window.innerWidth <= 768;
    const perView = isMobile ? 1 : 2;
    const maxIndex = Math.max(0, CFG.testimonials.items.length - perView);
    state.testiIndex += delta;
    if (state.testiIndex > maxIndex) state.testiIndex = 0;
    if (state.testiIndex < 0) state.testiIndex = maxIndex;
    const pct = state.testiIndex * (100 / perView);
    document.getElementById("testimonialsTrack").style.transform = `translateX(-${pct}%)`;
  }

  function renderBlog() {
    document.getElementById("blogTitle").textContent = CFG.blog.title;
    document.getElementById("blogSubtitle").textContent = CFG.blog.subtitle;

    document.getElementById("blogGrid").innerHTML = CFG.blog.posts
      .map(
        (post) => `
        <article class="blog-card" data-blog-id="${post.id}">
          <div class="blog-img-wrap">
            <img src="${post.image}" alt="${post.title}" loading="lazy" />
          </div>
          <div class="blog-meta">
            <span class="blog-date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              ${post.date}
            </span>
            <span class="blog-comments">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              ${post.comments}
            </span>
          </div>
          <h3>${post.title}</h3>
        </article>
      `
      )
      .join("");
  }

  function renderFooter() {
    document.getElementById("footerLogoBox").innerHTML = buildBrandLogoHtml();
    document.getElementById("footerCompanyMeta").innerHTML = `
      <div class="footer-muted-line">${CFG.brand.contactPerson}</div>
      <div class="footer-muted-line">${CFG.brand.companyName}</div>
      <div class="footer-bold-line">E-mail:${CFG.brand.emails.join("<br/>")}</div>
      <div class="footer-bold-line">Tel:${CFG.brand.phone}</div>
      <div class="footer-bold-line">WhatsApp: ${CFG.brand.whatsapp}</div>
      <div class="footer-bold-line">${CFG.brand.address}</div>
    `;

    document.getElementById("footerQuickLinks").innerHTML = CFG.footer.quickLinks
      .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
      .join("");

    document.getElementById("footerProductLinks").innerHTML = CFG.footer.productLinks
      .map((l) => `<li><a href="#bestselling" class="js-filter-category" data-category="${l.category}">${l.label}</a></li>`)
      .join("");

    document.getElementById("footerCopyright").textContent = CFG.brand.copyright;
  }

  /* --------------------------------------------------------------------------
     Quote Basket & Leave a Message Drawer
     -------------------------------------------------------------------------- */
  function syncQuoteUI() {
    saveQuoteBasket();
    const totalQty = state.quoteItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

    const fab = document.getElementById("quoteBasketFab");
    const fabBadge = document.getElementById("quoteFabBadge");
    const mobileBadge = document.getElementById("mobileQuoteBadge");

    if (totalQty > 0) {
      fab.hidden = false;
      fabBadge.textContent = totalQty;
      mobileBadge.hidden = false;
      mobileBadge.textContent = totalQty;
    } else {
      fab.hidden = true;
      mobileBadge.hidden = true;
    }

    const listEl = document.getElementById("drawerQuoteItems");
    listEl.innerHTML = state.quoteItems
      .map(
        (item) => `
        <div class="quote-item-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" />
          <div class="quote-item-info">
            <div class="quote-item-title" title="${item.title}">${item.title}</div>
            <div class="quote-qty-row">
              <span>Quantity:</span>
              <input type="number" min="1" class="quote-qty-input" data-id="${item.id}" value="${item.qty}" />
            </div>
          </div>
          <button type="button" class="quote-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
        </div>
      `
      )
      .join("");

    renderBestselling();
  }

  function addProductToQuote(productId, qtyOverride, openDrawerAfter = true) {
    const prod = CFG.bestselling.products.find((p) => p.id === productId);
    if (!prod) return;
    const qty = Math.max(1, Number(qtyOverride) || CFG.pricing.defaultQuoteQty || 10);

    const existing = state.quoteItems.find((i) => i.id === prod.id);
    if (existing) {
      existing.qty = Number(existing.qty) + qty;
    } else {
      state.quoteItems.push({
        id: prod.id,
        sku: prod.sku,
        title: prod.title,
        image: prod.image,
        qty
      });
    }
    syncQuoteUI();
    showToast(`Added ${prod.sku} (${qty} pcs) to Quote List`, "success");
    if (openDrawerAfter) openMessageDrawer();
  }

  function openMessageDrawer() {
    const panel = document.getElementById("messageDrawerPanel");
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.getElementById("headerCtaBtn").classList.add("active");
  }

  function closeMessageDrawer() {
    const panel = document.getElementById("messageDrawerPanel");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.getElementById("headerCtaBtn").classList.remove("active");
  }

  /* --------------------------------------------------------------------------
     Modals (Video / Product Quick View / Blog Reader / Mobile Contact)
     -------------------------------------------------------------------------- */
  function openModal(html) {
    const modal = document.getElementById("appModal");
    document.getElementById("appModalContent").innerHTML = html;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = document.getElementById("appModal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.getElementById("appModalContent").innerHTML = "";
    document.body.style.overflow = "";
  }

  function openFactoryVideoModal(customTitle) {
    const caption = customTitle || CFG.about.videoCaption;
    const videoContent = CFG.about.videoUrl
      ? `<video controls autoplay playsinline src="${CFG.about.videoUrl}"></video>`
      : `
        <div class="modal-video-placeholder">
          <img src="${CFG.about.factoryImage}" alt="${caption}" />
          <div class="modal-video-overlay">
            <h3>${caption}</h3>
            <p>You can embed your own factory or product MP4 video URL in <strong>site-config.js</strong> (<code>about.videoUrl</code>) to play it directly in this lightbox.</p>
          </div>
        </div>
      `;

    openModal(`
      <div class="modal-video-wrap">
        <div class="modal-video-player">${videoContent}</div>
      </div>
    `);
  }

  function openProductDetailModal(productId) {
    const prod = CFG.bestselling.products.find((p) => p.id === productId);
    if (!prod) return;

    const specsRows = (prod.specs || [])
      .map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`)
      .join("");

    const priceBox = prod.price
      ? `
      <div class="modal-product-price-box">
        <span class="modal-price-value">${CFG.pricing.currencySymbol}${prod.price}</span>
        ${prod.comparePrice ? `<span class="modal-price-compare">${CFG.pricing.currencySymbol}${prod.comparePrice}</span>` : ""}
        ${prod.moq ? `<span class="modal-price-moq">${prod.moq}</span>` : ""}
      </div>
    `
      : "";

    openModal(`
      <div class="modal-product-grid">
        <div class="modal-product-media">
          <img src="${prod.image}" alt="${prod.title}" />
        </div>
        <div class="modal-product-info">
          <span class="modal-product-sku">Model: ${prod.sku}</span>
          <h3>${prod.title}</h3>
          <p class="modal-product-desc">${prod.shortDesc}</p>
          ${priceBox}
          <table class="modal-specs-table"><tbody>${specsRows}</tbody></table>
          <div class="modal-product-actions">
            <input type="number" min="1" value="${CFG.pricing.defaultQuoteQty}" id="modalProductQty" class="modal-qty-input" aria-label="Quantity" />
            <button type="button" class="modal-add-quote-btn" id="modalAddQuoteBtn" data-product-id="${prod.id}">
              ${t("inquireNow")} / ${t("addToQuote")}
            </button>
          </div>
        </div>
      </div>
    `);

    const btn = document.getElementById("modalAddQuoteBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        const qty = document.getElementById("modalProductQty").value;
        closeModal();
        addProductToQuote(prod.id, qty, true);
      });
    }
  }

  function openBlogModal(blogId) {
    const post = CFG.blog.posts.find((b) => b.id === blogId);
    if (!post) return;
    openModal(`
      <article class="modal-blog-article">
        <img src="${post.image}" alt="${post.title}" class="modal-blog-cover" />
        <div class="blog-meta">
          <span class="blog-date">${post.date}</span>
          <span class="blog-comments">Comments: ${post.comments}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </article>
    `);
  }

  function openMobileContactModal() {
    openModal(`
      <div class="modal-contact-sheet">
        <h3>Contact ${CFG.brand.name}</h3>
        <div class="contact-sheet-list">
          <div class="contact-sheet-row"><span>Phone / Tel</span><strong>${CFG.brand.phone}</strong></div>
          <div class="contact-sheet-row"><span>WhatsApp</span><strong>${CFG.brand.whatsapp}</strong></div>
          <div class="contact-sheet-row"><span>WeChat ID</span><strong>${CFG.brand.wechatId}</strong></div>
          <div class="contact-sheet-row"><span>Email</span><strong>${CFG.brand.emails[0]}</strong></div>
        </div>
      </div>
    `);
  }

  /* --------------------------------------------------------------------------
     Language Switcher & Live Product Search
     -------------------------------------------------------------------------- */
  function setLanguage(code) {
    state.lang = code;
    document.getElementById("languageSelect").value = code;
    document.querySelectorAll(".flag-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === code);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.getElementById("desktopSearchInput").placeholder = t("searchPlaceholder");
    document.getElementById("mobileSearchInput").placeholder = t("searchPlaceholder");
    document.getElementById("headerCtaBtn").textContent = t("leaveMessageBtn");
    renderBestselling();

    const langObj = CFG.languages.find((l) => l.code === code);
    showToast(`Language switched to ${langObj ? langObj.label : code}`);
  }

  function bindSearchBox(inputId, clearId, submitId, dropdownId) {
    const input = document.getElementById(inputId);
    const clearBtn = document.getElementById(clearId);
    const submitBtn = document.getElementById(submitId);
    const dropdown = document.getElementById(dropdownId);

    function renderResults(q) {
      const term = q.trim().toLowerCase();
      if (!term) {
        dropdown.classList.remove("open");
        dropdown.innerHTML = "";
        return;
      }
      const matches = CFG.bestselling.products.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.shortDesc.toLowerCase().includes(term)
      );

      if (!matches.length) {
        dropdown.innerHTML = `<div class="search-empty">No matching wearables found for "${q}"</div>`;
      } else {
        dropdown.innerHTML = matches
          .map(
            (p) => `
            <div class="search-result-item" data-product-id="${p.id}">
              <img src="${p.image}" alt="${p.sku}" />
              <div class="search-result-info">
                <div class="search-result-title">${p.title}</div>
                <div class="search-result-sku">${p.sku}${CFG.pricing.showPrices && p.price ? ` · ${CFG.pricing.currencySymbol}${p.price}` : ""}</div>
              </div>
            </div>
          `
          )
          .join("");
      }
      dropdown.classList.add("open");
    }

    input.addEventListener("input", () => renderResults(input.value));
    input.addEventListener("focus", () => {
      if (input.value.trim()) renderResults(input.value);
    });
    clearBtn.addEventListener("click", () => {
      input.value = "";
      dropdown.classList.remove("open");
      input.focus();
    });
    submitBtn.addEventListener("click", () => renderResults(input.value));

    dropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".search-result-item");
      if (!item) return;
      dropdown.classList.remove("open");
      openProductDetailModal(item.dataset.productId);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${dropdownId}`)) {
        dropdown.classList.remove("open");
      }
    });
  }

  /* --------------------------------------------------------------------------
     Toast Utility
     -------------------------------------------------------------------------- */
  function showToast(msg, type = "info") {
    const container = document.getElementById("toastContainer");
    const div = document.createElement("div");
    div.className = `toast-item ${type}`;
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => {
      div.style.opacity = "0";
      div.style.transition = "opacity 0.25s";
      setTimeout(() => div.remove(), 260);
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     Event Wiring
     -------------------------------------------------------------------------- */
  function bindEvents() {
    // Language switcher
    document.getElementById("flagGrid").addEventListener("click", (e) => {
      const btn = e.target.closest(".flag-btn");
      if (btn) setLanguage(btn.dataset.lang);
    });
    document.getElementById("languageSelect").addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });

    // Search boxes
    bindSearchBox("desktopSearchInput", "desktopSearchClear", "desktopSearchSubmit", "desktopSearchDropdown");
    bindSearchBox("mobileSearchInput", "mobileSearchClear", "mobileSearchSubmit", "mobileSearchDropdown");

    // All Products Mega Menu
    const megaTrigger = document.getElementById("megaMenuTriggerItem");
    const megaPanel = document.getElementById("megaMenuPanel");
    let megaCloseTimer = null;

    function openMega() {
      clearTimeout(megaCloseTimer);
      megaPanel.classList.add("open");
      megaPanel.setAttribute("aria-hidden", "false");
      megaTrigger.classList.add("mega-open");
    }

    function scheduleCloseMega() {
      megaCloseTimer = setTimeout(() => {
        megaPanel.classList.remove("open");
        megaPanel.setAttribute("aria-hidden", "true");
        megaTrigger.classList.remove("mega-open");
      }, 150);
    }

    megaTrigger.addEventListener("mouseenter", openMega);
    megaTrigger.addEventListener("mouseleave", scheduleCloseMega);
    megaPanel.addEventListener("mouseenter", openMega);
    megaPanel.addEventListener("mouseleave", scheduleCloseMega);
    document.getElementById("megaMenuCloseBtn").addEventListener("click", () => {
      megaPanel.classList.remove("open");
      megaTrigger.classList.remove("mega-open");
    });

    document.getElementById("megaMenuTabs").addEventListener("mouseover", (e) => {
      const btn = e.target.closest(".mega-tab-btn");
      if (!btn || btn.dataset.megaTab === state.activeMegaTab) return;
      state.activeMegaTab = btn.dataset.megaTab;
      renderMegaMenu();
    });
    document.getElementById("megaMenuTabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".mega-tab-btn");
      if (!btn) return;
      state.activeMegaTab = btn.dataset.megaTab;
      renderMegaMenu();
    });

    document.getElementById("megaMenuGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".mega-sub-card");
      if (!card) return;
      megaPanel.classList.remove("open");
      if (card.dataset.productId) {
        openProductDetailModal(card.dataset.productId);
      } else if (card.dataset.categoryId) {
        state.activeCategory = card.dataset.categoryId;
        renderBestselling();
        document.getElementById("bestselling").scrollIntoView({ behavior: "smooth" });
      }
    });

    // Hero Slider Controls & Swipe
    document.getElementById("heroPrev").addEventListener("click", () => {
      goToHeroSlide(state.heroIndex - 1);
      resetHeroAutoplay();
    });
    document.getElementById("heroNext").addEventListener("click", () => {
      goToHeroSlide(state.heroIndex + 1);
      resetHeroAutoplay();
    });
    document.getElementById("heroDots").addEventListener("click", (e) => {
      const dot = e.target.closest(".hero-dot");
      if (!dot) return;
      goToHeroSlide(Number(dot.dataset.slide));
      resetHeroAutoplay();
    });

    const heroSlider = document.getElementById("heroSlider");
    let pointerStartX = null;
    heroSlider.addEventListener("pointerdown", (e) => { pointerStartX = e.clientX; });
    heroSlider.addEventListener("pointerup", (e) => {
      if (pointerStartX === null) return;
      const diff = e.clientX - pointerStartX;
      if (Math.abs(diff) > 45) {
        goToHeroSlide(state.heroIndex + (diff < 0 ? 1 : -1));
        resetHeroAutoplay();
      }
      pointerStartX = null;
    });
    heroSlider.addEventListener("mouseenter", () => clearInterval(state.heroTimer));
    heroSlider.addEventListener("mouseleave", resetHeroAutoplay);

    // About Us Play Video
    document.getElementById("openVideoBtn").addEventListener("click", () => openFactoryVideoModal());

    // Signature Series Category Click & Mobile Arrows
    document.getElementById("signatureGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".signature-card");
      if (!card) return;
      state.activeCategory = card.dataset.category;
      renderBestselling();
      document.getElementById("bestselling").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("sigPrev").addEventListener("click", () => {
      const len = CFG.signatureSeries.categories.length;
      state.sigMobileIndex = (state.sigMobileIndex - 1 + len) % len;
      updateSigFraction();
    });
    document.getElementById("sigNext").addEventListener("click", () => {
      const len = CFG.signatureSeries.categories.length;
      state.sigMobileIndex = (state.sigMobileIndex + 1) % len;
      updateSigFraction();
    });

    // Clear Category Filter
    document.getElementById("clearCategoryFilter").addEventListener("click", () => {
      state.activeCategory = null;
      renderBestselling();
    });

    // Bestselling Product Actions (Delegated)
    document.getElementById("productsGrid").addEventListener("click", (e) => {
      const videoBtn = e.target.closest(".js-product-video");
      if (videoBtn) {
        e.stopPropagation();
        const prod = CFG.bestselling.products.find((p) => p.id === videoBtn.dataset.productId);
        openFactoryVideoModal(prod ? `${prod.sku} — Product Showcase Video` : undefined);
        return;
      }

      const quickQuote = e.target.closest(".js-add-quote");
      if (quickQuote) {
        e.stopPropagation();
        addProductToQuote(quickQuote.dataset.productId, CFG.pricing.defaultQuoteQty, false);
        return;
      }

      const inquireBtn = e.target.closest(".js-inquire-product");
      if (inquireBtn) {
        addProductToQuote(inquireBtn.dataset.productId, CFG.pricing.defaultQuoteQty, true);
        return;
      }

      const openProd = e.target.closest(".js-open-product");
      if (openProd) {
        openProductDetailModal(openProd.dataset.productId);
      }
    });

    // Testimonials Navigation
    document.getElementById("testiPrev").addEventListener("click", () => stepTestimonials(-1));
    document.getElementById("testiNext").addEventListener("click", () => stepTestimonials(1));

    // Blog Reader
    document.getElementById("blogGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".blog-card");
      if (card) openBlogModal(card.dataset.blogId);
    });

    // Footer Product Category Links & Mobile Collapse
    document.getElementById("footerProductLinks").addEventListener("click", (e) => {
      const link = e.target.closest(".js-filter-category");
      if (!link) return;
      state.activeCategory = link.dataset.category;
      renderBestselling();
    });
    document.getElementById("footerProductToggle").addEventListener("click", () => {
      document.getElementById("footerProductLinks").classList.toggle("open");
    });

    // Leave a Message Drawer Triggers
    document.querySelectorAll(".js-open-message").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (el.tagName === "A") e.preventDefault();
        openMessageDrawer();
      });
    });
    document.getElementById("messageBarTrigger").addEventListener("click", openMessageDrawer);
    document.getElementById("quoteBasketFab").addEventListener("click", openMessageDrawer);
    document.getElementById("messageDrawerClose").addEventListener("click", closeMessageDrawer);

    // Drawer Quote Items Quantity & Remove
    document.getElementById("drawerQuoteItems").addEventListener("input", (e) => {
      if (!e.target.classList.contains("quote-qty-input")) return;
      const item = state.quoteItems.find((i) => i.id === e.target.dataset.id);
      if (item) {
        item.qty = Math.max(1, Number(e.target.value) || 1);
        saveQuoteBasket();
        const totalQty = state.quoteItems.reduce((s, x) => s + Number(x.qty || 0), 0);
        document.getElementById("quoteFabBadge").textContent = totalQty;
        document.getElementById("mobileQuoteBadge").textContent = totalQty;
      }
    });
    document.getElementById("drawerQuoteItems").addEventListener("click", (e) => {
      const rm = e.target.closest(".quote-item-remove");
      if (!rm) return;
      state.quoteItems = state.quoteItems.filter((i) => i.id !== rm.dataset.id);
      syncQuoteUI();
    });

    // Forms Submission
    document.getElementById("drawerInquiryForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("drawerEmail").value.trim();
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid Email Address.");
        document.getElementById("drawerEmail").focus();
        return;
      }
      showToast("Inquiry submitted successfully! Our OEM/ODM team will reply within 24h.", "success");
      e.target.reset();
      state.quoteItems = [];
      syncQuoteUI();
      closeMessageDrawer();
    });

    document.getElementById("footerInquiryForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("footerEmail").value.trim();
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid Email Address.");
        document.getElementById("footerEmail").focus();
        return;
      }
      showToast("Thank you! Your inquiry has been received.", "success");
      e.target.reset();
    });

    // WeChat Popover & Back to Top
    const wechatPopover = document.getElementById("wechatPopover");
    document.getElementById("dockWechatBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wechatPopover.classList.toggle("open");
      wechatPopover.setAttribute("aria-hidden", String(!isOpen));
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#wechatPopover") && !e.target.closest("#dockWechatBtn")) {
        wechatPopover.classList.remove("open");
        wechatPopover.setAttribute("aria-hidden", "true");
      }
    });

    const dockTopBtn = document.getElementById("dockTopBtn");
    window.addEventListener("scroll", () => {
      dockTopBtn.classList.toggle("visible", window.scrollY > 360);
    }, { passive: true });
    dockTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.getElementById("mobileTopBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.getElementById("mobileContactBtn").addEventListener("click", openMobileContactModal);

    // Mobile Hamburger Menu Drawer
    const mobileDrawer = document.getElementById("mobileMenuDrawer");
    const mobileOverlay = document.getElementById("mobileDrawerOverlay");
    function setMobileDrawer(open) {
      mobileDrawer.classList.toggle("open", open);
      mobileOverlay.classList.toggle("open", open);
      mobileDrawer.setAttribute("aria-hidden", String(!open));
    }
    document.getElementById("mobileMenuOpenBtn").addEventListener("click", () => setMobileDrawer(true));
    document.getElementById("mobileMenuCloseBtn").addEventListener("click", () => setMobileDrawer(false));
    mobileOverlay.addEventListener("click", () => setMobileDrawer(false));
    document.querySelectorAll(".js-mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => setMobileDrawer(false));
    });

    // Modal Close
    document.getElementById("appModalClose").addEventListener("click", closeModal);
    document.getElementById("appModal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeMessageDrawer();
        setMobileDrawer(false);
      }
    });

    window.addEventListener("resize", () => {
      state.testiIndex = 0;
      document.getElementById("testimonialsTrack").style.transform = "translateX(0)";
    });
  }

  function resetHeroAutoplay() {
    clearInterval(state.heroTimer);
    state.heroTimer = setInterval(() => goToHeroSlide(state.heroIndex + 1), 5500);
  }

  /* --------------------------------------------------------------------------
     Init
     -------------------------------------------------------------------------- */
  renderHeader();
  renderMegaMenu();
  renderHero();
  renderAbout();
  renderSignatureSeries();
  renderBestselling();
  renderConsultation();
  renderWhyChooseUs();
  renderTestimonials();
  renderBlog();
  renderFooter();
  syncQuoteUI();
  bindEvents();
  resetHeroAutoplay();
  state.testiTimer = setInterval(() => stepTestimonials(1), 6500);
})();
