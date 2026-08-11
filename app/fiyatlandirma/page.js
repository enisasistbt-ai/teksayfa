import Link from "next/link";
import { FREE_LINK_LIMIT, PREMIUM_PRICE_LABEL } from "../../lib/themes";

export default function Fiyatlandirma() {
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
          <li>"TekSayfa ile oluşturuldu" yazısı görünür</li>
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
            {PREMIUM_PRICE_LABEL}
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Büyüyen işletmen için.
        </p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
          <li>Sınırsız link</li>
          <li>Tüm temalar</li>
          <li>"TekSayfa ile oluşturuldu" yazısı kalkar</li>
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
