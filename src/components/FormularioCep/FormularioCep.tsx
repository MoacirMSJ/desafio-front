import { ChangeEvent, FormEvent } from "react";
import { Botao } from "@/components/Botao/Botao";
import styles from "./FormularioCep.module.css";

interface PropsFormularioCep {
  cep: string;
  aoAlterarCep: (valor: string) => void;
  aoSubmeter: () => void;
  carregando: boolean;
}

function formatarCep(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 8);

  if (digitos.length <= 5) {
    return digitos;
  }

  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

export function FormularioCep({ cep, aoAlterarCep, aoSubmeter, carregando }: PropsFormularioCep) {
  function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    aoSubmeter();
  }

  function handleChange(evento: ChangeEvent<HTMLInputElement>) {
    aoAlterarCep(formatarCep(evento.target.value));
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
          disabled={carregando}
        />
        <Botao type="submit" disabled={carregando} className={styles.botaoSubmeter}>
          {carregando ? (
            <span className={styles.conteudoCarregando}>
              <span className={styles.spinner} aria-hidden="true" />
              Buscando...
            </span>
          ) : (
            "Buscar"
          )}
        </Botao>
      </div>
    </form>
  );
}
