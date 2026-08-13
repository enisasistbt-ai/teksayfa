"use client";

export default function SaveContactButton({ displayName, phone, url, bio, label = "📇 Rehbere kaydet" }) {
  function handleSave() {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${displayName}`,
      `ORG:${displayName}`,
      phone ? `TEL;TYPE=CELL:${phone}` : null,
      `URL:${url}`,
      bio ? `NOTE:${bio.replace(/\r?\n/g, "\\n")}` : null,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([lines], { type: "text/vcard;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${displayName || "kisi"}.vcf`;
    link.click();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <button type="button" className="btn-ghost" style={{ width: "100%", marginTop: 14 }} onClick={handleSave}>
      {label}
    </button>
  );
}
