import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaHeart, FaStar, FaBook } from "react-icons/fa";

const values = [
  { icon: FaHeart, title: "Nurturing Environment", description: "We create a loving and supportive atmosphere where every child feels safe to explore and learn." },
  { icon: FaStar, title: "Excellence in Education", description: "Our curriculum is designed to bring out the best in each child through creative and engaging methods." },
  { icon: FaBook, title: "Holistic Development", description: "We focus on academic, social, emotional, and physical development of every student." },
  { icon: FaGraduationCap, title: "Future Ready", description: "Preparing children with skills and values they need for a bright future." },
];

const stats = [
  { number: "500+", label: "Happy Students" },
  { number: "50+", label: "Expert Teachers" },
  { number: "12", label: "Years of Excellence" },
  { number: "25+", label: "Special Programs" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function AboutPage() {
  return (
    <div className="min-h-[90vh] py-8 md:py-10 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16 text-center" variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item} className="text-2xl font-heading font-bold text-primary mb-4">
            About Dolly Angels School
          </motion.h1>
          <motion.p variants={item} className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Where every child&apos;s potential takes flight! Since 2010, we&apos;ve been nurturing young minds and helping them grow into confident, creative, and compassionate individuals.
          </motion.p>
        </motion.div>

        <motion.div className="mb-20" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <h2 className="text-xl font-heading font-bold text-teal-600 dark:text-teal-400 mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border"
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <value.icon className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-teal-600 dark:text-teal-400">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          <h2 className="text-xl font-heading font-bold text-teal-600 dark:text-teal-400 mb-10 text-center">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div variants={item} className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Dolly Angels School began with a simple dream: to create a place where children could learn, play, and grow in an environment that celebrates their uniqueness and nurtures their natural curiosity.
              </p>
              <p className="text-lg text-muted-foreground">
                Over the years, we&apos;ve grown from a small classroom of 15 students to a vibrant community of learners, teachers, and families all working together to provide the best possible education for our children.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we continue to build on our foundation of excellence, incorporating innovative teaching methods while maintaining the warm, nurturing environment that has always been our hallmark.
              </p>
            </motion.div>
            <motion.div variants={item}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
                  alt="Dolly Angels School Building"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-6 bg-card rounded-2xl shadow-md border border-border text-center"
                whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              >
                <p className="text-xl font-heading font-bold text-primary">{stat.number}</p>
                <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;
