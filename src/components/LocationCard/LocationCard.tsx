import Image from "next/image";
import type { Location } from "@/types/location";
import styles from "./LocationCard.module.scss";

type LocationCardProps = {
  location: Location;
  eager?: boolean;
};

export default function LocationCard({ location, eager = false }: LocationCardProps) {
  return (
    <article className={styles.card}>
      {location.imageUrl ? (
        // unoptimized : l'optimiseur d'images Next se fait rate-limiter (429)
        // par Wikimedia sur les requêtes automatisées. On sert le thumbnail
        // brut renvoyé par l'API Wikipédia plutôt que de passer par /_next/image.
        <Image
          src={location.imageUrl}
          alt={`Photo de ${location.name}`}
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
        <h2 className={styles.title}>{location.name}</h2>
        <p className={styles.description}>{location.description}</p>
      </div>
    </article>
  );
}