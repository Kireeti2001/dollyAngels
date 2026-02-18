const { createClient } = require("@supabase/supabase-js");

const ADMIN_PIN = process.env.ADMIN_PIN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "gallery";

function checkPin(event) {
  const pin = event.headers["x-admin-pin"] || event.headers["X-Admin-PIN"];
  if (!ADMIN_PIN || pin !== ADMIN_PIN) {
    return { ok: false, status: 401, error: "Invalid or missing admin PIN" };
  }
  return { ok: true };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const pinCheck = checkPin(event);
  if (!pinCheck.ok) {
    return { statusCode: pinCheck.status, body: JSON.stringify({ error: pinCheck.error }) };
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfiguration: Supabase not set" }),
    };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  let body = {};
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body || {};
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { action } = body;

  try {
    if (action === "create_album") {
      const { title, description } = body;
      if (!title?.trim()) {
        return { statusCode: 400, body: JSON.stringify({ error: "Title required" }) };
      }
      const { data, error } = await supabase
        .from("gallery_albums")
        .insert({
          title: title.trim(),
          description: (description || "").trim(),
          cover_image_url: null,
          image_urls: [],
        })
        .select("id")
        .single();
      if (error) throw error;
      return { statusCode: 200, body: JSON.stringify({ id: data.id }) };
    }

    if (action === "add_image") {
      const { albumId, imageBase64, fileName } = body;
      if (!albumId || !imageBase64) {
        return { statusCode: 400, body: JSON.stringify({ error: "albumId and imageBase64 required" }) };
      }
      const buf = Buffer.from(imageBase64, "base64");
      if (buf.length > 5 * 1024 * 1024) {
        return { statusCode: 400, body: JSON.stringify({ error: "Image too large (max 5MB)" }) };
      }
      const name = fileName || `img-${Date.now()}.jpg`;
      const path = `${albumId}/${name}`;
      const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, buf, {
        contentType: "image/jpeg",
        upsert: true,
      });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const publicUrl = urlData?.publicUrl || `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

      const { data: row } = await supabase.from("gallery_albums").select("image_urls, cover_image_url").eq("id", albumId).single();
      if (!row) {
        return { statusCode: 404, body: JSON.stringify({ error: "Album not found" }) };
      }
      const urls = Array.isArray(row.image_urls) ? [...row.image_urls, publicUrl] : [publicUrl];
      const cover = row.cover_image_url || publicUrl;
      const { error: updateErr } = await supabase
        .from("gallery_albums")
        .update({ image_urls: urls, cover_image_url: cover })
        .eq("id", albumId);
      if (updateErr) throw updateErr;
      return { statusCode: 200, body: JSON.stringify({ url: publicUrl }) };
    }

    if (action === "delete_image") {
      const { albumId, imageUrl } = body;
      if (!albumId || !imageUrl) {
        return { statusCode: 400, body: JSON.stringify({ error: "albumId and imageUrl required" }) };
      }
      const { data: row } = await supabase.from("gallery_albums").select("image_urls, cover_image_url").eq("id", albumId).single();
      if (!row) {
        return { statusCode: 404, body: JSON.stringify({ error: "Album not found" }) };
      }
      const urls = (Array.isArray(row.image_urls) ? row.image_urls : []).filter((u) => u !== imageUrl);
      const cover = row.cover_image_url === imageUrl ? (urls[0] || null) : row.cover_image_url;
      const { error: updateErr } = await supabase
        .from("gallery_albums")
        .update({ image_urls: urls, cover_image_url: cover })
        .eq("id", albumId);
      if (updateErr) throw updateErr;
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (action === "delete_album") {
      const { albumId } = body;
      if (!albumId) return { statusCode: 400, body: JSON.stringify({ error: "albumId required" }) };
      const { error: delErr } = await supabase.from("gallery_albums").delete().eq("id", albumId);
      if (delErr) throw delErr;
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: "Unknown action" }) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
};
