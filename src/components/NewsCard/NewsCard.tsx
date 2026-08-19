import { News } from "@/models/News";
import { Button } from "@/components/Button/Button";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  article: News;
  onEdit: (article: News) => void;
  onDelete: (article: News) => void;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export function NewsCard({ article, onEdit, onDelete }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
        <span className={styles.date}>Atualizado em {formatDate(article.updated_at)}</span>
      </div>
      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={() => onEdit(article)}>
          Editar
        </Button>
        <Button type="button" variant="danger" onClick={() => onDelete(article)}>
          Excluir
        </Button>
      </div>
    </article>
  );
}
