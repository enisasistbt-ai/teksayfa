import { getIyzipay } from "../../../../lib/iyzico";

export async function POST(request) {
  try {
    return await handleCheckout(request);
  } catch (e) {
    console.error("iyzico checkout crash:", e);
    return Response.json(
      { error: "Sunucu tarafında beklenmeyen bir hata oluştu: " + (e?.message || "bilinmiyor") },
      { status: 500 }
    );
  }
}

async function handleCheckout(request) {
  const body = await request.json();
  const { userId, email, name, surname, identityNumber, phone, address, city, plan } = body;

  if (!userId || !email || !name || !surname || !identityNumber || !phone || !address || !city) {
    return Response.json({ error: "Lütfen tüm alanları doldur." }, { status: 400 });
  }

  if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
    return Response.json(
      { error: "Ödeme sistemi yapılandırma hatası: API anahtarları eksik (Vercel ortam değişkenlerini kontrol et)." },
      { status: 500 }
    );
  }

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
    buyer: {
      id: userId,
      name,
      surname,
      gsmNumber: phone,
      email,
      identityNumber,
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
    try {
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
        resolve(Response.json({ paymentPageUrl: result.paymentPageUrl }));
      });
    } catch (e) {
      resolve(
        Response.json(
          { error: "iyzico isteği başlatılamadı: " + (e?.message || "bilinmiyor") },
          { status: 500 }
        )
      );
    }
  });
}
