import { headers } from "next/headers";
import PricingClient from "./PricingClient";

export const metadata = {
  title: "Fiyatlandırma — MineBio",
  description:
    "MineBio ücretsiz ve Premium planlarını karşılaştır. Sınırsız link, tüm temalar, istatistikler ve daha fazlası için Premium'a geç.",
  alternates: {
    canonical: "https://www.minebio.net/fiyatlandirma",
  },
};

export default function Fiyatlandirma() {
  const country = headers().get("x-vercel-ip-country") || "TR";
  const isTurkey = country === "TR";

  return <PricingClient initialIsTurkey={isTurkey} />;
}
