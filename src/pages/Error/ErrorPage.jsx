import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Floaty, easing } from "../../components/ui/motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16">
      <motion.div
        className="editorial-card text-center max-w-[min(92vw,560px)] p-8 md:p-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <Floaty>
          <span className="text-6xl" aria-hidden>📝</span>
        </Floaty>
        <p className="eyebrow mt-6">✦ Lost & found</p>
        <h1 className="headline text-4xl md:text-5xl mt-5">Oopsie daisy!</h1>
        <p className="body-large mt-4">
          Looks like we’ve lost our homework. Let’s go back to class together.
        </p>
        <Button onClick={() => navigate("/home")} size="lg" className="mt-8">
          Back to school
        </Button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
