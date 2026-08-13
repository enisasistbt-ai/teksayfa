import Link from "next/link";

export const metadata = { title: "Çerez Politikası — MineBio" };

export default function CerezPolitikasi() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Çerez Politikası
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h2>1. Çerez nedir</h2>
        <p>
          Çerezler, bir siteyi ziyaret ettiğinizde tarayıcınıza kaydedilen
          küçük metin dosyalarıdır. Sitenin sizi hatırlamasını ve düzgün
          çalışmasını sağlarlar.
        </p>

        <h2>2. Kullandığımız çerezler</h2>
        <p><strong>Zorunlu çerezler</strong></p>
        <ul>
          <li>
            Oturum açma durumunuzu hatırlamak için (Supabase kimlik
            doğrulama). Bunlar olmadan panele giriş yapamazsınız.
          </li>
        </ul>
        <p><strong>Reklam çerezleri (ücretsiz planda, ileride)</strong></p>
        <ul>
          <li>
            Ücretsiz plan kullanıcılarının sayfalarında Google AdSense
            aracılığıyla reklam gösterildiğinde, Google ve reklam ortakları
            ilgi alanına dayalı reklam göstermek amacıyla çerez
            kullanabilir. Bu çerezleri Google'ın{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Reklam Politikaları
            </a>{" "}
            sayfasından ve{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google Reklam Ayarları
            </a>
            'ndan yönetebilirsiniz.
          </li>
        </ul>

        <h2>3. Çerezleri nasıl kontrol edersiniz</h2>
        <p>
          Çoğu tarayıcı, çerezleri tarayıcı ayarlarından engellemenize veya
          silmenize izin verir. Zorunlu çerezleri engellerseniz sitenin bazı
          bölümleri (örneğin panele giriş) çalışmayabilir.
        </p>

        <h2>4. İletişim</h2>
        <p>
          Sorularınız için: <strong>bilgi@bibutikshop.com.tr</strong>
        </p>
      </div>
    </div>
  );
}
