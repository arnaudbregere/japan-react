import Image from "next/image";
import type { Manga } from "@/types/manga";
import styles from "./MangaCard.module.scss";

type MangaCardProps = {
  manga: Manga;
  eager?: boolean;
};

export default function MangaCard({ manga, eager = false }: MangaCardProps) {
  return (
    <article className={styles.card}>
      {manga.imageUrl ? (
        <Image
          src={manga.imageUrl}
          alt={`Couverture de ${manga.title}`}
          width={200}
          height={280}
          className={styles.image}
          loading={eager ? "eager" : "lazy"}
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
  );
}