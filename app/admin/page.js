"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "enis.ozbilgir@gmail.com";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [totals, setTotals] = useState({ users: 0, premium: 0, views: 0, clicks: 0 });
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("views");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace("/login");
        return;
      }
      setAllowed(true);

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, display_name, is_premium, theme, avatar_url, updated_at");

      const { data: viewRows } = await supabase.from("page_views").select("username");
      const { data: clickRows } = await supabase.from("link_clicks").select("username");

      const viewCounts = {};
      (viewRows || []).forEach((r) => {
        viewCounts[r.username] = (viewCounts[r.username] || 0) + 1;
      });
      const clickCounts = {};
      (clickRows || []).forEach((r) => {
        clickCounts[r.username] = (clickCounts[r.username] || 0) + 1;
      });

      const merged = (profiles || []).map((p) => ({
        ...p,
        views: viewCounts[p.username] || 0,
        clicks: clickCounts[p.username] || 0,
      }));

      setRows(merged);
      setTotals({
        users: merged.length,
        premium: merged.filter((r) => r.is_premium).length,
        views: (viewRows || []).length,
        clicks: (clickRows || []).length,
      });
      setLoading(false);
    }
    load();
  }, [router]);

  async function togglePremium(row) {
    setBusyId(row.id);
    const { error } = await supabase
      .from("profiles")
      .update({ is_premium: !row.is_premium })
      .eq("id", row.id);
    setBusyId(null);
    if (!error) {
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, is_premium: !r.is_premium } : r))
      );
    }
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const visibleRows = useMemo(() => {
    let list = rows.filter((r) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (r.username || "").toLowerCase().includes(q) ||
        (r.display_name || "").toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av === undefined || av === null) av = "";
      if (bv === undefined || bv === null) bv = "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [rows, search, sortKey, sortDir]);

  if (loading) {
    return (
      <main style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  if (!allowed) return null;

  const sortArrow = (key) => (sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "");

  return (
    <div>
      <div className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-mark" />
          <span className="display" style={{ fontSize: 16 }}>
            MineBio <span style={{ color: "var(--muted)", fontWeight: 400 }}>· Yönetim</span>
          </span>
        </div>
        <a href="/dashboard" className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
          Kendi paneline dön →
        </a>
      </div>

      <div className="admin-body">
        <div className="eyebrow">genel bakış</div>
        <h1 className="display" style={{ fontSize: 28, marginTop: 6, marginBottom: 22 }}>
          Kullanıcılar
        </h1>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="eyebrow">Toplam kullanıcı</div>
            <div className="stat-value">{totals.users}</div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Premium</div>
            <div className="stat-value">{totals.premium}</div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Toplam görüntülenme</div>
            <div className="stat-value">{totals.views}</div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Toplam tıklama</div>
            <div className="stat-value">{totals.clicks}</div>
          </div>
        </div>

        <div className="admin-toolbar">
          <input
            className="search-field"
            placeholder="Kullanıcı adı veya isim ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            {visibleRows.length} / {rows.length} kullanıcı
          </span>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("username")}>Kullanıcı{sortArrow("username")}</th>
                <th onClick={() => handleSort("theme")}>Tema{sortArrow("theme")}</th>
                <th onClick={() => handleSort("views")} style={{ textAlign: "right" }}>
                  Görüntülenme{sortArrow("views")}
                </th>
                <th onClick={() => handleSort("clicks")} style={{ textAlign: "right" }}>
                  Tıklama{sortArrow("clicks")}
                </th>
                <th onClick={() => handleSort("is_premium")}>Plan{sortArrow("is_premium")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => {
                const initial = (r.display_name || r.username || "?").trim().charAt(0).toUpperCase();
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="user-cell">
                        <div className="mini-avatar">
                          {r.avatar_url ? (
                            <img
                              src={r.avatar_url}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                            />
                          ) : (
                            initial
                          )}
                        </div>
                        <div>
                          <div>{r.display_name || "—"}</div>
                          {r.username && (
                            <a
                              href={`/${r.username}`}
                              target="_blank"
                              className="mono"
                              style={{ fontSize: 11, color: "var(--muted)" }}
                            >
                              /{r.username}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>{r.theme || "vitrin"}</td>
                    <td className="num-cell" style={{ textAlign: "right" }}>
                      {r.views}
                    </td>
                    <td className="num-cell" style={{ textAlign: "right" }}>
                      {r.clicks}
                    </td>
                    <td>
                      <span className={`badge ${r.is_premium ? "badge-premium" : "badge-free"}`}>
                        {r.is_premium ? "✨ Premium" : "Ücretsiz"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn-ghost"
                        disabled={busyId === r.id}
                        onClick={() => togglePremium(r)}
                        style={{ fontSize: 12, padding: "6px 12px" }}
                      >
                        {r.is_premium ? "Premium'u kaldır" : "Premium yap"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty">
                    {rows.length === 0 ? "Henüz kullanıcı yok." : "Eşleşen kullanıcı yok."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
