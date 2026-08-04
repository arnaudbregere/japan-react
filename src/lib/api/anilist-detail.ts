import type { MangaDetail } from "@/types/manga";
import type { AniListFuzzyDate, AniListMediaDetailResponse } from "./anilist.types";
import { ANILIST_ENDPOINT, mapAniListMediaToManga } from "./anilist-shared";

const MANGA_DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: MANGA) {
      id
      title {
        romaji
        english
      }
      description(asHtml: false)
      coverImage {
        large
      }
      bannerImage
      averageScore
      status
      genres
      format
      chapters
      volumes
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      staff(perPage: 4) {
        edges {
          role
          node {
            name {
              full
            }
          }
        }
      }
      siteUrl
    }
  }
`;

function formatFuzzyDate(date: AniListFuzzyDate): string | null {
  if (!date.year) return null;

  const jsDate = new Date(Date.UTC(date.year, (date.month ?? 1) - 1, date.day ?? 1));

  return jsDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: date.day ? "numeric" : undefined,
  });
}

export async function fetchMangaById(id: number): Promise<MangaDetail | null> {
  let response: Response;

  try {
    response = await fetch(ANILIST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: MANGA_DETAIL_QUERY, variables: { id } }),
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("[anilist] Échec réseau lors de la requête fiche manga", error);
    throw new Error(
      "Impossible de contacter le service de mangas. Réessayez plus tard.",
    );
  }

  // AniList répond 404 quand l'id n'existe pas, plutôt que 200 avec
  // { data: { Media: null } } comme le voudrait GraphQL classiquement.
  // Ce n'est pas une panne : c'est un manga absent, cas légitime.
  if (response.status === 404) {
    return null;
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

  const json = (await response.json()) as AniListMediaDetailResponse;

  if (json.errors?.length) {
    console.error("[anilist] Erreur GraphQL", json.errors);
    throw new Error("Une erreur est survenue lors du chargement de ce manga.");
  }

  const raw = json.data.Media;

  if (!raw) {
    return null;
  }

  return {
    ...mapAniListMediaToManga(raw),
    bannerImageUrl: raw.bannerImage,
    format: raw.format,
    chapters: raw.chapters,
    volumes: raw.volumes,
    startDateLabel: formatFuzzyDate(raw.startDate),
    endDateLabel: formatFuzzyDate(raw.endDate),
    staff: raw.staff.edges.map((edge) => ({
      role: edge.role,
      name: edge.node.name.full,
    })),
    siteUrl: raw.siteUrl,
  };
}