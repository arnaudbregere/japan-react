import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  return (
    <>
      <header>
        <nav aria-label="Navigation principale">
          <Link href="/">Japan Manga Explorer</Link>
          <ul>
            <li>
              <Link href="/mangas">Mangas</Link>
            </li>
            <li>
              <Link href="/lieux">Lieux au Japon</Link>
            </li>
          </ul>
        </nav>
      </header>

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