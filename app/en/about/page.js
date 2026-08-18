import Link from "next/link";

export const metadata = {
  title: "About Us — MineBio",
  description:
    "MineBio exists to bring your entire online presence together on one professional page. Read our story and what we care about.",
  alternates: {
    canonical: "https://www.minebio.net/en/about",
    languages: {
      tr: "https://www.minebio.net/hakkimizda",
      en: "https://www.minebio.net/en/about",
    },
  },
};

const PILLARS = [
  { title: "One Link", desc: "Bring everything together" },
  { title: "A Professional Look", desc: "Represent your brand right" },
  { title: "Real-Time Insight", desc: "See who's looking, what they click" },
  { title: "Save Time", desc: "No more link chaos" },
];

export default function About() {
  return (
    <div className="corp-landing">
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <Link href="/en" className="row" style={{ gap: 9, flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
            <span className="corp-display" style={{ fontSize: 16 }}>
              MineBio
            </span>
          </Link>
          <div className="corp-nav-secondary">
            <Link href="/en#ozellikler">Features</Link>
            <Link href="/fiyatlandirma">Pricing</Link>
            <Link href="/en/about">About</Link>
            <Link href="/login">Log in</Link>
            <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <section className="corp-section" style={{ paddingTop: 80, maxWidth: 760 }}>
        <div className="corp-eyebrow">about us</div>
        <h1 className="corp-display" style={{ fontSize: 40, marginTop: 12, lineHeight: 1.15 }}>
          Your business now lives in one link.
        </h1>

        <div className="corp-grid-3" style={{ marginTop: 36 }}>
          {PILLARS.map((p) => (
            <div className="corp-card" key={p.title} style={{ padding: "18px 20px" }}>
              <div className="corp-display" style={{ fontSize: 15 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, fontSize: 16, lineHeight: 1.85, color: "var(--c-body)" }}>
          <p>
            As every part of our lives goes digital, the way we do business is
            changing too. A business today doesn't live in just one place —
            it exists on Instagram, on WhatsApp, on a marketplace, and on its
            own website, all at once. That presence makes it easier to reach
            customers, but harder to get the right information to the right
            person at the right time.
          </p>

          <p style={{ marginTop: 20 }}>
            <strong>That's exactly why we built MineBio:</strong> to bring
            your entire online presence — your business's, or your own —
            together on one clean, professional page.
          </p>

          <p style={{ marginTop: 20 }}>
            Your social media, your shop, your contact info, your booking
            link — all in the one link you'll ever need to share. Put it in
            your business card, your email signature, your Instagram bio, and
            visitors land exactly where they need to, in seconds. See who's
            viewing your page and which link they click — and grow your
            business with real data, not guesswork.
          </p>

          <p style={{ marginTop: 20 }}>
            MineBio grew out of the everyday needs of a real e-commerce
            business — so every feature is something a real business owner
            actually uses. Today, MineBio serves a growing community both in
            Turkey and internationally — shop owners, freelancers, small
            businesses, and creators alike.
          </p>

          <h2 style={{ fontSize: 22, marginTop: 44 }}>What we care about</h2>

          <div style={{ marginTop: 20, display: "grid", gap: 18 }}>
            <div>
              <strong>Simplicity.</strong> No code, no complicated settings.
              Fill in your panel, and your page is ready.
            </div>
            <div>
              <strong>Fair pricing.</strong> There will always be a free plan.
              If you go Premium, you'll get real value for it.
            </div>
            <div>
              <strong>Data security.</strong> Your payment details never touch
              our servers — they're handled by trusted payment providers. Your
              personal data is protected in line with data protection
              regulations.
            </div>
            <div>
              <strong>Real feedback, real improvement.</strong> MineBio keeps
              evolving — shaped by feedback from the people who use it.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/login" className="corp-btn">
            Start free
          </Link>
        </div>
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
              Bring your links together on one page, see who's looking.
            </p>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Product</div>
            <Link href="/en#ozellikler">Features</Link>
            <Link href="/fiyatlandirma">Pricing</Link>
            <Link href="/en/about">About</Link>
            <Link href="/login">Log in</Link>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Legal</div>
            <Link href="/gizlilik-politikasi">Privacy Policy</Link>
            <Link href="/cerez-politikasi">Cookie Policy</Link>
            <Link href="/kullanim-kosullari">Terms of Use</Link>
            <Link href="/kvkk-aydinlatma-metni">Data Protection Notice</Link>
            <Link href="/acik-riza-metni">Consent Notice</Link>
            <Link href="/mesafeli-satis-sozlesmesi">Distance Sales Agreement</Link>
            <Link href="/teslimat-ve-iade-kosullari">Delivery & Refund Policy</Link>
          </div>
        </div>

        <div className="corp-footer-bottom">© {new Date().getFullYear()} MineBio. All rights reserved.</div>
      </footer>
    </div>
  );
}
