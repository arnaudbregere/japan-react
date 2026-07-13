import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LieuCard from "@/components/LieuCard/LieuCard";
import { fetchLieux } from "@/lib/api/wikipedia";
import styles from "./LieuxPage.module.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lieux au Japon",
  description: "Découvrez les lieux incontournables à visiter au Japon.",
};

type LieuxPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function LieuxPage({ searchParams }: LieuxPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page ?? "1");

  const { data: lieux, pagination } = await fetchLieux({ page: currentPage });
  const hasPreviousPage = pagination.currentPage > 1;

  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Lieux incontournables du Japon</h1>

        {lieux.length === 0 ? (
          <p className={styles.empty}>Aucun lieu trouvé pour cette page.</p>
        ) : (
          <ul className={styles.list}>
            {lieux.map((lieu, index) => (
              <li key={lieu.id}>
                <LieuCard lieu={lieu} eager={index < 4} />
              </li>
            ))}
          </ul>
        )}

        <nav className={styles.pagination} aria-label="Pagination des lieux">
          {hasPreviousPage ? (
            <Link href={`/lieux?page=${pagination.currentPage - 1}`} className={styles.link}>
              ← Page précédente
            </Link>
          ) : (
            <span className={styles.linkDisabled}>← Page précédente</span>
          )}

          <span className={styles.current}>Page {pagination.currentPage}</span>

          {pagination.hasNextPage ? (
            <Link href={`/lieux?page=${pagination.currentPage + 1}`} className={styles.link}>
              Page suivante →
            </Link>
          ) : (
            <span className={styles.linkDisabled}>Page suivante →</span>
          )}
        </nav>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Japan Manga Explorer</p>
      </footer>
    </>
  );
}