import { Botao } from "@/components/Botao/Botao";
import styles from "./Paginacao.module.css";

interface PropsPaginacao {
  pagina: number;
  totalDePaginas: number;
  aoAlterar: (pagina: number) => void;
}

export function Paginacao({ pagina, totalDePaginas, aoAlterar }: PropsPaginacao) {
  if (totalDePaginas <= 1) {
    return null;
  }

  return (
    <nav className={styles.paginacao} aria-label="Paginação de notícias">
      <Botao type="button" variante="secundario" onClick={() => aoAlterar(pagina - 1)} disabled={pagina <= 1}>
        Anterior
      </Botao>
      <span className={styles.status}>
        Página {pagina} de {totalDePaginas}
      </span>
      <Botao
        type="button"
        variante="secundario"
        onClick={() => aoAlterar(pagina + 1)}
        disabled={pagina >= totalDePaginas}
      >
        Próxima
      </Botao>
    </nav>
  );
}
