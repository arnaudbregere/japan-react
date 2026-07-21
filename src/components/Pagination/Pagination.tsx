import Link from "next/link";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  hasNextPage: boolean;
  query?: string;
};

function buildPageUrl(basePath: string, page: number, query?: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `${basePath}?${params.toString()}`;
}

export default function Pagination({
  basePath,
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
        <Link href={buildPageUrl(basePath, currentPage - 1, query)} className={styles.link}>
          ← Page précédente
        </Link>
      ) : (
        <span className={styles.linkDisabled}>← Page précédente</span>
      )}

      <span className={styles.current}>Page {currentPage}</span>

      {hasNextPage ? (
        <Link href={buildPageUrl(basePath, currentPage + 1, query)} className={styles.link}>
          Page suivante →
        </Link>
      ) : (
        <span className={styles.linkDisabled}>Page suivante →</span>
      )}
    </nav>
  );
}