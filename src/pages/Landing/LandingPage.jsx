import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home"); // This should trigger navigation
    console.log("Navigation attempted"); // Debug log
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Dolly Angels School</h1>
      <button onClick={handleEnter}>Enter Dolly Angels</button>
    </div>
  );
}

export default LandingPage;
