"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styles from "./SearchForm.module.scss";

type SearchFormProps = {
  defaultQuery: string;
};

export default function SearchForm({ defaultQuery }: SearchFormProps) {
  const [query, setQuery] = useState(defaultQuery);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    router.push(`/mangas?${params.toString()}`);
  }

  return (
    <form role="search" className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="manga-search" className={styles.label}>
        Rechercher un manga
      </label>
      <input
        id="manga-search"
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ex : One Piece, Naruto..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Rechercher
      </button>
    </form>
  );
}