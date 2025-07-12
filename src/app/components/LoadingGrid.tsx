/**
 * Loading skeleton component for anime grid
 * Provides consistent loading states with proper accessibility
 */

"use client";

import { SimpleGrid, Box, Skeleton, SkeletonText } from "@chakra-ui/react";

interface LoadingGridProps {
  count?: number;
}

export function LoadingGrid({ count = 12 }: LoadingGridProps) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={6}
      role="status"
      aria-label="Loading anime data"
    >
      {Array.from({ length: count }, (_, index) => (
        <Box
          key={index}
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          overflow="hidden"
        >
          <Skeleton height="300px" />
          <Box p={4}>
            <SkeletonText noOfLines={2} spacing="2" mb={3} />
            <Skeleton height="20px" width="60%" mb={2} />
            <Skeleton height="16px" width="80%" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
