import React, { useState } from "react";
import { Box, Flex, Link, Button, useColorMode, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaInfoCircle, FaImages, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { path: "/home", icon: FaHome, text: "Home" },
    { path: "/about", icon: FaInfoCircle, text: "About" },
    { path: "/gallery", icon: FaImages, text: "Gallery" },
    { path: "/contact", icon: FaEnvelope, text: "Contact" },
  ];

  const navbarVariants = {
    collapsed: {
      width: "60px",
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    expanded: {
      width: "500px", // Increased width
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.2
      }
    }
  };

  return (
    <Box
      position="fixed"
      top={4}
      left={4}
      zIndex={1000}
    >
      <motion.div
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={navbarVariants}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <Flex
          as="nav"
          bg={colorMode === "light" ? "white" : "gray.800"}
          color={colorMode === "light" ? "gray.800" : "white"}
          borderRadius="full"
          boxShadow="lg"
          minH="50px"
          align="center"
          position="relative"
          overflow="hidden"
          border="2px solid"
          borderColor={colorMode === "light" ? "purple.200" : "purple.700"}
          px={4} // Added horizontal padding
          py={2} // Added vertical padding
          _before={{
            content: '""',
            position: "absolute",
            top: -2,
            right: -2,
            bottom: -2,
            left: -2,
            background: "linear-gradient(45deg, #FF0080, #7928CA)",
            borderRadius: "full",
            zIndex: -1,
            filter: "blur(8px)",
            opacity: 0.3,
          }}
        >
          {/* Hamburger Icon */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  as="button"
                  cursor="pointer"
                  onClick={() => setIsExpanded(true)}
                  p={2}
                  aria-label="Open menu"
                >
                  <FaBars size={20} />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 10px'
                }}
              >
                <Box
                  as="button"
                  onClick={() => setIsExpanded(false)}
                  p={2}
                  mr={2}
                  aria-label="Close menu"
                  _hover={{ opacity: 0.8 }}
                >
                  <FaTimes size={18} />
                </Box>
                <Flex gap={4}>
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                    <Link
                      key={item.path}
                      as={RouterLink}
                      to={item.path}
                      style={{ textDecoration: 'none' }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        p={2}
                        borderRadius="full"
                        transition="all 0.3s ease"
                        bg={location.pathname === item.path ? "purple.500" : "transparent"}
                        color={location.pathname === item.path ? "white" : "current"}
                        _hover={{
                          bg: "purple.400",
                          color: "white",
                          transform: "translateY(-2px)",
                        }}
                        minW="90px"
                      >
                        <IconComponent size={18} /> {/* Slightly reduced icon size */}
                        <motion.div
                          variants={itemVariants}
                        >
                          <Text ml={2} fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
                            {item.text}
                          </Text>
                        </motion.div>
                      </Flex>
                    </Link>
                  );
                  })}
                </Flex>

                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    onClick={toggleColorMode}
                    size="sm"
                    borderRadius="full"
                    bg={colorMode === "light" ? "purple.500" : "purple.200"}
                    color={colorMode === "light" ? "white" : "gray.800"}
                    ml={2} // Added margin
                    _hover={{
                      bg: colorMode === "light" ? "purple.600" : "purple.300",
                      transform: "translateY(-2px)",
                    }}
                  >
                    {colorMode === "light" ? <FaMoon /> : <FaSun />}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      </motion.div>
    </Box>
  );
}

export default Navbar;
