import TemplatesClient from "./TemplatesClient";

export const metadata = {
  title: "Templates — MineBio",
  description: "A template for every brand: pick a design, preview it instantly, and start using it for free.",
  alternates: {
    canonical: "https://www.minebio.net/en/templates",
    languages: {
      tr: "https://www.minebio.net/sablonlar",
      en: "https://www.minebio.net/en/templates",
    },
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
