"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const INDUSTRIES = ["E-ticaret", "Danışmanlık", "Hizmet sektörü", "Serbest çalışanlar", "Ajanslar", "Perakende"];

const MARQUEE_ITEMS = [
  "E-ticaret satıcıları",
  "Danışmanlar",
  "Serbest çalışanlar",
  "Ajanslar",
  "Perakende mağazaları",
  "Hizmet sektörü",
  "Girişimciler",
  "Emlak danışmanları",
];

const EXAMPLES = [
  {
    initial: "M",
    name: "Merve Aydın",
    handle: "merve-aydin",
    links: ["LinkedIn profilim", "Portföyüm", "Randevu al"],
  },
  {
    initial: "D",
    name: "Deniz Kaya",
    handle: "deniz-kaya",
    links: ["Instagram mağazam", "WhatsApp'tan sipariş ver", "Trendyol mağazam"],
  },
  {
    initial: "C",
    name: "Can Yılmaz",
    handle: "can-yilmaz",
    links: ["Web sitem", "CV'm", "E-posta gönder"],
  },
  {
    initial: "A",
    name: "Ada Demir",
    handle: "ada-demir",
    links: ["Hizmetlerimi gör", "Randevu al", "Yorumlarımı oku"],
  },
];

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
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setExampleIndex((i) => (i + 1) % EXAMPLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const example = EXAMPLES[exampleIndex];

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
              MineBio
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
              İster bir şirketi temsil et, ister kendi işini yönet: MineBio
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
            <div className="corp-mock corp-mock-fade" key={example.handle}>
              <div className="corp-mock-avatar">{example.initial}</div>
              <div className="corp-display" style={{ fontSize: 16 }}>
                {example.name}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 2 }}>
                minebio.net/{example.handle}
              </div>
              {example.links.map((l) => (
                <a className="corp-mock-link" key={l}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kayan şerit */}
      <div className="corp-marquee" aria-hidden="true">
        <div className="corp-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

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
        <div className="corp-footer-grid">
          <div style={{ flex: "1 1 220px", maxWidth: 260 }}>
            <div className="row" style={{ gap: 8 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: "linear-gradient(145deg, var(--c-accent), #6a8bff)",
                  display: "inline-block",
                }}
              />
              <span className="corp-display" style={{ fontSize: 14 }}>
                MineBio
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--c-body)", marginTop: 12, lineHeight: 1.6 }}>
              Bağlantılarını tek sayfada topla, kimin baktığını gör.
            </p>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Ürün</div>
            <Link href="/#ozellikler">Özellikler</Link>
            <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            <Link href="/login">Giriş yap</Link>
          </div>

          <div className="corp-footer-col">
            <div className="corp-footer-col-title">Yasal</div>
            <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
            <Link href="/cerez-politikasi">Çerez Politikası</Link>
            <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
            <Link href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>
            <Link href="/acik-riza-metni">Açık Rıza Metni</Link>
            <Link href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/teslimat-ve-iade-kosullari">Teslimat ve İade Koşulları</Link>
          </div>
        </div>

        <div
          className="row"
          style={{
            maxWidth: 1080,
            margin: "28px auto 0",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11.5, color: "#9aa3b2" }}>Güvenli ödeme:</span>
          <img src="/odeme-logolari.png" alt="iyzico ile Öde, Mastercard, Visa, American Express, Troy" style={{ height: 22 }} />
        </div>

        <div className="corp-footer-bottom">© {new Date().getFullYear()} MineBio. Tüm hakları saklıdır.</div>
      </footer>
    </div>
  );
}
