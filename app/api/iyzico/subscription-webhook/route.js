import { iyzicoV2 } from "../../../../lib/iyzicoV2";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return new Response("ok", { status: 200 });
  }

  const subscriptionReferenceCode = payload.subscriptionReferenceCode;
  if (!subscriptionReferenceCode) {
    return new Response("ok", { status: 200 });
  }

  // Bildirimin içeriğine körü körüne güvenmek yerine, iyzico'ya kendi
  // kimlik bilgilerimizle sorup gerçek/güncel durumu doğruluyoruz.
  const subscription = await iyzicoV2(
    "GET",
    `/v2/subscription/subscriptions/${subscriptionReferenceCode}`
  );

  if (!subscription || subscription.status !== "success") {
    return new Response("ok", { status: 200 });
  }

  const subStatus = subscription.data?.subscriptionStatus || subscription.subscriptionStatus;
  const isActive = subStatus === "ACTIVE";

  const supabaseAdmin = getSupabaseAdmin();
  await supabaseAdmin
    .from("profiles")
    .update({ is_premium: isActive })
    .eq("iyzico_subscription_ref", subscriptionReferenceCode);

  return new Response("ok", { status: 200 });
}
