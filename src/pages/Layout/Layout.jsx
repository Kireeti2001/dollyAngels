import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesBackground from "../../components/ParicleBackground";
function Layout() {
  return (
    <Box h="100vh" position="relative" overflow="hidden">
      <Box position="relative" zIndex={1} h="100%">
        <Navbar />
        <Box as="main" flex="1">
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
          >
            <ParticlesBackground />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
