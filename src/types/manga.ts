export type Manga = {
  id: number;
  title: string;
  synopsis: string | null;
  imageUrl: string | null;
  score: number | null;
  status: string;
  genres: string[];
};

export type MangaStaffMember = {
  role: string;
  name: string;
};

export type MangaDetail = Manga & {
  bannerImageUrl: string | null;
  format: string | null;
  chapters: number | null;
  volumes: number | null;
  startDateLabel: string | null;
  endDateLabel: string | null;
  staff: MangaStaffMember[];
  siteUrl: string;
};

export type MangaListResponse = {
  data: Manga[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    lastVisiblePage: number;
  };
};