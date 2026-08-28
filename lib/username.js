// Kullanıcı adı, sayfanın URL'ine (minebio.net/kullanici-adi) doğrudan gittiği
// için sadece a-z, 0-9 ve tire içerebilir. Türkçe karakterler ve boşluk link'i
// kırıyordu — bu fonksiyon yazarken canlı olarak temizler.
const TR_MAP = {
  ç: "c", Ç: "c",
  ğ: "g", Ğ: "g",
  ı: "i", I: "i", İ: "i",
  ö: "o", Ö: "o",
  ş: "s", Ş: "s",
  ü: "u", Ü: "u",
};

export function sanitizeUsername(raw) {
  if (!raw) return "";
  let out = raw.toLowerCase();
  out = out.replace(/[çÇğĞıIİöÖşŞüÜ]/g, (ch) => TR_MAP[ch] ?? ch);
  out = out.trim().replace(/\s+/g, "-");
  out = out.replace(/[^a-z0-9-]/g, "");
  out = out.replace(/-+/g, "-");
  return out;
}
