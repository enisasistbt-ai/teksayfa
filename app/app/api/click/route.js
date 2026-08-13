import { supabase } from "../../../lib/supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const username = searchParams.get("u");
  const label = searchParams.get("l");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    await supabase.from("link_clicks").insert({
      username: username || null,
      link_label: label || null,
    });
  } catch (e) {
    // Kayıt başarısız olsa bile kullanıcıyı bekletmeden yönlendir
  }

  return Response.redirect(url, 302);
}
