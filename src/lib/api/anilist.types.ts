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

export type AniListFuzzyDate = {
  year: number | null;
  month: number | null;
  day: number | null;
};

export type AniListStaffEdge = {
  role: string;
  node: {
    name: {
      full: string;
    };
  };
};

export type AniListMediaDetailRaw = AniListMediaRaw & {
  bannerImage: string | null;
  format: string | null;
  chapters: number | null;
  volumes: number | null;
  startDate: AniListFuzzyDate;
  endDate: AniListFuzzyDate;
  staff: {
    edges: AniListStaffEdge[];
  };
  siteUrl: string;
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

export type AniListMediaDetailResponse = {
  data: {
    Media: AniListMediaDetailRaw | null;
  };
  errors?: Array<{ message: string; status?: number }>;
};

export type FetchMangasParams = {
  query?: string;
  page?: number;
};