import styles from "./HeroIllustration.module.scss";

export default function HeroIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soleil */}
      <circle cx="320" cy="70" r="36" className={styles.sun} />

      {/* Montagne (silhouette type Fuji) */}
      <path
        d="M0 260 L140 90 L180 140 L220 60 L400 260 Z"
        className={styles.mountain}
      />
      <path
        d="M180 140 L220 60 L245 90 L200 100 Z"
        className={styles.mountainSnow}
      />

      {/* Torii stylisé au premier plan */}
      <g className={styles.torii}>
        <rect x="60" y="180" width="16" height="90" />
        <rect x="220" y="180" width="16" height="90" />
        <rect x="40" y="170" width="216" height="16" />
        <rect x="30" y="195" width="236" height="12" />
      </g>
    </svg>
  );
}