"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Kisiler() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
        .select("username, is_premium")
        .eq("id", session.user.id)
        .maybeSingle();
      setUsername(profile?.username || "");
      setIsPremium(!!profile?.is_premium);

      if (profile?.is_premium) {
        const { data: rows } = await supabase
          .from("contacts")
          .select("*")
          .eq("owner_id", session.user.id)
          .order("created_at", { ascending: false });
        setContacts(rows || []);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  function downloadContactVcf(contact) {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${contact.name}`,
      contact.company ? `ORG:${contact.company}` : null,
      `TEL;TYPE=CELL:${contact.phone}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([lines], { type: "text/vcard;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${contact.name || "kisi"}.vcf`;
    link.click();
    URL.revokeObjectURL(objectUrl);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("İsim ve telefon gerekli.");
      return;
    }
    setError("");
    setSaving(true);
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        owner_id: userId,
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim(),
      })
      .select()
      .maybeSingle();
    setSaving(false);
    if (error) {
      setError("Kaydedilemedi, tekrar dene.");
      return;
    }
    setContacts((prev) => [data, ...prev]);
    downloadContactVcf(data);
    setName("");
    setPhone("");
    setCompany("");
  }

  async function handleDelete(id) {
    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  function whatsappLink(contact) {
    const digits = contact.phone.replace(/[^0-9]/g, "");
    const pageUrl = typeof window !== "undefined" ? `${window.location.origin}/${username}` : "";
    const message = `Merhaba ${contact.name}, sayfamı seninle paylaşmak istedim: ${pageUrl}`;
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }

  async function markSent(contact) {
    const now = new Date().toISOString();
    await supabase.from("contacts").update({ sent_at: now }).eq("id", contact.id);
    setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, sent_at: now } : c)));
  }

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  if (!isPremium) {
    return (
      <main className="container" style={{ paddingTop: 48 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="eyebrow">kişilerim</div>
          <Link href="/dashboard" className="btn-ghost" style={{ fontSize: 12 }}>
            Panele dön
          </Link>
        </div>
        <div className="tabela" style={{ marginTop: 24, padding: "28px 24px", textAlign: "center" }}>
          <div className="eyebrow">🔒 premium özelliği</div>
          <h1 className="display" style={{ fontSize: 22, marginTop: 10 }}>
            Kişi defteri Premium'da
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
            Tanıştığın kişileri kaydet, sayfanı WhatsApp'tan tek tıkla paylaş.
          </p>
          <Link href="/fiyatlandirma" className="btn" style={{ display: "inline-block", marginTop: 16 }}>
            Premium'a geç
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 48 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">kişilerim</div>
        <Link href="/dashboard" className="btn-ghost" style={{ fontSize: 12 }}>
          Panele dön
        </Link>
      </div>
      <h1 className="display" style={{ fontSize: 26, marginTop: 10 }}>
        Kişiler
      </h1>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
        Tanıştığın kişileri kaydet, sayfanı tek tıkla WhatsApp'tan paylaş.
      </p>

      <form onSubmit={handleAdd} style={{ marginTop: 20 }}>
        <label className="label" style={{ marginTop: 0 }}>
          Ad Soyad
        </label>
        <input
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ayşe Yılmaz"
        />
        <label className="label">Telefon</label>
        <input
          className="field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="90 5xx xxx xx xx"
        />
        <label className="label">Şirket (opsiyonel)</label>
        <input
          className="field"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="ABC Tekstil"
        />
        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 10 }}>{error}</p>
        )}
        <button className="btn" style={{ marginTop: 16, width: "100%" }} disabled={saving}>
          {saving ? "Kaydediliyor..." : "Kişi ekle"}
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        {contacts.length === 0 && <p className="empty">Henüz kişi eklemedin.</p>}
        {contacts.map((c) => (
          <div key={c.id} className="link-row" style={{ marginTop: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {c.company || "—"} · {c.phone}
              </div>
              {c.sent_at && (
                <div style={{ fontSize: 11, color: "var(--amber)", marginTop: 2 }}>
                  Gönderildi ✓
                </div>
              )}
            </div>
            <a
              href={whatsappLink(c)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => markSent(c)}
              className="btn-ghost"
              style={{ fontSize: 12, padding: "6px 10px", whiteSpace: "nowrap" }}
            >
              WhatsApp'tan gönder
            </a>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => downloadContactVcf(c)}
              style={{ fontSize: 12, padding: "6px 10px", whiteSpace: "nowrap" }}
            >
              📇 Rehbere kaydet
            </button>
            <button
              type="button"
              className="remove"
              onClick={() => handleDelete(c.id)}
              style={{ marginLeft: 6 }}
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
