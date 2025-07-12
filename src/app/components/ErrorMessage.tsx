/**
 * Error message component for handling API and loading errors
 * Provides user-friendly error display with retry functionality
 */

"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  showRetry = true,
}: ErrorMessageProps) {
  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{message}</AlertDescription>

        {showRetry && onRetry && (
          <VStack mt={4} spacing={2}>
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={onRetry}
              leftIcon={<WarningIcon />}
            >
              Try Again
            </Button>
          </VStack>
        )}
      </Alert>
    </Box>
  );
}
