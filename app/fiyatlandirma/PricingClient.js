"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import {
  FREE_LINK_LIMIT,
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_YEARLY_PRICE,
} from "../../lib/themes";
import {
  PADDLE_CLIENT_TOKEN,
  PADDLE_PRICE_MONTHLY,
  PADDLE_PRICE_YEARLY,
  PADDLE_MONTHLY_LABEL,
  PADDLE_YEARLY_LABEL,
} from "../../lib/paddle";

const PREMIUM_FEATURES = [
  "Sınırsız link",
  "Tüm temalar",
  "Anlık istatistikler — kim baktı, hangi link tıklandı",
  "Markalı QR kod (fotoğraflı, indirilebilir)",
  "İletişim formu — ziyaretçiler sana mesaj bıraksın",
  "Mola/tatil modu",
  "Kişi defteri + WhatsApp'tan tek tık paylaşım",
  '"MineBio ile oluşturuldu" yazısı kalkar',
  "Otomatik yenilenir, istediğin zaman iptal",
];

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return "—";
  }
}

export default function PricingClient({ initialIsTurkey }) {
  const [isTurkey, setIsTurkey] = useState(initialIsTurkey);
  const [yearly, setYearly] = useState(false);
  const [paddleReady, setPaddleReady] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [showIyzicoForm, setShowIyzicoForm] = useState(false);
  const [buyer, setBuyer] = useState({
    name: "",
    surname: "",
    identityNumber: "",
    phone: "",
    address: "",
    city: "",
  });
  const [iyzicoError, setIyzicoError] = useState("");
  const [checkoutFormContent, setCheckoutFormContent] = useState(null);
  const formContainerRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!checkoutFormContent || !formContainerRef.current) return;
    const div = document.createElement("div");
    div.innerHTML = checkoutFormContent;
    const scripts = div.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
    });
  }, [checkoutFormContent]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data?.session;
      if (session) {
        setUserId(session.user.id);
        setEmail(session.user.email || "");
        const { data: profileData } = await supabase
          .from("profiles")
          .select("is_premium, premium_plan, premium_until, paddle_subscription_id, iyzico_subscription_ref")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(profileData);
      }
      setProfileLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isTurkey) return;
    if (window.Paddle) {
      setPaddleReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      window.Paddle.Environment.set("production");
      window.Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
      setPaddleReady(true);
    };
    document.body.appendChild(script);
  }, [isTurkey]);

  function handlePaddleCheckout() {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    if (!paddleReady || !window.Paddle) return;
    setCheckoutLoading(true);
    window.Paddle.Checkout.open({
      items: [{ priceId: yearly ? PADDLE_PRICE_YEARLY : PADDLE_PRICE_MONTHLY, quantity: 1 }],
      customer: email ? { email } : undefined,
      customData: { supabase_user_id: userId },
      settings: {
        successUrl: `${window.location.origin}/dashboard?premium=success`,
      },
    });
    setCheckoutLoading(false);
  }

  function openIyzicoForm() {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    setIyzicoError("");
    setShowIyzicoForm(true);
  }

  async function handleIyzicoSubmit(e) {
    e.preventDefault();
    setIyzicoError("");
    const { name, surname, identityNumber, phone, address, city } = buyer;
    if (!name || !surname || !phone || !address || !city) {
      setIyzicoError("Lütfen tüm alanları doldur.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/iyzico/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          ...buyer,
          plan: yearly ? "yearly" : "monthly",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutFormContent) {
        setIyzicoError(data.error || "Ödeme başlatılamadı, tekrar dene.");
        setCheckoutLoading(false);
        return;
      }
      setCheckoutFormContent(data.checkoutFormContent);
      setCheckoutLoading(false);
    } catch (err) {
      setIyzicoError("Bir hata oluştu, tekrar dene.");
      setCheckoutLoading(false);
    }
  }

  const tryPrice = yearly ? PREMIUM_YEARLY_PRICE : PREMIUM_MONTHLY_PRICE;
  const tryUnit = yearly ? "yıl" : "ay";
  const usdLabel = yearly ? PADDLE_YEARLY_LABEL : PADDLE_MONTHLY_LABEL;

  const isPaddleSubscriber = !!profile?.paddle_subscription_id && profile?.is_premium;
  const isIyzicoPremium = !!profile?.is_premium && !isPaddleSubscriber;

  if (!profileLoading && isPaddleSubscriber) {
    return (
      <main className="container" style={{ paddingTop: 60 }}>
        <div className="eyebrow">fiyatlandırma</div>
        <h1 className="display" style={{ fontSize: 30, marginTop: 8 }}>
          Zaten Premium'sun ✨
        </h1>
        <div className="tabela" style={{ marginTop: 24, textAlign: "left", padding: "24px 22px" }}>
          <p style={{ fontSize: 14 }}>
            Premium aboneliğin <strong>Paddle</strong> üzerinden otomatik olarak yenileniyor.
            {profile.premium_until && (
              <> Bir sonraki yenileme tarihi: <strong>{formatDate(profile.premium_until)}</strong>.</>
            )}
          </p>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
            Aboneliğini iptal etmek ya da ödeme yöntemini değiştirmek istersen, Paddle'dan
            gelen makbuz e-postasındaki "Abonelik yönetimi" bağlantısını kullanabilirsin.
          </p>
        </div>
        <p className="footer-note">
          <Link href="/dashboard" style={{ color: "var(--amber)" }}>
            Panele dön
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 60 }}>
      <div className="eyebrow">fiyatlandırma</div>
      <h1 className="display" style={{ fontSize: 30, marginTop: 8 }}>
        Basit, net fiyatlandırma
      </h1>

      <div className="tabela" style={{ marginTop: 28, textAlign: "left", padding: "24px 22px" }}>
        <h3 style={{ fontSize: 16 }}>Ücretsiz</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Başlamak için her şey burada.
        </p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          <li>{FREE_LINK_LIMIT} linke kadar</li>
          <li>1 tema (Vitrin)</li>
          <li>TR / EN dil seçeneği</li>
          <li>"MineBio ile oluşturuldu" yazısı görünür</li>
        </ul>
      </div>

      <div
        className="row"
        style={{
          justifyContent: "center",
          gap: 0,
          marginTop: 24,
          border: "1px solid var(--amber)",
          borderBottom: "none",
          borderRadius: "var(--radius) var(--radius) 0 0",
          overflow: "hidden",
          background: "var(--panel-hi)",
        }}
      >
        <button
          type="button"
          onClick={() => setYearly(false)}
          style={{
            flex: 1,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            background: !yearly ? "var(--amber)" : "transparent",
            color: !yearly ? "var(--ink)" : "var(--muted)",
          }}
        >
          Aylık
        </button>
        <button
          type="button"
          onClick={() => setYearly(true)}
          style={{
            flex: 1,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            background: yearly ? "var(--amber)" : "transparent",
            color: yearly ? "var(--ink)" : "var(--muted)",
          }}
        >
          Yıllık · 2 ay bedava
        </button>
      </div>

      <div
        className="tabela"
        style={{
          marginTop: 0,
          textAlign: "left",
          padding: "24px 22px",
          border: "1px solid var(--amber)",
          borderRadius: "0 0 var(--radius) var(--radius)",
        }}
      >
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 16 }}>Premium</h3>
          <span className="mono" style={{ color: "var(--amber)", fontSize: 13 }}>
            {isTurkey ? `${tryPrice} TL/${tryUnit}` : usdLabel}
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Büyüyen işletmen için.
        </p>

        {isIyzicoPremium && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 10,
              background: "var(--panel-hi)",
              fontSize: 13,
            }}
          >
            ✨ Şu an Premium'sun, bitiş: <strong>{formatDate(profile.premium_until)}</strong>.
            Aşağıdan tekrar satın alırsan, ödediğin süre <strong>mevcut sürene eklenir</strong>
            (sıfırdan başlamaz).
          </div>
        )}

        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          {PREMIUM_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {isTurkey ? (
          <>
            {checkoutFormContent ? (
              <div
                ref={formContainerRef}
                style={{ marginTop: 16, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}
              >
                <div id="iyzipay-checkout-form" className="responsive"></div>
              </div>
            ) : !showIyzicoForm ? (
              <button className="btn" style={{ width: "100%", marginTop: 16 }} onClick={openIyzicoForm}>
                {isIyzicoPremium ? "Süreni uzat" : "Premium'a geç"}
              </button>
            ) : (
              <form onSubmit={handleIyzicoSubmit} style={{ marginTop: 16 }}>
                <div className="row" style={{ gap: 8 }}>
                  <input
                    className="field"
                    placeholder="Ad"
                    value={buyer.name}
                    onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                  />
                  <input
                    className="field"
                    placeholder="Soyad"
                    value={buyer.surname}
                    onChange={(e) => setBuyer({ ...buyer, surname: e.target.value })}
                  />
                </div>
                <input
                  className="field"
                  style={{ marginTop: 8 }}
                  placeholder="TC Kimlik No (fatura için, isteğe bağlı)"
                  value={buyer.identityNumber}
                  onChange={(e) => setBuyer({ ...buyer, identityNumber: e.target.value })}
                />
                <input
                  className="field"
                  style={{ marginTop: 8 }}
                  placeholder="Telefon (05xxxxxxxxx)"
                  value={buyer.phone}
                  onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                />
                <input
                  className="field"
                  style={{ marginTop: 8 }}
                  placeholder="Adres"
                  value={buyer.address}
                  onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                />
                <input
                  className="field"
                  style={{ marginTop: 8 }}
                  placeholder="Şehir"
                  value={buyer.city}
                  onChange={(e) => setBuyer({ ...buyer, city: e.target.value })}
                />
                {iyzicoError && (
                  <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 8 }}>{iyzicoError}</p>
                )}
                <button className="btn" style={{ width: "100%", marginTop: 12 }} disabled={checkoutLoading}>
                  {checkoutLoading ? "Yönlendiriliyor..." : "Ödemeye geç"}
                </button>
              </form>
            )}
          </>
        ) : (
          <button
            className="btn"
            style={{ width: "100%", marginTop: 16 }}
            onClick={handlePaddleCheckout}
            disabled={!paddleReady || checkoutLoading}
          >
            {checkoutLoading ? "Açılıyor..." : "Premium'a geç"}
          </button>
        )}
      </div>

      <p className="footer-note">
        <Link href="/dashboard" style={{ color: "var(--amber)" }}>
          Panele dön
        </Link>
      </p>
    </main>
  );
}
