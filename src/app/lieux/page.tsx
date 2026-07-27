import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import LocationCard from "@/components/LocationCard/LocationCard";
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

  const { data: locations, pagination } = await fetchLieux({ page: currentPage });

  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Lieux incontournables du Japon</h1>

        {locations.length === 0 ? (
          <p className={styles.empty}>Aucun lieu trouvé pour cette page.</p>
        ) : (
          <ul className={styles.list}>
            {locations.map((location, index) => (
              <li key={location.id}>
                <LocationCard location={location} eager={index < 4} />
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