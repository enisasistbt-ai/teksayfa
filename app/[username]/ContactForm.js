"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const STRINGS = {
  tr: {
    toggle: "✉️ Mesaj bırak",
    title: "Mesaj bırak",
    name: "Adın",
    contact: "E-posta ya da telefon",
    message: "Mesajın",
    send: "Gönder",
    sending: "Gönderiliyor...",
    sent: "Mesajın iletildi, teşekkürler!",
    error: "Gönderilemedi, tekrar dener misin?",
    close: "Vazgeç",
  },
  en: {
    toggle: "✉️ Leave a message",
    title: "Leave a message",
    name: "Your name",
    contact: "Email or phone",
    message: "Your message",
    send: "Send",
    sending: "Sending...",
    sent: "Your message was sent, thank you!",
    error: "Couldn't send, please try again.",
    close: "Cancel",
  },
};

export default function ContactForm({ ownerId, lang = "tr" }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const t = STRINGS[lang] || STRINGS.tr;

  if (!ownerId) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError("");
    const { error } = await supabase.from("messages").insert({
      owner_id: ownerId,
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    });
    setSending(false);
    if (error) {
      setError(t.error);
      return;
    }
    setSent(true);
  }

  if (!open) {
    return (
      <button
        type="button"
        className="btn-ghost"
        style={{ width: "100%", marginTop: 10 }}
        onClick={() => setOpen(true)}
      >
        {t.toggle}
      </button>
    );
  }

  return (
    <div className="tabela" style={{ marginTop: 16, padding: "18px 20px", textAlign: "left" }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>
        {t.title}
      </div>

      {sent ? (
        <p style={{ fontSize: 13 }}>{t.sent}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.name}
            required
          />
          <input
            className="field"
            style={{ marginTop: 8 }}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t.contact}
          />
          <textarea
            className="field"
            style={{ marginTop: 8, resize: "vertical", fontFamily: "inherit" }}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.message}
            required
          />
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 8 }}>{error}</p>
          )}
          <div className="row" style={{ gap: 8, marginTop: 10 }}>
            <button className="btn" style={{ flex: 1 }} disabled={sending}>
              {sending ? t.sending : t.send}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setOpen(false)}
            >
              {t.close}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
