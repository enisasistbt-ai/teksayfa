"use client";

import { useEffect, useState } from "react";
import { translateLinkLabel, extractWhatsappPhone } from "../../lib/platforms";
import { shareOrCopy } from "../../lib/share";
import SaveContactButton from "./SaveContactButton";
import ContactForm from "./ContactForm";

const STRINGS = {
  tr: {
    empty: "Henüz link eklenmemiş.",
    madeWith: "MineBio ile oluşturuldu",
    onBreak: "Mola verdik",
    defaultAway: "Şu anda müsait değiliz.",
    returns: "Dönüş",
    saveContact: "📇 Rehbere kaydet",
    share: "📤 Sayfayı paylaş",
    copied: "Link kopyalandı.",
  },
  en: {
    empty: "No links added yet.",
    madeWith: "Made with MineBio",
    onBreak: "We're on a break",
    defaultAway: "We're currently unavailable.",
    returns: "Back on",
    saveContact: "📇 Save contact",
    share: "📤 Share this page",
    copied: "Link copied.",
  },
};

export default function ProfileView({ profile, pageUrl, photoBg = false, btnStyle = "solid" }) {
  const [lang, setLang] = useState("tr");
  const [shareCopied, setShareCopied] = useState(false);
  const t = STRINGS[lang];

  useEffect(() => {
    // Reklamlar sadece ücretsiz plandaki kullanıcıların sayfalarında görünsün —
    // Premium'un "reklamsız" avantajı burada korunuyor.
    if (profile.is_premium) return;
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5441545128970618";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [profile.is_premium]);

  async function handleShare() {
    await shareOrCopy(
      {
        title: profile.display_name || profile.username,
        text: lang === "en" ? "Check out this page" : "Şu sayfaya bir bak",
        url: pageUrl,
      },
      () => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      }
    );
  }

  const initial = (profile.display_name || profile.username || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  const bioText = (lang === "en" && profile.bio_en ? profile.bio_en : profile.bio) || "";
  const awayText =
    (lang === "en" && profile.away_message_en ? profile.away_message_en : profile.away_message) ||
    t.defaultAway;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <div
          style={{
            display: "inline-flex",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          {["tr", "en"].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                padding: "4px 12px",
                fontSize: 11,
                fontFamily: "monospace",
                background: lang === code ? "var(--amber)" : "transparent",
                color: lang === code ? "var(--ink)" : "var(--muted)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {profile.away_mode && (
        <div className="away-banner">
          <strong>{t.onBreak}</strong>
          <p style={{ marginTop: 4 }}>{awayText}</p>
          {profile.away_until && (
            <p style={{ marginTop: 4, fontSize: 12, opacity: 0.85 }}>
              {t.returns}:{" "}
              {new Date(profile.away_until).toLocaleDateString(
                lang === "en" ? "en-US" : "tr-TR",
                { day: "numeric", month: "long" }
              )}
            </p>
          )}
        </div>
      )}

      <div className={`tabela${photoBg ? " tabela-photo" : ""}`}>
        {!photoBg && (
          <div className="avatar">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name || profile.username} />
            ) : (
              initial
            )}
          </div>
        )}
        <h1 style={{ textAlign: "center", fontSize: 20, textShadow: photoBg ? "0 1px 4px rgba(0,0,0,0.6)" : "none" }}>
          {profile.display_name || profile.username}
        </h1>
        <div className="handle mono" style={photoBg ? { textShadow: "0 1px 3px rgba(0,0,0,0.6)", color: "rgba(251,248,241,0.85)" } : undefined}>
          minebio.net/{profile.username}
        </div>
        {bioText && (
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: photoBg ? "#fbf8f1" : "var(--paper)",
              marginTop: 12,
              lineHeight: 1.5,
              textShadow: photoBg ? "0 1px 3px rgba(0,0,0,0.6)" : "none",
            }}
          >
            {bioText}
          </p>
        )}

        {(!profile.links || profile.links.length === 0) && <p className="empty">{t.empty}</p>}

        {(profile.links || []).map((link, i) => (
          <a
            key={i}
            className={`link-btn${photoBg ? " link-btn-photo" : !photoBg && btnStyle !== "solid" ? ` link-btn-${btnStyle}` : ""}`}
            href={`/api/click?url=${encodeURIComponent(
              link.url
            )}&u=${encodeURIComponent(profile.username)}&l=${encodeURIComponent(link.label)}`}
          >
            {translateLinkLabel(link, lang)}
          </a>
        ))}

        <SaveContactButton
          displayName={profile.display_name || profile.username}
          phone={extractWhatsappPhone(profile.links)}
          url={pageUrl}
          bio={bioText}
          label={t.saveContact}
        />

        <button
          type="button"
          className="btn-ghost"
          style={{ width: "100%", marginTop: 10 }}
          onClick={handleShare}
        >
          {t.share}
        </button>
        {shareCopied && (
          <p style={{ textAlign: "center", fontSize: 11.5, color: "var(--amber)", marginTop: 6 }}>
            {t.copied}
          </p>
        )}
      </div>

      {profile.is_premium && <ContactForm ownerId={profile.id} lang={lang} />}

      <p className="footer-note">{profile.is_premium ? "" : t.madeWith}</p>
    </>
  );
}
