import { headers } from "next/headers";
import PricingClient from "./PricingClient";

export default function Fiyatlandirma() {
  const country = headers().get("x-vercel-ip-country") || "TR";
  const isTurkey = country === "TR";

  return <PricingClient initialIsTurkey={isTurkey} />;
}
