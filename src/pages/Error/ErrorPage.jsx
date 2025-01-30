import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
  };

  const pencilVariants = {
    initial: { rotate: -45, x: -100 },
    animate: {
      rotate: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const bookVariants = {
    initial: { y: -50, rotate: -10 },
    animate: {
      y: [0, -20, 0],
      rotate: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="blue.50"
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background Elements */}
        <Box position="absolute" width="100%" height="100%">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: "24px"
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {["✏️", "📚", "🎨", "🎭", "🔢", "📝", "🌈"][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </Box>

        {/* Main Content */}
        <Box
          zIndex={1}
          textAlign="center"
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="xl"
          maxW="600px"
          m={4}
        >
          <motion.div
            variants={pencilVariants}
            initial="initial"
            animate="animate"
          >
            <Text fontSize="6xl">📝</Text>
          </motion.div>

          <motion.div
            variants={bookVariants}
            initial="initial"
            animate="animate"
          >
            <Heading
              mb={4}
              fontSize="4xl"
              color="purple.500"
              fontFamily="Comic Sans MS, cursive"
            >
              Oopsie Daisy!
            </Heading>
          </motion.div>

          <Text
            mb={6}
            fontSize="xl"
            color="gray.600"
            fontFamily="Comic Sans MS, cursive"
          >
            Looks like we've lost our homework! 
            Don't worry, let's go back to class together! 🎒
          </Text>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => navigate("/")}
              size="lg"
              colorScheme="purple"
              borderRadius="full"
              px={8}
              fontSize="xl"
              fontFamily="Comic Sans MS, cursive"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
            >
              Back to School! 🏫
            </Button>
          </motion.div>
        </Box>

        {/* Animated Rainbow */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "10px",
            background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </Box>
    </motion.div>
  );
};

export default ErrorPage;
