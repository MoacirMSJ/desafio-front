import { FormEvent, useEffect, useState } from "react";
import { News, NewsInput } from "@/models/News";
import { createNews, deleteNews, fetchNews, searchNewsByTitle, updateNews } from "@/services/newsService";

const PAGE_SIZE = 10;

export function useNewsViewModel() {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function loadPage(targetPage: number) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchNews(targetPage, PAGE_SIZE);
      setNews(response.data);
      setPage(response.page);
      setTotalPages(Math.max(response.totalPages, 1));
    } catch {
      setError("Não foi possível carregar as notícias no momento.");
    } finally {
      setLoading(false);
    }
  }

  async function runSearch(term: string) {
    setLoading(true);
    setError(null);

    try {
      const results = await searchNewsByTitle(term);
      setNews(results);
      setPage(1);
      setTotalPages(1);
    } catch {
      setError("Não foi possível buscar a notícia informada.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialPage() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchNews(1, PAGE_SIZE);
        if (isMounted) {
          setNews(response.data);
          setPage(response.page);
          setTotalPages(Math.max(response.totalPages, 1));
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

    loadInitialPage();

    return () => {
      isMounted = false;
    };
  }, []);

  function refresh() {
    return activeSearch ? runSearch(activeSearch) : loadPage(page);
  }

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = searchTerm.trim();

    if (!trimmed) {
      setActiveSearch("");
      loadPage(1);
      return;
    }

    setActiveSearch(trimmed);
    runSearch(trimmed);
  }

  function clearSearch() {
    setSearchTerm("");
    setActiveSearch("");
    loadPage(1);
  }

  function goToPage(target: number) {
    if (target < 1 || target > totalPages || target === page) return;
    loadPage(target);
  }

  function openCreateForm() {
    setEditingNews(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEditForm(article: News) {
    setEditingNews(article);
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingNews(null);
    setFormError(null);
  }

  async function submitForm(input: NewsInput) {
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingNews) {
        await updateNews(editingNews._id, input);
      } else {
        await createNews(input);
      }

      setFormOpen(false);
      setEditingNews(null);
      await refresh();
    } catch {
      setFormError("Não foi possível salvar a notícia. Verifique os dados e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  function requestDelete(article: News) {
    setDeleteTarget(article);
    setDeleteError(null);
  }

  function cancelDelete() {
    setDeleteTarget(null);
    setDeleteError(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteNews(deleteTarget._id);
      setDeleteTarget(null);
      await refresh();
    } catch {
      setDeleteError("Não foi possível excluir a notícia.");
    } finally {
      setDeleting(false);
    }
  }

  return {
    news,
    page,
    totalPages,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    activeSearch,
    handleSearchSubmit,
    clearSearch,
    goToPage,
    formOpen,
    editingNews,
    formError,
    submitting,
    openCreateForm,
    openEditForm,
    closeForm,
    submitForm,
    deleteTarget,
    deleting,
    deleteError,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
