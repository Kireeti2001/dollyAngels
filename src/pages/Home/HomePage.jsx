
import React from 'react';
import { Box, Heading, Text, Button, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';

function HomePage() {
  const textAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 500,
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 1000,
  });

  return (
      <Box py={20} px={4}>
        <animated.div style={textAnimation}>
          <Heading as="h1" size="2xl" mb={4} color="purple.600" textShadow="2px 2px #ff0000">
            Welcome to Dolly Angels School!
          </Heading>
          <Text fontSize="xl" mb={8} color="orange.500" fontWeight="bold">
            Where Learning is an Adventure! 🌈
          </Text>
        </animated.div>
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mb={20}>
          <Box bg="yellow.100" p={6} borderRadius="xl" boxShadow="xl">
            <Heading color="red.500" mb={4}>🎨 Art Zone</Heading>
            <Text color="green.700">Paint your dreams in our colorful art studio!</Text>
          </Box>
          <Box bg="green.100" p={6} borderRadius="xl" boxShadow="xl">
            <Heading color="blue.600" mb={4}>🏃 Active Play</Heading>
            <Text color="purple.800">Jump, run, and play in our safe playground!</Text>
          </Box>
          <Box bg="pink.100" p={6} borderRadius="xl" boxShadow="xl">
            <Heading color="teal.600" mb={4}>📚 Story Time</Heading>
            <Text color="orange.800">Discover magical worlds through books!</Text>
          </Box>
        </SimpleGrid>

        <Box bg="red.100" p={8} borderRadius="2xl" mb={10}>
          <Heading color="blue.800" mb={4} fontSize="3xl">Upcoming Events</Heading>
          <Flex justify="space-around" wrap="wrap">
            <Box bg="white" p={4} m={2} borderRadius="lg">
              🎪 School Carnival - June 15th
            </Box>
            <Box bg="white" p={4} m={2} borderRadius="lg">
              🎓 Graduation Day - July 1st
            </Box>
          </Flex>
        </Box>

        <Image src="/images/school-mascot.png" alt="Friendly Mascot" w="200px" mx="auto" 
               className="bounce" />
      </Box>
  );
}

export default HomePage;