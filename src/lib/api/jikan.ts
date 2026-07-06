import type { Manga, MangaListResponse } from "@/types/manga";
import type {
  JikanMangaRaw,
  JikanMangaListRaw,
  FetchMangasParams,
} from "./jikan.types";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

function mapJikanMangaToManga(raw: JikanMangaRaw): Manga {
  return {
    id: raw.mal_id,
    title: raw.title,
    synopsis: raw.synopsis,
    imageUrl: raw.images.jpg.image_url,
    score: raw.score,
    status: raw.status,
    genres: raw.genres.map((genre) => genre.name),
  };
}

export async function fetchMangas({
  query,
  page = 1,
}: FetchMangasParams): Promise<MangaListResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: "12",
  });

  if (query) {
    searchParams.set("q", query);
  }

  const response = await fetch(`${JIKAN_BASE_URL}/manga?${searchParams}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Erreur Jikan API : ${response.status}`);
  }

  const raw = (await response.json()) as JikanMangaListRaw;

  return {
    data: raw.data.map(mapJikanMangaToManga),
    pagination: {
      currentPage: raw.pagination.current_page,
      hasNextPage: raw.pagination.has_next_page,
      lastVisiblePage: raw.pagination.last_visible_page,
    },
  };
}