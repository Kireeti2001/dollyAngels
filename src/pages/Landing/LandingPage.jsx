import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import school from "../../lib/school";
import "./LandingPage.css";

const EMOJIS = ["📚", "🎨", "🌈", "⭐", "✏️", "🎪", "🏫", "🎒"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemMotion = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-blob landing-blob-1" aria-hidden />
      <div className="landing-blob landing-blob-2" aria-hidden />
      <div className="landing-blob landing-blob-3" aria-hidden />

      {EMOJIS.map((emoji, i) => (
        <motion.span
          key={emoji}
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
          aria-hidden
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div className="landing-card" initial="hidden" animate="show" variants={container}>
        <motion.span className="landing-eyebrow" variants={itemMotion}>
          ✦ {school.eyebrow}
        </motion.span>

        <motion.div variants={itemMotion}>
          <img src="/logo.svg" alt="" className="h-20 md:h-24 w-auto mx-auto mt-5" width="140" height="102" />
        </motion.div>

        <motion.h1 variants={itemMotion}>
          Welcome to
          <br />
          {school.name}
        </motion.h1>
        <motion.p className="subtitle" variants={itemMotion}>
          {school.tagline} {school.heroLead}
        </motion.p>
        <motion.div variants={itemMotion}>
          <motion.button
            type="button"
            className="cta"
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Enter Dolly Angels website"
          >
            Enter Dolly Angels <FaArrowRight aria-hidden />
          </motion.button>
        </motion.div>
        <motion.div variants={itemMotion}>
          <button type="button" className="landing-skip" onClick={() => navigate("/home")}>
            Skip intro
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
