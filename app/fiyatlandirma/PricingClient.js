"use client";

import { useEffect, useState } from "react";
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

export default function PricingClient({ initialIsTurkey }) {
  const [isTurkey, setIsTurkey] = useState(initialIsTurkey);
  const [yearly, setYearly] = useState(false);
  const [paddleReady, setPaddleReady] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data?.session;
      if (session) {
        setUserId(session.user.id);
        setEmail(session.user.email || "");
      }
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
    });
    setCheckoutLoading(false);
  }

  const tryPrice = yearly ? PREMIUM_YEARLY_PRICE : PREMIUM_MONTHLY_PRICE;
  const tryUnit = yearly ? "yıl" : "ay";
  const usdLabel = yearly ? PADDLE_YEARLY_LABEL : PADDLE_MONTHLY_LABEL;

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
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          {PREMIUM_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {isTurkey ? (
          <button className="btn" style={{ width: "100%", marginTop: 16 }} disabled>
            Ödeme sistemi çok yakında
          </button>
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

        <p style={{ textAlign: "center", fontSize: 11.5, color: "var(--muted)", marginTop: 12 }}>
          {isTurkey ? (
            <>
              Yurt dışından mı bakıyorsun?{" "}
              <button
                type="button"
                onClick={() => setIsTurkey(false)}
                style={{ background: "none", border: "none", color: "var(--amber)", cursor: "pointer", fontSize: 11.5, textDecoration: "underline" }}
              >
                USD fiyatını gör
              </button>
            </>
          ) : (
            <>
              Türkiye'den mi bakıyorsun?{" "}
              <button
                type="button"
                onClick={() => setIsTurkey(true)}
                style={{ background: "none", border: "none", color: "var(--amber)", cursor: "pointer", fontSize: 11.5, textDecoration: "underline" }}
              >
                TL fiyatını gör
              </button>
            </>
          )}
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
