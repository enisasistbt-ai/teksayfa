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
        <h2>1. Taraflar</h2>
        <p>
          <strong>Satıcı (Satıcı/Sağlayıcı):</strong>
          <br />
          Ünvan: Enis Özbilgir (Şahıs Şirketi)
          <br />
          E-posta: bilgi@bibutikshop.com.tr
          <br />
          Web sitesi: minebio.net
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Alıcı:</strong> MineBio üzerinden Premium plan satın alan,
          kayıt sırasında ad, e-posta ve fatura bilgilerini beyan eden
          kullanıcı ("Alıcı"/"Tüketici").
        </p>

        <h2>2. Konu</h2>
        <p>
          İşbu sözleşme, Alıcı'nın MineBio (minebio.net) üzerinden elektronik
          ortamda sipariş verdiği Premium abonelik hizmetinin satışı ve
          ifasına ilişkin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun
          ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların
          hak ve yükümlülüklerini düzenler.
        </p>

        <h2>3. Ürün / hizmet bilgisi ve bedeli</h2>
        <p>
          Sözleşme konusu hizmet, MineBio Premium abonelik planıdır (sınırsız
          link, tüm temalar, istatistikler ve diğer Premium özellikler).
          Kapsamı, güncel fiyatı (KDV dahil) ve fatura periyodu (aylık/yıllık),
          satın alma anında ödeme ekranında ve{" "}
          <Link href="/fiyatlandirma">Fiyatlandırma</Link> sayfasında
          gösterilir. Alıcı, ödeme yapmadan önce bu bilgileri onaylar.
        </p>

        <h2>4. Teslimat</h2>
        <p>
          MineBio Premium dijital bir hizmet olduğundan kargo ile teslimat
          söz konusu değildir. Ödeme iyzico tarafından onaylandığı anda
          Premium erişimi Alıcı'nın hesabına otomatik ve anında tanımlanır.
          Detaylar için{" "}
          <Link href="/teslimat-ve-iade-kosullari">
            Teslimat ve İade Koşulları
          </Link>{" "}
          sayfasına bakabilirsiniz.
        </p>

        <h2>5. Ödeme</h2>
        <p>
          Ödemeler, "iyzico ile Öde", Visa ve Mastercard destekli iyzico
          güvenli ödeme altyapısı üzerinden alınır. Kart bilgileriniz
          tarafımızca saklanmaz, doğrudan iyzico'nun PCI-DSS uyumlu
          sistemlerinde işlenir.
        </p>

        <h2>6. Cayma hakkı</h2>
        <p>
          Premium plan, elektronik ortamda anında ifa edilen bir dijital
          hizmettir. Mesafeli Sözleşmeler Yönetmeliği'nin 15/1-ğ maddesi
          uyarınca, Alıcı'nın hizmetin ifasına açıkça onay verdiği ve cayma
          hakkının kaybolacağını kabul ettiği hizmetlerde cayma hakkı
          kullanılamaz. Bu onay, satın alma sırasında ayrıca alınır.
        </p>

        <h2>7. İptal</h2>
        <p>
          Aboneliğinizi dilediğiniz zaman panelinizden iptal edebilirsiniz.
          İptal, cari fatura döneminin sonunda geçerli olur; dönem içinde
          kısmi iade yapılmaz (aksi açıkça belirtilmedikçe).
        </p>

        <h2>8. Uyuşmazlıkların çözümü</h2>
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığınca her
          yıl belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetleri,
          bu sınırları aşan uyuşmazlıklarda Tüketici Mahkemeleri yetkilidir.
        </p>

        <h2>9. İletişim</h2>
        <p>
          Sorularınız için: <strong>bilgi@bibutikshop.com.tr</strong>
        </p>
      </div>
    </div>
  );
}
