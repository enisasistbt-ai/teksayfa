"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { sanitizeUsername } from "../lib/username";

const CONTENT = {
  tr: {
    nav: { features: "Özellikler", pricing: "Fiyatlandırma", faq: "S.S.S", about: "Hakkımızda", blog: "Blog", login: "Giriş yap", start: "Ücretsiz başla" },
    langSwitch: { href: "/en", label: "EN" },
    industries: ["E-ticaret", "Danışmanlık", "Hizmet sektörü", "Ajanslar"],
    marquee: [
      "E-ticaret satıcıları", "Danışmanlar", "Serbest çalışanlar", "Ajanslar",
      "Perakende mağazaları", "Hizmet sektörü", "Girişimciler", "Emlak danışmanları",
    ],
    examples: [
      { initial: "M", name: "Merve Aydın", handle: "merve-aydin", links: ["LinkedIn profilim", "Portföyüm", "Randevu al"] },
      { initial: "D", name: "Deniz Kaya", handle: "deniz-kaya", links: ["Instagram mağazam", "WhatsApp'tan sipariş ver", "Trendyol mağazam"] },
      { initial: "C", name: "Can Yılmaz", handle: "can-yilmaz", links: ["Web sitem", "CV'm", "E-posta gönder"] },
      { initial: "A", name: "Ada Demir", handle: "ada-demir", links: ["Hizmetlerimi gör", "Randevu al", "Yorumlarımı oku"] },
      { initial: "K", name: "Kerem Aksoy", handle: "kerem-aksoy", links: ["Menümüzü gör", "Konum", "WhatsApp'tan rezervasyon"] },
      { initial: "S", name: "Selin Karaca", handle: "selin-karaca", links: ["Randevu al", "Hizmetlerimiz", "Bizi Instagram'da takip et"] },
    ],
    hero: {
      eyebrow: "link-in-bio sayfası",
      titleLine1: "Tüm bağlantıların.",
      titleLine2: "Tek sayfada.",
      desc: "Instagram, WhatsApp, mağazan, iletişim bilgilerin — hepsi tek sayfada. Kimin baktığını da gösterir.",
      badgeViews: "128 görüntülenme",
      badgeQr: "QR koduna hazır",
      claimLabel: "Kendi adını hemen dene",
      claimPlaceholder: "kullanici-adin",
      claimChecking: "kontrol ediliyor...",
      claimAvailable: "Müsait! 🎉",
      claimTaken: "Bu isim alınmış, başka bir tane dene",
      claimTooShort: "En az 3 karakter yaz",
      claimCta: "Bu adı al",
    },
    features: {
      eyebrow: "özellikler",
      title: "Sade, hızlı, işe yarar",
      items: [
        { icon: "▦", title: "Fotoğraflı QR kod", desc: "Kartvizitte kullanıma hazır, tek dokunuşla rehbere kaydedilebilir." },
        { icon: "◐", title: "Anlık istatistik", desc: "Kim baktı, hangi linke tıklandı — hemen gör." },
        { icon: "✉", title: "WhatsApp takibi", desc: "Sana ulaşanlar otomatik listelenir, kaybolmaz." },
      ],
    },
    steps: {
      eyebrow: "nasıl çalışır",
      title: "3 adımda yayında",
      items: [
        { title: "Kaydol", desc: "E-posta ya da Google ile saniyeler içinde hesabını aç." },
        { title: "Sayfanı doldur", desc: "Bağlantılarını, mağazanı, iletişim bilgilerini panelden ekle." },
        { title: "Paylaş", desc: "Bio'na, imzana, kartvizitine ya da QR koduna koy." },
      ],
    },
    faq: {
      eyebrow: "sıkça sorulan sorular",
      title: "Merak ettiklerin",
      items: [
        { q: "Kod bilmem gerekir mi?", a: "Hayır. Panelden bilgilerini gir, sayfan otomatik oluşur ve yayına alınır." },
        { q: "Kaç link ekleyebilirim?", a: "Ücretsiz planda sınırlı sayıda link ekleyebilirsin. Premium'a geçince sınır kalkar, tüm temaların kilidi açılır." },
        { q: "Yabancı müşterilerim de sayfamı anlayabilir mi?", a: "Evet, sayfanda TR/EN dil seçeneği var; içeriğinin İngilizcesini de ayrıca girebilirsin." },
      ],
    },
    closing: { title: "Sayfan seni bekliyor.", desc: "Kredi kartı gerekmez, 2 dakikada başla." },
    footer: {
      tagline: "Bağlantılarını tek sayfada topla, kimin baktığını gör.",
      productTitle: "Ürün",
      legalTitle: "Yasal",
      payment: "Güvenli ödeme:",
      rights: "Tüm hakları saklıdır.",
      legalLinks: [
        { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
        { href: "/cerez-politikasi", label: "Çerez Politikası" },
        { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
        { href: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
        { href: "/acik-riza-metni", label: "Açık Rıza Metni" },
        { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli Satış Sözleşmesi" },
        { href: "/teslimat-ve-iade-kosullari", label: "Teslimat ve İade Koşulları" },
      ],
    },
  },
  en: {
    nav: { features: "Features", pricing: "Pricing", faq: "FAQ", about: "About", blog: "Blog", login: "Log in", start: "Start free" },
    langSwitch: { href: "/", label: "TR" },
    industries: ["E-commerce", "Consulting", "Service businesses", "Agencies"],
    marquee: [
      "E-commerce sellers", "Consultants", "Freelancers", "Agencies",
      "Retail shops", "Service businesses", "Founders", "Real estate agents",
    ],
    examples: [
      { initial: "M", name: "Maya Reyes", handle: "maya-reyes", links: ["My LinkedIn", "My portfolio", "Book a call"] },
      { initial: "D", name: "Deniz Kaya", handle: "deniz-kaya", links: ["My Instagram shop", "Order via WhatsApp", "My Etsy shop"] },
      { initial: "C", name: "Chris Lane", handle: "chris-lane", links: ["My website", "My resume", "Send an email"] },
      { initial: "A", name: "Ada Demir", handle: "ada-demir", links: ["See my services", "Book a call", "Read my reviews"] },
      { initial: "K", name: "Kerem Aksoy", handle: "kerem-aksoy", links: ["See our menu", "Location", "Reserve via WhatsApp"] },
      { initial: "S", name: "Selin Karaca", handle: "selin-karaca", links: ["Book an appointment", "Our services", "Follow us on Instagram"] },
    ],
    hero: {
      eyebrow: "your link-in-bio page",
      titleLine1: "All your links.",
      titleLine2: "One page.",
      desc: "Your Instagram, WhatsApp, shop, and contact info — all on one page. It shows you who's looking, too.",
      badgeViews: "128 views",
      badgeQr: "Ready as QR code",
      claimLabel: "Try your name right now",
      claimPlaceholder: "your-name",
      claimChecking: "checking...",
      claimAvailable: "Available! 🎉",
      claimTaken: "That one's taken, try another",
      claimTooShort: "Type at least 3 characters",
      claimCta: "Claim it",
    },
    features: {
      eyebrow: "features",
      title: "Simple, fast, useful",
      items: [
        { icon: "▦", title: "QR code with your photo", desc: "Ready for your card, saveable to contacts in one tap." },
        { icon: "◐", title: "Live analytics", desc: "See who looked and what they clicked, instantly." },
        { icon: "✉", title: "WhatsApp tracking", desc: "Everyone who reaches you gets listed automatically." },
      ],
    },
    steps: {
      eyebrow: "how it works",
      title: "Live in 3 steps",
      items: [
        { title: "Sign up", desc: "Create your account in seconds with email or Google." },
        { title: "Fill in your page", desc: "Add your links, store, and contact info from your dashboard." },
        { title: "Share it", desc: "Put it in your bio, your email signature, your card, or your QR code." },
      ],
    },
    faq: {
      eyebrow: "frequently asked questions",
      title: "Good to know",
      items: [
        { q: "Do I need to know how to code?", a: "No. Enter your info in the dashboard and your page is built and published automatically." },
        { q: "How many links can I add?", a: "The free plan has a link limit. Upgrading to Premium removes the limit and unlocks every theme." },
        { q: "Will it work for customers who speak other languages?", a: "Yes, your page has a TR/EN toggle, and you can add an English version of your bio too." },
      ],
    },
    closing: { title: "Your page is waiting.", desc: "No credit card needed, start in 2 minutes." },
    footer: {
      tagline: "Bring your links together on one page, see who's looking.",
      productTitle: "Product",
      legalTitle: "Legal",
      payment: "Secure payment:",
      rights: "All rights reserved.",
      legalLinks: [
        { href: "/gizlilik-politikasi", label: "Privacy Policy" },
        { href: "/cerez-politikasi", label: "Cookie Policy" },
        { href: "/kullanim-kosullari", label: "Terms of Use" },
        { href: "/kvkk-aydinlatma-metni", label: "Data Protection Notice" },
        { href: "/acik-riza-metni", label: "Consent Notice" },
        { href: "/mesafeli-satis-sozlesmesi", label: "Distance Sales Agreement" },
        { href: "/teslimat-ve-iade-kosullari", label: "Delivery & Refund Policy" },
      ],
    },
  },
};

// Örnek profil avatarları — index sırası her iki dilde de aynı kişiyi temsil eder
// (0: Merve/Maya, 1: Deniz, 2: Can/Chris, 3: Ada, 4: Kerem, 5: Selin). Görsel
// dosyası yoksa veya yüklenemezse otomatik olarak baş harf rozetine düşer,
// build'i etkilemez.
const EXAMPLE_AVATARS = [
  "/ornekler/profil-1.jpg",
  "/ornekler/profil-2.jpg",
  "/ornekler/profil-3.jpg",
  "/ornekler/profil-4.jpg",
  "/ornekler/profil-5.jpg",
  "/ornekler/profil-6.jpg",
];

function Reveal({ children, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`corp-reveal${visible ? " is-visible" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

export default function LandingPage({ lang = "tr" }) {
  const t = CONTENT[lang];
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [activeLink, setActiveLink] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [claimInput, setClaimInput] = useState("");
  const [claimStatus, setClaimStatus] = useState(null); // null | "checking" | "available" | "taken" | "short"

  useEffect(() => {
    const clean = sanitizeUsername(claimInput);
    if (!clean) {
      setClaimStatus(null);
      return;
    }
    if (clean.length < 3) {
      setClaimStatus("short");
      return;
    }
    setClaimStatus("checking");
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("public_profiles")
        .select("username")
        .eq("username", clean)
        .maybeSingle();
      setClaimStatus(data ? "taken" : "available");
    }, 450);
    return () => clearTimeout(timer);
  }, [claimInput]);

  function handleClaim() {
    const clean = sanitizeUsername(claimInput);
    if (claimStatus !== "available" || !clean) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mb_desired_username", clean);
    }
    router.push("/login");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setExampleIndex((i) => (i + 1) % t.examples.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [t.examples.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLink((i) => (i + 1) % 3);
    }, 1700);
    return () => clearInterval(timer);
  }, []);

  const example = t.examples[exampleIndex];
  const homeHref = lang === "en" ? "/en" : "/";
  const aboutHref = lang === "en" ? "/en/about" : "/hakkimizda";
  const blogHref = lang === "en" ? "/en/blog" : "/blog";

  return (
    <div className="corp-landing">
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <Link href={homeHref} className="row" style={{ gap: 9, flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
            <span className="corp-display" style={{ fontSize: 16 }}>
              MineBio
            </span>
          </Link>
          <div className="corp-nav-secondary">
            <a href="#ozellikler">{t.nav.features}</a>
            <Link href="/fiyatlandirma">{t.nav.pricing}</Link>
            <a href="#sss">{t.nav.faq}</a>
            <Link href={aboutHref}>{t.nav.about}</Link>
            <Link href={blogHref}>{t.nav.blog}</Link>
            <Link href="/login">{t.nav.login}</Link>
            <Link
              href={t.langSwitch.href}
              className="mono corp-lang-link"
              style={{ fontSize: 12.5, color: "var(--c-body)" }}
            >
              {t.langSwitch.label}
            </Link>
            <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
              {t.nav.start}
            </Link>
            <button
              type="button"
              className="corp-nav-burger"
              aria-label="Menü"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
        <div className={`corp-nav-mobile-panel${menuOpen ? " is-open" : ""}`}>
          <a href="#ozellikler" onClick={() => setMenuOpen(false)}>{t.nav.features}</a>
          <Link href="/fiyatlandirma" onClick={() => setMenuOpen(false)}>{t.nav.pricing}</Link>
          <a href="#sss" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
          <Link href={aboutHref} onClick={() => setMenuOpen(false)}>{t.nav.about}</Link>
          <Link href={blogHref} onClick={() => setMenuOpen(false)}>{t.nav.blog}</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)}>{t.nav.login}</Link>
          <Link href={t.langSwitch.href} onClick={() => setMenuOpen(false)}>{t.langSwitch.label === "EN" ? "English" : "Türkçe"}</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="corp-section corp-hero corp-hero-dark" style={{ paddingTop: 72 }}>
        <div className="corp-hero-glow" aria-hidden="true" />
        <div className="corp-hero-row">
          <div className="corp-hero-copy">
            <div className="corp-eyebrow">{t.hero.eyebrow}</div>
            <h1 className="corp-display" style={{ fontSize: "clamp(32px, 5vw, 46px)", marginTop: 14, lineHeight: 1.12 }}>
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p style={{ color: "var(--c-body)", marginTop: 18, fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>
              {t.hero.desc}
            </p>
            <div className="row" style={{ marginTop: 30, gap: 12, flexWrap: "wrap" }}>
              <Link href="/login" className="corp-btn">
                {t.nav.start}
              </Link>
              <Link href="/fiyatlandirma" className="corp-btn-outline">
                {t.nav.pricing}
              </Link>
            </div>

            <div className="corp-industries">
              {t.industries.map((ind) => (
                <span className="corp-industry-tag" key={ind}>
                  {ind}
                </span>
              ))}
            </div>

            <div className="corp-claim-box">
              <div className="corp-claim-label">{t.hero.claimLabel}</div>
              <div className="corp-claim-row">
                <span className="mono corp-claim-prefix">minebio.net/</span>
                <input
                  className="corp-claim-input"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder={t.hero.claimPlaceholder}
                  onKeyDown={(e) => e.key === "Enter" && handleClaim()}
                />
                {claimStatus === "available" && (
                  <button type="button" className="corp-btn" style={{ padding: "9px 16px", fontSize: 13 }} onClick={handleClaim}>
                    {t.hero.claimCta}
                  </button>
                )}
              </div>
              {claimStatus && (
                <div className={`corp-claim-status corp-claim-status-${claimStatus}`}>
                  {claimStatus === "checking" && t.hero.claimChecking}
                  {claimStatus === "available" && `✓ ${t.hero.claimAvailable}`}
                  {claimStatus === "taken" && `✗ ${t.hero.claimTaken}`}
                  {claimStatus === "short" && t.hero.claimTooShort}
                </div>
              )}
            </div>
          </div>

          <div className="corp-hero-visual">
            <div className="corp-float-badge badge-views">
              <span>👁️</span> {t.hero.badgeViews}
            </div>
            <div className="corp-float-badge badge-qr">
              <span>▦</span> {t.hero.badgeQr}
            </div>
            <div className="corp-phone">
              <div className="corp-phone-notch" />
              <div className="corp-phone-screen" key={example.handle}>
                <div className="corp-mock-avatar">
                  <img
                    key={exampleIndex}
                    src={EXAMPLE_AVATARS[exampleIndex]}
                    alt={example.name}
                    className="corp-mock-avatar-img"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="corp-mock-avatar-fallback">{example.initial}</span>
                </div>
                <div className="corp-display" style={{ fontSize: 16 }}>
                  {example.name}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 2 }}>
                  minebio.net/{example.handle}
                </div>
                {example.links.map((l, i) => (
                  <div className={`corp-mock-link${activeLink === i ? " is-active" : ""}`} key={l}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler — her biri kendi görseliyle, dönüşümlü vitrin */}
      <section className="corp-section corp-section-alt" id="ozellikler">
        <Reveal>
          <div className="corp-eyebrow">{t.features.eyebrow}</div>
          <h2 className="corp-display" style={{ fontSize: "clamp(24px, 4vw, 30px)", marginTop: 10, maxWidth: 560 }}>
            {t.features.title}
          </h2>
        </Reveal>

        {/* 1. QR kod */}
        <Reveal>
          <div className="corp-showcase">
            <div className="corp-showcase-copy">
              <div className="corp-display" style={{ fontSize: 22 }}>{t.features.items[0].title}</div>
              <p style={{ fontSize: 15, color: "var(--c-body)", marginTop: 10, lineHeight: 1.6, maxWidth: 380 }}>
                {t.features.items[0].desc}
              </p>
            </div>
            <div className="corp-showcase-visual">
              <div className="corp-showcase-card" style={{ textAlign: "center" }}>
                <div className="corp-qr-frame">
                  <div className="corp-qr-grid">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span key={i} />
                    ))}
                    <div className="corp-qr-avatar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. İstatistikler */}
        <Reveal>
          <div className="corp-showcase is-reverse">
            <div className="corp-showcase-copy">
              <div className="corp-display" style={{ fontSize: 22 }}>{t.features.items[1].title}</div>
              <p style={{ fontSize: 15, color: "var(--c-body)", marginTop: 10, lineHeight: 1.6, maxWidth: 380 }}>
                {t.features.items[1].desc}
              </p>
            </div>
            <div className="corp-showcase-visual">
              <div className="corp-showcase-card">
                <div className="corp-stat-row">
                  <div>
                    <div className="corp-stat-num">128</div>
                    <div className="corp-stat-label">{t.hero.badgeViews}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="corp-stat-num">34</div>
                    <div className="corp-stat-label">tıklama</div>
                  </div>
                </div>
                <div className="corp-mini-chart">
                  {[38, 55, 42, 70, 60, 88, 100].map((h, i) => (
                    <div key={i} className="corp-mini-chart-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. WhatsApp takibi */}
        <Reveal>
          <div className="corp-showcase">
            <div className="corp-showcase-copy">
              <div className="corp-display" style={{ fontSize: 22 }}>{t.features.items[2].title}</div>
              <p style={{ fontSize: 15, color: "var(--c-body)", marginTop: 10, lineHeight: 1.6, maxWidth: 380 }}>
                {t.features.items[2].desc}
              </p>
            </div>
            <div className="corp-showcase-visual">
              <div className="corp-showcase-card">
                {[
                  { i: "A", n: "Ayşe K.", s: "2 dk önce", badge: "yeni" },
                  { i: "M", n: "Mert D.", s: "1 saat önce" },
                  { i: "S", n: "Selin T.", s: "dün" },
                ].map((c) => (
                  <div className="corp-contact-row" key={c.n}>
                    <div className="corp-contact-avatar">{c.i}</div>
                    <div>
                      <div className="corp-contact-name">{c.n}</div>
                      <div className="corp-contact-sub">{c.s}</div>
                    </div>
                    {c.badge && <div className="corp-contact-badge">{c.badge}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Nasıl çalışır */}
      <section className="corp-section">
        <Reveal>
          <div className="corp-eyebrow">{t.steps.eyebrow}</div>
          <h2 className="corp-display" style={{ fontSize: "clamp(24px, 4vw, 30px)", marginTop: 10 }}>
            {t.steps.title}
          </h2>
        </Reveal>
        <div className="corp-steps">
          {t.steps.items.map((s, i) => (
            <Reveal key={s.title} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="corp-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="corp-display" style={{ fontSize: 16, marginTop: 10 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 6 }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="corp-section corp-section-alt" id="sss" style={{ maxWidth: 720 }}>
        <Reveal>
          <div className="corp-eyebrow">{t.faq.eyebrow}</div>
          <h2 className="corp-display" style={{ fontSize: "clamp(24px, 4vw, 30px)", marginTop: 10, marginBottom: 24 }}>
            {t.faq.title}
          </h2>
        </Reveal>
        {t.faq.items.map((item, i) => (
          <div className="corp-faq-item" key={item.q}>
            <button className="corp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {item.q}
              <span style={{ color: "var(--c-accent-dim)", fontSize: 18 }}>{openFaq === i ? "–" : "+"}</span>
            </button>
            {openFaq === i && <p className="corp-faq-a">{item.a}</p>}
          </div>
        ))}
      </section>

      {/* Kapanış CTA */}
      <section className="corp-section" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="corp-display" style={{ fontSize: "clamp(24px, 4vw, 30px)" }}>
            {t.closing.title}
          </h2>
          <p style={{ color: "var(--c-body)", fontSize: 15, marginTop: 10 }}>{t.closing.desc}</p>
          <Link href="/login" className="corp-btn" style={{ marginTop: 22 }}>
            {t.nav.start}
          </Link>
        </Reveal>
      </section>

      <footer className="corp-footer">
        <div className="corp-footer-grid">
          <div style={{ flex: "1 1 220px", maxWidth: 260 }}>
            <div className="row" style={{ gap: 8 }}>
              <img src="/logo-mark.png" alt="MineBio" style={{ width: 20, height: 20 }} />
              <span className="corp-display" style={{ fontSize: 14 }}>
                MineBio
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 12, lineHeight: 1.6 }}>
              {t.footer.tagline}
            </p>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">{t.footer.productTitle}</div>
            <a href="#ozellikler">{t.nav.features}</a>
            <Link href="/fiyatlandirma">{t.nav.pricing}</Link>
            <Link href={aboutHref}>{t.nav.about}</Link>
            <Link href={blogHref}>{t.nav.blog}</Link>
            <Link href="/login">{t.nav.login}</Link>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">{t.footer.legalTitle}</div>
            {t.footer.legalLinks.map((l) => (
              <Link href={l.href} key={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="row" style={{ maxWidth: 1100, margin: "28px auto 0", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: "#9a9482" }}>{t.footer.payment}</span>
          <img
            src="/odeme-logolari.png"
            alt="iyzico, Mastercard, Visa, American Express, Troy"
            style={{ height: 22 }}
          />
        </div>

        <div className="corp-footer-bottom">
          © {new Date().getFullYear()} MineBio. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
