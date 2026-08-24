"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const TRUST_ITEMS = [
  { icon: "✓", text: "Kredi kartı gerekmez" },
  { icon: "◐", text: "7 gün ücretsiz dene" },
  { icon: "◆", text: "İstediğin an iptal et" },
  { icon: "▦", text: "2 dakikada yayında" },
];

const STEPS = [
  { title: "Kullanıcı adını seç", desc: "Az aşağıda dene, müsaitse hemen senin olsun." },
  { title: "E-posta ile gir", desc: "Şifre yok, e-postana gelen kodla saniyeler içinde içerdesin." },
  { title: "Linklerini ekle, paylaş", desc: "Instagram, WhatsApp, mağazan — hepsini panelden ekle, bio'na koy." },
];

export default function BaslaClient() {
  const router = useRouter();
  const [claimInput, setClaimInput] = useState("");
  const [claimStatus, setClaimStatus] = useState(null); // null | checking | available | taken | short

  useEffect(() => {
    const clean = claimInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!clean) {
      setClaimStatus(null);
      return;
    }
    if (clean.length < 3) {
      setClaimStatus("short");
      return;
    }
    setClaimStatus("checking");
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("public_profiles")
        .select("username")
        .eq("username", clean)
        .maybeSingle();
      setClaimStatus(data ? "taken" : "available");
    }, 450);
    return () => clearTimeout(timer);
  }, [claimInput]);

  function handleClaim() {
    const clean = claimInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (claimStatus !== "available" || !clean) return;
    try {
      window.localStorage.setItem("mb_desired_username", clean);
    } catch (e) {
      // yoksay
    }
    router.push("/login");
  }

  return (
    <div className="corp-landing">
      {/* Sade üst çubuk — dikkat dağıtacak menü yok, sadece geri dönen kullanıcı için giriş linki */}
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <div className="row" style={{ gap: 9 }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
            <span className="corp-display" style={{ fontSize: 16 }}>
              MineBio
            </span>
          </div>
          <Link href="/login" style={{ fontSize: 13.5, whiteSpace: "nowrap" }}>
            <span className="corp-full-text">Zaten hesabın var mı? Giriş yap</span>
            <span className="corp-short-text">Giriş yap</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="corp-section corp-hero" style={{ paddingTop: 56 }}>
        <div className="corp-hero-glow" aria-hidden="true" />
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="corp-eyebrow" style={{ justifyContent: "center" }}>
            profesyonel bağlantı sayfası
          </div>
          <h1
            className="corp-display"
            style={{ fontSize: "clamp(30px, 6vw, 42px)", marginTop: 14, lineHeight: 1.15 }}
          >
            Bağlantılarını 2 dakikada
            <br />
            tek sayfada topla
          </h1>
          <p style={{ color: "var(--c-body)", marginTop: 16, fontSize: 16, lineHeight: 1.7 }}>
            Instagram'ın, WhatsApp'ın, mağazan ve iletişim bilgilerin — hepsi tek,
            profesyonel bir sayfada. Kimin baktığını da sana gösterir.
          </p>

          <div className="corp-claim-box" id="claim" style={{ margin: "28px auto 0", maxWidth: 440 }}>
            <div className="corp-claim-label">Kendi adını hemen dene</div>
            <div className="corp-claim-row">
              <span className="mono corp-claim-prefix">minebio.net/</span>
              <input
                className="corp-claim-input"
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder="kullanici-adin"
                onKeyDown={(e) => e.key === "Enter" && handleClaim()}
              />
              {claimStatus === "available" && (
                <button
                  type="button"
                  className="corp-btn"
                  style={{ padding: "9px 16px", fontSize: 13 }}
                  onClick={handleClaim}
                >
                  Bu adı al
                </button>
              )}
            </div>
            {claimStatus && (
              <div className={`corp-claim-status corp-claim-status-${claimStatus}`}>
                {claimStatus === "checking" && "kontrol ediliyor..."}
                {claimStatus === "available" && "✓ Müsait! 🎉"}
                {claimStatus === "taken" && "✗ Bu isim alınmış, başka bir tane dene"}
                {claimStatus === "short" && "En az 3 karakter yaz"}
              </div>
            )}
          </div>

          <div
            className="row"
            style={{ justifyContent: "center", gap: 18, flexWrap: "wrap", marginTop: 28 }}
          >
            {TRUST_ITEMS.map((item) => (
              <span
                key={item.text}
                className="row"
                style={{ gap: 6, fontSize: 13, color: "var(--c-body)" }}
              >
                <span style={{ color: "var(--c-accent)" }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Tek, sade örnek önizleme — dönen carousel yok, odak dağılmasın */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, padding: "0 12px" }}>
          <div className="corp-phone">
            <div className="corp-phone-notch" />
            <div className="corp-phone-screen">
              <div className="corp-mock-avatar">
                <img
                  src="/ornekler/profil-2.jpg"
                  alt="Deniz Kaya"
                  className="corp-mock-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="corp-mock-avatar-fallback">D</span>
              </div>
              <div className="corp-display" style={{ fontSize: 15, marginTop: 10, textAlign: "center" }}>
                Deniz Kaya
              </div>
              <p style={{ fontSize: 11.5, textAlign: "center", color: "var(--c-body)", marginTop: 2 }}>
                minebio.net/deniz-kaya
              </p>
              <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                {["Instagram mağazam", "WhatsApp'tan sipariş ver", "Trendyol mağazam"].map((label) => (
                  <div key={label} className="corp-mock-link">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 adım */}
      <section className="corp-section" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="corp-eyebrow" style={{ justifyContent: "center" }}>
          nasıl çalışır
        </div>
        <h2
          className="corp-display"
          style={{ fontSize: "clamp(22px, 4vw, 28px)", marginTop: 10, textAlign: "center" }}
        >
          3 adımda yayında
        </h2>
        <div className="corp-steps" style={{ marginTop: 28 }}>
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <div className="corp-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="corp-display" style={{ fontSize: 16, marginTop: 10 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="corp-section" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <h2 className="corp-display" style={{ fontSize: "clamp(22px, 4vw, 28px)" }}>
          Sayfan seni bekliyor
        </h2>
        <p style={{ color: "var(--c-body)", marginTop: 10, fontSize: 15 }}>
          Kullanıcı adını yukarıda dene, müsaitse hemen al — kredi kartı istemiyoruz.
        </p>
        <a href="#claim" className="corp-btn" style={{ display: "inline-block", marginTop: 18 }}>
          Ücretsiz başla
        </a>
      </section>

      {/* Sade alt bilgi — sadece zorunlu yasal linkler, dikkat dağıtacak ürün/blog linki yok */}
      <footer className="corp-footer">
        <div className="corp-footer-bottom" style={{ borderTop: "none", paddingTop: 0 }}>
          <div className="row" style={{ justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
            <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
            <Link href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>
          </div>
          © {new Date().getFullYear()} MineBio. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
