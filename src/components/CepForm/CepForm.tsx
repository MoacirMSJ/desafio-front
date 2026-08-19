import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./CepForm.module.css";

interface CepFormProps {
  cep: string;
  onCepChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function CepForm({ cep, onCepChange, onSubmit, loading }: CepFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onCepChange(formatCep(event.target.value));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.label} htmlFor="cep">
        Digite o CEP
      </label>
      <div className={styles.row}>
        <input
          id="cep"
          className={styles.input}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="00000-000"
          value={cep}
          maxLength={9}
          onChange={handleChange}
          disabled={loading}
        />
        <Button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? (
            <span className={styles.loadingContent}>
              <span className={styles.spinner} aria-hidden="true" />
              Buscando...
            </span>
          ) : (
            "Buscar"
          )}
        </Button>
      </div>
    </form>
  );
}
