import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MangaCard from "@/components/MangaCard/MangaCard";
import LocationCard from "@/components/LocationCard/LocationCard";
import HeroIllustration from "@/components/HeroIllustration/HeroIllustration";
import { fetchMangas } from "@/lib/api/anilist";
import { fetchLocations } from "@/lib/api/wikipedia";
import type { Manga } from "@/types/manga";
import type { Location } from "@/types/location";
import styles from "./HomePage.module.scss";

export const metadata: Metadata = {
  title: "Accueil",
};

export default async function HomePage() {
  const [mangasResult, locationsResult] = await Promise.allSettled([
    fetchMangas({ page: 1 }),
    fetchLocations({ page: 1 }),
  ]);

  let featuredMangas: Manga[] = [];
  if (mangasResult.status === "fulfilled") {
    featuredMangas = mangasResult.value.data.slice(0, 4);
  } else {
    console.error("[home] Échec du chargement des mangas", mangasResult.reason);
  }

  let featuredLocations: Location[] = [];
  if (locationsResult.status === "fulfilled") {
    featuredLocations = locationsResult.value.data.slice(0, 4);
  } else {
    console.error("[home] Échec du chargement des lieux", locationsResult.reason);
  }

  return (
    <>
      <Header />

      <main id="main-content" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Explorez mangas et lieux incontournables du Japon
            </h1>
            <p className={styles.intro}>
              Un moteur de recherche pour découvrir des mangas et préparer
              votre voyage au Japon.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/mangas" className={styles.ctaPrimary}>
                Explorer les mangas
              </Link>
              <Link href="/locations" className={styles.ctaSecondary}>
                Découvrir le Japon
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </section>

        <section aria-labelledby="mangas-heading" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="mangas-heading">Mangas populaires</h2>
            <Link href="/mangas" className={styles.sectionLink}>
              Voir tous les mangas →
            </Link>
          </div>
          {mangasResult.status === "rejected" ? (
            <p className={styles.sectionError}>
              Les mangas populaires sont temporairement indisponibles.
            </p>
          ) : (
            <ul className={styles.previewGrid}>
              {featuredMangas.map((manga, index) => (
                <li key={manga.id}>
                  <MangaCard manga={manga} eager={index < 2} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="locations-heading" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="locations-heading">Lieux incontournables</h2>
            <Link href="/locations" className={styles.sectionLink}>
              Voir tous les lieux →
            </Link>
          </div>
          {locationsResult.status === "rejected" ? (
            <p className={styles.sectionError}>
              Les lieux incontournables sont temporairement indisponibles.
            </p>
          ) : (
            <ul className={styles.previewGrid}>
              {featuredLocations.map((location, index) => (
                <li key={location.id}>
                  <LocationCard location={location} eager={index < 2} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}