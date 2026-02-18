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

// Gallery data - edit src/data/gallery.json to add/modify albums
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
        <Text color="gray.500">No albums yet. Add albums in src/data/gallery.json</Text>
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
        <VStack spacing={8} mb={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h1"
              size="2xl"
              color={colorMode === "light" ? "purple.600" : "purple.300"}
              textAlign="center"
              fontFamily="'Comic Sans MS', cursive"
            >
              Our Gallery
            </Heading>
          </motion.div>
          <Text
            fontSize="xl"
            textAlign="center"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
          >
            Capturing moments of learning, growth, and joy at Dolly Angels School
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {albums.map((album, albumIndex) => (
            <motion.div
              key={album.id || album.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: albumIndex * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Box
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="xl"
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
                _hover={{ borderColor: "purple.400" }}
              >
                <Image
                  src={album.coverImage || album.images?.[0]}
                  alt={album.title}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/400x250?text=Photo"
                />
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
          size="6xl"
          isCentered
        >
          <ModalOverlay bg="blackAlpha.900" />
          <ModalContent bg="transparent" boxShadow="none" mx={4}>
            <ModalBody p={0}>
              <IconButton
                icon={<FaTimes />}
                position="absolute"
                right={-10}
                top={-10}
                onClick={() => setIsModalOpen(false)}
                bg="transparent"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                zIndex={2}
                aria-label="Close"
              />

              <Box position="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={
                        albums[selectedAlbumIndex]?.images?.[activeImageIndex]
                      }
                      alt={`Gallery image ${activeImageIndex + 1}`}
                      w="100%"
                      h="80vh"
                      objectFit="contain"
                      fallbackSrc="https://via.placeholder.com/800x600?text=Photo"
                    />
                  </motion.div>
                </AnimatePresence>

                <IconButton
                  icon={<FaArrowLeft />}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={handlePrevImage}
                  bg="blackAlpha.700"
                  color="white"
                  _hover={{ bg: "blackAlpha.900" }}
                  size="lg"
                  aria-label="Previous"
                />
                <IconButton
                  icon={<FaArrowRight />}
                  position="absolute"
                  right={4}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={handleNextImage}
                  bg="blackAlpha.700"
                  color="white"
                  _hover={{ bg: "blackAlpha.900" }}
                  size="lg"
                  aria-label="Next"
                />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}

export default GalleryPage;
