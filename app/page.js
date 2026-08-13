import Link from "next/link";

const FEATURES = [
  {
    icon: "🎨",
    title: "Kişiselleştirilebilir temalar",
    desc: "Vitrin, Kahve, Deniz, Güneş — markana uygun görünümü seç.",
  },
  {
    icon: "📊",
    title: "Anlık istatistikler",
    desc: "Sayfan kaç kez görüntülendi, hangi link kaç tıklama aldı — panelinde canlı.",
  },
  {
    icon: "📱",
    title: "Markalı QR kod",
    desc: "Ortasında fotoğrafın ve isminle, vitrinde ya da kartvizitte bastırmaya hazır.",
  },
  {
    icon: "📇",
    title: "Rehbere kaydet",
    desc: "Ziyaretçi tek tıkla seni telefonuna gerçek bir kişi olarak kaydedebilir.",
  },
  {
    icon: "💬",
    title: "İletişim formu",
    desc: "Ziyaretçiler doğrudan sana mesaj bıraksın, WhatsApp'a gitmelerine gerek kalmasın.",
  },
  {
    icon: "👥",
    title: "Kişi yönetimi",
    desc: "Tanıştığın kişileri kaydet, sayfanı tek tıkla WhatsApp'tan paylaş.",
  },
  {
    icon: "🌍",
    title: "TR / EN",
    desc: "Yabancı müşterilerin için sayfan İngilizce'ye de geçebiliyor.",
  },
  {
    icon: "🏖️",
    title: "Mola modu",
    desc: "Tatildeyken ya da yoğun günlerde ziyaretçileri otomatik bilgilendir.",
  },
];

const STEPS = [
  { title: "Ücretsiz kaydol", desc: "E-posta ya da Google ile saniyeler içinde hesabını aç." },
  { title: "Sayfanı doldur", desc: "Instagram, WhatsApp, mağazan — hepsini panelden ekle." },
  { title: "Linkini paylaş", desc: "Bio'na, kartvizitine, QR koduna koy — hazır." },
];

export default function Home() {
  return (
    <main className="wide-container" style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div className="eyebrow">teksayfa.app</div>
      <h1 className="display" style={{ fontSize: 42, marginTop: 10, lineHeight: 1.1, maxWidth: 520 }}>
        Tüm linklerin,
        <br />
        tek bir vitrinde.
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 15, lineHeight: 1.6, maxWidth: 440 }}>
        Instagram bio'na, WhatsApp'ına, ürün sayfana tek bir link koy.
        Ziyaretçilerin hepsini tek yerde bulsun, sen de kimin baktığını gör.
      </p>

      <div className="row" style={{ marginTop: 28, gap: 12 }}>
        <Link href="/login">
          <button className="btn">Ücretsiz başla</button>
        </Link>
        <Link href="/fiyatlandirma">
          <button className="btn-ghost">Fiyatlandırma</button>
        </Link>
      </div>

      <div className="tabela" style={{ marginTop: 48, maxWidth: 340 }}>
        <div className="avatar">A</div>
        <h3 style={{ textAlign: "center", fontSize: 18 }}>Ayşe'nin El İşleri</h3>
        <div className="handle mono">teksayfa.app/aysenin-el-isleri</div>
        <a className="link-btn">Instagram'da takip et</a>
        <a className="link-btn">WhatsApp'tan sipariş ver</a>
        <a className="link-btn">Trendyol mağazam</a>
      </div>
      <p className="footer-note" style={{ marginBottom: 0 }}>
        Örnek sayfa — kendi sayfan 2 dakikada hazır.
      </p>

      {/* Özellikler */}
      <div style={{ marginTop: 72 }}>
        <div className="eyebrow">neler yapabilirsin</div>
        <h2 className="display" style={{ fontSize: 26, marginTop: 8 }}>
          Küçük işletmenin dijital vitrini
        </h2>
        <div style={{ marginTop: 10 }}>
          {FEATURES.map((f) => (
            <div className="feature-row" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nasıl çalışır */}
      <div style={{ marginTop: 56 }}>
        <div className="eyebrow">nasıl çalışır</div>
        <h2 className="display" style={{ fontSize: 26, marginTop: 8 }}>
          3 adımda yayında
        </h2>
        <div style={{ marginTop: 16 }}>
          {STEPS.map((s, i) => (
            <div key={s.title} className="row" style={{ alignItems: "flex-start", gap: 14, marginTop: i === 0 ? 0 : 18 }}>
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
      <div className="tabela" style={{ marginTop: 56, textAlign: "center", padding: "36px 24px" }}>
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

      <p className="footer-note">© {new Date().getFullYear()} TekSayfa</p>
    </main>
  );
}
