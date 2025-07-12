/**
 * User information modal for collecting and editing user credentials
 * Provides form validation and persistent storage integration
 */

"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { UserInfo } from "@/types";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
}

export function UserInfoModal({
  isOpen,
  onClose,
  isEditing = false,
}: UserInfoModalProps) {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState<UserInfo>({
    username: "",
    jobTitle: "",
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate form when editing
  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        username: user.username,
        jobTitle: user.jobTitle,
      });
    }
  }, [isEditing, user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    } else if (formData.jobTitle.length < 2) {
      newErrors.jobTitle = "Job title must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUser({
        username: formData.username.trim(),
        jobTitle: formData.jobTitle.trim(),
      });

      onClose();
    } catch (error) {
      console.error("Error saving user info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isEditing) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={isEditing}
      closeOnEsc={isEditing}
      size="md"
    >
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent>
        <ModalHeader>
          {isEditing
            ? "Edit Your Information"
            : "Welcome! Please provide your information"}
        </ModalHeader>
        {isEditing && <ModalCloseButton />}

        <ModalBody pb={6}>
          {!isEditing && (
            <Alert status="info" mb={4}>
              <AlertIcon />
              Please enter your information to continue.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="Enter your username"
                  autoComplete="username"
                />
                {errors.username && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.username}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.jobTitle}>
                <FormLabel>Job Title</FormLabel>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  placeholder="Enter your job title"
                  autoComplete="organization-title"
                />
                {errors.jobTitle && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.jobTitle}
                  </Text>
                )}
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={isSubmitting}
                loadingText="Saving..."
              >
                {isEditing ? "Update Information" : "Continue"}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
