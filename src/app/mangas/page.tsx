import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MangaCard from "@/components/MangaCard/MangaCard";
import Pagination from "@/components/Pagination/Pagination";
import SearchForm from "@/components/SearchForm/SearchForm";
import { fetchMangas } from "@/lib/api/anilist-list";
import { buildCanonicalUrl } from "@/utils/seo/buildCanonicalUrl";
import styles from "./MangasPage.module.scss";

type MangasPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: MangasPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q ?? "";
  const currentPage = Number(params.page ?? "1");

  return {
    title: "Mangas",
    description: "Recherchez et découvrez des mangas parmi des milliers de titres.",
    alternates: {
      canonical: buildCanonicalUrl("/mangas", {
        q: query || undefined,
        page: currentPage > 1 ? currentPage : undefined,
      }),
    },
  };
}

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

      <Footer />
    </>
  );
}