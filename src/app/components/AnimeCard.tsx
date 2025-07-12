/**
 * Anime card component for displaying individual anime items
 * Provides responsive design and interactive hover effects
 */

"use client";

import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { AnimeMedia } from "@/types";
import { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";

interface AnimeCardProps {
  anime: AnimeMedia;
  onClick: () => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const displayTitle =
    anime.title.english || anime.title.romaji || anime.title.native;
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : "N/A";

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <Box position="relative" height="300px">
        {!imageLoaded && <Skeleton height="100%" borderRadius="none" />}
        <Image
          src={anime.coverImage.large}
          alt={displayTitle}
          width="100%"
          height="100%"
          objectFit="cover"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        {anime.averageScore && (
          <Badge
            position="absolute"
            top={2}
            right={2}
            colorScheme="yellow"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <StarIcon boxSize={3} />
            {score}
          </Badge>
        )}
      </Box>

      <VStack p={4} align="stretch" spacing={2}>
        <Text
          fontWeight="bold"
          fontSize="md"
          lineHeight="short"
          noOfLines={2}
          minHeight="2.5em"
        >
          {displayTitle}
        </Text>

        <HStack justify="space-between" flexWrap="wrap">
          {anime.format && (
            <Badge colorScheme="blue" fontSize="xs">
              {anime.format}
            </Badge>
          )}
          {anime.status && (
            <Badge
              colorScheme={anime.status === "RELEASING" ? "green" : "gray"}
              fontSize="xs"
            >
              {anime.status}
            </Badge>
          )}
        </HStack>

        <Flex
          justify="space-between"
          align="center"
          fontSize="sm"
          color="gray.500"
        >
          {anime.seasonYear && <Text>{anime.seasonYear}</Text>}
          {anime.episodes && <Text>{anime.episodes} episodes</Text>}
        </Flex>

        {anime.genres && anime.genres.length > 0 && (
          <HStack flexWrap="wrap" spacing={1}>
            {anime.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" fontSize="xs">
                {genre}
              </Badge>
            ))}
            {anime.genres.length > 3 && (
              <Badge variant="outline" fontSize="xs">
                +{anime.genres.length - 3}
              </Badge>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
