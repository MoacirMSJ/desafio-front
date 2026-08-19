import { News } from "@/models/News";
import { NewsCard } from "@/components/NewsCard/NewsCard";
import styles from "./NewsList.module.css";

interface NewsListProps {
  articles: News[];
  onEdit: (article: News) => void;
  onDelete: (article: News) => void;
}

export function NewsList({ articles, onEdit, onDelete }: NewsListProps) {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
