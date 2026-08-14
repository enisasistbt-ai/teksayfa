// type: "username" -> kullanıcı sadece adını/telefonunu girer, biz linki kurarız
// type: "url"      -> kullanıcı linkin tamamını yapıştırır (mağaza sayfaları gibi)
// group: dashboard'da hangi başlık altında gösterileceği

export const PLATFORMS = [
  // --- Sosyal medya ---
  {
    id: "instagram",
    label: "Instagram",
    labelEn: "Instagram",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://instagram.com/${v}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    labelEn: "Facebook",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "sayfaadi",
    buildUrl: (v) => `https://facebook.com/${v}`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    labelEn: "TikTok",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://www.tiktok.com/@${v.replace(/^@/, "")}`,
  },
  {
    id: "youtube",
    label: "YouTube",
    labelEn: "YouTube",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "kanaladi",
    buildUrl: (v) => `https://www.youtube.com/@${v.replace(/^@/, "")}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    labelEn: "X (Twitter)",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://x.com/${v.replace(/^@/, "")}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    labelEn: "LinkedIn",
    type: "url",
    group: "Sosyal Medya",
    placeholder: "https://linkedin.com/in/...",
    buildUrl: (v) => v,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    labelEn: "Pinterest",
    type: "username",
    group: "Sosyal Medya",
    placeholder: "kullaniciadi",
    buildUrl: (v) => `https://pinterest.com/${v}`,
  },

  // --- İletişim ---
  {
    id: "whatsapp",
    label: "WhatsApp",
    labelEn: "WhatsApp",
    type: "username",
    group: "İletişim",
    placeholder: "90 5xx xxx xx xx",
    hint: "Ülke koduyla birlikte, boşluksuz rakamlar (örn. 905xxxxxxxxx)",
    buildUrl: (v) => `https://wa.me/${v.replace(/[^0-9]/g, "")}`,
  },

  // --- Pazaryerleri (Türkiye) ---
  {
    id: "trendyol",
    label: "Trendyol Mağazam",
    labelEn: "Trendyol Store",
    type: "url",
    group: "Pazaryerleri",
    placeholder: "https://www.trendyol.com/magaza/...",
    buildUrl: (v) => v,
  },
  {
    id: "hepsiburada",
    label: "Hepsiburada Mağazam",
    labelEn: "Hepsiburada Store",
    type: "url",
    group: "Pazaryerleri",
    placeholder: "https://www.hepsiburada.com/magaza/...",
    buildUrl: (v) => v,
  },

  // --- Pazaryerleri (Uluslararası) ---
  {
    id: "etsy",
    label: "Etsy Mağazam",
    labelEn: "Etsy Store",
    type: "username",
    group: "Pazaryerleri",
    placeholder: "magazaadi",
    buildUrl: (v) => `https://www.etsy.com/shop/${v}`,
  },
  {
    id: "amazon",
    label: "Amazon Mağazam",
    labelEn: "Amazon Store",
    type: "url",
    group: "Pazaryerleri",
    placeholder: "https://www.amazon.com/shops/...",
    buildUrl: (v) => v,
  },
  {
    id: "ebay",
    label: "eBay Mağazam",
    labelEn: "eBay Store",
    type: "url",
    group: "Pazaryerleri",
    placeholder: "https://www.ebay.com/str/...",
    buildUrl: (v) => v,
  },
];

export const PLATFORM_GROUPS = ["Sosyal Medya", "İletişim", "Pazaryerleri"];

export function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function translateLinkLabel(link, lang) {
  if (lang !== "en") return link.label;
  if (link.labelEn) return link.labelEn;
  const platform = PLATFORMS.find((p) => p.label === link.label);
  if (platform) return platform.labelEn;
  const customMatch = link.label.match(/^Web sitesi (\d+)$/);
  if (customMatch) return `Website ${customMatch[1]}`;
  return link.label;
}

export function extractWhatsappPhone(links) {
  const wa = (links || []).find((l) => l.label === "WhatsApp");
  if (!wa) return "";
  const match = wa.url.match(/wa\.me\/(\d+)/);
  return match ? `+${match[1]}` : "";
}
