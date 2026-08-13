"use client";

import { useState } from "react";
import Link from "next/link";

const INDUSTRIES = ["E-ticaret", "Danışmanlık", "Hizmet sektörü", "Serbest çalışanlar", "Ajanslar", "Perakende"];

const FEATURES = [
  {
    icon: "◆",
    title: "Profesyonel bir izlenim",
    desc: "Ziyaretçi sayfana girdiği ilk saniyede kim olduğunu net görsün. Kendi renklerin, kendi fotoğrafınla, markalı bir görünüm.",
  },
  {
    icon: "▦",
    title: "Markalı QR kod",
    desc: "Ortasında fotoğrafın ve isminle, kartvizitte ya da vitrinde basılı paylaşmaya hazır bir QR kod.",
  },
  {
    icon: "◐",
    title: "Neyin işe yaradığını gör",
    desc: "Hangi linkin tıklandığını, sayfanın kaç kez görüntülendiğini panelinden anlık takip et.",
  },
  {
    icon: "✉",
    title: "İletişim formu",
    desc: "Ziyaretçiler doğrudan sana mesaj bıraksın, sen panelinden yanıtla.",
  },
  {
    icon: "◎",
    title: "Rehbere kaydet",
    desc: "Ziyaretçi tek dokunuşla seni telefonuna gerçek bir kişi olarak kaydedebilir.",
  },
  {
    icon: "↗",
    title: "Tek tıkla paylaşım",
    desc: "Tanıştığın kişileri kaydet, sayfanı WhatsApp'tan tek tıkla gönder.",
  },
];

const STEPS = [
  { title: "Kaydol", desc: "E-posta ya da Google ile saniyeler içinde hesabını aç." },
  { title: "Sayfanı doldur", desc: "Bağlantılarını, mağazanı, iletişim bilgilerini panelden ekle." },
  { title: "Paylaş", desc: "Bio'na, imzana, kartvizitine ya da QR koduna koy." },
];

const FAQ = [
  {
    q: "Kod bilmem gerekir mi?",
    a: "Hayır. Panelden bilgilerini gir, sayfan otomatik oluşur ve yayına alınır.",
  },
  {
    q: "Kaç link ekleyebilirim?",
    a: "Ücretsiz planda sınırlı sayıda link ekleyebilirsin. Premium'a geçince sınır kalkar, tüm temaların kilidi açılır.",
  },
  {
    q: "Sayfamı istediğim zaman düzenleyebilir miyim?",
    a: "Evet, panelinden her an güncelleyebilirsin — değişiklikler anında yayına yansır.",
  },
  {
    q: "Yabancı müşterilerim de sayfamı anlayabilir mi?",
    a: "Evet, sayfanda TR/EN dil seçeneği var; içeriğinin İngilizcesini de ayrıca girebilirsin.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="corp-landing">
      <nav className="corp-nav">
        <div className="corp-nav-inner">
          <div className="row" style={{ gap: 9 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "linear-gradient(145deg, var(--c-accent), #6a8bff)",
                display: "inline-block",
              }}
            />
            <span className="corp-display" style={{ fontSize: 16 }}>
              TekSayfa
            </span>
          </div>
          <div className="corp-nav-links">
            <a href="#ozellikler">Özellikler</a>
            <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            <a href="#sss">S.S.S</a>
            <Link href="/login">Giriş yap</Link>
            <Link href="/login" className="corp-btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
              Ücretsiz başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="corp-section" style={{ paddingTop: 96 }}>
        <div className="corp-hero-row">
          <div className="corp-hero-copy">
            <div className="corp-eyebrow">profesyonel bağlantı sayfası</div>
            <h1 className="corp-display" style={{ fontSize: 46, marginTop: 14, lineHeight: 1.12 }}>
              Kendini, işini, markanı —
              <br />
              tek bağlantıda anlat.
            </h1>
            <p style={{ color: "var(--c-body)", marginTop: 18, fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>
              İster bir şirketi temsil et, ister kendi işini yönet: TekSayfa
              sosyal medyanı, mağazanı ve iletişim bilgilerini tek, profesyonel
              bir sayfada toplar — kimin baktığını da sana gösterir.
            </p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
              <Link href="/login" className="corp-btn">
                Ücretsiz başla
              </Link>
              <Link href="/fiyatlandirma" className="corp-btn-outline">
                Fiyatlandırmayı gör
              </Link>
            </div>

            <div className="corp-industries">
              {INDUSTRIES.map((ind) => (
                <span className="corp-industry-tag" key={ind}>
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="corp-hero-visual">
            <div className="corp-mock">
              <div className="corp-mock-avatar">M</div>
              <div className="corp-display" style={{ fontSize: 16 }}>
                Merve Aydın
              </div>
              <div style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 2 }}>
                teksayfa.app/merve-aydin
              </div>
              <a className="corp-mock-link">LinkedIn profilim</a>
              <a className="corp-mock-link">Portföyüm</a>
              <a className="corp-mock-link">Randevu al</a>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="corp-section corp-section-alt" id="ozellikler">
        <div className="corp-eyebrow">özellikler</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10, maxWidth: 560 }}>
          Sayfanı büyütmek için ihtiyacın olan her şey
        </h2>
        <div className="corp-grid-3">
          {FEATURES.map((f) => (
            <div className="corp-card" key={f.title}>
              <div className="corp-card-icon">{f.icon}</div>
              <div className="corp-display" style={{ fontSize: 16 }}>
                {f.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 8, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section className="corp-section">
        <div className="corp-eyebrow">nasıl çalışır</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10 }}>
          3 adımda yayında
        </h2>
        <div className="corp-steps">
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <div className="corp-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="corp-display" style={{ fontSize: 16, marginTop: 10 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--c-body)", marginTop: 6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="corp-section corp-section-alt" id="sss" style={{ maxWidth: 720 }}>
        <div className="corp-eyebrow">sıkça sorulan sorular</div>
        <h2 className="corp-display" style={{ fontSize: 30, marginTop: 10, marginBottom: 24 }}>
          Merak ettiklerin
        </h2>
        {FAQ.map((item, i) => (
          <div className="corp-faq-item" key={item.q}>
            <button
              className="corp-faq-q"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {item.q}
              <span style={{ color: "var(--c-accent)", fontSize: 18 }}>
                {openFaq === i ? "–" : "+"}
              </span>
            </button>
            {openFaq === i && <p className="corp-faq-a">{item.a}</p>}
          </div>
        ))}
      </section>

      {/* Kapanış CTA */}
      <section className="corp-section" style={{ textAlign: "center" }}>
        <h2 className="corp-display" style={{ fontSize: 30 }}>
          Sayfan seni bekliyor.
        </h2>
        <p style={{ color: "var(--c-body)", fontSize: 15, marginTop: 10 }}>
          Kredi kartı gerekmez, 2 dakikada başla.
        </p>
        <Link href="/login" className="corp-btn" style={{ marginTop: 22 }}>
          Ücretsiz başla
        </Link>
      </section>

      <footer className="corp-footer">
        <div className="corp-footer-inner">
          <span>© {new Date().getFullYear()} TekSayfa</span>
          <div className="row" style={{ gap: 20, flexWrap: "wrap" }}>
            <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            <Link href="/login">Giriş yap</Link>
            <Link href="/gizlilik-politikasi">Gizlilik</Link>
            <Link href="/cerez-politikasi">Çerezler</Link>
            <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
            <Link href="/kvkk-aydinlatma-metni">KVKK</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
