import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handlePrevImage} disabled={currentIndex === 0}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <img src={images[currentIndex]} alt="Image" style={{ width: "100%" }} />
      <IconButton
        onClick={handleNextImage}
        disabled={currentIndex === images.length - 1}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
  );
};

export default Carousel;
