export default function sitemap() {
  const baseUrl = "https://www.minebio.net";
  const now = new Date();

  const routes = [
    "",
    "/en",
    "/fiyatlandirma",
    "/login",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
    "/kullanim-kosullari",
    "/kvkk-aydinlatma-metni",
    "/acik-riza-metni",
    "/mesafeli-satis-sozlesmesi",
    "/teslimat-ve-iade-kosullari",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/en" ? "weekly" : "monthly",
    priority: route === "" || route === "/en" ? 1 : route === "/fiyatlandirma" ? 0.8 : 0.3,
  }));
}
