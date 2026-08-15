import { getIyzipay } from "../../../../lib/iyzico";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

function chargeStoredCard(iyzipay, { userId, price, plan, cardUserKey, cardToken }) {
  return new Promise((resolve) => {
    const requestBody = {
      locale: "tr",
      conversationId: userId,
      price,
      paidPrice: price,
      currency: "TRY",
      installment: "1",
      basketId: `minebio-renew-${plan}-${Date.now()}`,
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",
      paymentCard: {
        cardUserKey,
        cardToken,
      },
      buyer: {
        id: userId,
        name: "MineBio",
        surname: "Kullanıcı",
        gsmNumber: "+905000000000",
        email: "renew@minebio.net",
        identityNumber: "11111111111",
        registrationAddress: "Türkiye",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
      },
      shippingAddress: {
        contactName: "MineBio Kullanıcı",
        city: "Istanbul",
        country: "Turkey",
        address: "Türkiye",
      },
      billingAddress: {
        contactName: "MineBio Kullanıcı",
        city: "Istanbul",
        country: "Turkey",
        address: "Türkiye",
      },
      basketItems: [
        {
          id: `premium-renew-${plan}`,
          name: plan === "yearly" ? "MineBio Premium (Yıllık Yenileme)" : "MineBio Premium (Aylık Yenileme)",
          category1: "SaaS",
          itemType: "VIRTUAL",
          price,
        },
      ],
    };

    iyzipay.payment.create(requestBody, (err, result) => {
      resolve(err ? { status: "failure" } : result);
    });
  });
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const iyzipay = getIyzipay();

  const in24h = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data: dueProfiles, error } = await supabaseAdmin
    .from("profiles")
    .select("id, premium_plan, premium_until, card_user_key, card_token")
    .eq("is_premium", true)
    .not("card_user_key", "is", null)
    .lte("premium_until", in24h);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const profile of dueProfiles || []) {
    const plan = profile.premium_plan === "yearly" ? "yearly" : "monthly";
    const price = plan === "yearly" ? "490.00" : "49.00";
    const days = plan === "yearly" ? 365 : 30;

    const chargeResult = await chargeStoredCard(iyzipay, {
      userId: profile.id,
      price,
      plan,
      cardUserKey: profile.card_user_key,
      cardToken: profile.card_token,
    });

    if (chargeResult.status === "success") {
      const newUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await supabaseAdmin
        .from("profiles")
        .update({ premium_until: newUntil })
        .eq("id", profile.id);
      results.push({ userId: profile.id, status: "renewed" });
    } else {
      await supabaseAdmin
        .from("profiles")
        .update({ is_premium: false })
        .eq("id", profile.id);
      results.push({ userId: profile.id, status: "failed" });
    }
  }

  return Response.json({ processed: results.length, results });
}
