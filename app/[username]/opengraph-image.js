import { ImageResponse } from "next/og";
import { supabase } from "../../lib/supabaseClient";
import { THEMES, DEFAULT_THEME } from "../../lib/themes";

export const dynamic = "force-dynamic";
export const alt = "MineBio profili";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_url, theme")
    .eq("username", params.username)
    .maybeSingle();

  const theme = THEMES[profile?.theme] || THEMES[DEFAULT_THEME];
  const name = (profile?.display_name || profile?.username || "MineBio").trim();
  const initial = name.charAt(0).toUpperCase();

  let avatarData = null;
  if (profile?.avatar_url) {
    try {
      const res = await fetch(profile.avatar_url);
      const buf = await res.arrayBuffer();
      avatarData = `data:image/png;base64,${Buffer.from(buf).toString("base64")}`;
    } catch (e) {
      avatarData = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme.ink,
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: 36,
            background: avatarData
              ? "transparent"
              : `linear-gradient(135deg, ${theme.accent}, ${theme.accentDim})`,
          }}
        >
          {avatarData ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarData}
              width={180}
              height={180}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 72, fontWeight: 700, color: theme.ink }}>
              {initial}
            </span>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: theme.paper }}>
          {name}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: theme.accent, marginTop: 14 }}>
          minebio.net/{profile?.username || ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
