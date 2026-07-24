import Image from "next/image";
import type { Lieu } from "@/types/lieu";
import styles from "./LieuCard.module.scss";

type LieuCardProps = {
  lieu: Lieu;
  eager?: boolean;
};

export default function LieuCard({ lieu, eager = false }: LieuCardProps) {
  return (
    <article className={styles.card}>
      {lieu.imageUrl ? (
        // unoptimized : l'optimiseur d'images Next se fait rate-limiter (429)
        // par Wikimedia sur les requêtes automatisées. On sert le thumbnail
        // brut renvoyé par l'API Wikipédia plutôt que de passer par /_next/image.
        <Image
          src={lieu.imageUrl}
          alt={`Photo de ${lieu.nom}`}
          width={280}
          height={200}
          className={styles.image}
          unoptimized
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true" />
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{lieu.nom}</h2>
        <p className={styles.description}>{lieu.description}</p>
      </div>
    </article>
  );
}