import LandingPage from "../LandingPage";

export const metadata = {
  title: "MineBio — Bring all your links together on one page",
  description:
    "MineBio brings your social media, store, and contact info together on one professional page. Click analytics, a branded QR code, a contact form, and more.",
  alternates: {
    canonical: "https://www.minebio.net/en",
    languages: {
      tr: "https://www.minebio.net/",
      en: "https://www.minebio.net/en",
    },
  },
  openGraph: {
    title: "MineBio — Bring all your links together on one page",
    description:
      "Bring your social media, store, and contact info together on one professional page. See who's looking.",
    url: "https://www.minebio.net/en",
    siteName: "MineBio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MineBio — Bring all your links together on one page",
    description: "Bring your social media, store, and contact info together on one professional page.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MineBio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.minebio.net/en",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
    { "@type": "Offer", price: "5.99", priceCurrency: "USD", name: "Premium Monthly" },
    { "@type": "Offer", price: "59.90", priceCurrency: "USD", name: "Premium Yearly" },
  ],
  description:
    "A link-in-bio platform that brings your social media, store, and contact info together on one professional page.",
};

export default function EnglishHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage lang="en" />
    </>
  );
}
