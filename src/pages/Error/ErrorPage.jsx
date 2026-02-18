import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 22 },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ minHeight: "100vh" }}
    >
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b, purple.50, blue.50)"
        position="relative"
        overflow="hidden"
        px={4}
      >
        {/* Soft floating emojis */}
        <Box position="absolute" width="100%" height="100%" overflow="hidden">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                left: `${10 + (i * 7) % 80}%`,
                top: `${10 + (i * 11) % 80}%`,
                fontSize: "1.5rem",
                opacity: 0.4,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.5 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: (i % 5) * 0.3,
              }}
            >
              {["✏️", "📚", "🎨", "🎭", "🔢", "📝", "🌈"][i % 7]}
            </motion.span>
          ))}
        </Box>

        <motion.div
          variants={itemVariants}
          style={{
            zIndex: 1,
            textAlign: "center",
            padding: "2rem",
            background: "white",
            borderRadius: "2rem",
            boxShadow: "0 20px 60px -15px rgba(0,0,0,0.15)",
            maxWidth: "min(90vw, 560px)",
          }}
        >
          <motion.div variants={bounceVariants} animate="animate">
            <Text fontSize="5xl" mb={2}>
              📝
            </Text>
          </motion.div>

          <Heading
            mb={4}
            fontSize={{ base: "2xl", md: "4xl" }}
            color="purple.600"
            fontFamily="heading"
          >
            Oopsie Daisy!
          </Heading>

          <Text
            mb={8}
            fontSize="xl"
            color="gray.600"
            fontFamily="body"
          >
            Looks like we&apos;ve lost our homework! Don&apos;t worry, let&apos;s go back
            to class together! 🎒
          </Text>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Button
              onClick={() => navigate("/")}
              size="lg"
              colorScheme="purple"
              borderRadius="full"
              px={8}
              fontSize="xl"
              fontFamily="heading"
              boxShadow="lg"
              _hover={{ boxShadow: "xl" }}
            >
              Back to School! 🏫
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "8px",
            background:
              "linear-gradient(to right, #FF6B6B, #FFA94D, #FFE066, #69DB7C, #74C0FC, #B197FC, #F783AC)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Box>
    </motion.div>
  );
};

export default ErrorPage;
