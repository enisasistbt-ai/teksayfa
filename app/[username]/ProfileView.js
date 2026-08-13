"use client";

import { useState } from "react";
import { translateLinkLabel, extractWhatsappPhone } from "../../lib/platforms";
import SaveContactButton from "./SaveContactButton";

const STRINGS = {
  tr: {
    empty: "Henüz link eklenmemiş.",
    madeWith: "TekSayfa ile oluşturuldu",
    onBreak: "Mola verdik",
    defaultAway: "Şu anda müsait değiliz.",
    returns: "Dönüş",
    saveContact: "📇 Rehbere kaydet",
  },
  en: {
    empty: "No links added yet.",
    madeWith: "Made with TekSayfa",
    onBreak: "We're on a break",
    defaultAway: "We're currently unavailable.",
    returns: "Back on",
    saveContact: "📇 Save contact",
  },
};

export default function ProfileView({ profile, pageUrl }) {
  const [lang, setLang] = useState("tr");
  const t = STRINGS[lang];

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

      <div className="tabela">
        <div className="avatar">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.display_name || profile.username} />
          ) : (
            initial
          )}
        </div>
        <h1 style={{ textAlign: "center", fontSize: 20 }}>
          {profile.display_name || profile.username}
        </h1>
        <div className="handle mono">teksayfa.app/{profile.username}</div>
        {bioText && (
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--paper)",
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            {bioText}
          </p>
        )}

        {(!profile.links || profile.links.length === 0) && <p className="empty">{t.empty}</p>}

        {(profile.links || []).map((link, i) => (
          <a
            key={i}
            className="link-btn"
            href={`/api/click?url=${encodeURIComponent(
              link.url
            )}&u=${encodeURIComponent(profile.username)}&l=${encodeURIComponent(link.label)}`}
          >
            {translateLinkLabel(link.label, lang)}
          </a>
        ))}

        <SaveContactButton
          displayName={profile.display_name || profile.username}
          phone={extractWhatsappPhone(profile.links)}
          url={pageUrl}
          bio={bioText}
          label={t.saveContact}
        />
      </div>

      <p className="footer-note">{profile.is_premium ? "" : t.madeWith}</p>
    </>
  );
}
