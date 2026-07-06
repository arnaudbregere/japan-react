import Link from "next/link";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  query: string;
};

function buildPageUrl(page: number, query: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `/mangas?${params.toString()}`;
}

export default function Pagination({
  currentPage,
  hasNextPage,
  query,
}: PaginationProps) {
  const hasPreviousPage = currentPage > 1;

  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination des résultats">
      {hasPreviousPage ? (
        <Link href={buildPageUrl(currentPage - 1, query)} className={styles.link}>
          ← Page précédente
        </Link>
      ) : (
        <span className={styles.linkDisabled}>← Page précédente</span>
      )}

      <span className={styles.current}>Page {currentPage}</span>

      {hasNextPage ? (
        <Link href={buildPageUrl(currentPage + 1, query)} className={styles.link}>
          Page suivante →
        </Link>
      ) : (
        <span className={styles.linkDisabled}>Page suivante →</span>
      )}
    </nav>
  );
}