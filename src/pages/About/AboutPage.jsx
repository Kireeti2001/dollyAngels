import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Reveal, MotionCard, CountUp } from "../../components/ui/motion";
import school from "../../lib/school";

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <span className="eyebrow">✦ Our story</span>
        <h1 className="headline text-4xl md:text-6xl mt-6">
          Begin with what lasts.
          <br />
          Build for <span className="text-primary">what’s ahead.</span>
        </h1>
        <p className="body-large mt-6">
          Since {school.established}, Dolly Angels has asked one simple question: “What has always worked?” The answer
          lives in every classroom.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <MotionCard className="rotate-[-1deg]">
          <img src="/logo.svg" alt={`${school.name} logo`} className="h-28 w-28 mx-auto" width="96" height="96" />
          <p className="text-center text-muted-foreground mt-4">A warm, close-knit school for curious little learners.</p>
        </MotionCard>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Dolly Angels began with a simple dream: a place where children could learn, play, and grow in an
            environment that celebrates their uniqueness.
          </p>
          <p className="text-lg text-muted-foreground">
            We grew from a small classroom of 15 students into a vibrant community of learners, teachers, and
            families working together.
          </p>
          <p className="text-lg text-muted-foreground">
            Today we keep that warm, nurturing hallmark while using playful, modern teaching every day.
          </p>
          <Button asChild>
            <Link to="/programs">
              Explore programs <FaArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Reveal className="text-center mb-10">
        <span className="eyebrow">✦ The building blocks</span>
        <h2 className="headline text-3xl md:text-5xl mt-5">A timeless education, every day.</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
        {school.buildingBlocks.map((block, i) => (
          <MotionCard key={block.number} delay={i * 0.06} className="flex gap-5 items-start">
            <span className="font-heading font-bold text-3xl text-outline shrink-0">{block.number}</span>
            <div>
              <h3 className="font-heading font-bold text-xl">{block.title}</h3>
              <p className="text-muted-foreground mt-2">{block.description}</p>
            </div>
          </MotionCard>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {school.stats.map((stat, i) => (
          <MotionCard key={stat.label} delay={i * 0.05} className="text-center bg-secondary">
            <motion.p
              className="font-heading font-bold text-4xl"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.05 }}
            >
              <CountUp value={stat.number} />
            </motion.p>
            <p className="text-sm font-bold mt-1">{stat.label}</p>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
