"use client";

import { PageContainer } from "@/components/PageContainer/PageContainer";
import { NewsList } from "@/components/NewsList/NewsList";
import { useNewsViewModel } from "@/viewmodels/useNewsViewModel";
import styles from "./NewsView.module.css";

export function NewsView() {
  const { articles, loading, error } = useNewsViewModel();

  return (
    <PageContainer title="Notícias">
      {loading && <p className={styles.message}>Carregando notícias...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p className={styles.message}>Nenhuma notícia encontrada.</p>
      )}
      {!loading && !error && articles.length > 0 && <NewsList articles={articles} />}
    </PageContainer>
  );
}
