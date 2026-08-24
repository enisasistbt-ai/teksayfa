import StartClientEn from "./StartClientEn";

// English ad-traffic landing page (renamed from /en/basla — "basla" read as
// Turkish to an international audience). See /app/basla for the Turkish
// original. Not indexed: avoids content overlap with the homepage.
export const metadata = {
  title: "MineBio — Bring all your links together in 2 minutes",
  description: "Instagram, WhatsApp, your shop, and your contact info — all on one page. No credit card required, live in 2 minutes.",
  robots: { index: false, follow: true },
};

export default function StartPageEn() {
  return <StartClientEn />;
}
