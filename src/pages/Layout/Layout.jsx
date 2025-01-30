import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesBackground from "../../components/ParicleBackground";
function Layout() {
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
    {/* Particles Background - Fixed for all pages */}
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

    {/* Content Container */}
    <Box 
      position="relative" 
      zIndex={1} 
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Navbar />
      <Box 
        as="main" 
        flex="1"
        overflowY="auto"
        overflowX="hidden"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(155, 155, 155, 0.5)',
            borderRadius: '24px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(155, 155, 155, 0.7)',
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  </Box>
  );
}

export default Layout;
