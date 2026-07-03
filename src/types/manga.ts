export type Manga = {
  id: number;
  title: string;
  synopsis: string | null;
  imageUrl: string | null;
  score: number | null;
  status: string;
  genres: string[];
};

export type MangaListResponse = {
  data: Manga[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    lastVisiblePage: number;
  };
};