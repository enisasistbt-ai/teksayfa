"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { THEMES, DEFAULT_THEME, FREE_LINK_LIMIT } from "../../lib/themes";
import { PLATFORMS, PLATFORM_GROUPS, normalizeUrl } from "../../lib/platforms";
import { TRIAL_DAYS, isEffectivelyPremium, trialDaysLeft, isOnActiveTrial } from "../../lib/premium";
import { shareOrCopy } from "../../lib/share";
import QRCode from "qrcode";

function emptyPlatformValues() {
  const obj = {};
  PLATFORMS.forEach((p) => (obj[p.id] = ""));
  return obj;
}

const EDITOR_SIZE = 240;
const OUTPUT_SIZE = 320;
const MAX_ZOOM = 3;
const BIO_LIMIT = 160;

function clampPosition(pos, scale, naturalW, naturalH) {
  const dispW = naturalW * scale;
  const dispH = naturalH * scale;
  const minX = EDITOR_SIZE - dispW;
  const minY = EDITOR_SIZE - dispH;
  return {
    x: Math.min(0, Math.max(minX, pos.x)),
    y: Math.min(0, Math.max(minY, pos.y)),
  };
}

export default function Dashboard() {
  const router = useRouter();
  const qrCanvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [platformValues, setPlatformValues] = useState(emptyPlatformValues());
  const [customLinks, setCustomLinks] = useState([]);
  const [linkOrder, setLinkOrder] = useState([]);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isPremium, setIsPremium] = useState(false);
  const [awayMode, setAwayMode] = useState(false);
  const [awayMessage, setAwayMessage] = useState("");
  const [awayMessageEn, setAwayMessageEn] = useState("");
  const [awayUntil, setAwayUntil] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [stats, setStats] = useState({ views: 0, clicksByLabel: {} });
  const [trialEndsAt, setTrialEndsAt] = useState(null);

  // Fotoğraf konumlandırma editörü
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorImg, setEditorImg] = useState(null); // HTMLImageElement
  const [editorFile, setEditorFile] = useState(null);
  const [baseScale, setBaseScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);
  const dragIndexRef = useRef(null);

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
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile) {
        setUsername(profile.username || "");
        setDisplayName(profile.display_name || "");
        setBio(profile.bio || "");
        setBioEn(profile.bio_en || "");
        setTheme(profile.theme || DEFAULT_THEME);
        setAwayMode(!!profile.away_mode);
        setAwayMessage(profile.away_message || "");
        setAwayMessageEn(profile.away_message_en || "");
        setAwayUntil(profile.away_until || "");
        setAvatarUrl(profile.avatar_url || "");

        let effectiveTrialEnd = profile.trial_ends_at;
        if (!profile.trial_ends_at && !profile.is_premium) {
          effectiveTrialEnd = new Date(
            Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000
          ).toISOString();
          await supabase
            .from("profiles")
            .update({ trial_ends_at: effectiveTrialEnd })
            .eq("id", session.user.id);
        }
        setTrialEndsAt(effectiveTrialEnd);
        setIsPremium(
          isEffectivelyPremium({ ...profile, trial_ends_at: effectiveTrialEnd })
        );

        const savedLinks = profile.links || [];
        const pValues = emptyPlatformValues();
        const custom = [];
        const order = [];
        const platformLabels = Object.fromEntries(
          PLATFORMS.map((p) => [p.label.toLowerCase(), p])
        );

        savedLinks.forEach((link) => {
          const match = platformLabels[(link.label || "").toLowerCase()];
          if (match) {
            if (match.type === "username") {
              const built = match.buildUrl("PLACEHOLDER");
              const [prefix] = built.split("PLACEHOLDER");
              pValues[match.id] = (link.url || "").startsWith(prefix)
                ? link.url.slice(prefix.length)
                : link.url;
            } else {
              pValues[match.id] = link.url || "";
            }
            order.push(match.id);
          } else {
            const id = crypto.randomUUID();
            custom.push({ id, label: link.label, labelEn: link.labelEn || "", url: link.url || "" });
            order.push(`custom-${id}`);
          }
        });

        setPlatformValues(pValues);
        setCustomLinks(custom);
        setLinkOrder(order);
        if (isEffectivelyPremium({ ...profile, trial_ends_at: effectiveTrialEnd })) {
          await loadStats(profile.username);
        }
      } else {
        const newTrialEnd = new Date(
          Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000
        ).toISOString();
        await supabase
          .from("profiles")
          .upsert({ id: session.user.id, trial_ends_at: newTrialEnd });
        setTrialEndsAt(newTrialEnd);
        setIsPremium(true);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function loadStats(uname) {
    if (!uname) return;

    const { count: viewCount } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .eq("username", uname);

    const { data: clickRows } = await supabase
      .from("link_clicks")
      .select("link_label")
      .eq("username", uname);

    const clicksByLabel = {};
    (clickRows || []).forEach((row) => {
      const label = row.link_label || "İsimsiz link";
      clicksByLabel[label] = (clicksByLabel[label] || 0) + 1;
    });

    setStats({ views: viewCount || 0, clicksByLabel });
  }

  useEffect(() => {
    const activeKeys = [
      ...PLATFORMS.filter((p) => platformValues[p.id]?.trim()).map((p) => p.id),
      ...customLinks.filter((l) => l.url.trim()).map((l) => `custom-${l.id}`),
    ];
    setLinkOrder((prev) => {
      const kept = prev.filter((k) => activeKeys.includes(k));
      const added = activeKeys.filter((k) => !prev.includes(k));
      const next = [...kept, ...added];
      const same = next.length === prev.length && next.every((k, i) => k === prev[i]);
      return same ? prev : next;
    });
  }, [platformValues, customLinks]);

  function updatePlatformValue(id, value) {
    setPlatformValues((prev) => ({ ...prev, [id]: value }));
  }

  function updateCustomLink(index, field, value) {
    setCustomLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  }

  function totalLinkCount() {
    const filledPlatforms = PLATFORMS.filter((p) => platformValues[p.id]?.trim()).length;
    const filledCustom = customLinks.filter((l) => l.url.trim()).length;
    return filledPlatforms + filledCustom;
  }

  function addCustomLink() {
    if (!isPremium && totalLinkCount() >= FREE_LINK_LIMIT) {
      setError(
        `Ücretsiz planda en fazla ${FREE_LINK_LIMIT} link ekleyebilirsin. Daha fazlası için Premium'a geç.`
      );
      return;
    }
    setError("");
    setCustomLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: `Web sitesi ${prev.length + 1}`, labelEn: "", url: "" },
    ]);
  }

  function removeCustomLink(index) {
    setCustomLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function getOrderedLinks() {
    return linkOrder
      .map((key) => {
        if (key.startsWith("custom-")) {
          const id = key.slice(7);
          const c = customLinks.find((l) => l.id === id);
          return c ? { key, label: c.label } : null;
        }
        const p = PLATFORMS.find((pl) => pl.id === key);
        return p ? { key, label: p.label } : null;
      })
      .filter(Boolean);
  }

  function moveLink(index, direction) {
    setLinkOrder((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const arr = [...prev];
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  }

  function handleLinkDragStart(index) {
    dragIndexRef.current = index;
  }

  function handleLinkDragOver(e) {
    e.preventDefault();
  }

  function handleLinkDrop(index) {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === index) return;
    setLinkOrder((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(index, 0, moved);
      return arr;
    });
  }

  function handleThemeClick(key) {
    if (THEMES[key].premium && !isPremium) {
      setError("Bu tema Premium'da. Kilidi açmak için plana geç.");
      return;
    }
    setError("");
    setTheme(key);
  }

  function buildLinksArray() {
    const links = [];
    linkOrder.forEach((key) => {
      if (key.startsWith("custom-")) {
        const id = key.slice(7);
        const c = customLinks.find((l) => l.id === id);
        if (c && c.url.trim()) {
          links.push({
            label: c.label,
            ...(c.labelEn?.trim() ? { labelEn: c.labelEn.trim() } : {}),
            url: normalizeUrl(c.url),
          });
        }
        return;
      }
      const p = PLATFORMS.find((pl) => pl.id === key);
      const val = p ? (platformValues[p.id] || "").trim() : "";
      if (p && val) {
        const url = p.type === "url" ? normalizeUrl(val) : p.buildUrl(val.replace(/^@/, ""));
        links.push({ label: p.label, url });
      }
    });
    return links;
  }

  // --- Fotoğraf seçme: dosyayı editöre aç ---
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seç.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Görsel 5MB'den küçük olmalı.");
      return;
    }
    setError("");

    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const scale = Math.max(EDITOR_SIZE / img.width, EDITOR_SIZE / img.height);
      const centeredX = (EDITOR_SIZE - img.width * scale) / 2;
      const centeredY = (EDITOR_SIZE - img.height * scale) / 2;
      setBaseScale(scale);
      setZoom(1);
      setPos({ x: centeredX, y: centeredY });
      setEditorImg(img);
      setEditorFile(file);
      setEditorOpen(true);
    };
    img.src = url;
  }

  function handleZoomChange(newZoom) {
    setZoom(newZoom);
    setPos((prev) => clampPosition(prev, baseScale * newZoom, editorImg.width, editorImg.height));
  }

  function onDragStart(clientX, clientY) {
    dragState.current = { startX: clientX, startY: clientY, origin: pos };
  }

  function onDragMove(clientX, clientY) {
    if (!dragState.current || !editorImg) return;
    const dx = clientX - dragState.current.startX;
    const dy = clientY - dragState.current.startY;
    const next = {
      x: dragState.current.origin.x + dx,
      y: dragState.current.origin.y + dy,
    };
    setPos(clampPosition(next, baseScale * zoom, editorImg.width, editorImg.height));
  }

  function onDragEnd() {
    dragState.current = null;
  }

  function closeEditor() {
    setEditorOpen(false);
    setEditorImg(null);
    setEditorFile(null);
  }

  async function confirmCrop() {
    if (!editorImg || !userId) return;
    setUploadingAvatar(true);
    setError("");

    const scale = baseScale * zoom;
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");

    const sx = -pos.x / scale;
    const sy = -pos.y / scale;
    const sSize = EDITOR_SIZE / scale;

    ctx.drawImage(editorImg, sx, sy, sSize, sSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setUploadingAvatar(false);
          setError("Görsel işlenemedi, tekrar dene.");
          return;
        }
        const ext = (editorFile?.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${userId}/avatar-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });

        if (uploadError) {
          setUploadingAvatar(false);
          setError("Fotoğraf yüklenemedi, tekrar dene.");
          return;
        }

        const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(path);
        const url = publicData.publicUrl;

        const { error: saveError } = await supabase
          .from("profiles")
          .upsert({ id: userId, avatar_url: url, updated_at: new Date().toISOString() });

        setUploadingAvatar(false);
        if (saveError) {
          setError("Fotoğraf kaydedilemedi, tekrar dene.");
          return;
        }
        setAvatarUrl(url);
        closeEditor();
      },
      "image/jpeg",
      0.9
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);

    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, "-");
    let cleanLinks = buildLinksArray();
    if (!isPremium && cleanLinks.length > FREE_LINK_LIMIT) {
      cleanLinks = cleanLinks.slice(0, FREE_LINK_LIMIT);
    }

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      username: cleanUsername,
      display_name: displayName.trim(),
      bio: bio.trim(),
      away_mode: isPremium && awayMode,
      bio_en: bioEn.trim(),
      away_message: awayMode ? awayMessage.trim() : null,
      away_message_en: awayMode ? awayMessageEn.trim() : null,
      away_until: awayMode && awayUntil ? awayUntil : null,
      links: cleanLinks,
      theme,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    if (error) {
      setError(
        error.code === "23505"
          ? "Bu kullanıcı adı zaten alınmış, başka bir tane dene."
          : "Kaydedilemedi, tekrar dene."
      );
      return;
    }
    setUsername(cleanUsername);
    setSaved(true);
    if (isPremium) {
      loadStats(cleanUsername);
    }
  }

  function loadImageEl(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function drawQrCode() {
    const canvas = qrCanvasRef.current;
    if (!canvas || !username) return;

    const QR_SIZE = 640;
    const CAPTION_H = 150;
    const PAPER = "#f2ecd9";
    const INK = "#10231f";
    const MUTED = "#6d8078";

    canvas.width = QR_SIZE;
    canvas.height = QR_SIZE + CAPTION_H;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const qrDrawSize = QR_SIZE - 80;
    const qrOffset = 40;
    const tempCanvas = document.createElement("canvas");
    await QRCode.toCanvas(tempCanvas, `${window.location.origin}/${username}`, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: qrDrawSize,
      color: { dark: INK, light: PAPER },
    });
    ctx.drawImage(tempCanvas, qrOffset, qrOffset, qrDrawSize, qrDrawSize);

    const centerX = QR_SIZE / 2;
    const centerY = qrOffset + qrDrawSize / 2;
    const badgeR = 62;
    const innerR = badgeR - 8;

    let avatarImg = null;
    if (avatarUrl) {
      try {
        avatarImg = await loadImageEl(avatarUrl);
      } catch (e) {
        avatarImg = null;
      }
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, badgeR, 0, Math.PI * 2);
    ctx.fillStyle = PAPER;
    ctx.fill();

    if (avatarImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImg, centerX - innerR, centerY - innerR, innerR * 2, innerR * 2);
      ctx.restore();
    } else {
      const accent = THEMES[theme]?.accent || THEMES[DEFAULT_THEME].accent;
      const accentDim = THEMES[theme]?.accentDim || THEMES[DEFAULT_THEME].accentDim;
      const grad = ctx.createLinearGradient(
        centerX - innerR,
        centerY - innerR,
        centerX + innerR,
        centerY + innerR
      );
      grad.addColorStop(0, accent);
      grad.addColorStop(1, accentDim);
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = `700 ${innerR}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((displayName || username || "?").trim().charAt(0).toUpperCase(), centerX, centerY + 2);
    }

    ctx.textAlign = "center";
    ctx.fillStyle = INK;
    ctx.font = "700 32px Georgia, serif";
    ctx.fillText(displayName || username, centerX, QR_SIZE + 55);
    ctx.fillStyle = MUTED;
    ctx.font = "400 20px monospace";
    ctx.fillText(`minebio.net/${username}`, centerX, QR_SIZE + 88);
  }

  useEffect(() => {
    if (!loading && username && isPremium) {
      drawQrCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, username, displayName, avatarUrl, theme, isPremium]);

  function downloadQrCode() {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${username || "minebio"}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function handleShare() {
    const url = `${window.location.origin}/${username}`;
    const result = await shareOrCopy(
      { title: displayName || username, text: "Sayfama göz atar mısın?", url },
      () => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      }
    );
    if (result === "failed") {
      setError("Paylaşılamadı, linki elle kopyalayabilirsin.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: 90 }}>
        <p className="empty">Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 48 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="eyebrow">panelin</div>
        <div className="row" style={{ gap: 8 }}>
          <Link href="/kisiler" className="btn-ghost" style={{ fontSize: 12 }}>
            👥 Kişilerim
          </Link>
          <Link href="/mesajlar" className="btn-ghost" style={{ fontSize: 12 }}>
            ✉️ Mesajlarım
          </Link>
          <button className="btn-ghost" onClick={handleLogout}>
            Çıkış yap
          </button>
        </div>
      </div>

      <div className="row" style={{ justifyContent: "space-between", marginTop: 10 }}>
        <h1 className="display" style={{ fontSize: 26 }}>
          Sayfanı düzenle
        </h1>
        <Link
          href="/fiyatlandirma"
          className="mono"
          style={{
            fontSize: 12,
            color: isPremium ? "var(--amber)" : "var(--muted)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          {isOnActiveTrial({ trial_ends_at: trialEndsAt })
            ? `🎁 Deneme · ${trialDaysLeft({ trial_ends_at: trialEndsAt })} gün kaldı`
            : isPremium
            ? "✨ Premium"
            : "Ücretsiz plan"}
        </Link>
      </div>

      {isOnActiveTrial({ trial_ends_at: trialEndsAt }) && (
        <div
          className="tabela"
          style={{ marginTop: 16, padding: "14px 18px", border: "1px solid var(--amber)" }}
        >
          <p style={{ fontSize: 13 }}>
            🎁 <strong>{trialDaysLeft({ trial_ends_at: trialEndsAt })} gün</strong> boyunca
            tüm Premium özellikleri ücretsiz deneyebilirsin. Süre bitince sayfan otomatik
            olarak ücretsiz plana döner — istersen{" "}
            <Link href="/fiyatlandirma" style={{ color: "var(--amber)" }}>
              şimdiden Premium'a geç
            </Link>
            .
          </p>
        </div>
      )}

      <div
        className="tabela"
        style={{
          marginTop: 20,
          padding: "18px 20px",
          border: awayMode ? "1px solid var(--amber)" : undefined,
        }}
      >
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="eyebrow">mola / tatil modu</div>
          {isPremium ? (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setAwayMode((v) => !v)}
              style={{
                fontSize: 12,
                padding: "5px 12px",
                color: awayMode ? "var(--amber)" : "var(--muted)",
                borderColor: awayMode ? "var(--amber)" : undefined,
              }}
            >
              {awayMode ? "Açık ✓" : "Kapalı"}
            </button>
          ) : (
            <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
              🔒 Premium
            </span>
          )}
        </div>

        {!isPremium ? (
          <>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
              Tatilde ya da yoğun günlerde ziyaretçileri otomatik bilgilendir.
            </p>
            <Link
              href="/fiyatlandirma"
              className="btn-ghost"
              style={{ display: "inline-block", marginTop: 10, fontSize: 12 }}
            >
              Premium'a geç
            </Link>
          </>
        ) : awayMode ? (
          <>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
              Açık olduğu sürece sayfanın en üstünde ziyaretçilere bu mesaj gösterilir.
            </p>
            <textarea
              className="field"
              style={{ marginTop: 10, resize: "vertical", fontFamily: "inherit" }}
              rows={2}
              value={awayMessage}
              onChange={(e) => setAwayMessage(e.target.value.slice(0, 140))}
              placeholder="Örn. Şu an sipariş almıyoruz, 20 Ağustos'ta döneceğiz."
            />
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, textAlign: "right" }}>
              {awayMessage.length}/140
            </p>
            <textarea
              className="field"
              style={{ marginTop: 6, resize: "vertical", fontFamily: "inherit" }}
              rows={2}
              value={awayMessageEn}
              onChange={(e) => setAwayMessageEn(e.target.value.slice(0, 140))}
              placeholder="Optional English version, e.g. We're not taking orders right now, back Aug 20."
            />
            <label className="label" style={{ marginTop: 4 }} htmlFor="awayUntil">
              Dönüş tarihi (opsiyonel)
            </label>
            <input
              id="awayUntil"
              type="date"
              className="field"
              value={awayUntil}
              onChange={(e) => setAwayUntil(e.target.value)}
            />
          </>
        ) : (
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
            Tatilde ya da yoğun günlerde açarak ziyaretçileri bilgilendir.
          </p>
        )}
      </div>

      {username && (
        <div className="tabela" style={{ marginTop: 20, padding: "20px 22px" }}>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <div className="eyebrow">istatistikler</div>
            {!isPremium && (
              <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                🔒 Premium
              </span>
            )}
          </div>
          {isPremium ? (
            <>
              <p style={{ fontSize: 14 }}>
                Toplam sayfa görüntülenme: <strong>{stats.views}</strong>
              </p>
              {Object.keys(stats.clicksByLabel).length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
                  Henüz link tıklaması yok.
                </p>
              ) : (
                <div style={{ marginTop: 10 }}>
                  {Object.entries(stats.clicksByLabel).map(([label, count]) => (
                    <div
                      key={label}
                      className="row"
                      style={{ justifyContent: "space-between", fontSize: 13, marginTop: 6 }}
                    >
                      <span>{label}</span>
                      <span className="mono">{count} tıklama</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>
                Sayfanı kaç kişinin görüntülediğini, hangi linkin tıklandığını gör.
              </p>
              <Link
                href="/fiyatlandirma"
                className="btn-ghost"
                style={{ display: "inline-block", marginTop: 10, fontSize: 12 }}
              >
                Premium'a geç
              </Link>
            </>
          )}
        </div>
      )}

      {username && (
        <div className="tabela" style={{ marginTop: 16, padding: "20px 22px", textAlign: "center" }}>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
            <div className="eyebrow">QR kodun</div>
            {!isPremium && (
              <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                🔒 Premium
              </span>
            )}
          </div>

          {isPremium ? (
            <>
              <canvas
                ref={qrCanvasRef}
                style={{ width: "100%", maxWidth: 220, height: "auto", borderRadius: 10 }}
              />
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
                Vitrinde, kartvizitte ya da paket üzerinde basılı paylaşmak için.
              </p>
              <button
                type="button"
                className="btn-ghost"
                style={{ marginTop: 10 }}
                onClick={downloadQrCode}
              >
                PNG olarak indir
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>
                Fotoğraflı, markalı QR kodunu kartvizit ya da vitrinde basılı paylaşmak için.
              </p>
              <Link
                href="/fiyatlandirma"
                className="btn-ghost"
                style={{ display: "inline-block", marginTop: 10, fontSize: 12 }}
              >
                Premium'a geç
              </Link>
            </>
          )}

          <button
            type="button"
            className="btn"
            style={{ marginTop: 14, width: "100%" }}
            onClick={handleShare}
          >
            📤 Sayfamı paylaş
          </button>
          {shareCopied && (
            <p style={{ fontSize: 12, color: "var(--amber)", marginTop: 8 }}>
              Link kopyalandı, yapıştırabilirsin.
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div className="avatar" style={{ position: "relative" }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profil fotoğrafı" />
            ) : (
              (displayName || username || "?").trim().charAt(0).toUpperCase()
            )}
          </div>
          <label
            className="btn-ghost"
            style={{ display: "inline-block", cursor: "pointer", fontSize: 12 }}
          >
            {uploadingAvatar ? "İşleniyor..." : avatarUrl ? "Fotoğrafı değiştir" : "Fotoğraf yükle"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploadingAvatar}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <label className="label" htmlFor="username">
          Kullanıcı adı (site.com/kullanici-adi)
        </label>
        <input
          id="username"
          className="field mono"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="aysenin-el-isleri"
          required
        />

        <label className="label" htmlFor="displayName">
          Görünecek isim
        </label>
        <input
          id="displayName"
          className="field"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Ayşe'nin El İşleri"
        />

        <label className="label" htmlFor="bio">
          Kısa tanıtım
        </label>
        <textarea
          id="bio"
          className="field"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, BIO_LIMIT))}
          placeholder="Örn. El yapımı örgü aksesuar ve hediyelikler. Siparişleriniz 2-3 günde kargoda."
          rows={3}
          style={{ resize: "vertical", fontFamily: "inherit" }}
        />
        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, textAlign: "right" }}>
          {bio.length}/{BIO_LIMIT}
        </p>

        <label className="label" htmlFor="bioEn">
          İngilizce tanıtım (opsiyonel)
        </label>
        <textarea
          id="bioEn"
          className="field"
          value={bioEn}
          onChange={(e) => setBioEn(e.target.value.slice(0, BIO_LIMIT))}
          placeholder="e.g. Handmade knit accessories and gifts. Orders ship in 2-3 days."
          rows={3}
          style={{ resize: "vertical", fontFamily: "inherit" }}
        />
        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          Ziyaretçi sayfanda "EN" seçerse bu metin gösterilir. Boş bırakırsan Türkçe metin kalır.
        </p>

        <label className="label">Tema</label>
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {Object.entries(THEMES).map(([key, t]) => {
            const locked = t.premium && !isPremium;
            return (
              <button
                type="button"
                key={key}
                onClick={() => handleThemeClick(key)}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 10,
                  background: t.ink,
                  border:
                    theme === key
                      ? `2px solid ${t.accent}`
                      : "2px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 6,
                  position: "relative",
                  opacity: locked ? 0.55 : 1,
                }}
                aria-label={t.name}
                title={locked ? `${t.name} (Premium)` : t.name}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: t.accent,
                  }}
                />
                {locked && (
                  <span style={{ position: "absolute", top: 3, right: 5, fontSize: 10 }}>
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
          Seçili: {THEMES[theme].name}
          {!isPremium && (
            <>
              {" · "}
              <Link href="/fiyatlandirma" style={{ color: "var(--amber)" }}>
                Diğer temaların kilidini aç
              </Link>
            </>
          )}
        </p>

        <label className="label" style={{ marginTop: 26 }}>
          Sosyal medya ve mağazaların {!isPremium && `(${totalLinkCount()}/${FREE_LINK_LIMIT})`}
        </label>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
          Doldurduğun alanlar sayfanda görünür, boş bıraktıkların görünmez.
        </p>

        {PLATFORM_GROUPS.map((group) => {
          const groupPlatforms = PLATFORMS.filter((p) => p.group === group);
          return (
            <div key={group} style={{ marginTop: 24 }}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--amber)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: 6,
                }}
              >
                {group}
              </div>
              {groupPlatforms.map((p) => (
                <div key={p.id} style={{ marginTop: 18 }}>
                  <label className="label" style={{ marginTop: 0 }} htmlFor={`platform-${p.id}`}>
                    {p.label}
                  </label>
                  <input
                    id={`platform-${p.id}`}
                    className="field"
                    value={platformValues[p.id]}
                    onChange={(e) => updatePlatformValue(p.id, e.target.value)}
                    placeholder={p.placeholder}
                  />
                  {p.hint && (
                    <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>{p.hint}</p>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        <label className="label" style={{ marginTop: 30 }}>
          Diğer linklerin
        </label>
        {customLinks.map((link, i) => (
          <div key={i} style={{ marginTop: 22 }}>
            <div className="row" style={{ justifyContent: "space-between", gap: 8 }}>
              <input
                className="field mono"
                style={{ flex: 1 }}
                value={link.label}
                onChange={(e) => updateCustomLink(i, "label", e.target.value)}
                placeholder="Örn. Katalog"
              />
              <button
                type="button"
                className="remove"
                onClick={() => removeCustomLink(i)}
                aria-label="Linki kaldır"
              >
                Sil
              </button>
            </div>
            <input
              className="field"
              style={{ marginTop: 8 }}
              value={link.url}
              onChange={(e) => updateCustomLink(i, "url", e.target.value)}
              placeholder="https://..."
            />
            <input
              className="field"
              style={{ marginTop: 8 }}
              value={link.labelEn || ""}
              onChange={(e) => updateCustomLink(i, "labelEn", e.target.value)}
              placeholder="İngilizce etiket (opsiyonel, örn. Catalog)"
            />
          </div>
        ))}

        <button
          type="button"
          className="btn-ghost"
          style={{ marginTop: 14 }}
          onClick={addCustomLink}
        >
          + Web sitesi ekle
        </button>

        {getOrderedLinks().length > 1 && (
          <>
            <label className="label" style={{ marginTop: 30 }}>
              Linklerinin sırası
            </label>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              Sayfanda görünecek sıra. Sürükle ya da oklarla taşı.
            </p>
            <div style={{ marginTop: 10 }}>
              {getOrderedLinks().map((item, i, arr) => (
                <div
                  key={item.key}
                  className="link-row"
                  draggable
                  onDragStart={() => handleLinkDragStart(i)}
                  onDragOver={handleLinkDragOver}
                  onDrop={() => handleLinkDrop(i)}
                  style={{ cursor: "grab", marginTop: i === 0 ? 0 : 8 }}
                >
                  <span style={{ color: "var(--muted)", fontSize: 15 }}>≡</span>
                  <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ padding: "4px 9px", fontSize: 12 }}
                    onClick={() => moveLink(i, -1)}
                    disabled={i === 0}
                    aria-label="Yukarı taşı"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ padding: "4px 9px", fontSize: 12 }}
                    onClick={() => moveLink(i, 1)}
                    disabled={i === arr.length - 1}
                    aria-label="Aşağı taşı"
                  >
                    ▼
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 14 }}>{error}</p>
        )}
        {saved && (
          <p style={{ color: "var(--amber)", fontSize: 13, marginTop: 14 }}>Kaydedildi.</p>
        )}

        <button className="btn" style={{ marginTop: 20, width: "100%" }} disabled={saving}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {username && (
        <p className="footer-note">
          Yayındaki sayfan:{" "}
          <a className="mono" style={{ color: "var(--amber)" }} href={`/${username}`} target="_blank">
            /{username}
          </a>
        </p>
      )}

      {editorOpen && editorImg && (
        <div className="crop-overlay">
          <div className="crop-modal">
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Fotoğrafını konumlandır</h3>
            <div
              className="crop-viewport"
              onMouseDown={(e) => onDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => dragState.current && onDragMove(e.clientX, e.clientY)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => {
                if (dragState.current) {
                  onDragMove(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={onDragEnd}
            >
              <img
                src={editorImg.src}
                alt=""
                draggable={false}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  width: editorImg.width * baseScale * zoom,
                  height: editorImg.height * baseScale * zoom,
                  maxWidth: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              Sürükleyerek konumlandır
            </p>

            <label className="label" style={{ marginTop: 16 }}>
              Yakınlaştır
            </label>
            <input
              type="range"
              min={1}
              max={MAX_ZOOM}
              step={0.05}
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              style={{ width: "100%", marginTop: 6 }}
            />

            <div className="row" style={{ marginTop: 20, gap: 10 }}>
              <button
                type="button"
                className="btn-ghost"
                style={{ flex: 1 }}
                onClick={closeEditor}
                disabled={uploadingAvatar}
              >
                Vazgeç
              </button>
              <button
                type="button"
                className="btn"
                style={{ flex: 1 }}
                onClick={confirmCrop}
                disabled={uploadingAvatar}
              >
                {uploadingAvatar ? "Kaydediliyor..." : "Kırp ve kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
