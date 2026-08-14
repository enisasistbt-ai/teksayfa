"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FREE_LINK_LIMIT,
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_YEARLY_PRICE,
} from "../../lib/themes";

export default function Fiyatlandirma() {
  const [yearly, setYearly] = useState(false);

  const price = yearly ? PREMIUM_YEARLY_PRICE : PREMIUM_MONTHLY_PRICE;
  const unit = yearly ? "yıl" : "ay";

  return (
    <main className="container" style={{ paddingTop: 60 }}>
      <div className="eyebrow">fiyatlandırma</div>
      <h1 className="display" style={{ fontSize: 30, marginTop: 8 }}>
        Basit, net fiyatlandırma
      </h1>

      <div
        className="row"
        style={{
          justifyContent: "center",
          gap: 0,
          marginTop: 24,
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 999,
          overflow: "hidden",
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <button
          type="button"
          onClick={() => setYearly(false)}
          style={{
            padding: "8px 18px",
            fontSize: 13,
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
            padding: "8px 18px",
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            background: yearly ? "var(--amber)" : "transparent",
            color: yearly ? "var(--ink)" : "var(--muted)",
          }}
        >
          Yıllık · 2 ay bedava
        </button>
      </div>

      <div className="tabela" style={{ marginTop: 28, textAlign: "left", padding: "24px 22px" }}>
        <h3 style={{ fontSize: 16 }}>Ücretsiz</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Başlamak için her şey burada.
        </p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          <li>{FREE_LINK_LIMIT} linke kadar</li>
          <li>1 tema (Vitrin)</li>
          <li>"MineBio ile oluşturuldu" yazısı görünür</li>
        </ul>
      </div>

      <div
        className="tabela"
        style={{
          marginTop: 20,
          textAlign: "left",
          padding: "24px 22px",
          border: "1px solid var(--amber)",
        }}
      >
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 16 }}>Premium</h3>
          <span className="mono" style={{ color: "var(--amber)", fontSize: 13 }}>
            {price} TL/{unit}
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Büyüyen işletmen için. {yearly && "Her ay 49 TL yerine yılda sadece 490 TL."}
        </p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          <li>Sınırsız link</li>
          <li>Tüm temalar</li>
          <li>"MineBio ile oluşturuldu" yazısı kalkar</li>
          <li>Otomatik yenilenir, istediğin zaman iptal</li>
        </ul>

        <button className="btn" style={{ width: "100%", marginTop: 16 }} disabled>
          Ödeme sistemi çok yakında
        </button>
      </div>

      <p className="footer-note">
        <Link href="/dashboard" style={{ color: "var(--amber)" }}>
          Panele dön
        </Link>
      </p>
    </main>
  );
}
