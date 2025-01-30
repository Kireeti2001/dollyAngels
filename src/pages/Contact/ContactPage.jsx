import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function ContactPage() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    message: '',
  });

  const bgColor = useColorModeValue('purple.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.parentName) errors.push('Parent name is required');
    if (!formData.email) errors.push('Email is required');
    if (!formData.phone) errors.push('Phone number is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email format');
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.push('Invalid phone number (10 digits required)');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          title: 'Validation Error',
          description: error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to your backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      // Show success message
      toast({
        title: 'Enquiry Submitted!',
        description: "We'll get back to you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        parentName: '',
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        message: '',
      });

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit enquiry. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg={bgColor} minH="90vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={10}>
          <Heading 
            as="h1" 
            size="2xl" 
            color="purple.600"
            fontFamily="'Comic Sans MS', cursive"
          >
            Contact Us
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="800px">
            We'd love to hear from you! Please fill out the form below for any enquiries
            about admissions or our programs.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Contact Form */}
          <Box 
            bg={cardBg} 
            p={8} 
            borderRadius="lg" 
            boxShadow="xl"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Parent's Name</FormLabel>
                  <Input
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent's name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Child's Name</FormLabel>
                  <Input
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter child's name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Child's Age</FormLabel>
                  <Input
                    name="childAge"
                    type="number"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    placeholder="Enter child's age"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific questions or concerns?"
                    rows={4}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Submit Enquiry
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Contact Information */}
          <VStack spacing={8} align="stretch">
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <HStack spacing={4}>
                <Icon as={FaPhone} w={6} h={6} color="purple.500" />
                <VStack align="start">
                  <Text fontWeight="bold">Phone</Text>
                  <Text>+91 1234567890</Text>
                </VStack>
              </HStack>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <HStack spacing={4}>
                <Icon as={FaEnvelope} w={6} h={6} color="purple.500" />
                <VStack align="start">
                  <Text fontWeight="bold">Email</Text>
                  <Text>info@dollyangels.com</Text>
                </VStack>
              </HStack>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <HStack spacing={4}>
                <Icon as={FaMapMarkerAlt} w={6} h={6} color="purple.500" />
                <VStack align="start">
                  <Text fontWeight="bold">Address</Text>
                  <Text>123 School Street, Your City</Text>
                  <Text>State, PIN: 123456</Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ContactPage;
