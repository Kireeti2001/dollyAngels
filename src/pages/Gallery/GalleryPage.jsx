import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes, FaArrowRight as FaOpen } from "react-icons/fa";
import * as Dialog from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useGalleryData } from "../../hooks/useGalleryData";
import { hasSupabase } from "../../lib/supabase";
import { Reveal, easing } from "../../components/ui/motion";

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
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">✦ Gallery</span>
        <h1 className="headline text-4xl md:text-6xl mt-6">
          100% real days.
          <br />
          <span className="text-primary">0% stock smiles.</span>
        </h1>
        <p className="body-large mt-6">Learning, growth, and joy at Dolly Angels School.</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album, albumIndex) => (
          <motion.button
            type="button"
            key={album.id || album.title}
            initial={{ opacity: 0, y: 28, rotate: albumIndex % 2 === 0 ? -1 : 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easing, delay: albumIndex * 0.06 }}
            whileHover={{ y: -6 }}
            className="editorial-card overflow-hidden text-left"
            onClick={() => {
              setSelectedAlbumIndex(albumIndex);
              setActiveImageIndex(0);
              setOpen(true);
            }}
          >
            <div className="overflow-hidden">
              <motion.img
                src={album.coverImage || album.images?.[0] || "/logo.svg"}
                alt=""
                className="w-full h-[230px] object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: easing }}
              />
            </div>
            <div className="p-5 flex items-center justify-between gap-3">
              <div>
                <p className="font-heading font-bold text-lg">{album.title}</p>
                <p className="text-sm text-muted-foreground">
                  {album.images?.length || 0} photos
                  {album.description ? ` · ${album.description}` : ""}
                </p>
              </div>
              <span className="rounded-full border-2 border-border bg-secondary p-2.5 shrink-0">
                <FaOpen className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-[min(96vw,960px)] bg-card border-2 border-border p-3 sm:p-4 shadow-hard">
          <Dialog.DialogTitle className="sr-only">
            {currentAlbum?.title || "Gallery"} photo {activeImageIndex + 1} of {images.length}
          </Dialog.DialogTitle>
          <Dialog.DialogDescription className="sr-only">
            Use the arrow buttons or keyboard arrows to browse photos.
          </Dialog.DialogDescription>
          <div className="relative min-h-[50vh] flex items-center justify-center bg-muted rounded-2xl overflow-hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-10 shadow-none"
              aria-label="Close"
            >
              <FaTimes className="h-4 w-4" />
            </Button>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: easing }}
                src={images[activeImageIndex]}
                alt={`${currentAlbum?.title || "Gallery"} ${activeImageIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  aria-label="Previous photo"
                >
                  <FaArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  aria-label="Next photo"
                >
                  <FaArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <p className="text-center text-sm font-bold text-muted-foreground mt-3">
            {currentAlbum?.title} · {activeImageIndex + 1} / {images.length}
          </p>
        </Dialog.DialogContent>
      </Dialog.Dialog>

      {hasSupabase && (
        <p className="text-center mt-10">
          <Link to="/admin/gallery" className="text-sm text-muted-foreground hover:text-primary underline">
            Manage gallery (admin)
          </Link>
        </p>
      )}
    </div>
  );
}

export default GalleryPage;
