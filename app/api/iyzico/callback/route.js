import { getIyzipay } from "../../../../lib/iyzico";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const formData = await request.formData();
  const token = formData.get("token");
  const host = "https://www.minebio.net";

  if (!token) {
    return Response.redirect(`${host}/fiyatlandirma?payment=failed`, 302);
  }

  const iyzipay = getIyzipay();

  const result = await new Promise((resolve) => {
    iyzipay.checkoutForm.retrieve({ locale: "tr", token }, (err, res) => {
      resolve(err ? null : res);
    });
  });

  if (!result || result.status !== "success" || result.paymentStatus !== "SUCCESS") {
    return Response.redirect(`${host}/fiyatlandirma?payment=failed`, 302);
  }

  const userId = result.conversationId;
  const basketId = result.basketId || "";
  const plan = basketId.includes("yearly") ? "yearly" : "monthly";
  const days = plan === "yearly" ? 365 : 30;
  const premiumUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

  if (userId) {
    const supabaseAdmin = getSupabaseAdmin();
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        premium_plan: plan,
        premium_until: premiumUntil,
        iyzico_subscription_ref: result.paymentId || null,
        // Kart numarası değil, sadece iyzico'nun güvenli referans kodları
        card_user_key: result.cardUserKey || null,
        card_token: result.cardToken || null,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("iyzico callback: profil güncellenemedi", updateError);
    } else {
      await supabaseAdmin.from("payments").insert({
        user_id: userId,
        provider: "iyzico",
        plan,
        amount: plan === "yearly" ? 490 : 49,
        currency: "TRY",
        status: "success",
        provider_ref: result.paymentId || null,
      });
    }
  }

  return Response.redirect(`${host}/dashboard?premium=success`, 302);
}
