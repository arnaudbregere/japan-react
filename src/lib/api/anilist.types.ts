export type AniListTitle = {
  romaji: string;
  english: string | null;
};

export type AniListCoverImage = {
  large: string | null;
};

export type AniListMediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export type AniListMediaRaw = {
  id: number;
  title: AniListTitle;
  description: string | null;
  coverImage: AniListCoverImage;
  averageScore: number | null;
  status: AniListMediaStatus;
  genres: string[];
};

export type AniListPageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
};

export type AniListPageResponse = {
  data: {
    Page: {
      pageInfo: AniListPageInfo;
      media: AniListMediaRaw[];
    };
  };
  errors?: Array<{ message: string; status?: number }>;
};

export type FetchMangasParams = {
  query?: string;
  page?: number;
};