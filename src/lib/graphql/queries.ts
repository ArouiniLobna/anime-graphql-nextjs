import { gql } from "@apollo/client";

export const GET_ANIME_PAGE = gql`
  query GetAnimePage($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          medium
        }
        bannerImage
        genres
        format
        status
        episodes
        duration
        seasonYear
        averageScore
        popularity
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`;
