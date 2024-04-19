import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Modal as MuiModal } from "@mui/material"; // Import Modal component
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "./Carousel";
let img1 =
  "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg";
let img2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s";
let img3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JEF0URkA1AQqW9T7NgOklaTYZE1Qw_i4UACClAPSXQ&s";
const items = [
  {
    title: "DIWALI",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
    images: [img1, img2, img3], // Array of image URLs for this album
  },
  {
    title: "RED DAY",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
    images: [img1, img2, img3], // Array of image URLs for this album
  },
  {
    title: "GREEN DAY",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
    images: [img3, img2, img1], // Array of image URLs for this album
  },
  {
    title: "YELLOW DAY",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
    images: [img2, img1, img3], // Array of image URLs for this album
  },
  // ... other items with their image URLs
];

const Gallery = () => {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = (index) => {
    setSelectedAlbumIndex(index); // Ensure selected album is set
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Start image rotation on component mount (optional)
  useEffect(() => {
    const intervalId = setInterval(handleNextImage, 400); // Change interval as needed
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Gallery
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Explore why our School stands out
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                  cursor: "pointer", // Add cursor for click interaction
                }}
                onClick={() => handleOpenModal(index)}
              >
                <img
                  src={items[selectedAlbumIndex]?.images[activeImageIndex]}
                  alt={item.title}
                  onError={(event) => {
                    event.target.style.opacity = 0.5; // Handle broken images
                  }}
                />

                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal component */}
      <MuiModal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "background.paper", width: "70%", p: 4 }}>
          <Typography variant="h5" id="modal-title" sx={{ mb: 2 }}>
            {items[selectedAlbumIndex]?.title}
          </Typography>
          <Carousel images={items[selectedAlbumIndex]?.images} />{" "}
          {/* Replace with your Carousel component */}
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
      </MuiModal>
    </Box>
  );
};

export default Gallery;

// You'll need to implement your own Carousel component to display the images within the modal
