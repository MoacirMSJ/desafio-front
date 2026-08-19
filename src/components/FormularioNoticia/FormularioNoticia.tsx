import { FormEvent, useState } from "react";
import { Botao } from "@/components/Botao/Botao";
import { Modal } from "@/components/Modal/Modal";
import { Noticia, NoticiaEntrada } from "@/models/Noticia";
import styles from "./FormularioNoticia.module.css";

interface PropsFormularioNoticia {
  noticia: Noticia | null;
  erro: string | null;
  enviando: boolean;
  aoSubmeter: (dados: NoticiaEntrada) => void;
  aoFechar: () => void;
}

export function FormularioNoticia({ noticia, erro, enviando, aoSubmeter, aoFechar }: PropsFormularioNoticia) {
  const [titulo, setTitulo] = useState(noticia?.titulo ?? "");
  const [descricao, setDescricao] = useState(noticia?.descricao ?? "");
  const [erroValidacao, setErroValidacao] = useState<string | null>(null);

  function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const tituloAparado = titulo.trim();
    const descricaoAparada = descricao.trim();

    if (!tituloAparado || !descricaoAparada) {
      setErroValidacao("Preencha o título e a descrição.");
      return;
    }

    setErroValidacao(null);
    aoSubmeter({ titulo: tituloAparado, descricao: descricaoAparada });
  }

  return (
    <Modal titulo={noticia ? "Editar notícia" : "Cadastrar notícia"} aoFechar={aoFechar}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="noticia-titulo">
            Título
          </label>
          <input
            id="noticia-titulo"
            className={styles.input}
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            disabled={enviando}
          />
        </div>

        <div className={styles.campo}>
          <label className={styles.label} htmlFor="noticia-descricao">
            Descrição
          </label>
          <textarea
            id="noticia-descricao"
            className={styles.textarea}
            rows={5}
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            disabled={enviando}
          />
        </div>

        {(erroValidacao ?? erro) && (
          <p className={styles.erro} role="alert">
            {erroValidacao ?? erro}
          </p>
        )}

        <div className={styles.acoes}>
          <Botao type="button" variante="secundario" onClick={aoFechar} disabled={enviando}>
            Cancelar
          </Botao>
          <Botao type="submit" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar"}
          </Botao>
        </div>
      </form>
    </Modal>
  );
}
