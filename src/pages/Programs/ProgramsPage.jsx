import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import school from "../../lib/school";

function ProgramsPage() {
  return (
    <div className="py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading font-bold text-primary">Programs</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            From first friends in Playgroup to a confident UKG year — every class is built for curious little learners.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {school.programs.map((program, i) => (
            <motion.article
              key={program.id}
              id={program.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="scroll-mt-24 bg-card border border-border rounded-2xl p-6 shadow-soft"
            >
              <p className="text-3xl mb-2" aria-hidden>
                {program.emoji}
              </p>
              <h2 className="font-heading text-xl text-primary">{program.title}</h2>
              <p className="text-sm font-semibold text-orange-500 mt-1">{program.ages}</p>
              <p className="text-muted-foreground mt-3">{program.blurb}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {program.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/contact">Ask about a seat</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;
