import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <svg
      className={styles.logo}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="logoTitle"
    >
      <title id="logoTitle">Japan Manga Explorer</title>
      <rect x="4" y="10" width="40" height="4" rx="1" />
      <rect x="4" y="18" width="40" height="3" rx="1" />
      <rect x="10" y="10" width="4" height="34" rx="1" />
      <rect x="34" y="10" width="4" height="34" rx="1" />
    </svg>
  );
}