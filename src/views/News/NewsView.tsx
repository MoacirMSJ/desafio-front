"use client";

import { PageContainer } from "@/components/PageContainer/PageContainer";
import { NewsList } from "@/components/NewsList/NewsList";
import { NewsSearchBar } from "@/components/NewsSearchBar/NewsSearchBar";
import { NewsForm } from "@/components/NewsForm/NewsForm";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import { Pagination } from "@/components/Pagination/Pagination";
import { Button } from "@/components/Button/Button";
import { useNewsViewModel } from "@/viewmodels/useNewsViewModel";
import styles from "./NewsView.module.css";

export function NewsView() {
  const {
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
  } = useNewsViewModel();

  return (
    <PageContainer title="Notícias">
      <div className={styles.toolbar}>
        <Button type="button" onClick={openCreateForm}>
          + Nova notícia
        </Button>
        <NewsSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearchSubmit}
          onClear={clearSearch}
          isActive={Boolean(activeSearch)}
        />
      </div>

      {loading && <p className={styles.message}>Carregando notícias...</p>}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && news.length === 0 && (
        <div className={styles.empty}>
          <p>
            {activeSearch
              ? `Nenhuma notícia encontrada para "${activeSearch}".`
              : "Nenhuma notícia cadastrada ainda."}
          </p>
          {!activeSearch && <Button onClick={openCreateForm}>Cadastrar a primeira notícia</Button>}
        </div>
      )}

      {!loading && !error && news.length > 0 && (
        <>
          <NewsList articles={news} onEdit={openEditForm} onDelete={requestDelete} />
          {!activeSearch && <Pagination page={page} totalPages={totalPages} onChange={goToPage} />}
        </>
      )}

      {formOpen && (
        <NewsForm
          news={editingNews}
          error={formError}
          submitting={submitting}
          onSubmit={submitForm}
          onClose={closeForm}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Excluir notícia"
          message={`Tem certeza que deseja excluir "${deleteTarget.title}"? Essa ação não poderá ser desfeita.`}
          confirmLabel="Excluir"
          loading={deleting}
          error={deleteError}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </PageContainer>
  );
}
