import { Button } from "@/components/Button/Button";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Paginação de notícias">
      <Button type="button" variant="secondary" onClick={() => onChange(page - 1)} disabled={page <= 1}>
        Anterior
      </Button>
      <span className={styles.status}>
        Página {page} de {totalPages}
      </span>
      <Button type="button" variant="secondary" onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        Próxima
      </Button>
    </nav>
  );
}
