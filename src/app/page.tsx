import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import styles from "./HomePage.module.scss";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Explorez mangas et lieux incontournables du Japon
        </h1>
        <p className={styles.intro}>
          Un moteur de recherche pour découvrir des mangas et préparer votre
          voyage au Japon.
        </p>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Japan Manga Explorer</p>
      </footer>
    </>
  );
}