"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("Devam etmek için sözleşmeleri kabul etmen gerekiyor.");
      return;
    }
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

  async function handleGoogleLogin() {
    setError("");
    if (!agreed) {
      setError("Devam etmek için sözleşmeleri kabul etmen gerekiyor.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    });
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

      {!sent && (
        <>
          <label
            className="row"
            style={{
              alignItems: "flex-start",
              gap: 10,
              marginTop: 24,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setError("");
              }}
              style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--amber)" }}
            />
            <span style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>
              <Link href="/kullanim-kosullari" target="_blank" style={{ color: "var(--amber)" }}>
                Kullanım Koşulları
              </Link>
              ,{" "}
              <Link href="/gizlilik-politikasi" target="_blank" style={{ color: "var(--amber)" }}>
                Gizlilik Politikası
              </Link>
              ,{" "}
              <Link href="/kvkk-aydinlatma-metni" target="_blank" style={{ color: "var(--amber)" }}>
                KVKK Aydınlatma Metni
              </Link>{" "}
              ve{" "}
              <Link href="/acik-riza-metni" target="_blank" style={{ color: "var(--amber)" }}>
                Açık Rıza Metni
              </Link>
              'ni okudum, kabul ediyorum.
            </span>
          </label>

          <button
            type="button"
            className="btn-ghost"
            style={{ width: "100%", marginTop: 16, opacity: agreed ? 1 : 0.5 }}
            onClick={handleGoogleLogin}
          >
            Google ile devam et
          </button>
          <div
            className="mono"
            style={{
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 12,
              margin: "18px 0",
            }}
          >
            veya
          </div>
        </>
      )}

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
          <button
            className="btn"
            style={{ marginTop: 18, width: "100%", opacity: agreed ? 1 : 0.6 }}
            disabled={loading}
          >
            {loading ? "Gönderiliyor..." : "Bağlantı gönder"}
          </button>
        </form>
      )}
    </main>
  );
}
