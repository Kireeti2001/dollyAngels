import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const MotionBox = motion(Box);

function ContactPage() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    message: "",
  });

  const bgColor = useColorModeValue("purple.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.parentName) errors.push("Parent name is required");
    if (!formData.email) errors.push("Email is required");
    if (!formData.phone) errors.push("Phone number is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Invalid email format");
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.push("Invalid phone number (10 digits required)");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl =
        import.meta.env.VITE_CONTACT_API || "https://formspree.io/f/YOUR_FORM_ID";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Enquiry Submitted!",
        description: "We'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        parentName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Set up Formspree (formspree.io) or VITE_CONTACT_API in .env. See README.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 1234567890",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "info@dollyangels.com",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      value: "123 School Street, Your City",
      value2: "State, PIN: 123456",
    },
  ];

  return (
    <Box
      bg={bgColor}
      minH="90vh"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 0 }}
    >
      <Container maxW="container.xl">
        <MotionBox
          textAlign="center"
          mb={10}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <Heading
            as="h1"
            size="2xl"
            color="purple.600"
            fontFamily="heading"
            mb={2}
          >
            Contact Us
          </Heading>
          <Text fontSize="xl" maxW="800px" mx="auto">
            We&apos;d love to hear from you! Please fill out the form below for any
            enquiries about admissions or our programs.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <MotionBox
            bg={cardBg}
            p={{ base: 5, md: 8 }}
            borderRadius="2xl"
            boxShadow="xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Parent&apos;s Name</FormLabel>
                  <Input
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent's name"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
                    }}
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
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
                    }}
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
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Child&apos;s Name</FormLabel>
                  <Input
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter child's name"
                    borderRadius="xl"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Child&apos;s Age</FormLabel>
                  <Input
                    name="childAge"
                    type="number"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    placeholder="Enter child's age"
                    borderRadius="xl"
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
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
                    }}
                  />
                </FormControl>

                <motion.div
                  style={{ width: "100%" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    width="full"
                    isLoading={isSubmitting}
                    borderRadius="xl"
                    fontWeight="bold"
                    loadingText="Sending..."
                  >
                    Submit Enquiry
                  </Button>
                </motion.div>
              </VStack>
            </form>
          </MotionBox>

          <VStack spacing={6} align="stretch">
            {contactCards.map((card, i) => (
              <MotionBox
                key={card.title}
                bg={cardBg}
                p={6}
                borderRadius="2xl"
                boxShadow="md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "lg",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <HStack spacing={4}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon as={card.icon} w={6} h={6} color="purple.500" />
                  </motion.div>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontFamily="heading">
                      {card.title}
                    </Text>
                    <Text color="gray.600" _dark={{ color: "gray.300" }}>
                      {card.value}
                    </Text>
                    {card.value2 && (
                      <Text color="gray.600" _dark={{ color: "gray.300" }}>
                        {card.value2}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </MotionBox>
            ))}
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ContactPage;
