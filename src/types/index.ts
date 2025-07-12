/**
 * Type definitions for the Leonardo.Ai Web Challenge
 */

export interface UserInfo {
  username: string;
  jobTitle: string;
}

export interface AnimeMedia {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description: string;
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage: string;
  genres: string[];
  format: string;
  status: string;
  episodes: number;
  duration: number;
  seasonYear: number;
  averageScore: number;
  popularity: number;
  studios: {
    nodes: Array<{
      name: string;
    }>;
  };
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface MediaPage {
  pageInfo: PageInfo;
  media: AnimeMedia[];
}
