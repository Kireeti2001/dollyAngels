import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaImages, FaLock, FaSignOutAlt } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../contexts/ToastContext";
import {
  useGalleryData,
  adminGalleryApi,
  adminUploadPhoto,
} from "../../hooks/useGalleryData";

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;

function AdminGalleryPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { albums, loading, error } = useGalleryData();
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [uploadingFor, setUploadingFor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const fileInputRef = useRef(null);

  const effectivePin = ADMIN_PIN || pin;

  const handleLogin = (e) => {
    e.preventDefault();
    const p = (e.target.pin?.value || pin).trim();
    if (!p) {
      showToast({ title: "Enter PIN", status: "error" });
      return;
    }
    setPin(p);
    setAuthenticated(true);
    showToast({ title: "Welcome", description: "You can manage the gallery.", status: "success" });
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPin("");
    navigate("/gallery");
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !effectivePin) return;
    setCreating(true);
    try {
      await adminGalleryApi({
        pin: effectivePin,
        action: "create_album",
        title: newTitle.trim(),
        description: newDescription.trim(),
      });
      showToast({ title: "Album created", status: "success" });
      setNewTitle("");
      setNewDescription("");
      window.location.reload();
    } catch (err) {
      showToast({ title: "Error", description: err.message, status: "error" });
    } finally {
      setCreating(false);
    }
  };

  const handleAddPhoto = async (albumId, file) => {
    if (!file || !albumId || !effectivePin) return;
    setUploadingFor(albumId);
    try {
      await adminUploadPhoto(effectivePin, albumId, file);
      showToast({ title: "Photo added", status: "success" });
      window.location.reload();
    } catch (err) {
      showToast({ title: "Upload failed", description: err.message, status: "error" });
    } finally {
      setUploadingFor(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = async (albumId, imageUrl) => {
    if (!effectivePin) return;
    setDeleting(imageUrl);
    try {
      await adminGalleryApi({
        pin: effectivePin,
        action: "delete_image",
        albumId,
        imageUrl,
      });
      showToast({ title: "Photo removed", status: "success" });
      window.location.reload();
    } catch (err) {
      showToast({ title: "Error", description: err.message, status: "error" });
    } finally {
      setDeleting(null);
    }
  };

  if (!import.meta.env.VITE_SUPABASE_URL) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 max-w-md text-center border border-border">
          <h1 className="text-xl font-heading text-primary mb-2">Gallery admin</h1>
          <p className="text-muted-foreground mb-4">
            To let admins add/remove photos from their phone, set up Supabase and Netlify env vars. See <code className="text-sm bg-muted px-1 rounded">docs/ADMIN_GALLERY_SETUP.md</code>.
          </p>
          <Button onClick={() => navigate("/gallery")}>Back to Gallery</Button>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-8 max-w-sm w-full border border-border shadow-lg"
        >
          <div className="flex justify-center mb-6">
            <FaLock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-xl font-heading text-primary text-center mb-2">Admin access</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">Enter your PIN to manage the gallery.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="text-center text-lg"
                maxLength={8}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Enter
            </Button>
          </form>
          <Button variant="ghost" className="w-full mt-4" onClick={() => navigate("/gallery")}>
            Back to Gallery
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 pb-20">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading text-primary">Manage gallery</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Exit
          </Button>
        </div>

        {loading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        <section className="mb-10">
          <h2 className="text-lg font-heading text-foreground mb-4">Create new album</h2>
          <form onSubmit={handleCreateAlbum} className="flex flex-col gap-4 p-4 bg-card rounded-2xl border border-border">
            <div>
              <Label htmlFor="newTitle">Album title *</Label>
              <Input
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. School Day 2025"
                required
              />
            </div>
            <div>
              <Label htmlFor="newDesc">Description (optional)</Label>
              <Input
                id="newDesc"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Short description"
              />
            </div>
            <Button type="submit" disabled={creating}>
              {creating ? "Creating…" : "Create album"}
            </Button>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-heading text-foreground mb-4">Albums & photos</h2>
          <div className="space-y-6">
            {albums.length === 0 && !loading && (
              <p className="text-muted-foreground">No albums yet. Create one above or use the static gallery.</p>
            )}
            {albums.map((album) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-lg">{album.title}</h3>
                  {album.description && (
                    <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
                  )}
                </div>
                <div className="p-4 flex flex-wrap gap-3 items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleAddPhoto(album.id, f);
                    }}
                    id={`file-${album.id}`}
                  />
                  <Button
                    size="lg"
                    onClick={() => document.getElementById(`file-${album.id}`)?.click()}
                    disabled={uploadingFor === album.id}
                    className="min-h-[48px]"
                  >
                    <FaPlus className="mr-2" />
                    {uploadingFor === album.id ? "Uploading…" : "Add photo"}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    <FaImages className="inline mr-1" />
                    {album.images?.length || 0} photos
                  </span>
                </div>
                <div className="p-4 pt-0 flex flex-wrap gap-3">
                  {(album.images || []).map((url) => (
                    <div key={url} className="relative group">
                      <img
                        src={url}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg border border-border"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-90 group-hover:opacity-100"
                        onClick={() => handleDeleteImage(album.id, url)}
                        disabled={deleting === url}
                        aria-label="Remove photo"
                      >
                        <FaTrash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/gallery")}>
            View public gallery
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminGalleryPage;
