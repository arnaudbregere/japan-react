import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LieuCard from "@/components/LieuCard/LieuCard";
import Pagination from "@/components/Pagination/Pagination";
import { fetchLieux } from "@/lib/api/wikipedia";
import styles from "./LieuxPage.module.scss";
import Footer from "@/components/Footer/Footer";

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

        <Pagination
          basePath="/lieux"
          currentPage={pagination.currentPage}
          hasNextPage={pagination.hasNextPage}
        />
      </main>

      <Footer/>
    </>
  );
}