import Link from "next/link";

export const metadata = { title: "Mesafeli Satış Sözleşmesi — MineBio" };

export default function MesafeliSatisSozlesmesi() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← MineBio
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Mesafeli Satış Sözleşmesi
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="legal-notice">
          Bu metin, ödeme sistemi (Premium plan) devreye alındığında
          kullanılmak üzere hazırlanmış genel bir taslaktır. Yürürlüğe
          almadan önce şirket bilgilerinizle güncellenmeli ve bir hukuk
          danışmanına onaylatılmalıdır. 6502 sayılı Tüketicinin Korunması
          Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'ne tabidir.
        </div>

        <h2>1. Taraflar</h2>
        <p>
          <strong>Satıcı:</strong> [şirket unvanınızı buraya ekleyin]
          <br />
          <strong>Alıcı:</strong> MineBio üzerinden Premium plan satın alan
          kullanıcı
        </p>

        <h2>2. Konu</h2>
        <p>
          İşbu sözleşme, Alıcı'nın MineBio üzerinden elektronik ortamda
          sipariş verdiği Premium abonelik hizmetinin satışı ve ifasına
          ilişkin tarafların hak ve yükümlülüklerini düzenler.
        </p>

        <h2>3. Ürün / hizmet bilgisi ve bedeli</h2>
        <p>
          Premium plan kapsamı, güncel fiyatı ve fatura periyodu, satın alma
          anında ödeme ekranında ve{" "}
          <Link href="/fiyatlandirma">Fiyatlandırma</Link> sayfasında
          gösterilir.
        </p>

        <h2>4. Ödeme</h2>
        <p>
          Ödemeler, iyzico güvenli ödeme altyapısı üzerinden alınır. Kart
          bilgileriniz tarafımızca saklanmaz.
        </p>

        <h2>5. Cayma hakkı</h2>
        <p>
          Premium plan, elektronik ortamda anında ifa edilen bir dijital
          hizmettir. Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi
          uyarınca, Alıcı'nın hizmetin ifasına açıkça onay verdiği ve cayma
          hakkının kaybolacağını kabul ettiği hizmetlerde cayma hakkı
          kullanılamaz. Bu onay, satın alma sırasında ayrıca alınır.
        </p>

        <h2>6. İptal</h2>
        <p>
          Aboneliğinizi dilediğiniz zaman panelinizden iptal edebilirsiniz.
          İptal, cari fatura döneminin sonunda geçerli olur; dönem içinde
          kısmi iade yapılmaz (aksi açıkça belirtilmedikçe).
        </p>

        <h2>7. Uyuşmazlıkların çözümü</h2>
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığınca her
          yıl belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetleri,
          bu sınırları aşan uyuşmazlıklarda Tüketici Mahkemeleri yetkilidir.
        </p>

        <h2>8. İletişim</h2>
        <p>
          Sorularınız için: <strong>[buraya iletişim e-postanızı ekleyin]</strong>
        </p>
      </div>
    </div>
  );
}
