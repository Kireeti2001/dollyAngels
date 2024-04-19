import React, { useState } from "react";
import Button from "@mui/material/Button"; // Assuming Material-UI for button
import { Box, Modal } from "@mui/material";

const GoogleFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  let formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfpVhNtVHOw0CbCQW_fKWlhV3mUE3EX6odzUmQx8TizGNav4w/viewform?embedded=true";

  let formLink = "https://forms.gle/WVNsixxM78ASw3qH9";
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Sanitize form URL to prevent potential security vulnerabilities
  const sanitizedFormUrl = formUrl.replace(/<script[^>]*>.*?<\/script>/g, ""); // Remove scripts
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100vh", // Set height to 100vh for full screen
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Button variant="contained" size="small" href={formLink} target="_blank">
        Contact Us
      </Button>
      {/* <Button variant="contained" size="small" onClick={handleOpen}>
        Contact Us
      </Button>
      {isOpen && (
        <Modal open={isOpen}>
          <Box style={modalStyle}>
            <iframe
              src={sanitizedFormUrl}
              width="100%"
              height="100%"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="Google Form"
            />
            <Button onClick={handleClose}>Cancle Enquiry</Button>
          </Box>
        </Modal>
      )} */}
    </>
  );
};

export default GoogleFormModal;
