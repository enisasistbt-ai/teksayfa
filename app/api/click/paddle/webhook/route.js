import crypto from "crypto";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
import { PADDLE_PRICE_YEARLY } from "../../../../lib/paddle";

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const parts = Object.fromEntries(
    signatureHeader.split(";").map((p) => p.split("="))
  );
  const { ts, h1 } = parts;
  if (!ts || !h1) return false;
  const signedPayload = `${ts}:${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(h1, "hex"));
  } catch (e) {
    return false;
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("paddle-signature");
  const secret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!verifySignature(rawBody, signatureHeader, secret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (e) {
    return new Response("Invalid payload", { status: 400 });
  }

  const eventType = event.event_type;
  const data = event.data || {};
  const supabaseUserId = data.custom_data?.supabase_user_id;

  if (!supabaseUserId) {
    // Bu event'te bizim kullanıcımızı eşleştiremiyoruz, sessizce kabul et
    return new Response("ok", { status: 200 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  if (
    ["subscription.created", "subscription.activated", "subscription.updated"].includes(
      eventType
    )
  ) {
    const status = data.status;
    const isPremium = ["active", "trialing"].includes(status);
    const priceId = data.items?.[0]?.price?.id;
    const plan = priceId === PADDLE_PRICE_YEARLY ? "yearly" : "monthly";

    await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: isPremium,
        premium_plan: plan,
        premium_until: data.next_billed_at || null,
        paddle_subscription_id: data.id || null,
      })
      .eq("id", supabaseUserId);
  }

  if (["subscription.canceled", "subscription.paused"].includes(eventType)) {
    await supabaseAdmin
      .from("profiles")
      .update({ is_premium: false })
      .eq("id", supabaseUserId);
  }

  return new Response("ok", { status: 200 });
}
