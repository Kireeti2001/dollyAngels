import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const activityCards = [
  {
    emoji: "🎨",
    title: "Art Zone",
    desc: "Paint your dreams in our colorful art studio!",
    bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    color: "#5a3d7a",
  },
  {
    emoji: "🏃",
    title: "Active Play",
    desc: "Jump, run, and play in our safe playground!",
    bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    color: "#2d5a4a",
  },
  {
    emoji: "📚",
    title: "Story Time",
    desc: "Discover magical worlds through books!",
    bg: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    color: "#4a2d5a",
  },
];

const events = [
  { emoji: "🎪", text: "School Carnival - June 15th" },
  { emoji: "🎓", text: "Graduation Day - July 1st" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function HomePage() {
  return (
    <Box py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
      <Container maxW="container.xl">
        <MotionBox
          textAlign="center"
          mb={12}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <MotionBox variants={item}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            >
              <Heading
                as="h1"
                size="2xl"
                mb={4}
                bgGradient="linear(to-r, purple.600, pink.500)"
                bgClip="text"
                fontFamily="Fredoka One, cursive"
              >
                Welcome to Dolly Angels School!
              </Heading>
            </motion.div>
          </MotionBox>
          <MotionBox variants={item}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Text fontSize="xl" color="orange.500" fontWeight="bold">
                Where Learning is an Adventure! 🌈
              </Text>
            </motion.div>
          </MotionBox>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
          {activityCards.map((card, i) => (
            <MotionBox
              key={card.title}
              p={6}
              borderRadius="2xl"
              boxShadow="xl"
              bg={card.bg}
              color={card.color}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.12,
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                rotate: 2,
                boxShadow: "2xl",
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, delay: i * 0.3 }}
                style={{ display: "inline-block" }}
              >
                <Text fontSize="4xl" mb={3}>
                  {card.emoji}
                </Text>
              </motion.div>
              <Heading size="md" mb={2}>
                {card.title}
              </Heading>
              <Text fontSize="sm">{card.desc}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        <MotionBox
          bg="white"
          p={8}
          borderRadius="2xl"
          mb={12}
          boxShadow="xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
        >
          <Heading
            size="lg"
            mb={6}
            color="purple.600"
            fontFamily="Fredoka One, cursive"
          >
            Upcoming Events
          </Heading>
          <Flex gap={4} wrap="wrap" justify="center">
            {events.map((ev, i) => (
              <motion.div
                key={ev.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  bg="purple.50"
                  p={4}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="purple.200"
                  fontWeight="600"
                >
                  {ev.emoji} {ev.text}
                </Box>
              </motion.div>
            ))}
          </Flex>
        </MotionBox>

        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200"
              alt="Friendly School Mascot"
              w="180px"
              h="180px"
              mx="auto"
              borderRadius="full"
              boxShadow="xl"
              border="4px solid"
              borderColor="purple.300"
            />
          </motion.div>
          <Text mt={2} color="gray.600" fontWeight="bold">
            Our friendly mascot says Hello! 👋
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default HomePage;
