import { NewsArticle } from "@/models/News";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <a className={styles.card} href={article.url} target="_blank" rel="noopener noreferrer">
      {article.urlToImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={article.urlToImage} alt={article.title} />
      )}
      <div className={styles.content}>
        <span className={styles.source}>{article.source.name}</span>
        <h3 className={styles.title}>{article.title}</h3>
        {article.description && <p className={styles.description}>{article.description}</p>}
      </div>
    </a>
  );
}
