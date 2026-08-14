import "./globals.css";

export const metadata = {
  title: "MineBio — Tüm linklerin tek yerde",
  description: "Bio linkini saniyeler içinde oluştur ve paylaş.",
  verification: {
    other: {
      "msvalidate.01": "C7E25D3762724FAB6120DCDB973D7B4A",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5441545128970618"
          crossOrigin="anonymous"
        ></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CMG90QL7T5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CMG90QL7T5');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
