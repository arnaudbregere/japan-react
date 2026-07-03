import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <Link href="/" className={styles.logo}>
          Japan Manga Explorer
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link href="/mangas" className={styles.menuLink}>
              Mangas
            </Link>
          </li>
          <li>
            <Link href="/lieux" className={styles.menuLink}>
              Lieux au Japon
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}