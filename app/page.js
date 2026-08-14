import Link from "next/link";

export const metadata = { title: "Teslimat ve İade Koşulları — MineBio" };

export default function TeslimatVeIade() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Teslimat ve İade Koşulları
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <h2>1. Ürünün niteliği</h2>
        <p>
          MineBio Premium, fiziksel bir ürün değil, elektronik ortamda sunulan
          bir dijital abonelik hizmetidir. Bu nedenle kargo, teslimat süresi
          veya teslimat masrafı söz konusu değildir.
        </p>

        <h2>2. Teslimat</h2>
        <p>
          Ödemeniz iyzico güvenli ödeme altyapısı üzerinden başarıyla
          onaylandığı anda, Premium plan hesabınıza otomatik olarak
          tanımlanır ve panelinizden anında kullanılmaya başlanabilir. Ayrıca
          bir kargo/teslimat süreci veya ek bir ücret bulunmamaktadır.
        </p>

        <h2>3. Cayma hakkı</h2>
        <p>
          6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
          Sözleşmeler Yönetmeliği'nin 15/1-ğ maddesi uyarınca,{" "}
          <strong>
            elektronik ortamda anında ifa edilen hizmetler ve tüketiciye
            anında teslim edilen gayrimaddi mallar
          </strong>{" "}
          için cayma hakkı bulunmamaktadır. Premium plan, satın alma anında
          hesabınıza anında tanımlandığından bu istisna kapsamındadır. Satın
          alma sırasında bu durumu onaylamanız istenir.
        </p>

        <h2>4. İptal</h2>
        <p>
          Otomatik yenilenen aboneliğinizi dilediğiniz zaman panelinizden
          iptal edebilirsiniz. İptal ettiğinizde:
        </p>
        <ul>
          <li>Mevcut ödediğiniz dönem sonuna kadar Premium erişiminiz devam eder</li>
          <li>Dönem bitiminde otomatik yenileme gerçekleşmez, hesabınız Ücretsiz plana döner</li>
          <li>Kısmi kullanım için orantısal iade yapılmaz</li>
        </ul>

        <h2>5. İstisnai iade durumları</h2>
        <p>
          Sistemsel bir hata sonucu ödemenizin mükerrer alınması veya
          hizmetin tarafımızdan kaynaklanan bir nedenle hiç sunulamaması gibi
          durumlarda, tarafımıza ulaşmanız halinde durum incelenir ve haklı
          bulunması hâlinde ücret iade edilir.
        </p>

        <h2>6. İletişim</h2>
        <p>
          Teslimat ve iade ile ilgili sorularınız için:{" "}
          <strong>bilgi@bibutikshop.com.tr</strong>
        </p>

        <p style={{ marginTop: 20 }}>
          Ödeme koşulları ve taraflara ilişkin diğer detaylar için{" "}
          <Link href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</Link>'ni
          inceleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
