"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { sanitizeUsername } from "../../../lib/username";

const TRUST_ITEMS = [
  { icon: "✓", text: "No credit card required" },
  { icon: "◐", text: "7-day free trial" },
  { icon: "◆", text: "Cancel anytime" },
  { icon: "▦", text: "Live in 2 minutes" },
];

const STEPS = [
  { title: "Pick your username", desc: "Try it below — if it's free, it's yours right away." },
  { title: "Sign in with email", desc: "No password. A code lands in your inbox, you're in seconds later." },
  { title: "Add your links, share", desc: "Instagram, WhatsApp, your shop — add them from your dashboard, drop the link in your bio." },
];

// Örnekler kutuda otomatik yazılıp silinecek — sürekli değişen, canlı bir his
// vermek için. Herhangi bir ülkeye/isme özgü olmayan, genel örnekler.
const PLACEHOLDER_WORDS = ["your-name", "the-studio", "your-brand", "the-shop"];

export default function StartClientEn() {
  const router = useRouter();
  const [claimInput, setClaimInput] = useState("");
  const [claimStatus, setClaimStatus] = useState(null); // null | checking | available | taken | short
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const focusedRef = useRef(false);

  // Placeholder yazma/silme animasyonu — kullanıcı bir şey yazmaya başlayınca
  // (input dolu ya da input'a odaklanılınca) durur, alan boşalınca devam eder.
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    function tick() {
      if (claimInput || focusedRef.current) {
        timeoutId = setTimeout(tick, 400);
        return;
      }
      const word = PLACEHOLDER_WORDS[wordIndex];
      if (!deleting) {
        charIndex++;
        setTypedPlaceholder(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
        timeoutId = setTimeout(tick, 90);
      } else {
        charIndex--;
        setTypedPlaceholder(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % PLACEHOLDER_WORDS.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, 45);
      }
    }
    timeoutId = setTimeout(tick, 500);
    return () => clearTimeout(timeoutId);
  }, [claimInput]);

  useEffect(() => {
    const clean = sanitizeUsername(claimInput);
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
    const clean = sanitizeUsername(claimInput);
    if (claimStatus !== "available" || !clean) return;
    try {
      window.localStorage.setItem("mb_desired_username", clean);
    } catch (e) {
      // ignore
    }
    router.push("/login");
  }

  return (
    <div className="corp-landing">
      {/* Lean top bar — no distracting nav, just a login link for returning visitors */}
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <div className="row" style={{ gap: 9 }}>
            <img src="/logo-mark.png" alt="MineBio" style={{ width: 24, height: 24 }} />
            <span className="corp-display" style={{ fontSize: 16 }}>
              MineBio
            </span>
          </div>
          <Link href="/login" style={{ fontSize: 13.5, whiteSpace: "nowrap" }}>
            <span className="corp-full-text">Already have an account? Log in</span>
            <span className="corp-short-text">Log in</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="corp-section corp-hero" style={{ paddingTop: 56 }}>
        <div className="corp-hero-glow" aria-hidden="true" />
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="corp-eyebrow" style={{ justifyContent: "center" }}>
            professional link page
          </div>
          <h1
            className="corp-display"
            style={{ fontSize: "clamp(30px, 6vw, 42px)", marginTop: 14, lineHeight: 1.15 }}
          >
            Bring all your links together
            <br />
            in 2 minutes
          </h1>
          <p style={{ color: "var(--c-body)", marginTop: 16, fontSize: 16, lineHeight: 1.7 }}>
            Your Instagram, your WhatsApp, your shop, your contact info — all on
            one professional page. It shows you who's looking, too.
          </p>

          <div className="corp-claim-box" id="claim" style={{ margin: "28px auto 0", maxWidth: 440 }}>
            <div className="corp-claim-label">Try your name right now</div>
            <div className="corp-claim-row">
              <span className="mono corp-claim-prefix">minebio.net/</span>
              <input
                className="corp-claim-input"
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                onFocus={() => {
                  focusedRef.current = true;
                }}
                onBlur={() => {
                  focusedRef.current = false;
                }}
                placeholder={typedPlaceholder}
                onKeyDown={(e) => e.key === "Enter" && handleClaim()}
              />
              {claimStatus === "available" && (
                <button
                  type="button"
                  className="corp-btn"
                  style={{ padding: "9px 16px", fontSize: 13 }}
                  onClick={handleClaim}
                >
                  Claim it
                </button>
              )}
            </div>
            {claimStatus && (
              <div className={`corp-claim-status corp-claim-status-${claimStatus}`}>
                {claimStatus === "checking" && "checking..."}
                {claimStatus === "available" && "✓ Available! 🎉"}
                {claimStatus === "taken" && "✗ Taken, try another one"}
                {claimStatus === "short" && "At least 3 characters"}
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

        {/* Single static preview — no rotating carousel, keeps focus on the CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, padding: "0 12px" }}>
          <div className="corp-phone">
            <div className="corp-phone-notch" />
            <div className="corp-phone-screen">
              <div className="corp-mock-avatar">
                <img
                  src="/ornekler/profil-6.jpg"
                  alt="Sarah Bennett"
                  className="corp-mock-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="corp-mock-avatar-fallback">S</span>
              </div>
              <div className="corp-display" style={{ fontSize: 15, marginTop: 10, textAlign: "center" }}>
                Sarah Bennett
              </div>
              <p style={{ fontSize: 11.5, textAlign: "center", color: "var(--c-body)", marginTop: 2 }}>
                minebio.net/sarah-bennett
              </p>
              <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                {["My Instagram shop", "Order via WhatsApp", "My Etsy shop"].map((label) => (
                  <div key={label} className="corp-mock-link">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="corp-section" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="corp-eyebrow" style={{ justifyContent: "center" }}>
          how it works
        </div>
        <h2
          className="corp-display"
          style={{ fontSize: "clamp(22px, 4vw, 28px)", marginTop: 10, textAlign: "center" }}
        >
          Live in 3 steps
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

      {/* Closing CTA */}
      <section className="corp-section" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <h2 className="corp-display" style={{ fontSize: "clamp(22px, 4vw, 28px)" }}>
          Your page is waiting
        </h2>
        <p style={{ color: "var(--c-body)", marginTop: 10, fontSize: 15 }}>
          Try your username above, claim it if it's free — no credit card needed.
        </p>
        <a href="#claim" className="corp-btn" style={{ display: "inline-block", marginTop: 18 }}>
          Start free
        </a>
      </section>

      {/* Lean footer — required legal links only, no product/blog nav */}
      <footer className="corp-footer">
        <div className="corp-footer-bottom" style={{ borderTop: "none", paddingTop: 0 }}>
          <div className="row" style={{ justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
            <Link href="/gizlilik-politikasi">Privacy Policy</Link>
            <Link href="/kullanim-kosullari">Terms of Use</Link>
            <Link href="/kvkk-aydinlatma-metni">Data Protection Notice</Link>
          </div>
          © {new Date().getFullYear()} MineBio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
