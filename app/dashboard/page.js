"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");

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
        setLinks(profile.links || []);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  function updateLink(index, field, value) {
    setLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  }

  function addLink() {
    setLinks((prev) => [...prev, { label: "", url: "" }]);
  }

  function removeLink(index) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);

    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, "-");
    const cleanLinks = links.filter((l) => l.label.trim() && l.url.trim());

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      username: cleanUsername,
      display_name: displayName.trim(),
      links: cleanLinks,
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
    setLinks(cleanLinks);
    setSaved(true);
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

      <h1 className="display" style={{ fontSize: 26, marginTop: 10 }}>
        Sayfanı düzenle
      </h1>

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

        <label className="label">Linklerin</label>
        {links.map((link, i) => (
          <div className="link-row" key={i}>
            <input
              placeholder="Başlık (örn. Instagram)"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
              style={{ maxWidth: 130 }}
            />
            <input
              placeholder="https://..."
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
            />
            <button
              type="button"
              className="remove"
              onClick={() => removeLink(i)}
              aria-label="Linki kaldır"
            >
              Sil
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn-ghost"
          style={{ marginTop: 14 }}
          onClick={addLink}
        >
          + Link ekle
        </button>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 14 }}>
            {error}
          </p>
        )}
        {saved && (
          <p style={{ color: "var(--amber)", fontSize: 13, marginTop: 14 }}>
            Kaydedildi.
          </p>
        )}

        <button className="btn" style={{ marginTop: 20, width: "100%" }} disabled={saving}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {username && (
        <p className="footer-note">
          Yayındaki sayfan:{" "}
          <a
            className="mono"
            style={{ color: "var(--amber)" }}
            href={`/${username}`}
            target="_blank"
          >
            /{username}
          </a>
        </p>
      )}
    </main>
  );
}
