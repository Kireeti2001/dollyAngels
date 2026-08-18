import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ParticlesBackground from "../../components/ParticlesBackground";
import { easing } from "../../components/ui/motion";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function Layout() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const pageTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: easing };
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, prefersReducedMotion]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[1100] focus:left-4 focus:top-4 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-1 z-[1001] origin-left bg-primary"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1 pt-[64px] md:pt-[72px] overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
