import { iyzicoV2 } from "../../../../lib/iyzicoV2";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const formData = await request.formData();
  const token = formData.get("token");
  const host = "https://www.minebio.net";

  if (!token) {
    return Response.redirect(`${host}/fiyatlandirma?payment=failed`, 302);
  }

  const result = await iyzicoV2("GET", `/v2/subscription/checkoutform/${token}`);

  if (!result || result.status !== "success") {
    return Response.redirect(`${host}/fiyatlandirma?payment=failed`, 302);
  }

  const userId = result.data?.conversationId || result.conversationId;
  const subscriptionReferenceCode =
    result.data?.subscriptionReferenceCode || result.subscriptionReferenceCode;
  const pricingPlanReferenceCode =
    result.data?.pricingPlanReferenceCode || result.pricingPlanReferenceCode || "";

  if (userId) {
    const { IYZICO_YEARLY_PLAN } = await import("../../../../lib/iyzicoPlans");
    const plan = pricingPlanReferenceCode === IYZICO_YEARLY_PLAN ? "yearly" : "monthly";

    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        premium_plan: plan,
        premium_until: null,
        iyzico_subscription_ref: subscriptionReferenceCode || null,
      })
      .eq("id", userId);
  }

  return Response.redirect(`${host}/dashboard?premium=success`, 302);
}
