import Link from "next/link";

export const metadata = { title: "Kullanım Koşulları — MineBio" };

export default function KullanimKosullari() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Kullanım Koşulları
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h2>1. Hizmetin tanımı</h2>
        <p>
          MineBio, kullanıcıların bağlantılarını tek bir sayfada
          toplayabildiği bir hizmettir. Ücretsiz ve Premium plan seçenekleri
          sunar.
        </p>

        <h2>2. Hesap sorumluluğu</h2>
        <ul>
          <li>Hesabınızla ilgili tüm işlemlerden siz sorumlusunuz.</li>
          <li>
            Sayfanızda paylaştığınız içerikten (metin, görsel, bağlantılar)
            siz sorumlusunuz; içeriğin doğruluğunu ve yasalara uygunluğunu
            garanti etmeniz gerekir.
          </li>
        </ul>

        <h2>3. Yasaklı kullanım</h2>
        <p>MineBio'yı şu amaçlarla kullanamazsınız:</p>
        <ul>
          <li>Yasa dışı, aldatıcı veya dolandırıcılık içerikli sayfalar oluşturmak</li>
          <li>Başkalarının fikri mülkiyet haklarını ihlal eden içerik paylaşmak</li>
          <li>Zararlı yazılım veya kimlik avı bağlantıları eklemek</li>
          <li>Sistemi kötüye kullanmak (aşırı otomatik istek, güvenlik açığı istismarı vb.)</li>
        </ul>
        <p>Bu kurallara uymayan hesapları askıya alma hakkımız saklıdır.</p>

        <h2>4. Ücretli plan ve iptal</h2>
        <p>
          Premium plan, ek özellikler (sınırsız link, tüm temalar, reklamsız
          deneyim gibi) sunan ücretli bir abonelik olacaktır. Ödeme
          entegrasyonu tamamlandığında fiyatlandırma ve iptal koşulları bu
          bölümde detaylandırılacaktır.
        </p>

        <h2>5. Sorumluluğun sınırlandırılması</h2>
        <p>
          Hizmeti "olduğu gibi" sunuyoruz. Kesintisiz veya hatasız çalışacağını
          garanti etmiyoruz. Yasaların izin verdiği ölçüde, hizmetin
          kullanımından doğabilecek dolaylı zararlardan sorumlu değiliz.
        </p>

        <h2>6. Değişiklikler</h2>
        <p>
          Bu koşulları zaman zaman güncelleyebiliriz. Önemli değişikliklerde
          sizi bilgilendireceğiz.
        </p>

        <h2>7. İletişim</h2>
        <p>
          Sorularınız için: <strong>bilgi@bibutikshop.com.tr</strong>
        </p>
      </div>
    </div>
  );
}
