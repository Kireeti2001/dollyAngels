import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import school from "../../lib/school";
import { formatEventDate } from "../../lib/contact.mjs";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function HomePage() {
  return (
    <div className="py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <img
              src="/logo.svg"
              alt=""
              className="w-28 h-auto mx-auto mb-4 drop-shadow-lg"
              width="140"
              height="102"
            />
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome to {school.name}!
            </h1>
          </motion.div>
          <motion.p variants={item} className="text-xl text-orange-500 font-bold">
            {school.tagline} 🌈
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Enquire about admission</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/programs">See programs</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/gallery">View gallery</Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {school.activities.map((card, i) => (
            <Link key={card.title} to={card.href} className="no-underline">
              <motion.div
                className="p-6 rounded-2xl shadow-xl h-full bg-gradient-to-br from-amber-100 to-pink-100 dark:from-purple-900/60 dark:to-pink-900/40 text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 180, damping: 22 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-4xl block mb-3" aria-hidden>
                  {card.emoji}
                </span>
                <h2 className="text-lg font-heading font-semibold mb-2">{card.title}</h2>
                <p className="text-sm">{card.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.section
          className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-heading font-bold text-primary mb-6 text-center">Upcoming events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {school.events.map((ev) => (
              <div key={ev.title} className="bg-secondary border border-border rounded-xl p-4">
                <p className="font-semibold">
                  {ev.emoji} {ev.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{formatEventDate(ev.date)}</p>
                <p className="text-sm mt-2">{ev.blurb}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="text-center rounded-2xl border border-border bg-card p-8 shadow-soft">
          <p className="font-heading text-lg text-primary mb-2">Ready to join our family?</p>
          <p className="text-muted-foreground mb-4">Tell us about your child — we reply to every enquiry.</p>
          <Button asChild size="lg">
            <Link to="/contact">Start an enquiry</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
