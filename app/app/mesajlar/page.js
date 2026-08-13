"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Mesajlar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: rows } = await supabase
        .from("messages")
        .select("*")
        .eq("owner_id", session.user.id)
        .order("created_at", { ascending: false });
      setMessages(rows || []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function markRead(id, isRead) {
    await supabase.from("messages").update({ is_read: isRead }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
  }

  async function handleDelete(id) {
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <main className="container" style={{ paddingTop: 48 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">mesajlarım</div>
        <Link href="/dashboard" className="btn-ghost" style={{ fontSize: 12 }}>
          Panele dön
        </Link>
      </div>
      <h1 className="display" style={{ fontSize: 26, marginTop: 10 }}>
        Mesajlar {unreadCount > 0 && <span style={{ color: "var(--amber)" }}>({unreadCount} yeni)</span>}
      </h1>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
        Ziyaretçilerin sayfandaki formdan bıraktığı mesajlar burada.
      </p>

      <div style={{ marginTop: 24 }}>
        {messages.length === 0 && <p className="empty">Henüz mesaj yok.</p>}
        {messages.map((m) => (
          <div
            key={m.id}
            className="tabela"
            style={{
              marginTop: 12,
              padding: "16px 18px",
              textAlign: "left",
              border: m.is_read ? undefined : "1px solid var(--amber)",
            }}
          >
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: 14 }}>{m.name}</strong>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  {m.phone && <span>📞 {m.phone}</span>}
                  {m.phone && m.email && <span> · </span>}
                  {m.email && <span>✉️ {m.email}</span>}
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                {formatDate(m.created_at)}
              </span>
            </div>
            <p style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{m.message}</p>
            <div className="row" style={{ gap: 8, marginTop: 12 }}>
              <button
                type="button"
                className="btn-ghost"
                style={{ fontSize: 12, padding: "5px 10px" }}
                onClick={() => markRead(m.id, !m.is_read)}
              >
                {m.is_read ? "Okunmadı işaretle" : "Okundu işaretle"}
              </button>
              <button
                type="button"
                className="remove"
                onClick={() => handleDelete(m.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
