"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "enis.ozbilgir@gmail.com";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) {
    return "—";
  }
}

function formatMoney(amount, currency) {
  if (amount == null) return "—";
  const symbol = currency === "USD" ? "$" : "₺";
  return `${symbol}${Number(amount).toFixed(2)}`;
}

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [tab, setTab] = useState("users");

  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [totals, setTotals] = useState({ users: 0, premium: 0, views: 0, clicks: 0 });
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("views");
  const [sortDir, setSortDir] = useState("desc");

  const [payments, setPayments] = useState([]);
  const [revenue, setRevenue] = useState({ tryTotal: 0, usdTotal: 0, tryMonth: 0, usdMonth: 0, count: 0 });

  useEffect(() => {
    async function load() {
      let session = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        const { data: sessionData } = await supabase.auth.getSession();
        session = sessionData?.session;
        if (session) break;
        await new Promise((r) => setTimeout(r, 300));
      }

      if (!session || (session.user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        router.replace("/login");
        return;
      }
      setAllowed(true);

      const { data: profiles } = await supabase
        .from("profiles")
        .select(
          "id, username, display_name, is_premium, premium_plan, premium_until, paddle_subscription_id, iyzico_subscription_ref, theme, avatar_url, updated_at"
        );

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
        provider: p.paddle_subscription_id ? "Paddle" : p.iyzico_subscription_ref ? "iyzico" : "—",
      }));

      setRows(merged);
      setTotals({
        users: merged.length,
        premium: merged.filter((r) => r.is_premium).length,
        views: (viewRows || []).length,
        clicks: (clickRows || []).length,
      });

      const { data: paymentRows } = await supabase
        .from("payments")
        .select("id, user_id, provider, plan, amount, currency, status, created_at")
        .order("created_at", { ascending: false });

      const profileById = {};
      (profiles || []).forEach((p) => (profileById[p.id] = p));

      const mergedPayments = (paymentRows || []).map((p) => ({
        ...p,
        display_name: profileById[p.user_id]?.display_name || "—",
        username: profileById[p.user_id]?.username || "",
      }));
      setPayments(mergedPayments);

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      let tryTotal = 0, usdTotal = 0, tryMonth = 0, usdMonth = 0;
      (paymentRows || []).forEach((p) => {
        if (p.status !== "success") return;
        const amt = Number(p.amount) || 0;
        const isThisMonth = new Date(p.created_at) >= startOfMonth;
        if (p.currency === "USD") {
          usdTotal += amt;
          if (isThisMonth) usdMonth += amt;
        } else {
          tryTotal += amt;
          if (isThisMonth) tryMonth += amt;
        }
      });
      setRevenue({ tryTotal, usdTotal, tryMonth, usdMonth, count: (paymentRows || []).length });

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
          Yönetim Paneli
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
            <div className="eyebrow">Bu ay gelir (TL)</div>
            <div className="stat-value">₺{revenue.tryMonth.toFixed(0)}</div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Bu ay gelir (USD)</div>
            <div className="stat-value">${revenue.usdMonth.toFixed(2)}</div>
          </div>
        </div>

        <div className="row" style={{ gap: 8, marginTop: 24, marginBottom: 18 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setTab("users")}
            style={{
              fontSize: 13,
              background: tab === "users" ? "var(--amber)" : undefined,
              color: tab === "users" ? "var(--ink)" : undefined,
            }}
          >
            Kullanıcılar
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setTab("payments")}
            style={{
              fontSize: 13,
              background: tab === "payments" ? "var(--amber)" : undefined,
              color: tab === "payments" ? "var(--ink)" : undefined,
            }}
          >
            Ödemeler ({revenue.count})
          </button>
        </div>

        {tab === "users" && (
          <>
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
                    <th onClick={() => handleSort("views")} style={{ textAlign: "right" }}>
                      Görüntülenme{sortArrow("views")}
                    </th>
                    <th onClick={() => handleSort("clicks")} style={{ textAlign: "right" }}>
                      Tıklama{sortArrow("clicks")}
                    </th>
                    <th onClick={() => handleSort("is_premium")}>Plan{sortArrow("is_premium")}</th>
                    <th>Sağlayıcı</th>
                    <th>Bitiş</th>
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
                        <td className="num-cell" style={{ textAlign: "right" }}>
                          {r.views}
                        </td>
                        <td className="num-cell" style={{ textAlign: "right" }}>
                          {r.clicks}
                        </td>
                        <td>
                          <span className={`badge ${r.is_premium ? "badge-premium" : "badge-free"}`}>
                            {r.is_premium
                              ? r.premium_plan === "yearly"
                                ? "✨ Premium (Yıllık)"
                                : "✨ Premium (Aylık)"
                              : "Ücretsiz"}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: "var(--muted)" }}>{r.provider}</td>
                        <td style={{ fontSize: 12, color: "var(--muted)" }}>{formatDate(r.premium_until)}</td>
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
                      <td colSpan={7} className="empty">
                        {rows.length === 0 ? "Henüz kullanıcı yok." : "Eşleşen kullanıcı yok."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "payments" && (
          <>
            <div className="stat-grid" style={{ marginBottom: 18 }}>
              <div className="stat-card">
                <div className="eyebrow">Toplam gelir (TL)</div>
                <div className="stat-value">₺{revenue.tryTotal.toFixed(0)}</div>
              </div>
              <div className="stat-card">
                <div className="eyebrow">Toplam gelir (USD)</div>
                <div className="stat-value">${revenue.usdTotal.toFixed(2)}</div>
              </div>
              <div className="stat-card">
                <div className="eyebrow">Toplam işlem</div>
                <div className="stat-value">{revenue.count}</div>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Kullanıcı</th>
                    <th>Sağlayıcı</th>
                    <th>Plan</th>
                    <th style={{ textAlign: "right" }}>Tutar</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontSize: 12, color: "var(--muted)" }}>{formatDate(p.created_at)}</td>
                      <td>
                        {p.display_name}
                        {p.username && (
                          <span className="mono" style={{ fontSize: 11, color: "var(--muted)", marginLeft: 6 }}>
                            /{p.username}
                          </span>
                        )}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>{p.provider}</td>
                      <td>{p.plan === "yearly" ? "Yıllık" : "Aylık"}</td>
                      <td className="num-cell" style={{ textAlign: "right" }}>
                        {formatMoney(p.amount, p.currency)}
                      </td>
                      <td>
                        <span className={`badge ${p.status === "success" ? "badge-premium" : "badge-free"}`}>
                          {p.status === "success" ? "Başarılı" : p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty">
                        Henüz ödeme kaydı yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
