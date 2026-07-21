import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import MangaCard from "@/components/MangaCard/MangaCard";
import Pagination from "@/components/Pagination/Pagination";
import SearchForm from "@/components/SearchForm/SearchForm";
import { fetchMangas } from "@/lib/api/anilist";
import styles from "./MangasPage.module.scss";

export const metadata: Metadata = {
  title: "Mangas",
  description: "Recherchez et découvrez des mangas parmi des milliers de titres.",
};

type MangasPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function MangasPage({ searchParams }: MangasPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const currentPage = Number(params.page ?? "1");

  const { data: mangas, pagination } = await fetchMangas({
    query,
    page: currentPage,
  });

  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Explorez les mangas</h1>

        <SearchForm defaultQuery={query} />

        {mangas.length === 0 ? (
          <p className={styles.empty}>
            Aucun manga trouvé{query ? ` pour « ${query} »` : ""}.
          </p>
        ) : (
          <ul className={styles.list}>
            {mangas.map((manga, index) => (
              <li key={manga.id}>
                <MangaCard manga={manga} eager={index < 4} />
              </li>
            ))}
          </ul>
        )}

        <Pagination
          basePath="/mangas"
          currentPage={pagination.currentPage}
          hasNextPage={pagination.hasNextPage}
          query={query}
        />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Japan Manga Explorer</p>
      </footer>
    </>
  );
}