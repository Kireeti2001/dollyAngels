import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
  };

  const bounceVariants = {
    animate: { y: [0, -12, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  };

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50 dark:from-background dark:to-muted relative overflow-hidden px-4">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl opacity-40"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${10 + (i * 11) % 80}%`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, delay: (i % 5) * 0.3 }}
            >
              {["✏️", "📚", "🎨", "🎭", "🔢", "📝", "🌈"][i % 7]}
            </motion.span>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center p-8 bg-card rounded-3xl shadow-xl max-w-[min(90vw,560px)] border border-border"
        >
          <motion.div variants={bounceVariants} animate="animate" className="text-5xl mb-2">
            📝
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-4">Oopsie Daisy!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Looks like we&apos;ve lost our homework! Don&apos;t worry, let&apos;s go back to class together! 🎒
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Button onClick={() => navigate("/")} size="lg" className="rounded-full px-8 text-xl font-heading">
              Back to School! 🏫
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 to-pink-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default ErrorPage;
