import type { Manga, MangaListResponse } from "@/types/manga";
import type {
  AniListMediaRaw,
  AniListMediaStatus,
  AniListPageResponse,
  FetchMangasParams,
} from "./anilist.types";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const MANGAS_PER_PAGE = 12;

const STATUS_LABELS: Record<AniListMediaStatus, string> = {
  FINISHED: "Terminé",
  RELEASING: "En cours",
  NOT_YET_RELEASED: "À paraître",
  CANCELLED: "Annulé",
  HIATUS: "En pause",
};

const MANGA_QUERY = `
  query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
      }
      media(type: MANGA, search: $search, sort: $sort) {
        id
        title {
          romaji
          english
        }
        description(asHtml: false)
        coverImage {
          large
        }
        averageScore
        status
        genres
      }
    }
  }
`;

function stripHtml(text: string | null): string | null {
  if (!text) return null;

  const withoutTags = text.replace(/<[^>]*>/g, " ");
  const decoded = withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  const normalized = decoded.replace(/\s+/g, " ").trim();
  return normalized || null;
}

function mapAniListMediaToManga(raw: AniListMediaRaw): Manga {
  return {
    id: raw.id,
    title: raw.title.english ?? raw.title.romaji,
    synopsis: stripHtml(raw.description),
    imageUrl: raw.coverImage.large,
    score: raw.averageScore !== null ? raw.averageScore / 10 : null,
    status: STATUS_LABELS[raw.status] ?? raw.status,
    genres: raw.genres,
  };
}

export async function fetchMangas({
  query,
  page = 1,
}: FetchMangasParams): Promise<MangaListResponse> {
  const variables = {
    page,
    perPage: MANGAS_PER_PAGE,
    search: query || undefined,
    sort: query ? ["SEARCH_MATCH"] : ["POPULARITY_DESC"],
  };

  let response: Response;

  try {
    response = await fetch(ANILIST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: MANGA_QUERY, variables }),
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("[anilist] Échec réseau lors de la requête mangas", error);
    throw new Error(
      "Impossible de contacter le service de mangas. Réessayez plus tard.",
    );
  }

  if (response.status === 429) {
    console.error("[anilist] Rate limit atteint (429)");
    throw new Error(
      "Le service de mangas est momentanément surchargé. Réessayez dans quelques instants.",
    );
  }

  if (!response.ok) {
    console.error(`[anilist] Erreur HTTP ${response.status}`);
    throw new Error("Le service de mangas est indisponible pour le moment.");
  }

  const json = (await response.json()) as AniListPageResponse;

  if (json.errors?.length) {
    console.error("[anilist] Erreur GraphQL", json.errors);
    throw new Error("Une erreur est survenue lors de la recherche de mangas.");
  }

  const { pageInfo, media } = json.data.Page;

  return {
    data: media.map(mapAniListMediaToManga),
    pagination: {
      currentPage: pageInfo.currentPage,
      hasNextPage: pageInfo.hasNextPage,
      lastVisiblePage: pageInfo.lastPage,
    },
  };
}