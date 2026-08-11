"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { THEMES, DEFAULT_THEME, FREE_LINK_LIMIT } from "../../lib/themes";
import { PLATFORMS, normalizeUrl } from "../../lib/platforms";

function emptyPlatformValues() {
  const obj = {};
  PLATFORMS.forEach((p) => (obj[p.id] = ""));
  return obj;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [platformValues, setPlatformValues] = useState(emptyPlatformValues());
  const [customLinks, setCustomLinks] = useState([]);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ views: 0, clicksByLabel: {} });

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session) {
        router.replace("/login");
        return;
      }
      setUserId(session.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile) {
        setUsername(profile.username || "");
        setDisplayName(profile.display_name || "");
        setTheme(profile.theme || DEFAULT_THEME);
        setIsPremium(!!profile.is_premium);

        // Kayıtlı linkleri platform alanlarına ve özel linklere ayır
        const savedLinks = profile.links || [];
        const pValues = emptyPlatformValues();
        const custom = [];
        const platformLabels = Object.fromEntries(
          PLATFORMS.map((p) => [p.label.toLowerCase(), p])
        );

        savedLinks.forEach((link) => {
          const match = platformLabels[(link.label || "").toLowerCase()];
          if (match) {
            // Kullanıcı adını linkten geri çıkar
            if (match.type === "username") {
              const built = match.buildUrl("PLACEHOLDER");
              const [prefix] = built.split("PLACEHOLDER");
              pValues[match.id] = (link.url || "").startsWith(prefix)
                ? link.url.slice(prefix.length)
                : link.url;
            } else {
              pValues[match.id] = link.url || "";
            }
          } else {
            custom.push(link);
          }
        });

        setPlatformValues(pValues);
        setCustomLinks(custom);
        await loadStats(profile.username);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function loadStats(uname) {
    if (!uname) return;

    const { count: viewCount } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .eq("username", uname);

    const { data: clickRows } = await supabase
      .from("link_clicks")
      .select("link_label")
      .eq("username", uname);

    const clicksByLabel = {};
    (clickRows || []).forEach((row) => {
      const label = row.link_label || "İsimsiz link";
      clicksByLabel[label] = (clicksByLabel[label] || 0) + 1;
    });

    setStats({ views: viewCount || 0, clicksByLabel });
  }

  function updatePlatformValue(id, value) {
    setPlatformValues((prev) => ({ ...prev, [id]: value }));
  }

  function updateCustomLink(index, field, value) {
    setCustomLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  }

  function totalLinkCount() {
    const filledPlatforms = PLATFORMS.filter((p) => platformValues[p.id]?.trim()).length;
    const filledCustom = customLinks.filter((l) => l.url.trim()).length;
    return filledPlatforms + filledCustom;
  }

  function addCustomLink() {
    if (!isPremium && totalLinkCount() >= FREE_LINK_LIMIT) {
      setError(
        `Ücretsiz planda en fazla ${FREE_LINK_LIMIT} link ekleyebilirsin. Daha fazlası için Premium'a geç.`
      );
      return;
    }
    setError("");
    setCustomLinks((prev) => [
      ...prev,
      { label: `Web sitesi ${prev.length + 1}`, url: "" },
    ]);
  }

  function removeCustomLink(index) {
    setCustomLinks((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((l, i) => ({ ...l, label: `Web sitesi ${i + 1}` }))
    );
  }

  function handleThemeClick(key) {
    if (THEMES[key].premium && !isPremium) {
      setError("Bu tema Premium'da. Kilidi açmak için plana geç.");
      return;
    }
    setError("");
    setTheme(key);
  }

  function buildLinksArray() {
    const links = [];
    PLATFORMS.forEach((p) => {
      const val = (platformValues[p.id] || "").trim();
      if (!val) return;
      const url = p.type === "url" ? normalizeUrl(val) : p.buildUrl(val.replace(/^@/, ""));
      links.push({ label: p.label, url });
    });
    customLinks.forEach((l) => {
      if (l.url.trim()) {
        links.push({ label: l.label, url: normalizeUrl(l.url) });
      }
    });
    return links;
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);

    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, "-");
    let cleanLinks = buildLinksArray();
    if (!isPremium && cleanLinks.length > FREE_LINK_LIMIT) {
      cleanLinks = cleanLinks.slice(0, FREE_LINK_LIMIT);
    }

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      username: cleanUsername,
      display_name: displayName.trim(),
      links: cleanLinks,
      theme,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    if (error) {
      setError(
        error.code === "23505"
          ? "Bu kullanıcı adı zaten alınmış, başka bir tane dene."
          : "Kaydedilemedi, tekrar dene."
      );
      return;
    }
    setUsername(cleanUsername);
    setSaved(true);
    loadStats(cleanUsername);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 48 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">panelin</div>
        <button className="btn-ghost" onClick={handleLogout}>
          Çıkış yap
        </button>
      </div>

      <div className="row" style={{ justifyContent: "space-between", marginTop: 10 }}>
        <h1 className="display" style={{ fontSize: 26 }}>
          Sayfanı düzenle
        </h1>
        <Link
          href="/fiyatlandirma"
          className="mono"
          style={{
            fontSize: 12,
            color: isPremium ? "var(--amber)" : "var(--muted)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          {isPremium ? "✨ Premium" : "Ücretsiz plan"}
        </Link>
      </div>

      {username && (
        <div className="tabela" style={{ marginTop: 20, padding: "20px 22px" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            istatistikler
          </div>
          <p style={{ fontSize: 14 }}>
            Toplam sayfa görüntülenme: <strong>{stats.views}</strong>
          </p>
          {Object.keys(stats.clicksByLabel).length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
              Henüz link tıklaması yok.
            </p>
          ) : (
            <div style={{ marginTop: 10 }}>
              {Object.entries(stats.clicksByLabel).map(([label, count]) => (
                <div
                  key={label}
                  className="row"
                  style={{ justifyContent: "space-between", fontSize: 13, marginTop: 6 }}
                >
                  <span>{label}</span>
                  <span className="mono">{count} tıklama</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSave}>
        <label className="label" htmlFor="username">
          Kullanıcı adı (site.com/kullanici-adi)
        </label>
        <input
          id="username"
          className="field mono"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="aysenin-el-isleri"
          required
        />

        <label className="label" htmlFor="displayName">
          Görünecek isim
        </label>
        <input
          id="displayName"
          className="field"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Ayşe'nin El İşleri"
        />

        <label className="label">Tema</label>
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {Object.entries(THEMES).map(([key, t]) => {
            const locked = t.premium && !isPremium;
            return (
              <button
                type="button"
                key={key}
                onClick={() => handleThemeClick(key)}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 10,
                  background: t.ink,
                  border:
                    theme === key
                      ? `2px solid ${t.accent}`
                      : "2px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 6,
                  position: "relative",
                  opacity: locked ? 0.55 : 1,
                }}
                aria-label={t.name}
                title={locked ? `${t.name} (Premium)` : t.name}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: t.accent,
                  }}
                />
                {locked && (
                  <span style={{ position: "absolute", top: 3, right: 5, fontSize: 10 }}>
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
          Seçili: {THEMES[theme].name}
          {!isPremium && (
            <>
              {" · "}
              <Link href="/fiyatlandirma" style={{ color: "var(--amber)" }}>
                Diğer temaların kilidini aç
              </Link>
            </>
          )}
        </p>

        <label className="label" style={{ marginTop: 26 }}>
          Sosyal medya ve mağazaların {!isPremium && `(${totalLinkCount()}/${FREE_LINK_LIMIT})`}
        </label>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Doldurduğun alanlar sayfanda görünür, boş bıraktıkların görünmez.
        </p>

        {PLATFORMS.map((p) => (
          <div key={p.id} style={{ marginTop: 22 }}>
            <label className="label" style={{ marginTop: 0 }} htmlFor={`platform-${p.id}`}>
              {p.label}
            </label>
            <input
              id={`platform-${p.id}`}
              className="field"
              value={platformValues[p.id]}
              onChange={(e) => updatePlatformValue(p.id, e.target.value)}
              placeholder={p.placeholder}
            />
            {p.hint && (
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>{p.hint}</p>
            )}
          </div>
        ))}

        <label className="label" style={{ marginTop: 30 }}>
          Diğer linklerin
        </label>
        {customLinks.map((link, i) => (
          <div key={i} style={{ marginTop: 22 }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <label className="label" style={{ marginTop: 0 }}>
                {link.label}
              </label>
              <button
                type="button"
                className="remove"
                onClick={() => removeCustomLink(i)}
                aria-label="Linki kaldır"
              >
                Sil
              </button>
            </div>
            <input
              className="field"
              value={link.url}
              onChange={(e) => updateCustomLink(i, "url", e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}

        <button
          type="button"
          className="btn-ghost"
          style={{ marginTop: 14 }}
          onClick={addCustomLink}
        >
          + Web sitesi ekle
        </button>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 14 }}>{error}</p>
        )}
        {saved && (
          <p style={{ color: "var(--amber)", fontSize: 13, marginTop: 14 }}>Kaydedildi.</p>
        )}

        <button className="btn" style={{ marginTop: 20, width: "100%" }} disabled={saving}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {username && (
        <p className="footer-note">
          Yayındaki sayfan:{" "}
          <a className="mono" style={{ color: "var(--amber)" }} href={`/${username}`} target="_blank">
            /{username}
          </a>
        </p>
      )}
    </main>
  );
}
