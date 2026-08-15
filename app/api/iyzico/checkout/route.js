import { getIyzipay } from "../../../../lib/iyzico";

export async function POST(request) {
  const body = await request.json();
  const { userId, email, name, surname, identityNumber, phone, address, city, plan } = body;

  if (!userId || !email || !name || !surname || !phone || !address || !city) {
    return Response.json({ error: "Lütfen tüm alanları doldur." }, { status: 400 });
  }

  const buyerIdentityNumber = identityNumber?.trim() || "11111111111";
  const isYearly = plan === "yearly";
  const price = isYearly ? "490.00" : "49.00";
  const host = request.headers.get("origin") || "https://www.minebio.net";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "85.34.78.112";

  const iyzipay = getIyzipay();

  const requestBody = {
    locale: "tr",
    conversationId: userId,
    price,
    paidPrice: price,
    currency: "TRY",
    basketId: `minebio-${plan}-${Date.now()}`,
    paymentGroup: "PRODUCT",
    callbackUrl: `${host}/api/iyzico/callback`,
    enabledInstallments: [1],
    // Otomatik yenileme için kartı sakla
    registerCard: 1,
    buyer: {
      id: userId,
      name,
      surname,
      gsmNumber: phone,
      email,
      identityNumber: buyerIdentityNumber,
      registrationAddress: address,
      ip,
      city,
      country: "Turkey",
    },
    shippingAddress: {
      contactName: `${name} ${surname}`,
      city,
      country: "Turkey",
      address,
    },
    billingAddress: {
      contactName: `${name} ${surname}`,
      city,
      country: "Turkey",
      address,
    },
    basketItems: [
      {
        id: `premium-${plan}`,
        name: isYearly ? "MineBio Premium (Yıllık)" : "MineBio Premium (Aylık)",
        category1: "SaaS",
        itemType: "VIRTUAL",
        price,
      },
    ],
  };

  return new Promise((resolve) => {
    iyzipay.checkoutFormInitialize.create(requestBody, (err, result) => {
      if (err || result.status !== "success") {
        resolve(
          Response.json(
            { error: err?.message || result?.errorMessage || "iyzico hatası" },
            { status: 400 }
          )
        );
        return;
      }
      resolve(Response.json({ checkoutFormContent: result.checkoutFormContent }));
    });
  });
}
