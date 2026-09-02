export const THEMES = {
  vitrin: {
    name: "Vitrin",
    ink: "#10231f",
    panel: "#17332c",
    panelHi: "#1e3f36",
    paper: "#f2ecd9",
    muted: "#8fa69c",
    accent: "#e8a33d",
    accentDim: "#b87d2b",
    premium: false,
  },
  kahve: {
    name: "Kahve",
    ink: "#241914",
    panel: "#382a20",
    panelHi: "#46352a",
    paper: "#f4e9dc",
    muted: "#b09a86",
    accent: "#e0763f",
    accentDim: "#a85a2e",
    premium: true,
  },
  deniz: {
    name: "Deniz",
    ink: "#0b1d33",
    panel: "#122b4a",
    panelHi: "#173a63",
    paper: "#eaf2fa",
    muted: "#7d9cbf",
    accent: "#3fc7c1",
    accentDim: "#2a938e",
    premium: true,
  },
  gunes: {
    name: "Güneş",
    ink: "#1c1505",
    panel: "#2e2408",
    panelHi: "#3d310c",
    paper: "#fbf3dd",
    muted: "#b8a468",
    accent: "#f4c430",
    accentDim: "#c79f1e",
    premium: true,
  },
  foto: {
    name: "Fotoğraf",
    ink: "#10231f",
    panel: "#17332c",
    panelHi: "#1e3f36",
    paper: "#f2ecd9",
    muted: "#c9d6cf",
    accent: "#e8a33d",
    accentDim: "#b87d2b",
    premium: true,
    // Profil fotoğrafı, küçük bir yuvarlak yerine sayfanın tamamını kaplayan
    // arka plan olarak kullanılır. Kullanıcı avatar yüklemediyse otomatik
    // olarak yukarıdaki düz renklere geri döner (ProfileView bunu kontrol eder).
    photoBg: true,
  },
  gunbatimi: {
    name: "Gün Batımı",
    ink: "#2b1220",
    panel: "#3d1b2e",
    panelHi: "#5c2a42",
    paper: "#fbe9dd",
    muted: "#c9a0ad",
    accent: "#ffb457",
    accentDim: "#e0913a",
    premium: true,
    // Sayfanın kendisi (kartın çevresi) düz renk yerine sıcak bir gradyan —
    // özellikle mobilde kartın üstünde/altında görünür.
    bg: "linear-gradient(160deg, #3d1b2e 0%, #6b2545 45%, #d1495b 100%)",
    btnStyle: "pill",
  },
  kagit: {
    name: "Kağıt",
    ink: "#2b2118",
    panel: "#f7f1e4",
    panelHi: "#efe4cf",
    paper: "#2b2118",
    muted: "#8a7a63",
    accent: "#c0602f",
    accentDim: "#9c4b25",
    premium: true,
    // Açık/minimal mod — kart da dahil her şey açık renk, butonlar dolgu
    // yerine ince çerçeveli.
    bg: "#f2ead9",
    btnStyle: "outline",
  },
};

export const DEFAULT_THEME = "vitrin";
export const FREE_LINK_LIMIT = 3;
export const PREMIUM_MONTHLY_PRICE = 49;
export const PREMIUM_YEARLY_PRICE = 490;
export const PREMIUM_PRICE_LABEL = "49 TL/ay";
export const PREMIUM_YEARLY_LABEL = "490 TL/yıl";
