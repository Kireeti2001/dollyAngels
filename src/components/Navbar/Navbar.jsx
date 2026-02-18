import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaInfoCircle, FaImages, FaEnvelope, FaMoon, FaSun, FaBars } from "react-icons/fa";

const menuItems = [
  { path: "/home", icon: FaHome, text: "Home" },
  { path: "/about", icon: FaInfoCircle, text: "About" },
  { path: "/gallery", icon: FaImages, text: "Gallery" },
  { path: "/contact", icon: FaEnvelope, text: "Contact" },
];

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navBg = colorMode === "light" ? "white" : "gray.800";
  const navColor = colorMode === "light" ? "gray.800" : "white";
  const borderColor = colorMode === "light" ? "purple.200" : "purple.700";

  const NavLink = ({ item }) => {
    const IconComponent = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <Link
        as={RouterLink}
        to={item.path}
        display="flex"
        alignItems="center"
        gap={2}
        px={4}
        py={3}
        borderRadius="xl"
        bg={isActive ? "purple.500" : "transparent"}
        color={isActive ? "white" : navColor}
        _hover={{ bg: isActive ? "purple.600" : "purple.50", color: isActive ? "white" : "purple.700" }}
        fontWeight="semibold"
        textDecoration="none"
        minH="44px"
        onClick={isMobile ? onClose : undefined}
        position="relative"
        sx={{ _dark: { _hover: { bg: isActive ? "purple.600" : "whiteAlpha.100" } } }}
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon as={IconComponent} boxSize={5} />
        </motion.span>
        <span>{item.text}</span>
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            style={{
              position: "absolute",
              bottom: 4,
              left: 8,
              right: 8,
              height: 3,
              borderRadius: "full",
              background: "white",
              opacity: 0.9,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={navBg}
        borderBottomWidth="1px"
        borderColor={borderColor}
        boxShadow="soft"
      >
        <Flex
          maxW="container.xl"
          mx="auto"
          px={{ base: 4, md: 6 }}
          py={3}
          align="center"
          justify="space-between"
          minH={{ base: "56px", md: "64px" }}
        >
          <Link
            as={RouterLink}
            to="/home"
            display="flex"
            alignItems="center"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                fontFamily="Fredoka One, cursive"
                bgGradient="linear(to-r, purple.500, pink.500)"
                bgClip="text"
              >
                Dolly Angels
              </Text>
            </motion.div>
          </Link>

          {isMobile ? (
            <Flex align="center" gap={2}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  aria-label="Toggle theme"
                  size="sm"
                  variant="ghost"
                  onClick={toggleColorMode}
                  minW="44px"
                  minH="44px"
                >
                  {colorMode === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  onClick={onOpen}
                  minW="44px"
                  minH="44px"
                  fontSize="xl"
                >
                  <FaBars />
                </Button>
              </motion.div>
            </Flex>
          ) : (
            <Flex align="center" gap={1}>
              {menuItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  aria-label="Toggle theme"
                  size="sm"
                  borderRadius="full"
                  bg={colorMode === "light" ? "purple.500" : "purple.200"}
                  color={colorMode === "light" ? "white" : "gray.800"}
                  _hover={{ bg: colorMode === "light" ? "purple.600" : "purple.300" }}
                  onClick={toggleColorMode}
                  ml={2}
                  minW="44px"
                  minH="44px"
                >
                  {colorMode === "light" ? <FaMoon /> : <FaSun />}
                </Button>
              </motion.div>
            </Flex>
          )}
        </Flex>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={navBg}>
          <DrawerCloseButton size="lg" top={4} right={4} borderRadius="full" />
          <DrawerHeader pt={10} fontFamily="Fredoka One, cursive" color="purple.600">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={1} pt={4}>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                >
                  <NavLink item={item} />
                </motion.div>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
