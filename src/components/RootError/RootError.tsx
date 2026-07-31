"use client";

import { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./Error.module.scss";

type RootErrorProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export default function RootError({ error, onRetry }: RootErrorProps) {
  useEffect(() => {
    console.error("[app] Erreur de rendu", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Une erreur est survenue</h1>
        <div className={styles.container} role="alert">
          <p className={styles.message}>
            {error.message || "Impossible de charger cette page pour le moment. Réessayez dans quelques instants."}
          </p>
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            Réessayer
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}