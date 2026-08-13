import Link from "next/link";

const PILLARS = [
  {
    eyebrow: "görünüm",
    title: "Vitrin gibi, ama cepte.",
    desc: "Ziyaretçi sayfana girdiği ilk saniyede işini ciddiye aldığını anlasın. Kendi renklerinle, kendi fotoğrafınla, markalı bir görünüm.",
    tags: ["4 tema seçeneği", "Markalı QR kod", "Otomatik paylaşım görseli", "Rehbere kaydet butonu"],
  },
  {
    eyebrow: "takip",
    title: "Kimin baktığını gör.",
    desc: "Hangi linkin işe yaradığını, sayfanın kaç kez görüntülendiğini panelinden anlık takip et. Tahmin etmeyi bırak.",
    tags: ["Görüntülenme sayacı", "Link bazlı tıklama takibi", "Ziyaretçi mesaj formu"],
  },
  {
    eyebrow: "ilişki",
    title: "Bağlantıyı kaybetme.",
    desc: "Tanıştığın müşteriyi kaydet, sayfanı WhatsApp'tan tek tıkla gönder. Tatildeysen ziyaretçiyi otomatik bilgilendir.",
    tags: ["WhatsApp'tan tek tık paylaşım", "Kişi defteri", "Mola modu bildirimi", "TR / EN desteği"],
  },
];

const STEPS = [
  { title: "Ücretsiz kaydol", desc: "E-posta ya da Google ile saniyeler içinde hesabını aç." },
  { title: "Sayfanı doldur", desc: "Instagram, WhatsApp, mağazan — hepsini panelden ekle." },
  { title: "Linkini paylaş", desc: "Bio'na, kartvizitine, QR koduna koy — hazır." },
];

export default function Home() {
  return (
    <main className="wide-container" style={{ paddingTop: 8 }}>
      <nav className="nav-bar">
        <div className="nav-brand">
          <span className="nav-mark" />
          TekSayfa
        </div>
        <Link href="/login" className="mono" style={{ fontSize: 13, color: "var(--muted)" }}>
          Giriş yap
        </Link>
      </nav>

      {/* Hero */}
      <div className="hero-row">
        <div className="hero-copy">
          <div className="eyebrow">esnafın dijital vitrini</div>
          <h1 className="display" style={{ fontSize: 44, marginTop: 12, lineHeight: 1.08 }}>
            Sat, takip et,
            <br />
            unutma.
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 18, fontSize: 15, lineHeight: 1.65, maxWidth: 420 }}>
            Instagram bio'n, WhatsApp'ın, mağazan — hepsi dağınık. TekSayfa bunları
            tek, profesyonel bir sayfada toplar; sen de kimin baktığını, kimin
            mesaj bıraktığını görürsün.
          </p>
          <div className="row" style={{ marginTop: 28, gap: 12 }}>
            <Link href="/login">
              <button className="btn">Ücretsiz başla</button>
            </Link>
            <Link href="/fiyatlandirma">
              <button className="btn-ghost">Fiyatlandırma</button>
            </Link>
          </div>
        </div>

        <div className="hero-demo-wrap">
          <div className="hero-glow" />
          <div className="tabela">
            <div className="avatar">A</div>
            <h3 style={{ textAlign: "center", fontSize: 18 }}>Ayşe'nin El İşleri</h3>
            <div className="handle mono">teksayfa.app/aysenin-el-isleri</div>
            <a className="link-btn">Instagram'da takip et</a>
            <a className="link-btn">WhatsApp'tan sipariş ver</a>
            <a className="link-btn">Trendyol mağazam</a>
          </div>
        </div>
      </div>

      <hr className="section-divider" />

      {/* Fayda odaklı bölümler */}
      <div style={{ marginTop: 8 }}>
        {PILLARS.map((p) => (
          <div className="pillar" key={p.title}>
            <div className="eyebrow">{p.eyebrow}</div>
            <h2 className="display" style={{ fontSize: 26, marginTop: 8, maxWidth: 480 }}>
              {p.title}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.6, maxWidth: 460 }}>
              {p.desc}
            </p>
            <div className="tag-list">
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" />

      {/* Nasıl çalışır */}
      <div style={{ marginTop: 56 }}>
        <div className="eyebrow">nasıl çalışır</div>
        <h2 className="display" style={{ fontSize: 26, marginTop: 8 }}>
          3 adımda yayında
        </h2>
        <div style={{ marginTop: 20 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="row"
              style={{ alignItems: "flex-start", gap: 14, marginTop: i === 0 ? 0 : 18 }}
            >
              <div className="step-num">{i + 1}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kapanış CTA */}
      <div className="tabela" style={{ marginTop: 64, marginBottom: 56, textAlign: "center", padding: "40px 28px", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
        <h2 className="display" style={{ fontSize: 22 }}>
          Sayfan seni bekliyor.
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
          Kredi kartı gerekmez, 2 dakikada başla.
        </p>
        <Link href="/login">
          <button className="btn" style={{ marginTop: 16 }}>
            Ücretsiz başla
          </button>
        </Link>
      </div>

      <div className="row" style={{ justifyContent: "space-between", paddingBottom: 32, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
          © {new Date().getFullYear()} TekSayfa
        </span>
        <Link href="/fiyatlandirma" className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
          Fiyatlandırma
        </Link>
      </div>
    </main>
  );
}
