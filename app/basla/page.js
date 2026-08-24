import BaslaClient from "./BaslaClient";

// Bu sayfa reklam trafiği için özel hazırlandı — ana sayfanın tüm gezinme
// linkleri (blog, hakkımızda, SSS vb.) olmadan, tek bir hedefe (kayıt) yönlendiren
// sade bir sürüm. Arama motorlarında ana sayfayla içerik çakışmasın diye
// indexlenmiyor.
export const metadata = {
  title: "MineBio — Bağlantılarını 2 dakikada tek sayfada topla",
  description: "Instagram, WhatsApp, mağazan ve iletişim bilgilerin tek bir sayfada. Kredi kartı gerekmez, 2 dakikada yayında.",
  robots: { index: false, follow: true },
};

export default function BaslaPage() {
  return <BaslaClient />;
}
