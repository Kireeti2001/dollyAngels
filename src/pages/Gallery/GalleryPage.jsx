import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  useColorMode,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

import galleryData from "../../data/gallery.json";

function GalleryPage() {
  const { colorMode } = useColorMode();
  const albums = galleryData.albums || [];
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextImage = () => {
    const currentAlbum = albums[selectedAlbumIndex];
    if (!currentAlbum?.images?.length) return;
    const nextIndex = (activeImageIndex + 1) % currentAlbum.images.length;
    setActiveImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const currentAlbum = albums[selectedAlbumIndex];
    if (!currentAlbum?.images?.length) return;
    const prevIndex =
      (activeImageIndex - 1 + currentAlbum.images.length) %
      currentAlbum.images.length;
    setActiveImageIndex(prevIndex);
  };

  if (albums.length === 0) {
    return (
      <Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
        <Text color="gray.500">
          No albums yet. Add albums in src/data/gallery.json
        </Text>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      pt={{ base: 4, md: 8 }}
      pb={{ base: 8, md: 16 }}
    >
      <Container maxW="container.xl">
        <VStack spacing={6} mb={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <Heading
              as="h1"
              size="2xl"
              color={colorMode === "light" ? "purple.600" : "purple.300"}
              textAlign="center"
              fontFamily="heading"
            >
              Our Gallery
            </Heading>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ margin: 0, fontSize: "1.125rem", textAlign: "center" }}
            color={colorMode === "light" ? "gray.600" : "gray.300"}
          >
            Capturing moments of learning, growth, and joy at Dolly Angels School
          </motion.p>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {albums.map((album, albumIndex) => (
            <motion.div
              key={album.id || album.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: albumIndex * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 22,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="xl"
                cursor="pointer"
                onClick={() => {
                  setSelectedAlbumIndex(albumIndex);
                  setActiveImageIndex(0);
                  setIsModalOpen(true);
                }}
                position="relative"
                border="2px solid"
                borderColor="transparent"
                _hover={{ borderColor: "purple.400", boxShadow: "2xl" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  style={{ overflow: "hidden" }}
                >
                  <Image
                    src={album.coverImage || album.images?.[0]}
                    alt={album.title}
                    w="100%"
                    h="250px"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/400x250?text=Photo"
                  />
                </motion.div>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  p={4}
                  bgGradient="linear(to-t, blackAlpha.800, transparent)"
                >
                  <Text fontWeight="bold" color="white">
                    {album.title}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.900">
                    {album.images?.length || 0} photos
                  </Text>
                </Box>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size={{ base: "full", md: "4xl", lg: "6xl" }}
          isCentered
        >
          <ModalOverlay
            bg="blackAlpha.800"
            backdropFilter="blur(8px)"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}
          >
            <ModalContent
              bg="transparent"
              boxShadow="none"
              mx={{ base: 0, md: 4 }}
              maxH={{ base: "100vh", md: "90vh" }}
            >
              <ModalBody p={0} position="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ position: "absolute", right: 8, top: 8, zIndex: 2 }}
                >
                  <IconButton
                    icon={<FaTimes />}
                    onClick={() => setIsModalOpen(false)}
                    bg="blackAlpha.700"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                    aria-label="Close"
                    size={{ base: "md", md: "lg" }}
                    borderRadius="full"
                  />
                </motion.div>

                <Box position="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Image
                        src={
                          albums[selectedAlbumIndex]?.images?.[activeImageIndex]
                        }
                        alt={`Gallery image ${activeImageIndex + 1}`}
                        w="100%"
                        maxH={{ base: "85vh", md: "80vh" }}
                        objectFit="contain"
                        fallbackSrc="https://via.placeholder.com/800x600?text=Photo"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    style={{
                      position: "absolute",
                      left: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      icon={<FaArrowLeft />}
                      onClick={handlePrevImage}
                      bg="blackAlpha.700"
                      color="white"
                      _hover={{ bg: "blackAlpha.900" }}
                      size={{ base: "md", md: "lg" }}
                      aria-label="Previous"
                      borderRadius="full"
                    />
                  </motion.div>
                  <motion.div
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      icon={<FaArrowRight />}
                      onClick={handleNextImage}
                      bg="blackAlpha.700"
                      color="white"
                      _hover={{ bg: "blackAlpha.900" }}
                      size={{ base: "md", md: "lg" }}
                      aria-label="Next"
                      borderRadius="full"
                    />
                  </motion.div>
                </Box>
              </ModalBody>
            </ModalContent>
          </motion.div>
        </Modal>
      </Container>
    </Box>
  );
}

export default GalleryPage;
