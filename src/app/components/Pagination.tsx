/**
 * Pagination component with URL-based navigation
 * Provides accessible pagination controls with direct page linking
 */

"use client";

import {
  HStack,
  Button,
  Text,
  Select,
  Box,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { PageInfo } from "@/types";

interface PaginationProps {
  pageInfo: PageInfo;
  basePath?: string;
}

export function Pagination({
  pageInfo,
  basePath = "/information",
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { currentPage, lastPage, hasNextPage, total, perPage } = pageInfo;

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push(-1); // Represents ellipsis
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < lastPage) {
        if (endPage < lastPage - 1) {
          pages.push(-1); // Represents ellipsis
        }
        pages.push(lastPage);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      mt={6}
    >
      <HStack justify="space-between" flexWrap="wrap" spacing={4}>
        <Text fontSize="sm" color="gray.500">
          Showing {startItem} to {endItem} of {total} results
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            size="sm"
            variant="outline"
            onClick={() => navigateToPage(currentPage - 1)}
            isDisabled={currentPage === 1}
          />

          {pageNumbers.map((pageNum, index) =>
            pageNum === -1 ? (
              <Text key={`ellipsis-${index}`} px={2} color="gray.500">
                ...
              </Text>
            ) : (
              <Button
                key={pageNum}
                size="sm"
                variant={currentPage === pageNum ? "solid" : "outline"}
                colorScheme={currentPage === pageNum ? "blue" : "gray"}
                onClick={() => navigateToPage(pageNum)}
                minW="40px"
              >
                {pageNum}
              </Button>
            )
          )}

          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            size="sm"
            variant="outline"
            onClick={() => navigateToPage(currentPage + 1)}
            isDisabled={!hasNextPage}
          />
        </HStack>

        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Go to page:
          </Text>
          <Select
            size="sm"
            width="auto"
            value={currentPage}
            onChange={(e) => navigateToPage(parseInt(e.target.value))}
          >
            {Array.from({ length: lastPage }, (_, i) => i + 1).map(
              (pageNum) => (
                <option key={pageNum} value={pageNum}>
                  {pageNum}
                </option>
              )
            )}
          </Select>
        </HStack>
      </HStack>
    </Box>
  );
}
