/**
 * Anime detail modal component for displaying comprehensive anime information
 * Provides rich media display with responsive design
 */

"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Box,
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimeMedia } from "@/types";
import { StarIcon, CalendarIcon, TimeIcon } from "@chakra-ui/icons";

interface AnimeModalProps {
  anime: AnimeMedia | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeModal({ anime, isOpen, onClose }: AnimeModalProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  if (!anime) return null;

  const displayTitle =
    anime.title.english || anime.title.romaji || anime.title.native;
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : "N/A";

  // Clean HTML tags from description
  const cleanDescription = anime.description
    ? anime.description.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ")
    : "No description available.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={bgColor} maxH="90vh">
        <ModalHeader>
          <Text fontSize="xl" fontWeight="bold" noOfLines={2}>
            {displayTitle}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={6}>
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Image
                    src={anime.coverImage.large}
                    alt={displayTitle}
                    width="100%"
                    borderRadius="lg"
                    boxShadow="lg"
                  />
                </Box>

                <VStack spacing={3} align="stretch">
                  {anime.averageScore && (
                    <HStack>
                      <StarIcon color="yellow.400" />
                      <Text fontWeight="medium">{score}/10</Text>
                    </HStack>
                  )}

                  <HStack>
                    <CalendarIcon color="blue.400" />
                    <Text>{anime.seasonYear || "Unknown"}</Text>
                  </HStack>

                  {anime.episodes && (
                    <HStack>
                      <TimeIcon color="green.400" />
                      <Text>{anime.episodes} episodes</Text>
                    </HStack>
                  )}

                  {anime.duration && (
                    <HStack>
                      <TimeIcon color="purple.400" />
                      <Text>{anime.duration} min/episode</Text>
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Status & Format
                  </Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {anime.format && (
                      <Badge colorScheme="blue" fontSize="sm">
                        {anime.format}
                      </Badge>
                    )}
                    {anime.status && (
                      <Badge
                        colorScheme={
                          anime.status === "RELEASING" ? "green" : "gray"
                        }
                        fontSize="sm"
                      >
                        {anime.status}
                      </Badge>
                    )}
                  </HStack>
                </Box>

                <Divider />

                {anime.genres && anime.genres.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      Genres
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      {anime.genres.map((genre) => (
                        <Badge key={genre} variant="outline" colorScheme="teal">
                          {genre}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                {anime.studios?.nodes?.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      Studios
                    </Text>
                    <VStack align="start" spacing={1}>
                      {anime.studios.nodes.map((studio, index) => (
                        <Text key={index} color={textColor}>
                          {studio.name}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}

                <Divider />

                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Description
                  </Text>
                  <Text color={textColor} lineHeight="tall">
                    {cleanDescription}
                  </Text>
                </Box>

                {anime.bannerImage && (
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      Banner
                    </Text>
                    <Image
                      src={anime.bannerImage}
                      alt={`${displayTitle} banner`}
                      width="100%"
                      borderRadius="lg"
                      boxShadow="md"
                    />
                  </Box>
                )}
              </VStack>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
