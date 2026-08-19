import { useEffect, useState } from "react";
import { NewsArticle } from "@/models/News";
import { fetchTopHeadlines } from "@/services/newsService";

export function useNewsViewModel() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTopHeadlines();
        if (isMounted) {
          setArticles(data.articles);
        }
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar as notícias no momento.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, loading, error };
}
