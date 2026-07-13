import type { Lieu, LieuListResponse } from "@/types/lieu";
import type {
  FetchLieuxParams,
  WikipediaPage,
  WikipediaQueryResponse,
  WikipediaTitleMapping,
} from "./wikipedia.types";
import { JAPAN_PLACES_WIKIPEDIA_TITLES } from "./japan-places";

const WIKIPEDIA_ENDPOINT = "https://fr.wikipedia.org/w/api.php";
const LIEUX_PER_PAGE = 12;

// L'API MediaWiki peut renommer un titre demandé (normalisation d'accents,
// résolution de redirection) avant de le faire correspondre à une page.
// On retrace ces transformations pour retrouver la bonne page à partir du
// titre original, et ainsi reconstruire un ordre de résultats stable et
// identique à celui de JAPAN_PLACES_WIKIPEDIA_TITLES.
function resolveFinalTitle(
  originalTitle: string,
  normalized: WikipediaTitleMapping[],
  redirects: WikipediaTitleMapping[],
): string {
  let current = originalTitle;

  const normalizedMatch = normalized.find((entry) => entry.from === current);
  if (normalizedMatch) {
    current = normalizedMatch.to;
  }

  const redirectMatch = redirects.find((entry) => entry.from === current);
  if (redirectMatch) {
    current = redirectMatch.to;
  }

  return current;
}

export async function fetchLieux({ page = 1 }: FetchLieuxParams): Promise<LieuListResponse> {
  const totalTitles = JAPAN_PLACES_WIKIPEDIA_TITLES.length;
  const lastVisiblePage = Math.max(1, Math.ceil(totalTitles / LIEUX_PER_PAGE));

  const startIndex = (page - 1) * LIEUX_PER_PAGE;
  const titlesForPage = JAPAN_PLACES_WIKIPEDIA_TITLES.slice(
    startIndex,
    startIndex + LIEUX_PER_PAGE,
  );

  const pagination = {
    currentPage: page,
    hasNextPage: page < lastVisiblePage,
    lastVisiblePage,
  };

  if (titlesForPage.length === 0) {
    return { data: [], pagination };
  }

  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "extracts|pageimages|coordinates",
    exintro: "1",
    explaintext: "1",
    piprop: "thumbnail",
    pithumbsize: "800",
    redirects: "1",
    titles: titlesForPage.join("|"),
  });

  let response: Response;

  try {
    response = await fetch(`${WIKIPEDIA_ENDPOINT}?${params}`, {
      headers: {
        "User-Agent": "JapanMangaExplorer/1.0 (projet pedagogique)",
      },
      next: { revalidate: 86400 },
    });
  } catch (error) {
    console.error("[wikipedia] Échec réseau lors de la requête lieux", error);
    throw new Error(
      "Impossible de contacter Wikipédia pour charger les lieux. Réessayez plus tard.",
    );
  }

  if (!response.ok) {
    console.error(`[wikipedia] Erreur HTTP ${response.status}`);
    throw new Error("Le service de lieux est indisponible pour le moment.");
  }

  const json = (await response.json()) as WikipediaQueryResponse;

  if (json.error) {
    console.error("[wikipedia] Erreur API", json.error);
    throw new Error("Une erreur est survenue lors du chargement des lieux.");
  }

  const pages = json.query?.pages ?? [];
  const normalized = json.query?.normalized ?? [];
  const redirects = json.query?.redirects ?? [];

  const pagesByTitle = new Map(pages.map((wikiPage) => [wikiPage.title, wikiPage]));

  // Reconstruit l'ordre exact de titlesForPage, indépendamment de l'ordre
  // renvoyé par l'API.
  const orderedPages: WikipediaPage[] = [];
  for (const originalTitle of titlesForPage) {
    const finalTitle = resolveFinalTitle(originalTitle, normalized, redirects);
    const wikiPage = pagesByTitle.get(finalTitle);
    if (wikiPage) {
      orderedPages.push(wikiPage);
    } else {
      console.warn(`[wikipedia] Page introuvable, ignorée : "${originalTitle}"`);
    }
  }

  const lieux: Lieu[] = [];
  for (const wikiPage of orderedPages) {
    if (wikiPage.missing) {
      console.warn(`[wikipedia] Page marquée manquante, ignorée : "${wikiPage.title}"`);
      continue;
    }

    const coordinate = wikiPage.coordinates?.find((c) => c.primary) ?? wikiPage.coordinates?.[0];

    lieux.push({
      id: String(wikiPage.pageid),
      nom: wikiPage.title,
      description: wikiPage.extract?.trim() || "Aucune description disponible.",
      latitude: coordinate?.lat ?? 0,
      longitude: coordinate?.lon ?? 0,
      imageUrl: wikiPage.thumbnail?.source ?? null,
    });
  }

  return { data: lieux, pagination };
}