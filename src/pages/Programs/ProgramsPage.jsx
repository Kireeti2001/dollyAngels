import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Reveal, MotionCard, Floaty } from "../../components/ui/motion";
import school from "../../lib/school";

function ProgramsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">✦ Programs</span>
        <h1 className="headline text-4xl md:text-6xl mt-6">
          From first friends to a confident <span className="text-primary">Grade 1.</span>
        </h1>
        <p className="body-large mt-6">
          Every class is built for curious little learners — play, stories, numbers, and lots of heart.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {school.programs.map((program, i) => (
          <MotionCard
            key={program.id}
            delay={i * 0.06}
            className={`scroll-mt-28 ${i % 2 === 0 ? "md:rotate-[-0.5deg]" : "md:rotate-[0.5deg]"}`}
          >
            <div className="flex items-start gap-4">
              <Floaty delay={i * 0.15}>
                <span className="text-5xl" aria-hidden>{program.emoji}</span>
              </Floaty>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-heading font-bold text-2xl">{program.title}</h2>
                  <span className="rounded-full border-2 border-border bg-secondary px-3 py-1 text-xs font-bold">
                    {program.ages}
                  </span>
                </div>
                <p className="text-muted-foreground mt-3">{program.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {program.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-accent" aria-hidden>✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      <Reveal className="text-center mt-16">
        <MotionCard className="bg-secondary">
          <h2 className="headline text-2xl md:text-3xl">Not sure which class fits?</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Tell us your child’s age and we’ll suggest the right start.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/contact">
              Ask about a seat <FaArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionCard>
      </Reveal>
    </div>
  );
}

export default ProgramsPage;
