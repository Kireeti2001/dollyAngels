import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";

const EMOJIS = ["📚", "🎨", "🌈", "⭐", "✏️", "🎪", "🏫", "🎒"];

function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      {EMOJIS.map((emoji, i) => (
        <motion.span
          key={i}
          className="landing-emoji"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div
        style={{ textAlign: "center", zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1>Welcome to Dolly Angels School</h1>
        <p className="subtitle">Where Learning is an Adventure! 🌟</p>

        <motion.button
          onClick={handleEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter Dolly Angels
        </motion.button>
      </motion.div>
    </div>
  );
}

export default LandingPage;
