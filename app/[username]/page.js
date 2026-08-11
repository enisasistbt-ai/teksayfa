import { supabase } from "../../lib/supabaseClient";

export const revalidate = 0;

async function getProfile(username) {
  const { data } = await supabase
    .from("profiles")
    .select("username, display_name, links")
    .eq("username", username)
    .maybeSingle();
  return data;
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

  const initial = (profile.display_name || profile.username || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <main className="container" style={{ paddingTop: 64 }}>
      <div className="tabela">
        <div className="avatar">{initial}</div>
        <h1 style={{ textAlign: "center", fontSize: 20 }}>
          {profile.display_name || profile.username}
        </h1>
        <div className="handle mono">teksayfa.app/{profile.username}</div>

        {(!profile.links || profile.links.length === 0) && (
          <p className="empty">Henüz link eklenmemiş.</p>
        )}

        {(profile.links || []).map((link, i) => (
          <a
            key={i}
            className="link-btn"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="footer-note">TekSayfa ile oluşturuldu</p>
    </main>
  );
}
