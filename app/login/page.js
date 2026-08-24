"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

function detectInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /FBAN|FBAV|Instagram|TikTok|Line\/|MicroMessenger|Twitter/i.test(ua);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    setInAppBrowser(detectInAppBrowser());
    // Uygulama içi tarayıcı (TikTok/Instagram) arka plana alınca sayfayı
    // sıfırdan yeniden yükleyebiliyor. Kod gönderildiyse bunu sessionStorage'a
    // yazıp, kullanıcı e-posta uygulamasından geri döndüğünde kaldığı yerden
    // (kod girme ekranı) devam etmesini sağlıyoruz.
    try {
      const savedEmail = window.sessionStorage.getItem("mb_login_email");
      const savedSent = window.sessionStorage.getItem("mb_login_sent");
      if (savedEmail && savedSent === "1") {
        setEmail(savedEmail);
        setSent(true);
      }
    } catch (e) {
      // sessionStorage yoksa (gizli sekme vb.) sessizce devam et
    }
    // Bu arada oturum zaten açılmışsa (ör. başka bir sekmede tamamlandıysa)
    // login formunu tekrar göstermek yerine doğrudan dashboard'a geç.
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        window.location.href = "/dashboard";
      }
    });
  }, []);

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
    try {
      window.sessionStorage.setItem("mb_login_email", email);
      window.sessionStorage.setItem("mb_login_sent", "1");
    } catch (e) {
      // sessionStorage yazılamazsa akışı bozma
    }
    setSent(true);
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    setError("");
    setVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setVerifying(false);
    if (error) {
      setError("Kod hatalı ya da süresi dolmuş, tekrar dene.");
      return;
    }
    try {
      window.sessionStorage.removeItem("mb_login_email");
      window.sessionStorage.removeItem("mb_login_sent");
    } catch (e) {
      // yoksay
    }
    window.location.href = "/dashboard";
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
      <img src="/logo-mark.png" alt="MineBio" style={{ width: 32, height: 32, marginBottom: 4 }} />
      <div className="eyebrow">giriş yap</div>
      <h1 className="display" style={{ fontSize: 28, marginTop: 8 }}>
        E-postana bir kod gönderelim
      </h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>
        Şifre yok. E-postanı yaz, sana gönderdiğimiz 6 haneli kodu buraya yaz, içeri gir.
      </p>

      {inAppBrowser && (
        <div
          className="tabela"
          style={{ marginTop: 18, padding: "12px 16px", fontSize: 13 }}
        >
          📱 Bu sayfayı bir uygulama (Instagram/TikTok vb.) içinden açmış olabilirsin.
          Google ile giriş bu tarayıcılarda çalışmayabilir — sağ üstteki{" "}
          <strong>⋯</strong> menüsünden <strong>"Tarayıcıda aç"</strong>ı seçebilir, ya da
          aşağıdan e-posta ile devam edebilirsin.
        </div>
      )}

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
        </>
      )}

      {sent ? (
        <form onSubmit={handleVerifyCode} style={{ marginTop: 28 }}>
          <div className="tabela" style={{ marginBottom: 18 }}>
            <p style={{ textAlign: "center" }}>
              <strong>{email}</strong> adresine 6 haneli bir kod gönderdik. Gelen
              kutunu (ve spam klasörünü) kontrol et.
            </p>
          </div>
          <label className="label" htmlFor="code">
            Kod
          </label>
          <input
            id="code"
            className="field"
            type="text"
            inputMode="numeric"
            required
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ textAlign: "center", fontSize: 22, letterSpacing: 6 }}
          />
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>{error}</p>
          )}
          <button className="btn" style={{ marginTop: 18, width: "100%" }} disabled={verifying}>
            {verifying ? "Kontrol ediliyor..." : "Giriş yap"}
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ width: "auto", margin: "14px auto 0", display: "block", fontSize: 12.5 }}
            onClick={() => {
              try {
                window.sessionStorage.removeItem("mb_login_email");
                window.sessionStorage.removeItem("mb_login_sent");
              } catch (e) {
                // yoksay
              }
              setSent(false);
              setCode("");
              setError("");
            }}
          >
            Kod gelmedi mi? Tekrar dene
          </button>
        </form>
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
            {loading ? "Gönderiliyor..." : "Kod gönder"}
          </button>
        </form>
      )}

      {!sent && !inAppBrowser && (
        <>
          <div
            className="mono"
            style={{
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 11.5,
              margin: "22px 0 14px",
            }}
          >
            veya
          </div>
          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: "0 auto",
              padding: "8px 18px",
              fontSize: 12.5,
              opacity: agreed ? 0.85 : 0.4,
            }}
            onClick={handleGoogleLogin}
          >
            <svg width="15" height="15" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
            </svg>
            Google ile devam et
          </button>
        </>
      )}
    </main>
  );
}
