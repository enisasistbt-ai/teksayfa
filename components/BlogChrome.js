import Link from "next/link";

const T = {
  tr: {
    home: "/",
    blogHome: "/blog",
    features: "Özellikler",
    featuresHref: "/#ozellikler",
    pricing: "Fiyatlandırma",
    about: "Hakkımızda",
    aboutHref: "/hakkimizda",
    login: "Giriş yap",
    start: "Ücretsiz başla",
    blog: "Blog",
    tagline: "Bağlantılarını tek sayfada topla, kimin baktığını gör.",
    productTitle: "Ürün",
    legalTitle: "Yasal",
    rights: "Tüm hakları saklıdır.",
    backToBlog: "← Tüm yazılar",
    legalLinks: [
      { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
      { href: "/cerez-politikasi", label: "Çerez Politikası" },
      { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
      { href: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
    ],
  },
  en: {
    home: "/en",
    blogHome: "/en/blog",
    features: "Features",
    featuresHref: "/en#features",
    pricing: "Pricing",
    about: "About",
    aboutHref: "/en/about",
    login: "Log in",
    start: "Start free",
    blog: "Blog",
    tagline: "Bring your links together on one page, see who's looking.",
    productTitle: "Product",
    legalTitle: "Legal",
    rights: "All rights reserved.",
    backToBlog: "← All posts",
    legalLinks: [
      { href: "/gizlilik-politikasi", label: "Privacy Policy" },
      { href: "/cerez-politikasi", label: "Cookie Policy" },
      { href: "/kullanim-kosullari", label: "Terms of Use" },
      { href: "/kvkk-aydinlatma-metni", label: "Data Protection Notice" },
    ],
  },
};

export function BlogNav({ lang = "tr" }) {
  const t = T[lang];
  return (
    <nav className="corp-nav">
      <div className="corp-nav-inner">
        <Link href={t.home} className="row" style={{ gap: 9, flexShrink: 0, textDecoration: "none" }}>
          <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
          <span className="corp-display" style={{ fontSize: 16 }}>
            MineBio
          </span>
        </Link>
        <div className="corp-nav-secondary">
          <Link href={t.featuresHref}>{t.features}</Link>
          <Link href="/fiyatlandirma">{t.pricing}</Link>
          <Link href={t.aboutHref}>{t.about}</Link>
          <Link href={t.blogHome}>{t.blog}</Link>
          <Link href="/login">{t.login}</Link>
          <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
            {t.start}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function BlogFooter({ lang = "tr" }) {
  const t = T[lang];
  return (
    <footer className="corp-footer">
      <div className="corp-footer-grid">
        <div style={{ flex: "1 1 220px", maxWidth: 260 }}>
          <div className="row" style={{ gap: 8 }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 20, height: 20 }} />
            <span className="corp-display" style={{ fontSize: 14 }}>
              MineBio
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 12, lineHeight: 1.6 }}>{t.tagline}</p>
        </div>

        <div className="corp-footer-col">
          <div className="corp-footer-col-title">{t.productTitle}</div>
          <Link href={t.featuresHref}>{t.features}</Link>
          <Link href="/fiyatlandirma">{t.pricing}</Link>
          <Link href={t.aboutHref}>{t.about}</Link>
          <Link href={t.blogHome}>{t.blog}</Link>
        </div>

        <div className="corp-footer-col">
          <div className="corp-footer-col-title">{t.legalTitle}</div>
          {t.legalLinks.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="corp-footer-bottom">
        © {new Date().getFullYear()} MineBio. {t.rights}
      </div>
    </footer>
  );
}

export function BlogCover({ src, alt }) {
  if (!src) return null;
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 18,
        background: "var(--c-bg-alt)",
      }}
    >
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

export function renderBlocks(content) {
  return content.map((block, i) => {
    if (block.h2) {
      return (
        <h2 key={i} style={{ fontSize: 21, marginTop: 38, marginBottom: 4 }} className="corp-display">
          {block.h2}
        </h2>
      );
    }
    return (
      <p key={i} style={{ marginTop: 18, fontSize: 16, lineHeight: 1.85, color: "var(--c-body)" }}>
        {block.p}
      </p>
    );
  });
}

export const blogT = T;
