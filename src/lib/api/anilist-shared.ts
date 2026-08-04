import type { Manga } from "@/types/manga";
import type { AniListMediaRaw, AniListMediaStatus } from "./anilist.types";

export const ANILIST_ENDPOINT = "https://graphql.anilist.co";

export const STATUS_LABELS: Record<AniListMediaStatus, string> = {
  FINISHED: "Terminé",
  RELEASING: "En cours",
  NOT_YET_RELEASED: "À paraître",
  CANCELLED: "Annulé",
  HIATUS: "En pause",
};

export function stripHtml(text: string | null): string | null {
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

export function mapAniListMediaToManga(raw: AniListMediaRaw): Manga {
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