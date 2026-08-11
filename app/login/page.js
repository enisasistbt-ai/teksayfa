"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    });
    setLoading(false);
    if (error) {
      setError("Bir şeyler ters gitti, tekrar dene.");
      return;
    }
    setSent(true);
  }

  return (
    <main className="container" style={{ paddingTop: 90 }}>
      <div className="eyebrow">giriş yap</div>
      <h1 className="display" style={{ fontSize: 28, marginTop: 8 }}>
        E-postana bağlantı gönderelim
      </h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>
        Şifre yok. E-postanı yaz, sana gönderdiğimiz linke tıkla, içeri gir.
      </p>

      {sent ? (
        <div className="tabela" style={{ marginTop: 28 }}>
          <p style={{ textAlign: "center" }}>
            <strong>{email}</strong> adresine bir bağlantı gönderdik. Gelen
            kutunu (ve spam klasörünü) kontrol et.
          </p>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
          <label className="label" htmlFor="email">
            E-posta adresin
          </label>
          <input
            id="email"
            className="field"
            type="email"
            required
            placeholder="ornek@eposta.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>
              {error}
            </p>
          )}
          <button className="btn" style={{ marginTop: 18, width: "100%" }} disabled={loading}>
            {loading ? "Gönderiliyor..." : "Bağlantı gönder"}
          </button>
        </form>
      )}
    </main>
  );
}
