import BaslaClientEn from "./BaslaClientEn";

// English version of the ad-traffic landing page — see /app/basla for the
// Turkish original. Not indexed, same reasoning: avoid content overlap with
// the homepage in search results.
export const metadata = {
  title: "MineBio — Bring all your links together in 2 minutes",
  description: "Instagram, WhatsApp, your shop, and your contact info — all on one page. No credit card required, live in 2 minutes.",
  robots: { index: false, follow: true },
};

export default function BaslaPageEn() {
  return <BaslaClientEn />;
}
