import { iyzicoV2 } from "../../../../lib/iyzicoV2";
import { IYZICO_MONTHLY_PLAN, IYZICO_YEARLY_PLAN } from "../../../../lib/iyzicoPlans";

export async function POST(request) {
  const body = await request.json();
  const { userId, email, name, surname, identityNumber, phone, address, city, plan } = body;

  if (!userId || !email || !name || !surname || !phone || !address || !city) {
    return Response.json({ error: "Lütfen tüm alanları doldur." }, { status: 400 });
  }

  const buyerIdentityNumber = identityNumber?.trim() || "11111111111";
  const host = request.headers.get("origin") || "https://www.minebio.net";
  const pricingPlanReferenceCode = plan === "yearly" ? IYZICO_YEARLY_PLAN : IYZICO_MONTHLY_PLAN;

  const result = await iyzicoV2("POST", "/v2/subscription/checkoutform/initialize", {
    locale: "tr",
    conversationId: userId,
    callbackUrl: `${host}/api/iyzico/callback`,
    pricingPlanReferenceCode,
    subscriptionInitialStatus: "ACTIVE",
    customer: {
      name,
      surname,
      email,
      gsmNumber: phone,
      identityNumber: buyerIdentityNumber,
      billingAddress: {
        contactName: `${name} ${surname}`,
        city,
        country: "Turkey",
        address,
      },
      shippingAddress: {
        contactName: `${name} ${surname}`,
        city,
        country: "Turkey",
        address,
      },
    },
  });

  if (result.status !== "success") {
    return Response.json(
      { error: result.errorMessage || "iyzico hatası, tekrar dene." },
      { status: 400 }
    );
  }

  return Response.json({ checkoutFormContent: result.checkoutFormContent });
}
