import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaHeart, FaStar, FaBook } from "react-icons/fa";

const MotionBox = motion(Box);

const values = [
  {
    icon: FaHeart,
    title: "Nurturing Environment",
    description:
      "We create a loving and supportive atmosphere where every child feels safe to explore and learn.",
  },
  {
    icon: FaStar,
    title: "Excellence in Education",
    description:
      "Our curriculum is designed to bring out the best in each child through creative and engaging methods.",
  },
  {
    icon: FaBook,
    title: "Holistic Development",
    description:
      "We focus on academic, social, emotional, and physical development of every student.",
  },
  {
    icon: FaGraduationCap,
    title: "Future Ready",
    description:
      "Preparing children with skills and values they need for a bright future.",
  },
];

const stats = [
  { number: "500+", label: "Happy Students" },
  { number: "50+", label: "Expert Teachers" },
  { number: "12", label: "Years of Excellence" },
  { number: "25+", label: "Special Programs" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function AboutPage() {
  const bgColor = useColorModeValue("purple.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Box
      bg={bgColor}
      minH="90vh"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 0 }}
    >
      <Container maxW="container.xl">
        <MotionBox
          variants={container}
          initial="hidden"
          animate="show"
          mb={16}
          textAlign="center"
        >
          <MotionBox variants={item}>
            <Heading as="h1" size="2xl" color="purple.600" fontFamily="heading" mb={4}>
              About Dolly Angels School
            </Heading>
          </MotionBox>
          <MotionBox variants={item}>
            <Text fontSize="xl" color={textColor} maxW="800px" mx="auto">
              Where every child&apos;s potential takes flight! Since 2010, we&apos;ve been
              nurturing young minds and helping them grow into confident, creative, and
              compassionate individuals.
            </Text>
          </MotionBox>
        </MotionBox>

        <MotionBox mb={20} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <Heading
            as="h2"
            size="xl"
            mb={10}
            textAlign="center"
            color="teal.600"
            fontFamily="heading"
          >
            Our Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {values.map((value, index) => (
              <MotionBox
                key={index}
                bg={cardBg}
                p={6}
                borderRadius="2xl"
                boxShadow="lg"
                variants={item}
                whileHover={{
                  y: -6,
                  boxShadow: "xl",
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <VStack spacing={4}>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon as={value.icon} w={10} h={10} color="purple.500" />
                  </motion.div>
                  <Heading size="md" color="teal.500" fontFamily="heading">
                    {value.title}
                  </Heading>
                  <Text color={textColor} textAlign="center" fontSize="sm">
                    {value.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>

        <MotionBox
          mb={20}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Heading
            as="h2"
            size="xl"
            mb={10}
            textAlign="center"
            color="teal.600"
            fontFamily="heading"
          >
            Our Story
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <MotionBox variants={item}>
              <Text fontSize="lg" color={textColor} mb={4}>
                Dolly Angels School began with a simple dream: to create a place where
                children could learn, play, and grow in an environment that celebrates
                their uniqueness and nurtures their natural curiosity.
              </Text>
              <Text fontSize="lg" color={textColor} mb={4}>
                Over the years, we&apos;ve grown from a small classroom of 15 students to a
                vibrant community of learners, teachers, and families all working together
                to provide the best possible education for our children.
              </Text>
              <Text fontSize="lg" color={textColor}>
                Today, we continue to build on our foundation of excellence, incorporating
                innovative teaching methods while maintaining the warm, nurturing
                environment that has always been our hallmark.
              </Text>
            </MotionBox>
            <MotionBox variants={item}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
                  alt="Dolly Angels School Building"
                  borderRadius="2xl"
                  boxShadow="2xl"
                  fallbackSrc="https://via.placeholder.com/500x300"
                />
              </motion.div>
            </MotionBox>
          </SimpleGrid>
        </MotionBox>

        <MotionBox
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={10}>
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                variants={item}
                p={6}
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="md"
                textAlign="center"
                whileHover={{
                  y: -4,
                  boxShadow: "lg",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Heading size="xl" color="purple.500" fontFamily="heading">
                  {stat.number}
                </Heading>
                <Text color={textColor} fontWeight="bold" fontSize="sm">
                  {stat.label}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}
