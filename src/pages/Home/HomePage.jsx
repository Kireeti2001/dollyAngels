import React from "react";
import { motion } from "framer-motion";

const activityCards = [
  {
    emoji: "🎨",
    title: "Art Zone",
    desc: "Paint your dreams in our colorful art studio!",
    bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    color: "#5a3d7a",
  },
  {
    emoji: "🏃",
    title: "Active Play",
    desc: "Jump, run, and play in our safe playground!",
    bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    color: "#2d5a4a",
  },
  {
    emoji: "📚",
    title: "Story Time",
    desc: "Discover magical worlds through books!",
    bg: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    color: "#4a2d5a",
  },
];

const events = [
  { emoji: "🎪", text: "School Carnival - June 15th" },
  { emoji: "🎓", text: "Graduation Day - July 1st" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function HomePage() {
  return (
    <div className="py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Welcome to Dolly Angels School!
              </h1>
            </motion.div>
          </motion.div>
          <motion.div variants={item}>
            <p className="text-xl text-orange-500 font-bold">Where Learning is an Adventure! 🌈</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {activityCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="p-6 rounded-2xl shadow-xl text-[length:inherit]"
              style={{ background: card.bg, color: card.color }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.12,
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                rotate: 2,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, delay: i * 0.3 }}
                className="inline-block"
              >
                <span className="text-4xl block mb-3">{card.emoji}</span>
              </motion.div>
              <h2 className="text-lg font-heading font-semibold mb-2">{card.title}</h2>
              <p className="text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
        >
          <h2 className="text-xl font-heading font-bold text-primary mb-6">Upcoming Events</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {events.map((ev, i) => (
              <motion.div
                key={ev.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary border-2 border-border rounded-xl p-4 font-semibold"
              >
                {ev.emoji} {ev.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200"
              alt="Friendly School Mascot"
              className="w-[180px] h-[180px] mx-auto rounded-full shadow-xl border-4 border-purple-300"
            />
          </motion.div>
          <p className="mt-2 text-muted-foreground font-bold">Our friendly mascot says Hello! 👋</p>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
