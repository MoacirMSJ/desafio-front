import { FormEvent, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import { News, NewsInput } from "@/models/News";
import styles from "./NewsForm.module.css";

interface NewsFormProps {
  news: News | null;
  error: string | null;
  submitting: boolean;
  onSubmit: (input: NewsInput) => void;
  onClose: () => void;
}

export function NewsForm({ news, error, submitting, onSubmit, onClose }: NewsFormProps) {
  const [title, setTitle] = useState(news?.title ?? "");
  const [description, setDescription] = useState(news?.description ?? "");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setValidationError("Preencha o título e a descrição.");
      return;
    }

    setValidationError(null);
    onSubmit({ title: trimmedTitle, description: trimmedDescription });
  }

  return (
    <Modal title={news ? "Editar notícia" : "Cadastrar notícia"} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="news-title">
            Título
          </label>
          <input
            id="news-title"
            className={styles.input}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={submitting}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="news-description">
            Descrição
          </label>
          <textarea
            id="news-description"
            className={styles.textarea}
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={submitting}
          />
        </div>

        {(validationError ?? error) && (
          <p className={styles.error} role="alert">
            {validationError ?? error}
          </p>
        )}

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
