import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import * as Dialog from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useGalleryData } from "../../hooks/useGalleryData";
import { hasSupabase } from "../../lib/supabase";

function GalleryPage() {
  const { albums, loading } = useGalleryData();
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const currentAlbum = albums[selectedAlbumIndex];
  const images = currentAlbum?.images || [];

  const handleNextImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading gallery…</p>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-muted-foreground">No albums yet. Check back soon for photos from school life.</p>
        <Link to="/contact" className="text-primary underline">
          Ask us about a visit
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 md:pt-8 pb-8 md:pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-primary">Our gallery</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Capturing learning, growth, and joy at Dolly Angels School
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, albumIndex) => (
            <motion.button
              type="button"
              key={album.id || album.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: albumIndex * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-card rounded-2xl overflow-hidden shadow-xl border-2 border-transparent hover:border-primary text-left relative"
              onClick={() => {
                setSelectedAlbumIndex(albumIndex);
                setActiveImageIndex(0);
                setOpen(true);
              }}
            >
              <img
                src={album.coverImage || album.images?.[0] || "/logo.svg"}
                alt=""
                className="w-full h-[220px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-bold text-white">{album.title}</p>
                <p className="text-sm text-white/90">
                  {album.images?.length || 0} photos
                  {album.description ? ` · ${album.description}` : ""}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <Dialog.Dialog open={open} onOpenChange={setOpen}>
          <Dialog.DialogContent className="max-w-[min(96vw,960px)] bg-black/95 border-0 p-3 sm:p-4 text-white">
            <Dialog.DialogTitle className="sr-only">
              {currentAlbum?.title || "Gallery"} photo {activeImageIndex + 1} of {images.length}
            </Dialog.DialogTitle>
            <Dialog.DialogDescription className="sr-only">
              Use the arrow buttons or keyboard arrows to browse photos.
            </Dialog.DialogDescription>
            <div className="relative min-h-[50vh] flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="absolute right-0 top-0 z-10 rounded-full bg-black/70 text-white hover:bg-black/90"
                aria-label="Close"
              >
                <FaTimes className="h-5 w-5" />
              </Button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={images[activeImageIndex]}
                  alt={`${currentAlbum?.title || "Gallery"} ${activeImageIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/70 text-white hover:bg-black/90"
                    aria-label="Previous photo"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/70 text-white hover:bg-black/90"
                    aria-label="Next photo"
                  >
                    <FaArrowRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
            <p className="text-center text-sm text-white/80 mt-2">
              {currentAlbum?.title} · {activeImageIndex + 1} / {images.length}
            </p>
          </Dialog.DialogContent>
        </Dialog.Dialog>

        {hasSupabase && (
          <p className="text-center mt-8">
            <Link to="/admin/gallery" className="text-sm text-muted-foreground hover:text-primary underline">
              Manage gallery (admin)
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
