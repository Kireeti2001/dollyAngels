import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50 dark:from-background dark:to-muted relative overflow-hidden px-4">
      <div className="relative z-10 text-center p-8 bg-card rounded-3xl shadow-xl max-w-[min(90vw,560px)] border border-border">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-2"
          aria-hidden
        >
          📝
        </motion.div>
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-4">Oopsie Daisy!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Looks like we&apos;ve lost our homework! Let&apos;s go back to class together.
        </p>
        <Button onClick={() => navigate("/home")} size="lg" className="rounded-full px-8 text-xl font-heading">
          Back to school
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
