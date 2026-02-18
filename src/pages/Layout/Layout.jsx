import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesBackground from "../../components/ParicleBackground";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function Layout() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const pageTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 25 };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main
          className="flex-1 pt-[56px] md:pt-[64px] overflow-y-auto overflow-x-hidden min-h-full scrollbar-thin"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(155,155,155,0.5) transparent",
          }}
        >
          <style>{`
            main::-webkit-scrollbar { width: 8px; }
            main::-webkit-scrollbar-track { background: transparent; }
            main::-webkit-scrollbar-thumb { background: rgba(155,155,155,0.5); border-radius: 24px; }
            main::-webkit-scrollbar-thumb:hover { background: rgba(155,155,155,0.7); }
          `}</style>
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
      </div>
    </div>
  );
}

export default Layout;
