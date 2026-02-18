import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";

const EMOJIS = ["📚", "🎨", "🌈", "⭐", "✏️", "🎪", "🏫", "🎒"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      <div className="landing-blob landing-blob-1" aria-hidden />
      <div className="landing-blob landing-blob-2" aria-hidden />
      <div className="landing-blob landing-blob-3" aria-hidden />

      {EMOJIS.map((emoji, i) => (
        <motion.span
          key={i}
          className="landing-emoji"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.95,
            scale: 1,
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: i * 0.08 },
            scale: { type: "spring", stiffness: 300, damping: 20, delay: i * 0.08 },
            y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            rotate: { duration: 4 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 },
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div
        className="landing-hero"
        style={{
          textAlign: "center",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "90vw",
        }}
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1 variants={itemMotion} style={{ margin: 0 }}>
          Welcome to Dolly Angels School
        </motion.h1>

        <motion.p
          className="subtitle"
          variants={itemMotion}
          transition={{ type: "spring", stiffness: 150 }}
        >
          Where Learning is an Adventure! 🌟
        </motion.p>

        <motion.div className="landing-cta-wrap" variants={itemMotion}>
          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Enter Dolly Angels website"
          >
            Enter Dolly Angels
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
