/**
 * Information page component displaying paginated anime data
 * Implements GraphQL data fetching with URL-based pagination
 */

"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AuthGuard } from "../components/AuthGard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnimeCard } from "../components/AnimeCard";
import { AnimeModal } from "../components/AnimeModel";
import { Pagination } from "../components/Pagination";
import { LoadingGrid } from "../components/LoadingGrid";
import { ErrorMessage } from "../components/ErrorMessage";
import { GET_ANIME_PAGE } from "../../lib/graphql/queries";
import { AnimeMedia, MediaPage } from "@/types";

const ITEMS_PER_PAGE = 20;

function InformationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedAnime, setSelectedAnime] = useState<AnimeMedia | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get page from URL params
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (page > 0) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  const { loading, error, data, refetch } = useQuery<{ Page: MediaPage }>(
    GET_ANIME_PAGE,
    {
      variables: {
        page: currentPage,
        perPage: ITEMS_PER_PAGE,
      },
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleAnimeClick = (anime: AnimeMedia) => {
    setSelectedAnime(anime);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedAnime(null);
    onClose();
  };

  const handleRetry = () => {
    refetch();
  };

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(`/information${newUrl}`, { scroll: false });
  }, [currentPage, router, searchParams]);

  if (error && !data) {
    return (
      <AuthGuard>
        <Flex direction="column" minH="100vh">
          <Header />
          <Box flex="1" py={8}>
            <Container maxW="7xl">
              <ErrorMessage
                title="Failed to load anime data"
                message="We couldn't fetch the anime information. Please check your connection and try again."
                onRetry={handleRetry}
              />
            </Container>
          </Box>
          <Footer />
        </Flex>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Flex direction="column" minH="100vh">
        <Header />

        <Box flex="1" py={8}>
          <Container maxW="7xl">
            <Heading mb={8} textAlign="center">
              Anime Information
            </Heading>

            {loading && !data && <LoadingGrid count={ITEMS_PER_PAGE} />}

            {data?.Page && (
              <>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  mb={6}
                  textAlign="center"
                >
                  Showing {data.Page.media.length} of {data.Page.pageInfo.total}{" "}
                  anime
                </Text>

                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                  spacing={6}
                  mb={8}
                >
                  {data.Page.media.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                      onClick={() => handleAnimeClick(anime)}
                    />
                  ))}
                </SimpleGrid>

                <Pagination
                  pageInfo={data.Page.pageInfo}
                  basePath="/information"
                />
              </>
            )}

            {error && data && (
              <ErrorMessage
                title="Some data may be outdated"
                message="We encountered an error while refreshing the data, but we're showing cached results."
                showRetry={false}
              />
            )}
          </Container>
        </Box>

        <Footer />
        {isOpen && (
          <AnimeModal anime={selectedAnime} isOpen onClose={handleModalClose} />
        )}
      </Flex>
    </AuthGuard>
  );
}

export default InformationPage;
