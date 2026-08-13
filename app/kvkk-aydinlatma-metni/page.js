import Link from "next/link";

export const metadata = { title: "KVKK Aydınlatma Metni — MineBio" };

export default function KvkkAydinlatmaMetni() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          KVKK Aydınlatma Metni
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h2>1. Veri Sorumlusu</h2>
        <p>
          İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
          Kanunu'nun ("Kanun") 10. maddesi uyarınca, veri sorumlusu sıfatıyla{" "}
          <strong>Enis Özbilgir (Şahıs Şirketi)</strong> ("MineBio")
          tarafından hazırlanmıştır.
        </p>

        <h2>2. İşlenen kişisel veriler</h2>
        <p>
          Hesap oluştururken ve hizmeti kullanırken kimlik (ad soyad),
          iletişim (e-posta, telefon), görsel (profil fotoğrafı) ve işlem
          güvenliği (giriş kayıtları) verileriniz işlenir. Sayfanızı ziyaret
          eden kişilerin bıraktığı iletişim formu verileri de aynı kapsamda
          değerlendirilir.
        </p>

        <h2>3. Kişisel verilerin işlenme amacı</h2>
        <ul>
          <li>Hizmetin sunulması ve sözleşmenin ifası</li>
          <li>Hesap güvenliğinin sağlanması</li>
          <li>Müşteri ilişkileri ve destek süreçlerinin yürütülmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>

        <h2>4. Kişisel verilerin aktarılması</h2>
        <p>
          Verileriniz, hizmetin sunulabilmesi için yurt dışında yerleşik
          altyapı sağlayıcılarımız (veritabanı/kimlik doğrulama ve barındırma
          hizmeti veren iş ortaklarımız) ile paylaşılabilir. Bu aktarımlar
          KVKK'nın 9. maddesinde belirtilen şartlara uygun şekilde
          gerçekleştirilir.
        </p>

        <h2>5. Kişisel veri toplamanın yöntemi ve hukuki sebebi</h2>
        <p>
          Verileriniz, web sitemiz ve uygulamamız üzerinden elektronik
          ortamda, sözleşmenin kurulması ve ifası ile açık rızanız hukuki
          sebeplerine dayanılarak toplanmaktadır.
        </p>

        <h2>6. KVKK kapsamındaki haklarınız</h2>
        <p>Kanun'un 11. maddesi uyarınca şu haklara sahipsiniz:</p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Kanun'da öngörülen şartlarda silinmesini/yok edilmesini isteme</li>
          <li>İşlemenin münhasıran otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme</li>
          <li>Kanuna aykırı işlenme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>

        <h2>7. Başvuru yöntemi</h2>
        <p>
          Yukarıdaki haklarınızı kullanmak için taleplerinizi{" "}
          <strong>bilgi@bibutikshop.com.tr</strong> adresine
          iletebilirsiniz.
        </p>
      </div>
    </div>
  );
}
