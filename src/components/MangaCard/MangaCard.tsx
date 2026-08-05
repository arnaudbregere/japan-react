import Image from "next/image";
import Link from "next/link";
import type { Manga } from "@/types/manga";
import { buildMangaSlug } from "@/utils/mangaSlug";
import styles from "./MangaCard.module.scss";

type MangaCardProps = {
  manga: Manga;
  eager?: boolean;
};

export default function MangaCard({ manga, eager = false }: MangaCardProps) {
  return (
    <Link
      href={`/mangas/${buildMangaSlug(manga.id, manga.title)}`}
      className={styles.link}
      aria-label={`Voir la fiche de ${manga.title}`}
    >
      <article className={styles.card}>
        {manga.imageUrl ? (
          <Image
            src={manga.imageUrl}
            alt={`Couverture de ${manga.title}`}
            width={200}
            height={280}
            className={styles.image}
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>{manga.title}</h2>
          {manga.score !== null && (
            <p className={styles.score}>★ {manga.score.toFixed(1)}</p>
          )}
          {manga.genres.length > 0 && (
            <p className={styles.genres}>{manga.genres.join(", ")}</p>
          )}
        </div>
      </article>
    </Link>
  );
}