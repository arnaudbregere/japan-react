// Types "DTO" — forme brute exacte de la réponse de l'API Jikan.

export type JikanMangaRaw = {
  mal_id: number;
  title: string;
  synopsis: string | null;
  images: {
    jpg: {
      image_url: string | null;
    };
  };
  score: number | null;
  status: string;
  genres: { name: string }[];
};

export type JikanMangaListRaw = {
  data: JikanMangaRaw[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    last_visible_page: number;
  };
};

export type FetchMangasParams = {
  query?: string;
  page?: number;
};