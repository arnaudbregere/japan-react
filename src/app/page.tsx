import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MangaCard from "@/components/MangaCard/MangaCard";
import LocationCard from "@/components/LocationCard/LocationCard";
import HeroIllustration from "@/components/HeroIllustration/HeroIllustration";
import { fetchMangas } from "@/lib/api/anilist";
import { fetchLocations } from "@/lib/api/wikipedia";
import styles from "./HomePage.module.scss";

export const metadata: Metadata = {
  title: "Accueil",
};

export default async function HomePage() {
  const [{ data: mangas }, { data: locations }] = await Promise.all([
    fetchMangas({ page: 1 }),
    fetchLocations({ page: 1 }),
  ]);

  const featuredMangas = mangas.slice(0, 4);
  const featuredLocations = locations.slice(0, 4);

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
              <Link href="/lieux" className={styles.ctaSecondary}>
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
          <ul className={styles.previewGrid}>
            {featuredMangas.map((manga, index) => (
              <li key={manga.id}>
                <MangaCard manga={manga} eager={index < 2} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="lieux-heading" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="lieux-heading">Lieux incontournables</h2>
            <Link href="/lieux" className={styles.sectionLink}>
              Voir tous les lieux →
            </Link>
          </div>
          <ul className={styles.previewGrid}>
            {featuredLocations.map((location, index) => (
              <li key={location.id}>
                <LocationCard location={location} eager={index < 2} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}