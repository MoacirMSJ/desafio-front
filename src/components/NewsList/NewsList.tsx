import { NewsArticle } from "@/models/News";
import { NewsCard } from "@/components/NewsCard/NewsCard";
import styles from "./NewsList.module.css";

interface NewsListProps {
  articles: NewsArticle[];
}

export function NewsList({ articles }: NewsListProps) {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
}
