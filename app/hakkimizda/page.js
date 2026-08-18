import Link from "next/link";

export const metadata = {
  title: "Hakkımızda — MineBio",
  description:
    "MineBio'nun hikayesi — bir e-ticaret esnafının kendi ihtiyacından doğan, dağınık linkleri tek sayfada toplayan araç.",
  alternates: {
    canonical: "https://www.minebio.net/hakkimizda",
  },
};

export default function Hakkimizda() {
  return (
    <div className="corp-landing">
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <Link href="/" className="row" style={{ gap: 9, flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
            <span className="corp-display" style={{ fontSize: 16 }}>
              MineBio
            </span>
          </Link>
          <div className="corp-nav-secondary">
            <Link href="/#ozellikler">Özellikler</Link>
            <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/login">Giriş yap</Link>
            <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
              Ücretsiz başla
            </Link>
          </div>
        </div>
      </nav>

      <section className="corp-section" style={{ paddingTop: 80, maxWidth: 720 }}>
        <div className="corp-eyebrow">hikayemiz</div>
        <h1 className="corp-display" style={{ fontSize: 38, marginTop: 12, lineHeight: 1.15 }}>
          Kendi ihtiyacımızdan doğdu.
        </h1>

        <div style={{ marginTop: 32, fontSize: 16, lineHeight: 1.85, color: "var(--c-body)" }}>
          <p>
            Ben Enis — Bibutikshop adıyla el yapımı ve hediyelik ürünler (örgü
            aksesuarlar, anahtarlıklar ve daha fazlası) satan bir esnafım.
            Ürünlerimi Instagram'da, Trendyol'da, Hepsiburada'da ve kendi web
            sitemde satıyorum.
          </p>

          <p style={{ marginTop: 20 }}>
            Sorun şuydu: Instagram bio'ma tek bir link koyabiliyordum. Ama benim
            paylaşacak birden fazla şeyim vardı — mağazam, WhatsApp'ım,
            Trendyol sayfam, iletişim bilgilerim. Her seferinde "hangi linki
            koysam" diye düşünüyor, müşterilerimi doğru yere yönlendirmekte
            zorlanıyordum.
          </p>

          <p style={{ marginTop: 20 }}>
            Piyasadaki çözümlere baktım — ya çok pahalıydı, ya gereğinden
            karmaşıktı, ya da benim gibi küçük bir işletme sahibinin gerçekte
            neye ihtiyacı olduğunu anlamıyordu. Ben de kendi ihtiyacım için bir
            şey yapmaya karar verdim: <strong>MineBio</strong>.
          </p>

          <p style={{ marginTop: 20 }}>
            Amaç basitti — sosyal medyamı, mağazamı ve iletişim bilgilerimi tek,
            sade ve profesyonel bir sayfada toplamak. Zamanla bunun sadece benim
            değil, benim gibi çalışan onlarca esnafın, serbest çalışanın ve
            küçük işletme sahibinin de ihtiyacı olduğunu gördüm.
          </p>

          <p style={{ marginTop: 20 }}>
            Bugün MineBio, hem Türkiye'de hem yurt dışında kullanılan, gerçek
            bir ürün. Küçük başladı, hâlâ küçük bir ekiple (aslında sadece
            benimle) ilerliyor — ama her özelliği, gerçek bir işletme sahibinin
            gerçek bir ihtiyacından doğuyor.
          </p>

          <h2 style={{ fontSize: 22, marginTop: 44 }}>Neye önem veriyoruz</h2>

          <div style={{ marginTop: 20, display: "grid", gap: 18 }}>
            <div>
              <strong>Basitlik.</strong> Kod bilmene gerek yok, karmaşık
              ayarlarla uğraşmana gerek yok. Panelden doldur, sayfan hazır.
            </div>
            <div>
              <strong>Adil fiyatlandırma.</strong> Ücretsiz bir plan her zaman
              olacak. Premium'a geçmek istersen, ödediğinin karşılığını
              gerçekten alacaksın.
            </div>
            <div>
              <strong>Verinin güvenliği.</strong> Ödeme bilgilerin bize hiç
              uğramıyor, güvenilir ödeme sağlayıcıları üzerinden işleniyor.
              Kişisel verilerin KVKK'ya uygun şekilde korunuyor.
            </div>
            <div>
              <strong>Gerçek geri bildirim, gerçek gelişim.</strong> MineBio
              sürekli gelişiyor — kullanıcılardan gelen geri bildirimlerle
              şekilleniyor.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/login" className="corp-btn">
            Ücretsiz başla
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
              Bağlantılarını tek sayfada topla, kimin baktığını gör.
            </p>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Ürün</div>
            <Link href="/#ozellikler">Özellikler</Link>
            <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/login">Giriş yap</Link>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Yasal</div>
            <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
            <Link href="/cerez-politikasi">Çerez Politikası</Link>
            <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
            <Link href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>
            <Link href="/acik-riza-metni">Açık Rıza Metni</Link>
            <Link href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/teslimat-ve-iade-kosullari">Teslimat ve İade Koşulları</Link>
          </div>
        </div>

        <div className="corp-footer-bottom">© {new Date().getFullYear()} MineBio. Tüm hakları saklıdır.</div>
      </footer>
    </div>
  );
}
