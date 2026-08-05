import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { fetchMangaById } from "@/lib/api/anilist-detail";
import { buildMangaSlug, parseMangaIdFromSlug } from "@/utils/mangaSlug";
import styles from "./MangaDetailPage.module.scss";

type MangaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function getMangaFromSlug(slug: string) {
  const id = parseMangaIdFromSlug(slug);

  if (id === null) {
    return null;
  }

  return fetchMangaById(id);
}

export async function generateMetadata({
  params,
}: MangaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const manga = await getMangaFromSlug(slug);

  if (!manga) {
    return {
      title: "Manga introuvable",
    };
  }

  const canonicalSlug = buildMangaSlug(manga.id, manga.title);

  return {
    title: manga.title,
    description:
      manga.synopsis?.slice(0, 155) ??
      `Découvrez ${manga.title} sur Japan Manga Explorer.`,
    alternates: {
      canonical: `/mangas/${canonicalSlug}`,
    },
    openGraph: {
      title: manga.title,
      description: manga.synopsis?.slice(0, 155) ?? undefined,
      images: manga.imageUrl ? [manga.imageUrl] : undefined,
      type: "book",
    },
  };
}

export default async function MangaDetailPage({
  params,
}: MangaDetailPageProps) {
  const { slug } = await params;
  const manga = await getMangaFromSlug(slug);

  if (!manga) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: manga.title,
    image: manga.imageUrl ?? undefined,
    description: manga.synopsis ?? undefined,
    numberOfPages: manga.chapters ?? undefined,
    genre: manga.genres,
    aggregateRating:
      manga.score !== null
        ? {
            "@type": "AggregateRating",
            ratingValue: manga.score,
            bestRating: 10,
          }
        : undefined,
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className={styles.main}>
        <Link href="/mangas" className={styles.backLink}>
          ← Retour aux mangas
        </Link>

        <article className={styles.layout}>
          {manga.imageUrl ? (
            <figure className={styles.coverWrapper}>
              <Image
                src={manga.imageUrl}
                alt={`Couverture de ${manga.title}`}
                fill
                priority
                className={styles.cover}
                sizes="(min-width: 768px) 300px, 100vw"
              />
            </figure>
          ) : (
            <div
              className={styles.coverPlaceholder}
              aria-hidden="true"
            />
          )}

          <div className={styles.info}>
            <h1 className={styles.title}>{manga.title}</h1>

            <dl className={styles.metaList}>
              {manga.score !== null && (
                <div className={styles.metaItem}>
                  <dt>Note</dt>
                  <dd>★ {manga.score.toFixed(1)}</dd>
                </div>
              )}

              <div className={styles.metaItem}>
                <dt>Statut</dt>
                <dd>{manga.status}</dd>
              </div>

              {manga.format && (
                <div className={styles.metaItem}>
                  <dt>Format</dt>
                  <dd>{manga.format}</dd>
                </div>
              )}

              {manga.chapters !== null && (
                <div className={styles.metaItem}>
                  <dt>Chapitres</dt>
                  <dd>{manga.chapters}</dd>
                </div>
              )}

              {manga.volumes !== null && (
                <div className={styles.metaItem}>
                  <dt>Volumes</dt>
                  <dd>{manga.volumes}</dd>
                </div>
              )}

              {manga.startDateLabel && (
                <div className={styles.metaItem}>
                  <dt>Début de publication</dt>
                  <dd>{manga.startDateLabel}</dd>
                </div>
              )}

              {manga.endDateLabel && (
                <div className={styles.metaItem}>
                  <dt>Fin de publication</dt>
                  <dd>{manga.endDateLabel}</dd>
                </div>
              )}
            </dl>

            {manga.genres.length > 0 && (
              <ul className={styles.genreList} aria-label="Genres">
                {manga.genres.map((genre) => (
                  <li
                    key={genre}
                    className={styles.genreBadge}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}

            {manga.synopsis && (
              <section
                aria-labelledby="synopsis-heading"
                className={styles.section}
              >
                <h2
                  id="synopsis-heading"
                  className={styles.sectionTitle}
                >
                  Synopsis
                </h2>

                <p className={styles.synopsis}>
                  {manga.synopsis}
                </p>
              </section>
            )}

            {manga.staff.length > 0 && (
              <section
                aria-labelledby="staff-heading"
                className={styles.section}
              >
                <h2
                  id="staff-heading"
                  className={styles.sectionTitle}
                >
                  Équipe
                </h2>

                <ul className={styles.staffList}>
                  {manga.staff.map((person) => (
                    <li key={`${person.name}-${person.role}`}>
                      <strong>{person.name}</strong> — {person.role}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {manga.siteUrl && (
              <a
                href={manga.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
              >
                Voir sur AniList ↗
              </a>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}