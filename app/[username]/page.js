import { supabase } from "../../lib/supabaseClient";
import { THEMES, DEFAULT_THEME } from "../../lib/themes";
import { isEffectivelyPremium } from "../../lib/premium";
import { headers } from "next/headers";
import ProfileView from "./ProfileView";

export const revalidate = 0;

async function getProfile(username) {
  const { data, error } = await supabase
    .from("public_profiles")
    .select(
      "id, username, display_name, bio, bio_en, links, theme, is_premium, trial_ends_at, avatar_url, away_mode, away_message, away_message_en, away_until"
    )
    .eq("username", username)
    .maybeSingle();
  if (error) {
    console.error("getProfile hatası:", username, error);
  }
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

  const effectiveProfile = { ...profile, is_premium: isEffectivelyPremium(profile) };

  return (
    <div style={themeVars}>
      <main className="container" style={{ paddingTop: 64 }}>
        <ProfileView profile={effectiveProfile} pageUrl={pageUrl} />
      </main>
    </div>
  );
}
