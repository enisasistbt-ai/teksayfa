import LandingPage from "./LandingPage";

export const metadata = {
  title: "MineBio — Tüm bağlantılarını tek sayfada topla",
  description:
    "MineBio ile sosyal medyanı, mağazanı ve iletişim bilgilerini tek, profesyonel bir sayfada topla. İstatistikler, markalı QR kod, iletişim formu ve daha fazlası.",
  alternates: {
    canonical: "https://www.minebio.net/",
    languages: {
      tr: "https://www.minebio.net/",
      en: "https://www.minebio.net/en",
    },
  },
  openGraph: {
    title: "MineBio — Tüm bağlantılarını tek sayfada topla",
    description:
      "Sosyal medyanı, mağazanı ve iletişim bilgilerini tek, profesyonel bir sayfada topla. Kimin baktığını gör.",
    url: "https://www.minebio.net/",
    siteName: "MineBio",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MineBio — Tüm bağlantılarını tek sayfada topla",
    description: "Sosyal medyanı, mağazanı ve iletişim bilgilerini tek, profesyonel bir sayfada topla.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MineBio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.minebio.net/",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "TRY", name: "Ücretsiz" },
    { "@type": "Offer", price: "49", priceCurrency: "TRY", name: "Premium Aylık" },
    { "@type": "Offer", price: "5.99", priceCurrency: "USD", name: "Premium Monthly (International)" },
  ],
  description:
    "Sosyal medya, mağaza ve iletişim bilgilerini tek bir profesyonel sayfada toplayan link-in-bio platformu.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage lang="tr" />
    </>
  );
}
