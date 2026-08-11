"use client";

import { useEffect, useState } from "react";
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
        .select("id, username, display_name, is_premium, theme, updated_at")
        .order("updated_at", { ascending: false });

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

  if (loading) {
    return (
      <main className="wide-container" style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  if (!allowed) return null;

  return (
    <main className="wide-container" style={{ paddingTop: 48 }}>
      <div className="eyebrow">yönetim paneli</div>
      <h1 className="display" style={{ fontSize: 26, marginTop: 8 }}>
        Kullanıcılar
      </h1>

      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
        {[
          ["Toplam kullanıcı", totals.users],
          ["Premium", totals.premium],
          ["Toplam görüntülenme", totals.views],
          ["Toplam tıklama", totals.clicks],
        ].map(([label, value]) => (
          <div
            key={label}
            className="tabela"
            style={{ padding: "16px 18px", flex: "1 1 140px", textAlign: "left" }}
          >
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              {label}
            </div>
            <div className="display" style={{ fontSize: 24 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--muted)" }}>
              <th style={{ padding: "8px 10px" }}>Kullanıcı</th>
              <th style={{ padding: "8px 10px" }}>İsim</th>
              <th style={{ padding: "8px 10px" }}>Tema</th>
              <th style={{ padding: "8px 10px" }}>Görüntülenme</th>
              <th style={{ padding: "8px 10px" }}>Tıklama</th>
              <th style={{ padding: "8px 10px" }}>Plan</th>
              <th style={{ padding: "8px 10px" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={{ padding: "10px" }} className="mono">
                  {r.username ? (
                    <a href={`/${r.username}`} target="_blank" style={{ color: "var(--amber)" }}>
                      /{r.username}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={{ padding: "10px" }}>{r.display_name || "—"}</td>
                <td style={{ padding: "10px" }}>{r.theme || "vitrin"}</td>
                <td style={{ padding: "10px" }}>{r.views}</td>
                <td style={{ padding: "10px" }}>{r.clicks}</td>
                <td style={{ padding: "10px" }}>
                  {r.is_premium ? (
                    <span style={{ color: "var(--amber)" }}>✨ Premium</span>
                  ) : (
                    "Ücretsiz"
                  )}
                </td>
                <td style={{ padding: "10px" }}>
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
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="empty">
                  Henüz kullanıcı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
