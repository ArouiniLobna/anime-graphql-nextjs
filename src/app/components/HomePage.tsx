"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useUser } from "../../contexts/UserContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, gray.800, gray.900)"
  );

  useEffect(() => {
    // Auto-redirect to information page if user is authenticated
    if (user) {
      const timer = setTimeout(() => {
        router.push("/information");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Box flex="1" bgGradient={bgGradient}>
        <Container maxW="4xl" py={20}>
          <VStack spacing={8} textAlign="center">
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Welcome to Leonardo.Ai Challenge
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              _dark={{ color: "gray.300" }}
              maxW="2xl"
            >
              Discover and explore anime data through our GraphQL-powered
              application. Built with Next.js, TypeScript, and Chakra UI for an
              exceptional user experience.
            </Text>

            {user && (
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="medium">
                  Welcome back, {user.username}!
                </Text>
                <Text color="gray.500">
                  Redirecting you to the information page...
                </Text>
                <Button
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => router.push("/information")}
                >
                  Go to Information Page
                </Button>
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Flex>
  );
};

export default HomePage;
