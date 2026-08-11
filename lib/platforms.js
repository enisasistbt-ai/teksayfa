// type: "username" -> kullanıcı sadece adını/telefonunu girer, biz linki kurarız
// type: "url"      -> kullanıcı linkin tamamını yapıştırır (mağaza sayfaları gibi)

export const PLATFORMS = [
  {
    id: "instagram",
    label: "Instagram",
    type: "username",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://instagram.com/${v}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    type: "username",
    placeholder: "90 5xx xxx xx xx",
    hint: "Ülke koduyla birlikte, boşluksuz rakamlar (örn. 905xxxxxxxxx)",
    buildUrl: (v) => `https://wa.me/${v.replace(/[^0-9]/g, "")}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    type: "username",
    placeholder: "sayfaadi",
    buildUrl: (v) => `https://facebook.com/${v}`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    type: "username",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://www.tiktok.com/@${v.replace(/^@/, "")}`,
  },
  {
    id: "youtube",
    label: "YouTube",
    type: "username",
    placeholder: "kanaladi",
    buildUrl: (v) => `https://www.youtube.com/@${v.replace(/^@/, "")}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    type: "username",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://x.com/${v.replace(/^@/, "")}`,
  },
  {
    id: "trendyol",
    label: "Trendyol Mağazam",
    type: "url",
    placeholder: "https://www.trendyol.com/magaza/...",
    buildUrl: (v) => v,
  },
  {
    id: "hepsiburada",
    label: "Hepsiburada Mağazam",
    type: "url",
    placeholder: "https://www.hepsiburada.com/magaza/...",
    buildUrl: (v) => v,
  },
];

export function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
