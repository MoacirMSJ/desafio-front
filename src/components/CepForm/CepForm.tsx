import { FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./CepForm.module.css";

interface CepFormProps {
  cep: string;
  onCepChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function CepForm({ cep, onCepChange, onSubmit, loading }: CepFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="cep">
        Digite o CEP
      </label>
      <div className={styles.row}>
        <input
          id="cep"
          className={styles.input}
          type="text"
          placeholder="00000-000"
          value={cep}
          maxLength={9}
          onChange={(event) => onCepChange(event.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>
    </form>
  );
}
