import type { Lieu } from "@/types/lieu";
import type {
  WikidataSparqlResponse,
  WikidataBinding,
  FetchLieuxParams,
} from "./wikidata.types";
import { JAPAN_PLACES_WIKIPEDIA_TITLES } from "./japan-places";

const WIKIDATA_ENDPOINT = "https://query.wikidata.org/sparql";
const LIEUX_PER_PAGE = 12;
const THUMBNAIL_WIDTH = 400;

// Requête par lookup direct : on fournit les URLs Wikipédia exactes des
// lieux qu'on veut (VALUES), Wikidata résout chaque entité correspondante
// (schema:about). Aucune recherche/pattern matching sur le graphe entier :
// c'est une simple jointure sur un petit ensemble fixe, donc quasi instantané.
function buildSparqlQuery(wikipediaTitles: string[]): string {
  const values = wikipediaTitles
    .map((title) => `<https://en.wikipedia.org/wiki/${title}>`)
    .join("\n        ");

  return `
    SELECT DISTINCT ?lieu ?lieuLabel ?description ?coord ?image WHERE {
      VALUES ?article {
        ${values}
      }
      ?article schema:about ?lieu.
      ?lieu wdt:P625 ?coord.
      OPTIONAL { ?lieu schema:description ?description. FILTER(LANG(?description) = "fr") }
      OPTIONAL { ?lieu wdt:P18 ?image. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en". }
    }
  `;
}

function extractLatLng(coordValue: string): { latitude: number; longitude: number } {
  const match = coordValue.match(/Point\(([-\d.]+) ([-\d.]+)\)/);
  if (!match) {
    return { latitude: 0, longitude: 0 };
  }
  return {
    longitude: Number(match[1]),
    latitude: Number(match[2]),
  };
}

function normalizeImageUrl(url: string): string {
  const httpsUrl = url.replace(/^http:\/\//, "https://");
  return `${httpsUrl}?width=${THUMBNAIL_WIDTH}`;
}

function mapBindingToLieu(binding: WikidataBinding): Lieu {
  const { latitude, longitude } = extractLatLng(binding.coord.value);

  return {
    id: binding.lieu.value,
    nom: binding.lieuLabel.value,
    description: binding.description?.value ?? "Aucune description disponible.",
    latitude,
    longitude,
    imageUrl: binding.image ? normalizeImageUrl(binding.image.value) : null,
  };
}

export async function fetchLieux({
  page = 1,
}: FetchLieuxParams): Promise<Lieu[]> {
  const startIndex = (page - 1) * LIEUX_PER_PAGE;
  const titlesForPage = JAPAN_PLACES_WIKIPEDIA_TITLES.slice(
    startIndex,
    startIndex + LIEUX_PER_PAGE,
  );

  if (titlesForPage.length === 0) {
    return [];
  }

  const sparqlQuery = buildSparqlQuery(titlesForPage);
  const url = `${WIKIDATA_ENDPOINT}?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/sparql-results+json",
      "User-Agent": "JapanMangaExplorer/1.0 (projet pedagogique)",
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Erreur Wikidata : ${response.status}`);
  }

  const raw = (await response.json()) as WikidataSparqlResponse;
  const lieux = raw.results.bindings.map(mapBindingToLieu);

  const uniqueLieuxMap = new Map(lieux.map((lieu) => [lieu.id, lieu]));
  return Array.from(uniqueLieuxMap.values());
}