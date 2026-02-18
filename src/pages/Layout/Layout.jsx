import { Box } from "@chakra-ui/react";
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
    <Box position="relative" minH="100vh" overflow="hidden">
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <ParticlesBackground />
      </Box>

      <Box position="relative" zIndex={1} minH="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box
          as="main"
          flex="1"
          pt={{ base: "56px", md: "64px" }}
          overflowY="auto"
          overflowX="hidden"
          css={{
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(155, 155, 155, 0.5)",
              borderRadius: "24px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(155, 155, 155, 0.7)",
            },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{ minHeight: "100%" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
