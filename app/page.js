import Link from "next/link";

export const metadata = { title: "Açık Rıza Metni — TekSayfa" };

export default function AcikRizaMetni() {
  return (
    <div className="corp-landing">
      <div className="legal-prose">
        <Link href="/" className="corp-eyebrow" style={{ textDecoration: "none" }}>
          ← TekSayfa
        </Link>
        <h1 className="corp-display" style={{ fontSize: 28, marginTop: 16 }}>
          Açık Rıza Metni
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--c-body)" }}>
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="legal-notice">
          Bu metin genel bir taslaktır; şirket bilgileriniz eklenip bir hukuk
          danışmanına onaylatılmadan yayınlanmamalıdır.
        </div>

        <h2>1. Amaç</h2>
        <p>
          KVKK Aydınlatma Metni'ni okudum, kişisel verilerimin aşağıdaki
          amaçlarla işlenmesine açık rızam olduğunu beyan ederim.
        </p>

        <h2>2. Rıza gösterdiğim işlemler</h2>
        <ul>
          <li>
            Profil fotoğrafım gibi görsel verilerimin sayfamda herkese açık
            şekilde yayınlanması
          </li>
          <li>
            Google ile giriş yaptığımda Google hesabımdan gelen ad ve
            e-posta bilgimin aktarılması
          </li>
          <li>
            Ücretsiz planda sayfamda reklam gösterilmesi amacıyla Google
            AdSense ve iş ortaklarının çerez kullanması
          </li>
          <li>
            Kampanya ve ürün güncellemeleri hakkında e-posta ile
            bilgilendirilmem <em>(bu maddeye ayrıca onay kutusu ile rıza
            alınmalıdır)</em>
          </li>
        </ul>

        <h2>3. Rızanın geri alınması</h2>
        <p>
          Bu rızanızı istediğiniz zaman, hesap ayarlarınızdan ilgili
          seçenekleri kapatarak veya bizimle iletişime geçerek geri
          alabilirsiniz. Geri alma, geri alma tarihinden önceki işlemlerin
          hukuka uygunluğunu etkilemez.
        </p>

        <h2>4. İletişim</h2>
        <p>
          Sorularınız için: <strong>[buraya iletişim e-postanızı ekleyin]</strong>
        </p>
      </div>
    </div>
  );
}
