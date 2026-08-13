import { supabase } from "../../lib/supabaseClient";
import { THEMES, DEFAULT_THEME } from "../../lib/themes";
import SaveContactButton from "./SaveContactButton";
import { headers } from "next/headers";

export const revalidate = 0;

function extractWhatsappPhone(links) {
  const wa = (links || []).find((l) => l.label === "WhatsApp");
  if (!wa) return "";
  const match = wa.url.match(/wa\.me\/(\d+)/);
  return match ? `+${match[1]}` : "";
}

async function getProfile(username) {
  const { data } = await supabase
    .from("profiles")
    .select(
      "username, display_name, bio, links, theme, is_premium, avatar_url, away_mode, away_message, away_until"
    )
    .eq("username", username)
    .maybeSingle();
  return data;
}

async function logPageView(username) {
  try {
    await supabase.from("page_views").insert({ username });
  } catch (e) {
    // istatistik kaydı başarısız olsa da sayfa gösterilmeye devam etsin
  }
}

export default async function PublicProfile({ params }) {
  const profile = await getProfile(params.username);

  if (!profile) {
    return (
      <main className="container" style={{ paddingTop: 100 }}>
        <p className="empty">Bu sayfa henüz oluşturulmamış.</p>
      </main>
    );
  }

  logPageView(profile.username);

  const host = headers().get("host");
  const pageUrl = host ? `https://${host}/${profile.username}` : `/${profile.username}`;

  const theme = THEMES[profile.theme] || THEMES[DEFAULT_THEME];
  const themeVars = {
    "--ink": theme.ink,
    "--panel": theme.panel,
    "--panel-hi": theme.panelHi,
    "--paper": theme.paper,
    "--muted": theme.muted,
    "--amber": theme.accent,
    "--amber-dim": theme.accentDim,
    background: theme.ink,
    minHeight: "100vh",
  };

  const initial = (profile.display_name || profile.username || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div style={themeVars}>
      <main className="container" style={{ paddingTop: 64 }}>
        {profile.away_mode && (
          <div className="away-banner">
            <strong>Mola verdik</strong>
            <p style={{ marginTop: 4 }}>{profile.away_message || "Şu anda müsait değiliz."}</p>
            {profile.away_until && (
              <p style={{ marginTop: 4, fontSize: 12, opacity: 0.85 }}>
                Dönüş:{" "}
                {new Date(profile.away_until).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                })}
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
          {profile.bio && (
            <p style={{ textAlign: "center", fontSize: 13, color: "var(--paper)", marginTop: 12, lineHeight: 1.5 }}>
              {profile.bio}
            </p>
          )}

          {(!profile.links || profile.links.length === 0) && (
            <p className="empty">Henüz link eklenmemiş.</p>
          )}

          {(profile.links || []).map((link, i) => (
            <a
              key={i}
              className="link-btn"
              href={`/api/click?url=${encodeURIComponent(
                link.url
              )}&u=${encodeURIComponent(profile.username)}&l=${encodeURIComponent(
                link.label
              )}`}
            >
              {link.label}
            </a>
          ))}

          <SaveContactButton
            displayName={profile.display_name || profile.username}
            phone={extractWhatsappPhone(profile.links)}
            url={pageUrl}
            bio={profile.bio || ""}
          />
        </div>

        <p className="footer-note">
          {profile.is_premium ? "" : "TekSayfa ile oluşturuldu"}
        </p>
      </main>
    </div>
  );
}
