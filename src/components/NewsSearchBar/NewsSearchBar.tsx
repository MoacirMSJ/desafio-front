import { FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./NewsSearchBar.module.css";

interface NewsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onClear: () => void;
  isActive: boolean;
}

export function NewsSearchBar({ value, onChange, onSubmit, onClear, isActive }: NewsSearchBarProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} role="search">
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar pelo título exato da notícia"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar notícia por título"
      />
      <Button type="submit" variant="secondary">
        Buscar
      </Button>
      {isActive && (
        <Button type="button" variant="secondary" onClick={onClear}>
          Limpar
        </Button>
      )}
    </form>
  );
}
