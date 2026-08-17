import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Reveal, MotionCard, Floaty, easing } from "../../components/ui/motion";
import school from "../../lib/school";
import { formatEventDate } from "../../lib/contact.mjs";

function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing }}
          >
            <span className="eyebrow">✦ {school.eyebrow}</span>
            <h1 className="headline text-5xl md:text-7xl leading-[0.98] mt-6">
              School for
              <br />
              <span className="text-primary">what’s</span> ahead.
            </h1>
            <p className="body-large mt-6 max-w-xl">{school.heroLead}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg">
                <Link to="/contact">
                  Enquire now <FaArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/programs">See programs</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/gallery">Peek inside</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.15 }}
          >
            <div className="editorial-card p-8 md:p-10 text-center rotate-1">
              <Floaty>
                <img src="/logo.svg" alt={`${school.name} logo`} className="h-36 md:h-44 w-auto mx-auto" width="140" height="102" />
              </Floaty>
              <p className="font-heading font-bold text-2xl mt-4">{school.shortName}</p>
              <p className="text-muted-foreground mt-2">{school.tagline}</p>
            </div>
            <motion.div
              className="absolute -bottom-5 -left-5 editorial-card bg-secondary px-5 py-3 rotate-[-4deg]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: easing }}
            >
              <p className="font-heading font-bold">✦ Small classrooms</p>
              <p className="text-xs text-muted-foreground">Every child is seen</p>
            </motion.div>
            <motion.div
              className="absolute -top-5 -right-4 editorial-card bg-blue text-white px-5 py-3 rotate-3"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5, ease: easing }}
            >
              <p className="font-heading font-bold">✦ Since {school.established}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow">✦ Why families choose us</span>
          <h2 className="headline text-3xl md:text-5xl mt-5">Every child deserves a strong beginning.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {school.pillars.map((pillar, i) => (
            <MotionCard key={pillar.title} delay={i * 0.06} className="text-center">
              <p className="text-4xl mb-4" aria-hidden>
                {pillar.icon === "heart" ? "💛" : pillar.icon === "book" ? "📖" : pillar.icon === "sparkle" ? "✨" : "🎓"}
              </p>
              <h3 className="font-heading font-bold text-xl">{pillar.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{pillar.description}</p>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Activities strip */}
      <section className="bg-card border-y-2 border-border py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="text-center mb-10">
            <h2 className="headline text-3xl md:text-4xl">Days full of art, play, and stories</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {school.activities.map((card, i) => (
              <Link key={card.title} to={card.href} className="no-underline">
                <MotionCard delay={i * 0.07} className="h-full">
                  <Floaty delay={i * 0.2}>
                    <span className="text-4xl" aria-hidden>{card.emoji}</span>
                  </Floaty>
                  <h3 className="font-heading font-bold text-xl mt-4">{card.title}</h3>
                  <p className="text-muted-foreground mt-2">{card.desc}</p>
                  <p className="font-heading font-bold text-primary mt-4 flex items-center gap-2">
                    Explore <FaArrowRight className="h-3.5 w-3.5" />
                  </p>
                </MotionCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow">✦ Families</span>
          <h2 className="headline text-3xl md:text-5xl mt-5">The next generation loves learning here.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {school.stories.map((story, i) => (
            <MotionCard key={story.name} delay={i * 0.07}>
              <FaQuoteLeft className="text-primary h-6 w-6 mb-4" aria-hidden />
              <p className="font-heading text-lg leading-snug">“{story.quote}”</p>
              <div className="hairline my-4" />
              <p className="font-bold">{story.name}</p>
              <p className="text-sm text-muted-foreground">{story.meta}</p>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <MotionCard>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="headline text-2xl md:text-3xl">Upcoming events</h2>
            <span className="eyebrow">✦ Save the date</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {school.events.map((ev) => (
              <div key={ev.title} className="rounded-2xl border-2 border-border bg-muted p-5">
                <p className="text-3xl" aria-hidden>{ev.emoji}</p>
                <p className="font-heading font-bold text-lg mt-2">{ev.title}</p>
                <p className="text-primary font-bold text-sm">{formatEventDate(ev.date)}</p>
                <p className="text-sm text-muted-foreground mt-2">{ev.blurb}</p>
              </div>
            ))}
          </div>
        </MotionCard>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <MotionCard className="text-center bg-primary text-primary-foreground">
          <h2 className="headline text-3xl md:text-4xl">Ready to enroll? Your child’s adventure starts here.</h2>
          <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">
            Tell us about your child — we reply to every enquiry.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/contact">
              Start an enquiry <FaArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionCard>
      </section>
    </div>
  );
}

export default HomePage;
