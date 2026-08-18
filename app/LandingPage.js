"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONTENT = {
  tr: {
    nav: { features: "Özellikler", pricing: "Fiyatlandırma", faq: "S.S.S", login: "Giriş yap", start: "Ücretsiz başla" },
    langSwitch: { href: "/en", label: "EN" },
    industries: ["E-ticaret", "Danışmanlık", "Hizmet sektörü", "Serbest çalışanlar", "Ajanslar", "Perakende"],
    marquee: [
      "E-ticaret satıcıları", "Danışmanlar", "Serbest çalışanlar", "Ajanslar",
      "Perakende mağazaları", "Hizmet sektörü", "Girişimciler", "Emlak danışmanları",
    ],
    examples: [
      { initial: "M", name: "Merve Aydın", handle: "merve-aydin", links: ["LinkedIn profilim", "Portföyüm", "Randevu al"] },
      { initial: "D", name: "Deniz Kaya", handle: "deniz-kaya", links: ["Instagram mağazam", "WhatsApp'tan sipariş ver", "Trendyol mağazam"] },
      { initial: "C", name: "Can Yılmaz", handle: "can-yilmaz", links: ["Web sitem", "CV'm", "E-posta gönder"] },
      { initial: "A", name: "Ada Demir", handle: "ada-demir", links: ["Hizmetlerimi gör", "Randevu al", "Yorumlarımı oku"] },
    ],
    hero: {
      eyebrow: "profesyonel bağlantı sayfası",
      titleLine1: "Kendini, işini, markanı —",
      titleLine2: "tek bağlantıda anlat.",
      desc: "İster bir şirketi temsil et, ister kendi işini yönet: MineBio sosyal medyanı, mağazanı ve iletişim bilgilerini tek, profesyonel bir sayfada toplar — kimin baktığını da sana gösterir.",
    },
    features: {
      eyebrow: "özellikler",
      title: "Sayfanı büyütmek için ihtiyacın olan her şey",
      items: [
        { icon: "◆", title: "Profesyonel bir izlenim", desc: "Ziyaretçi sayfana girdiği ilk saniyede kim olduğunu net görsün. Kendi renklerin, kendi fotoğrafınla, markalı bir görünüm." },
        { icon: "▦", title: "Markalı QR kod", desc: "Ortasında fotoğrafın ve isminle, kartvizitte ya da vitrinde basılı paylaşmaya hazır bir QR kod." },
        { icon: "◐", title: "Neyin işe yaradığını gör", desc: "Hangi linkin tıklandığını, sayfanın kaç kez görüntülendiğini panelinden anlık takip et." },
        { icon: "✉", title: "İletişim formu", desc: "Ziyaretçiler doğrudan sana mesaj bıraksın, sen panelinden yanıtla." },
        { icon: "◎", title: "Rehbere kaydet", desc: "Ziyaretçi tek dokunuşla seni telefonuna gerçek bir kişi olarak kaydedebilir." },
        { icon: "↗", title: "Tek tıkla paylaşım", desc: "Tanıştığın kişileri kaydet, sayfanı WhatsApp'tan tek tıkla gönder." },
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
        { q: "Sayfamı istediğim zaman düzenleyebilir miyim?", a: "Evet, panelinden her an güncelleyebilirsin — değişiklikler anında yayına yansır." },
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
    nav: { features: "Features", pricing: "Pricing", faq: "FAQ", login: "Log in", start: "Start free" },
    langSwitch: { href: "/", label: "TR" },
    industries: ["E-commerce", "Consulting", "Service businesses", "Freelancers", "Agencies", "Retail"],
    marquee: [
      "E-commerce sellers", "Consultants", "Freelancers", "Agencies",
      "Retail shops", "Service businesses", "Founders", "Real estate agents",
    ],
    examples: [
      { initial: "M", name: "Maya Reyes", handle: "maya-reyes", links: ["My LinkedIn", "My portfolio", "Book a call"] },
      { initial: "D", name: "Deniz Kaya", handle: "deniz-kaya", links: ["My Instagram shop", "Order via WhatsApp", "My Etsy shop"] },
      { initial: "C", name: "Chris Lane", handle: "chris-lane", links: ["My website", "My resume", "Send an email"] },
      { initial: "A", name: "Ada Demir", handle: "ada-demir", links: ["See my services", "Book a call", "Read my reviews"] },
    ],
    hero: {
      eyebrow: "your professional link page",
      titleLine1: "Your work, your brand —",
      titleLine2: "in one link.",
      desc: "Whether you run a company or your own business: MineBio brings your social media, store, and contact info together on one professional page — and shows you who's looking.",
    },
    features: {
      eyebrow: "features",
      title: "Everything you need to grow your page",
      items: [
        { icon: "◆", title: "A professional first impression", desc: "Visitors know who you are the second they land. Your colors, your photo, a branded look." },
        { icon: "▦", title: "Branded QR code", desc: "A QR code with your photo and name at the center, ready to print on a card or storefront." },
        { icon: "◐", title: "See what's actually working", desc: "Track link clicks and page views live from your dashboard." },
        { icon: "✉", title: "Contact form", desc: "Visitors can message you directly — reply right from your dashboard." },
        { icon: "◎", title: "Save to contacts", desc: "Visitors can save you as a real contact on their phone with one tap." },
        { icon: "↗", title: "One-tap sharing", desc: "Save people you meet and send your page via WhatsApp in one tap." },
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
        { q: "Can I edit my page anytime?", a: "Yes — update it from your dashboard whenever you like, changes go live instantly." },
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

export default function LandingPage({ lang = "tr" }) {
  const t = CONTENT[lang];
  const [openFaq, setOpenFaq] = useState(null);
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setExampleIndex((i) => (i + 1) % t.examples.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [t.examples.length]);

  const example = t.examples[exampleIndex];
  const homeHref = lang === "en" ? "/en" : "/";

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
            <Link href="/login">{t.nav.login}</Link>
            <Link href={t.langSwitch.href} className="mono" style={{ fontSize: 12.5, color: "var(--c-body)" }}>
              {t.langSwitch.label}
            </Link>
            <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
              {t.nav.start}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="corp-section" style={{ paddingTop: 96 }}>
        <div className="corp-hero-row">
          <div className="corp-hero-copy">
            <div className="corp-eyebrow">{t.hero.eyebrow}</div>
            <h1 className="corp-display" style={{ fontSize: 46, marginTop: 14, lineHeight: 1.12 }}>
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p style={{ color: "var(--c-body)", marginTop: 18, fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>
              {t.hero.desc}
            </p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
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
          </div>

          <div className="corp-hero-visual">
            <div className="corp-mock corp-mock-fade" key={example.handle}>
              <div className="corp-mock-avatar">{example.initial}</div>
              <div className="corp-display" style={{ fontSize: 16 }}>
                {example.name}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 2 }}>
                minebio.net/{example.handle}
              </div>
              {example.links.map((l) => (
                <a className="corp-mock-link" key={l}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kayan şerit */}
      <div className="corp-marquee" aria-hidden="true">
        <div className="corp-marquee-track">
          {[...t.marquee, ...t.marquee].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* Özellikler */}
      <section className="corp-section corp-section-alt" id="ozellikler">
        <div className="corp-eyebrow">{t.features.eyebrow}</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10, maxWidth: 560 }}>
          {t.features.title}
        </h2>
        <div className="corp-grid-3">
          {t.features.items.map((f) => (
            <div className="corp-card" key={f.title}>
              <div className="corp-card-icon">{f.icon}</div>
              <div className="corp-display" style={{ fontSize: 16 }}>
                {f.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 8, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section className="corp-section">
        <div className="corp-eyebrow">{t.steps.eyebrow}</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10 }}>
          {t.steps.title}
        </h2>
        <div className="corp-steps">
          {t.steps.items.map((s, i) => (
            <div key={s.title}>
              <div className="corp-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="corp-display" style={{ fontSize: 16, marginTop: 10 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="corp-section corp-section-alt" id="sss" style={{ maxWidth: 720 }}>
        <div className="corp-eyebrow">{t.faq.eyebrow}</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10, marginBottom: 24 }}>
          {t.faq.title}
        </h2>
        {t.faq.items.map((item, i) => (
          <div className="corp-faq-item" key={item.q}>
            <button className="corp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {item.q}
              <span style={{ color: "var(--c-accent)", fontSize: 18 }}>{openFaq === i ? "–" : "+"}</span>
            </button>
            {openFaq === i && <p className="corp-faq-a">{item.a}</p>}
          </div>
        ))}
      </section>

      {/* Kapanış CTA */}
      <section className="corp-section" style={{ textAlign: "center" }}>
        <h2 className="corp-display" style={{ fontSize: 30 }}>
          {t.closing.title}
        </h2>
        <p style={{ color: "var(--c-body)", fontSize: 15, marginTop: 10 }}>{t.closing.desc}</p>
        <Link href="/login" className="corp-btn" style={{ marginTop: 22 }}>
          {t.nav.start}
        </Link>
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

        <div className="row" style={{ maxWidth: 1080, margin: "28px auto 0", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: "#9aa3b2" }}>{t.footer.payment}</span>
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
