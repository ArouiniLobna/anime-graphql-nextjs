/**
 * Footer component displaying challenge version information
 * Provides consistent footer across all pages as required
 */

"use client";

import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";

export function Footer() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={bgColor} py={4} mt="auto">
      <Container maxW="7xl" centerContent>
        <Text fontSize="sm" color={textColor}>
          Challenge Version: v3.5
        </Text>
      </Container>
    </Box>
  );
}
