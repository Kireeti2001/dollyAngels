import { useState, useEffect } from "react";
import { supabase, hasSupabase } from "../lib/supabase";
import staticGallery from "../data/gallery.json";

const ADMIN_API = "/.netlify/functions/admin-gallery";

export function useGalleryData() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(hasSupabase);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasSupabase || !supabase) {
      setAlbums(staticGallery.albums || []);
      setLoading(false);
      return;
    }
    async function fetchAlbums() {
      try {
        const { data, error: e } = await supabase
          .from("gallery_albums")
          .select("*")
          .order("created_at", { ascending: false });
        if (e) throw e;
        setAlbums(
          (data || []).map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description || "",
            coverImage: row.cover_image_url || row.image_urls?.[0],
            images: row.image_urls || [],
            date: row.created_at?.slice(0, 7) || "",
          }))
        );
      } catch (err) {
        setError(err.message);
        setAlbums(staticGallery.albums || []);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  return { albums, loading, error };
}

export async function adminGalleryApi({ pin, action, ...payload }) {
  const res = await fetch(ADMIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-PIN": pin },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || "Request failed");
  return data;
}

export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === "string" ? result.split(",")[1] : null;
      resolve(base64 || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function adminUploadPhoto(pin, albumId, file) {
  const imageBase64 = await readFileAsBase64(file);
  return adminGalleryApi({
    pin,
    action: "add_image",
    albumId,
    imageBase64,
    fileName: file.name || `photo-${Date.now()}.jpg`,
  });
}
