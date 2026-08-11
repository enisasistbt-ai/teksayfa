import Link from "next/link";

export default function Home() {
  return (
    <main className="container" style={{ paddingTop: 80 }}>
      <div className="eyebrow">teksayfa.app</div>
      <h1 className="display" style={{ fontSize: 40, marginTop: 10, lineHeight: 1.1 }}>
        Tüm linklerin,
        <br />
        tek bir vitrinde.
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 15, lineHeight: 1.6 }}>
        Instagram bio'na, WhatsApp'ına, ürün sayfana tek bir link koy.
        Ziyaretçilerin hepsini tek yerde bulsun.
      </p>

      <div style={{ marginTop: 32 }}>
        <Link href="/login">
          <button className="btn">Ücretsiz başla</button>
        </Link>
      </div>

      <div className="tabela" style={{ marginTop: 56 }}>
        <div className="avatar">A</div>
        <h3 style={{ textAlign: "center", fontSize: 18 }}>Ayşe'nin El İşleri</h3>
        <div className="handle mono">teksayfa.app/aysenin-el-isleri</div>
        <a className="link-btn">Instagram'da takip et</a>
        <a className="link-btn">WhatsApp'tan sipariş ver</a>
        <a className="link-btn">Trendyol mağazam</a>
      </div>

      <p className="footer-note">Örnek sayfa — kendi sayfan 2 dakikada hazır.</p>
    </main>
  );
}
