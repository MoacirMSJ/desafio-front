import { FormEvent } from "react";
import { Botao } from "@/components/Botao/Botao";
import styles from "./BarraBuscaNoticias.module.css";

interface PropsBarraBuscaNoticias {
  valor: string;
  aoAlterar: (valor: string) => void;
  aoSubmeter: (evento: FormEvent) => void;
  aoLimpar: () => void;
  ativa: boolean;
}

export function BarraBuscaNoticias({ valor, aoAlterar, aoSubmeter, aoLimpar, ativa }: PropsBarraBuscaNoticias) {
  return (
    <form className={styles.form} onSubmit={aoSubmeter} role="search">
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar pelo título exato da notícia"
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        aria-label="Buscar notícia por título"
      />
      <Botao type="submit" variante="secundario">
        Buscar
      </Botao>
      {ativa && (
        <Botao type="button" variante="secundario" onClick={aoLimpar}>
          Limpar
        </Botao>
      )}
    </form>
  );
}
