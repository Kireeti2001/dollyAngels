import React, { useState } from "react";
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

  const handleNextImage = () => {
    const currentAlbum = albums[selectedAlbumIndex];
    if (!currentAlbum?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % currentAlbum.images.length);
  };

  const handlePrevImage = () => {
    const currentAlbum = albums[selectedAlbumIndex];
    if (!currentAlbum?.images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + currentAlbum.images.length) % currentAlbum.images.length);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading gallery…</p>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">No albums yet. Add albums in admin or src/data/gallery.json</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background pt-4 md:pt-8 pb-8 md:pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h1 className="text-2xl font-heading font-bold text-primary">Our Gallery</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Capturing moments of learning, growth, and joy at Dolly Angels School
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, albumIndex) => (
            <motion.div
              key={album.id || album.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: albumIndex * 0.1, type: "spring", stiffness: 200, damping: 22 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-2xl overflow-hidden shadow-xl border-2 border-transparent hover:border-primary cursor-pointer relative"
              onClick={() => {
                setSelectedAlbumIndex(albumIndex);
                setActiveImageIndex(0);
                setOpen(true);
              }}
            >
              <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                <img
                  src={album.coverImage || album.images?.[0] || ""}
                  alt={album.title}
                  className="w-full h-[250px] object-cover"
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-bold text-white">{album.title}</p>
                <p className="text-sm text-white/90">{album.images?.length || 0} photos</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog.Dialog open={open} onOpenChange={setOpen}>
          <Dialog.DialogContent
            className="fixed inset-0 z-50 w-full max-w-none translate-x-0 translate-y-0 border-0 bg-black/90 data-[state=open]:opacity-100 data-[state=closed]:opacity-0 flex items-center justify-center p-0"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <div className="relative w-full h-full max-h-[85vh] md:max-h-[80vh] flex items-center justify-center p-4">
              <motion.div
                className="absolute right-2 top-2 md:right-4 md:top-4 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-black/70 text-white hover:bg-black/90"
                  aria-label="Close"
                >
                  <FaTimes className="h-5 w-5" />
                </Button>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center justify-center"
                >
                  <img
                    src={albums[selectedAlbumIndex]?.images?.[activeImageIndex]}
                    alt={`Gallery ${activeImageIndex + 1}`}
                    className="max-w-full max-h-[85vh] md:max-h-[80vh] object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="rounded-full bg-black/70 text-white hover:bg-black/90"
                  aria-label="Previous"
                >
                  <FaArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="rounded-full bg-black/70 text-white hover:bg-black/90"
                  aria-label="Next"
                >
                  <FaArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </Dialog.DialogContent>
        </Dialog.Dialog>

        {hasSupabase && (
          <p className="text-center mt-8">
            <Link
              to="/admin/gallery"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Manage gallery (admin)
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
