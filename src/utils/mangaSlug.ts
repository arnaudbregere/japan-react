import { slugify } from "./slugify";

export function buildMangaSlug(id: number, title: string): string {
  const titleSlug = slugify(title);
  return titleSlug ? `${id}-${titleSlug}` : `${id}`;
}

export function parseMangaIdFromSlug(slug: string): number | null {
  const idPart = slug.split("-")[0];
  const id = Number(idPart);
  return Number.isInteger(id) && id > 0 ? id : null;
}