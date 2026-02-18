import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGraduationCap, FaHeart, FaStar, FaBook } from 'react-icons/fa';

function AboutPage() {
  const bgColor = useColorModeValue('purple.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const values = [
    {
      icon: FaHeart,
      title: "Nurturing Environment",
      description: "We create a loving and supportive atmosphere where every child feels safe to explore and learn."
    },
    {
      icon: FaStar,
      title: "Excellence in Education",
      description: "Our curriculum is designed to bring out the best in each child through creative and engaging methods."
    },
    {
      icon: FaBook,
      title: "Holistic Development",
      description: "We focus on academic, social, emotional, and physical development of every student."
    },
    {
      icon: FaGraduationCap,
      title: "Future Ready",
      description: "Preparing children with skills and values they need for a bright future."
    }
  ];

  return (
    <Box bg={bgColor} minH="90vh" py={10}>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <VStack spacing={6} mb={16} textAlign="center">
          <Heading 
            as="h1" 
            size="2xl" 
            color="purple.600"
            fontFamily="'Comic Sans MS', cursive"
          >
            About Dolly Angels School
          </Heading>
          <Text fontSize="xl" color={textColor} maxW="800px">
            Where every child's potential takes flight! Since 2010, we've been nurturing young minds
            and helping them grow into confident, creative, and compassionate individuals.
          </Text>
        </VStack>

        {/* Our Values Section */}
        <Box mb={20}>
          <Heading 
            as="h2" 
            size="xl" 
            mb={10} 
            textAlign="center"
            color="teal.600"
          >
            Our Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {values.map((value, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <VStack spacing={4}>
                  <Icon as={value.icon} w={10} h={10} color="purple.500" />
                  <Heading size="md" color="teal.500">
                    {value.title}
                  </Heading>
                  <Text color={textColor} textAlign="center">
                    {value.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Our Story Section */}
        <Box mb={20}>
          <Heading 
            as="h2" 
            size="xl" 
            mb={10} 
            textAlign="center"
            color="teal.600"
          >
            Our Story
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <Box>
              <Text fontSize="lg" color={textColor} mb={4}>
                Dolly Angels School began with a simple dream: to create a place where children could
                learn, play, and grow in an environment that celebrates their uniqueness and nurtures
                their natural curiosity.
              </Text>
              <Text fontSize="lg" color={textColor} mb={4}>
                Over the years, we've grown from a small classroom of 15 students to a vibrant
                community of learners, teachers, and families all working together to provide the
                best possible education for our children.
              </Text>
              <Text fontSize="lg" color={textColor}>
                Today, we continue to build on our foundation of excellence, incorporating innovative
                teaching methods while maintaining the warm, nurturing environment that has always
                been our hallmark.
              </Text>
            </Box>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
                alt="Dolly Angels School Building"
                borderRadius="lg"
                boxShadow="2xl"
                fallbackSrc="https://via.placeholder.com/500x300"
              />
            </Box>
          </SimpleGrid>
        </Box>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} mb={20}>
          {[
            { number: "500+", label: "Happy Students" },
            { number: "50+", label: "Expert Teachers" },
            { number: "12", label: "Years of Excellence" },
            { number: "25+", label: "Special Programs" }
          ].map((stat, index) => (
            <VStack key={index} p={4} bg={cardBg} borderRadius="lg" boxShadow="md">
              <Heading size="xl" color="purple.500">
                {stat.number}
              </Heading>
              <Text color={textColor} fontWeight="bold">
                {stat.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default AboutPage;
