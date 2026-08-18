import Link from "next/link";

export const metadata = {
  title: "Hakkımızda — MineBio",
  description:
    "MineBio, işletmenizin tüm dijital varlığını tek bir profesyonel sayfada buluşturmak için var. Hikayemizi ve neye önem verdiğimizi öğrenin.",
  alternates: {
    canonical: "https://www.minebio.net/hakkimizda",
    languages: {
      tr: "https://www.minebio.net/hakkimizda",
      en: "https://www.minebio.net/en/about",
    },
  },
};

const PILLARS = [
  { title: "Tek Bağlantı", desc: "Her şeyi tek yerde topla" },
  { title: "Profesyonel Görünüm", desc: "Markanı doğru yansıt" },
  { title: "Anlık İçgörü", desc: "Kim baktı, ne tıkladı gör" },
  { title: "Zaman Kazan", desc: "Bağlantı karmaşasına son" },
];

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

      <section className="corp-section" style={{ paddingTop: 80, maxWidth: 760 }}>
        <div className="corp-eyebrow">hakkımızda</div>
        <h1 className="corp-display" style={{ fontSize: 40, marginTop: 12, lineHeight: 1.15 }}>
          İşin artık tek bir bağlantıda toplanıyor.
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
            Hayatımızın her alanı dijitalleşirken, iş yapma biçimimiz de
            değişiyor. Bugün bir işletme artık tek bir yerde değil —
            Instagram'da, WhatsApp'ta, bir pazaryerinde, kendi web sitesinde
            aynı anda var oluyor. Bu çoklu varlık, müşterilere ulaşmayı
            kolaylaştırdığı kadar, doğru bilgiyi doğru zamanda doğru kişiye
            ulaştırmayı da zorlaştırıyor.
          </p>

          <p style={{ marginTop: 20 }}>
            <strong>MineBio'yu tam da bu ihtiyaçtan yola çıkarak kurduk:</strong>{" "}
            işletmenizin — ya da sizin — tüm dijital varlığınızı, tek, sade ve
            profesyonel bir sayfada buluşturmak için.
          </p>

          <p style={{ marginTop: 20 }}>
            Sosyal medya hesaplarınız, mağazanız, iletişim bilgileriniz,
            randevu bağlantınız — hepsi artık paylaşacağınız tek bir linkte.
            Kartvizitinize, e-posta imzanıza, Instagram bio'nuza koyacağınız bu
            link, ziyaretçilerinizi doğru yere saniyeler içinde yönlendiriyor.
            Kimin sayfanıza baktığını, hangi linke tıkladığını görün —
            işinizi büyütürken verilerle karar verin.
          </p>

          <p style={{ marginTop: 20 }}>
            MineBio, gerçek bir e-ticaret işletmesinin günlük ihtiyaçlarından
            doğdu — bu yüzden her özelliği, gerçek bir işletme sahibinin
            gerçekten kullandığı bir şey. Bugün MineBio, hem Türkiye'de hem
            yurt dışında, esnaftan serbest çalışana, küçük işletmelerden
            içerik üreticilerine kadar geniş bir kullanıcı kitlesine hizmet
            veriyor.
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
