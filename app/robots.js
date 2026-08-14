export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/kisiler", "/mesajlar", "/api/"],
      },
    ],
    sitemap: "https://www.minebio.net/sitemap.xml",
  };
}
