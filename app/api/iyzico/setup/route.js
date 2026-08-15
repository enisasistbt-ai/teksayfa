import { iyzicoV2 } from "../../../../lib/iyzicoV2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== "minebio-setup-2026") {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const product = await iyzicoV2("POST", "/v2/subscription/products", {
    locale: "tr",
    conversationId: "minebio-setup",
    name: "MineBio Premium",
    description: "MineBio Premium aylık/yıllık abonelik",
  });

  if (product.status !== "success") {
    return Response.json({ step: "product", result: product }, { status: 400 });
  }

  const productReferenceCode = product.data.referenceCode;

  const monthly = await iyzicoV2(
    "POST",
    `/v2/subscription/products/${productReferenceCode}/pricing-plans`,
    {
      locale: "tr",
      conversationId: "minebio-setup-monthly",
      name: "Aylık Plan",
      planPaymentType: "RECURRING",
      trialPeriodDays: 0,
      paymentIntervalCount: 1,
      paymentInterval: "MONTHLY",
      currencyCode: "TRY",
      price: "49.00",
    }
  );

  const yearly = await iyzicoV2(
    "POST",
    `/v2/subscription/products/${productReferenceCode}/pricing-plans`,
    {
      locale: "tr",
      conversationId: "minebio-setup-yearly",
      name: "Yıllık Plan",
      planPaymentType: "RECURRING",
      trialPeriodDays: 0,
      paymentIntervalCount: 1,
      paymentInterval: "YEARLY",
      currencyCode: "TRY",
      price: "490.00",
    }
  );

  return Response.json({
    productReferenceCode,
    monthlyPlanReferenceCode: monthly?.data?.referenceCode || null,
    yearlyPlanReferenceCode: yearly?.data?.referenceCode || null,
    monthlyRaw: monthly,
    yearlyRaw: yearly,
  });
}
