import { Noticia } from "@/models/Noticia";
import { Botao } from "@/components/Botao/Botao";
import styles from "./CartaoNoticia.module.css";

interface PropsCartaoNoticia {
  noticia: Noticia;
  aoEditar: (noticia: Noticia) => void;
  aoExcluir: (noticia: Noticia) => void;
}

function formatarData(valor: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(valor));
}

export function CartaoNoticia({ noticia, aoEditar, aoExcluir }: PropsCartaoNoticia) {
  return (
    <article className={styles.cartao}>
      <div className={styles.conteudo}>
        <h3 className={styles.titulo}>{noticia.titulo}</h3>
        <p className={styles.descricao}>{noticia.descricao}</p>
        <span className={styles.data}>Atualizado em {formatarData(noticia.atualizadoEm)}</span>
      </div>
      <div className={styles.acoes}>
        <Botao type="button" variante="secundario" onClick={() => aoEditar(noticia)}>
          Editar
        </Botao>
        <Botao type="button" variante="perigo" onClick={() => aoExcluir(noticia)}>
          Excluir
        </Botao>
      </div>
    </article>
  );
}
