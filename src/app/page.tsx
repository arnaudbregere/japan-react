import type { Metadata } from "next";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <h1>Explorez mangas et lieux incontournables du Japon</h1>
        <p>
          Un moteur de recherche pour découvrir des mangas et préparer votre
          voyage au Japon.
        </p>
      </main>

      <footer>
        <p>&copy; 2026 Japan Manga Explorer</p>
      </footer>
    </>
  );
}