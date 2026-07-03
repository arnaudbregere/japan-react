"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
            Japan Manga Explorer
          </Link>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={styles.visuallyHidden}>
              {isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            </span>
            <span className={styles.burgerIcon} aria-hidden="true" />
          </button>
        </div>

        <ul
          id="primary-menu"
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
          <li>
            <Link
              href="/mangas"
              className={styles.menuLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Mangas
            </Link>
          </li>
          <li>
            <Link
              href="/lieux"
              className={styles.menuLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Lieux au Japon
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}