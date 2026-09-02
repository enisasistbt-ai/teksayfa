import { posts } from "../lib/blogPosts";

export default function sitemap() {
  const baseUrl = "https://www.minebio.net";
  const now = new Date();

  const routes = [
    "",
    "/en",
    "/fiyatlandirma",
    "/hakkimizda",
    "/en/about",
    "/login",
    "/blog",
    "/en/blog",
    "/sablonlar",
    "/en/templates",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
    "/kullanim-kosullari",
    "/kvkk-aydinlatma-metni",
    "/acik-riza-metni",
    "/mesafeli-satis-sozlesmesi",
    "/teslimat-ve-iade-kosullari",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/en" ? "weekly" : "monthly",
    priority: route === "" || route === "/en" ? 1 : route === "/fiyatlandirma" ? 0.8 : 0.3,
  }));

  const blogEntries = [
    ...posts.tr.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...posts.en.map((p) => ({
      url: `${baseUrl}/en/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...blogEntries];
}
