export async function shareOrCopy({ title, text, url }, onCopied) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      // Kullanıcı paylaşım penceresini kapattıysa sessizce çık
      if (e?.name === "AbortError") return "cancelled";
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    if (onCopied) onCopied();
    return "copied";
  } catch (e) {
    return "failed";
  }
}
