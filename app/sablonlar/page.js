import SablonlarClient from "./SablonlarClient";

export const metadata = {
  title: "Şablonlar — MineBio",
  description: "Her marka için bir şablon: sayfanı hangi tasarımla yayınlamak istediğini seç, önizle, hemen kullan.",
  alternates: {
    canonical: "https://www.minebio.net/sablonlar",
    languages: {
      tr: "https://www.minebio.net/sablonlar",
      en: "https://www.minebio.net/en/templates",
    },
  },
};

export default function SablonlarPage() {
  return <SablonlarClient />;
}
