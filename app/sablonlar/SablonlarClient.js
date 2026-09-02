"use client";

import { useState } from "react";
import Link from "next/link";
import { THEMES, DEFAULT_THEME } from "../../lib/themes";
import { BlogNav, BlogFooter } from "../../components/BlogChrome";

const SAMPLE_LINKS = ["Instagram mağazam", "WhatsApp'tan sipariş ver", "Web sitem"];
const PREVIEW_PHOTO = "/ornekler/profil-6.jpg";

const ORDER = ["vitrin", "gunbatimi", "kagit", "kahve", "deniz", "gunes", "foto"];

export default function SablonlarClient() {
  const [selected, setSelected] = useState("gunbatimi");
  const theme = THEMES[selected] || THEMES[DEFAULT_THEME];
  const isPhoto = Boolean(theme.photoBg);
  const btnClass = isPhoto ? "link-btn-photo" : theme.btnStyle && theme.btnStyle !== "solid" ? `link-btn-${theme.btnStyle}` : "";

  const pageStyle = isPhoto
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(16,23,20,0.62) 0%, rgba(16,23,20,0.58) 45%, rgba(16,23,20,0.74) 100%), url(${PREVIEW_PHOTO})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { background: theme.bg || theme.ink };

  return (
    <div className="corp-landing">
      <BlogNav lang="tr" />

      <section className="corp-section" style={{ textAlign: "center", paddingBottom: 0 }}>
        <div className="corp-eyebrow" style={{ justifyContent: "center" }}>
          şablonlar
        </div>
        <h1 className="corp-display" style={{ fontSize: "clamp(28px, 5vw, 38px)", marginTop: 12 }}>
          Her markaya uygun bir şablon
        </h1>
        <p style={{ color: "var(--c-body)", marginTop: 12, maxWidth: 520, marginInline: "auto", fontSize: 15.5 }}>
          Birini seç, sağda nasıl göründüğünü anında gör. Beğendiğini ücretsiz kullanmaya başla.
        </p>
      </section>

      <section className="corp-section" style={{ paddingTop: 40 }}>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>
          {/* Büyük önizleme */}
          <div style={{ flex: "0 0 auto" }}>
            <div
              style={{
                width: 300,
                borderRadius: 34,
                padding: 14,
                background: "#0b1815",
                boxShadow: "0 40px 80px -30px rgba(16,35,31,0.5)",
              }}
            >
              <div style={{ width: 56, height: 5, borderRadius: 3, background: "rgba(242,236,217,0.25)", margin: "0 auto 14px" }} />
              <div
                className="tabela"
                style={{
                  ...pageStyle,
                  ...(theme.panel && !isPhoto ? {} : {}),
                  "--ink": theme.ink,
                  "--panel": isPhoto ? "transparent" : theme.panel,
                  "--panel-hi": theme.panelHi,
                  "--paper": theme.paper,
                  "--muted": theme.muted,
                  "--amber": theme.accent,
                  "--amber-dim": theme.accentDim,
                  borderRadius: 22,
                  minHeight: 420,
                  ...(isPhoto ? { border: "none", boxShadow: "none" } : { background: "var(--panel)" }),
                }}
              >
                {!isPhoto && (
                  <div className="avatar">
                    <img src={PREVIEW_PHOTO} alt="" />
                  </div>
                )}
                <h1 style={{ textAlign: "center", fontSize: 18, textShadow: isPhoto ? "0 1px 4px rgba(0,0,0,0.6)" : "none" }}>
                  Selin Karaca
                </h1>
                <div className="handle mono" style={isPhoto ? { color: "rgba(251,248,241,0.85)", textShadow: "0 1px 3px rgba(0,0,0,0.6)" } : undefined}>
                  minebio.net/selin-karaca
                </div>
                <div style={{ marginTop: 16 }}>
                  {SAMPLE_LINKS.map((l) => (
                    <a key={l} className={`link-btn ${btnClass}`} style={{ pointerEvents: "none" }}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seçici + bilgi */}
          <div style={{ flex: "1 1 320px", maxWidth: 440 }}>
            <div className="corp-display" style={{ fontSize: 22 }}>
              {theme.name}
              {theme.premium && (
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--c-accent-dim)", marginLeft: 10, verticalAlign: "middle" }}
                >
                  🔒 PRO
                </span>
              )}
            </div>
            <p style={{ color: "var(--c-body)", marginTop: 8, fontSize: 14 }}>
              {isPhoto
                ? "Profil fotoğrafın sayfanın tamamını kaplar, linkler üzerine bindirilir."
                : theme.btnStyle === "pill"
                ? "Sıcak bir gradyan zemin, yuvarlak hatlı butonlar."
                : theme.btnStyle === "outline"
                ? "Açık, minimal zemin — butonlar ince çerçeveli."
                : "Sade, koyu zemin, dolgun butonlar."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              {ORDER.map((key) => {
                const t = THEMES[key];
                if (!t) return null;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelected(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: selected === key ? "2px solid var(--c-accent)" : "1px solid var(--c-border)",
                      background: selected === key ? "var(--c-accent-tint)" : "#fff",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--c-ink)",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: t.photoBg ? `url(${PREVIEW_PHOTO}) center/cover` : t.bg || t.ink,
                        flexShrink: 0,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    />
                    {t.name}
                  </button>
                );
              })}
            </div>

            <Link href="/login" className="corp-btn" style={{ marginTop: 28, display: "inline-block" }}>
              Bu şablonu kullan — Ücretsiz başla
            </Link>
          </div>
        </div>
      </section>

      <BlogFooter lang="tr" />
    </div>
  );
}
