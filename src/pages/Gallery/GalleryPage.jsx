import React, { useState, useEffect } from "react";
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

function GalleryPage() {
  const { colorMode } = useColorMode();
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example gallery items (replace with your actual data)
  const items = [
    {
      title: "School Events",
      images: [
        "https://pixabay.com/photos/girl-afraid-library-magical-5230306/",
        "/path/to/event2.jpg",
        // Add more images
      ],
    },
    {
      title: "Classroom Activities",
      images: [
        "/path/to/activity1.jpg",
        "/path/to/activity2.jpg",
        // Add more images
      ],
    },
    // Add more albums
  ];

  const handleNextImage = () => {
    const currentAlbum = items[selectedAlbumIndex];
    const nextIndex = (activeImageIndex + 1) % currentAlbum.images.length;
    setActiveImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const currentAlbum = items[selectedAlbumIndex];
    const prevIndex =
      (activeImageIndex - 1 + currentAlbum.images.length) %
      currentAlbum.images.length;
    setActiveImageIndex(prevIndex);
  };

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      pt={{ base: 4, md: 8 }}
      pb={{ base: 8, md: 16 }}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} mb={8}>
          <Heading
            as="h1"
            size="2xl"
            color={colorMode === "light" ? "purple.600" : "purple.300"}
            textAlign="center"
            fontFamily="'Comic Sans MS', cursive"
          >
            Our Gallery
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
          >
            Capturing moments of learning, growth, and joy at Dolly Angels School
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {items.map((album, albumIndex) => (
            <motion.div
              key={album.title}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="xl"
                cursor="pointer"
                onClick={() => {
                  setSelectedAlbumIndex(albumIndex);
                  setActiveImageIndex(0);
                  setIsModalOpen(true);
                }}
                position="relative"
              >
                <Image
                  src={album.images[0]}
                  alt={album.title}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/400x250"
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  p={4}
                  bg={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.800"}
                  borderTop="1px solid"
                  borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
                >
                  <Text
                    fontWeight="bold"
                    color={colorMode === "light" ? "gray.800" : "white"}
                  >
                    {album.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={colorMode === "light" ? "gray.600" : "gray.300"}
                  >
                    {album.images.length} photos
                  </Text>
                </Box>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* Image Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="6xl"
          isCentered
        >
          <ModalOverlay bg="blackAlpha.900" />
          <ModalContent
            bg="transparent"
            boxShadow="none"
            mx={4}
            position="relative"
          >
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
                      src={items[selectedAlbumIndex].images[activeImageIndex]}
                      alt={`Gallery image ${activeImageIndex + 1}`}
                      w="100%"
                      h="80vh"
                      objectFit="contain"
                      fallbackSrc="https://via.placeholder.com/800x600"
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
