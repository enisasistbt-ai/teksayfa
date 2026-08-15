import crypto from "crypto";

const BASE_URL = "https://api.iyzipay.com";

function buildAuthHeader(uriPath, bodyObj) {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const randomKey = `${Date.now()}${Math.floor(Math.random() * 1000000000)}`;
  const bodyStr = bodyObj ? JSON.stringify(bodyObj) : "";
  const payload = randomKey + uriPath + bodyStr;
  const signature = crypto.createHmac("sha256", secretKey).update(payload).digest("hex");
  const authString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
  const authorization = "IYZWSv2 " + Buffer.from(authString).toString("base64");
  return { authorization, randomKey, bodyStr };
}

export async function iyzicoV2(method, uriPath, bodyObj) {
  const { authorization, randomKey, bodyStr } = buildAuthHeader(uriPath, bodyObj);
  const res = await fetch(`${BASE_URL}${uriPath}`, {
    method,
    headers: {
      Authorization: authorization,
      "x-iyzi-rnd": randomKey,
      "Content-Type": "application/json",
    },
    body: bodyObj ? bodyStr : undefined,
  });
  return res.json();
}
