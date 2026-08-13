import Link from "next/link";

export const metadata = { title: "Gizlilik Politikası — MineBio" };

export default function GizlilikPolitikasi() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Gizlilik Politikası
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="legal-notice">
          Bu metin genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine
          geçmez. Yayınlamadan önce bir avukata / KVKK danışmanına
          gözden geçirtmenizi öneririz.
        </div>

        <h2>1. Kimiz</h2>
        <p>
          MineBio ("biz", "site"), kullanıcıların sosyal medya, mağaza ve
          iletişim bağlantılarını tek bir sayfada topladığı bir hizmettir. Bu
          politika, hem MineBio'yı kullanan işletme sahiplerinin
          ("kullanıcı") hem de onların sayfalarını ziyaret eden kişilerin
          ("ziyaretçi") verilerini nasıl işlediğimizi açıklar.
        </p>

        <h2>2. Topladığımız veriler</h2>
        <p><strong>Kullanıcılardan (hesap sahiplerinden):</strong></p>
        <ul>
          <li>E-posta adresi (giriş için)</li>
          <li>Google ile giriş yapılırsa Google hesabından gelen ad ve e-posta</li>
          <li>Profil bilgileri: görünen isim, kısa tanıtım metni, yüklenen profil fotoğrafı</li>
          <li>Eklenen sosyal medya / mağaza bağlantıları</li>
          <li>Panelde kaydedilen kişi bilgileri (isim, telefon, şirket) — bu veriler kullanıcının kendi girdiği üçüncü kişi verileridir</li>
        </ul>
        <p><strong>Ziyaretçilerden:</strong></p>
        <ul>
          <li>İletişim formu doldurulursa: isim, telefon, e-posta (opsiyonel), mesaj içeriği</li>
          <li>Sayfa görüntülenme ve link tıklama sayıları (istatistiksel, kişiye özel takip yapılmaz)</li>
        </ul>

        <h2>3. Verileri nasıl kullanıyoruz</h2>
        <ul>
          <li>Hesabınızı oluşturmak ve sayfanızı yayınlamak için</li>
          <li>Panelinizde istatistik göstermek için</li>
          <li>Ziyaretçi mesajlarını size iletmek için</li>
          <li>Hizmeti iyileştirmek ve güvenliği sağlamak için</li>
          <li>Ücretsiz planda, ileride reklam gösterimi için (bkz. Çerez Politikası)</li>
        </ul>

        <h2>4. Verileri kimlerle paylaşıyoruz</h2>
        <p>
          Verileriniz, hizmeti sağlamamıza yardımcı olan şu alt yüklenicilerde
          barınır: veritabanı ve kimlik doğrulama için Supabase, barındırma
          için Vercel, Google ile giriş özelliği için Google. Reklam
          entegrasyonu sonrası Google AdSense de reklam gösterimi amacıyla
          sınırlı veriye (çerezler üzerinden) erişebilecektir. Verilerinizi
          bunların dışında üçüncü taraflara satmıyoruz.
        </p>

        <h2>5. Veri saklama</h2>
        <p>
          Verileriniz hesabınız aktif olduğu sürece saklanır. Hesabınızı
          silmek isterseniz bizimle iletişime geçebilirsiniz.
        </p>

        <h2>6. Haklarınız</h2>
        <p>
          Verilerinize erişme, düzeltme, silinmesini talep etme ve işlenmesine
          itiraz etme hakkına sahipsiniz. Türkiye'de KVKK kapsamındaki
          haklarınız için ayrıca KVKK Aydınlatma Metni'ne bakabilirsiniz.
        </p>

        <h2>7. İletişim</h2>
        <p>
          Gizlilikle ilgili sorularınız için:{" "}
          <strong>[buraya iletişim e-postanızı ekleyin]</strong>
        </p>
      </div>
    </div>
  );
}
