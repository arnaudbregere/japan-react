import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import MangaCard from "@/components/MangaCard/MangaCard";
import LieuCard from "@/components/LieuCard/LieuCard";
import HeroIllustration from "@/components/HeroIllustration/HeroIllustration";
import { fetchMangas } from "@/lib/api/anilist";
import { fetchLieux } from "@/lib/api/wikidata";
import styles from "./HomePage.module.scss";

export const metadata: Metadata = {
  title: "Accueil",
};

export default async function HomePage() {
  const [{ data: mangas }, lieux] = await Promise.all([
    fetchMangas({ page: 1 }),
    fetchLieux({ page: 1 }),
  ]);

  const featuredMangas = mangas.slice(0, 4);
  const featuredLieux = lieux.slice(0, 4);

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
            {featuredMangas.map((manga) => (
              <li key={manga.id}>
                <MangaCard manga={manga} />
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
            {featuredLieux.map((lieu, index) => (
              <li key={lieu.id}>
                <LieuCard lieu={lieu} priority={index < 2} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Japan Manga Explorer</p>
      </footer>
    </>
  );
}