import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaHeart, FaStar, FaBook } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import school from "../../lib/school";

const icons = { heart: FaHeart, star: FaStar, book: FaBook, cap: FaGraduationCap };

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function AboutPage() {
  return (
    <div className="min-h-[90vh] py-8 md:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16 text-center" variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item} className="text-3xl font-heading font-bold text-primary mb-4">
            About {school.name}
          </motion.h1>
          <motion.p variants={item} className="text-lg text-muted-foreground max-w-[800px] mx-auto">
            Where every child&apos;s potential takes flight. Since {school.established}, we&apos;ve been nurturing young
            minds into confident, creative, and compassionate individuals.
          </motion.p>
        </motion.div>

        <motion.div className="mb-20" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <h2 className="text-xl font-heading font-bold text-teal-600 dark:text-teal-400 mb-10 text-center">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {school.values.map((value) => {
              const Icon = icons[value.icon] || FaStar;
              return (
                <motion.div
                  key={value.title}
                  variants={item}
                  className="bg-card rounded-2xl p-6 shadow-lg border border-border"
                  whileHover={{ y: -6 }}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Icon className="w-10 h-10 text-primary" aria-hidden />
                    <h3 className="font-heading font-semibold text-teal-600 dark:text-teal-400">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-teal-600 dark:text-teal-400">Our story</h2>
            <p className="text-muted-foreground">
              Dolly Angels began with a simple dream: a place where children could learn, play, and grow in an
              environment that celebrates their uniqueness.
            </p>
            <p className="text-muted-foreground">
              We grew from a small classroom of 15 students into a vibrant community of learners, teachers, and
              families working together.
            </p>
            <p className="text-muted-foreground">
              Today we keep that warm, nurturing hallmark while using playful, modern teaching every day.
            </p>
            <Button asChild>
              <Link to="/programs">Explore programs</Link>
            </Button>
          </div>
          <img
            src="/logo.svg"
            alt={`${school.name} logo`}
            className="rounded-2xl shadow-2xl w-full max-w-sm mx-auto bg-card p-8 border border-border"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {school.stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-card rounded-2xl shadow-md border border-border text-center">
              <p className="text-xl font-heading font-bold text-primary">{stat.number}</p>
              <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
