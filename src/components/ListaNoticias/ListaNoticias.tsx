import { Noticia } from "@/models/Noticia";
import { CartaoNoticia } from "@/components/CartaoNoticia/CartaoNoticia";
import styles from "./ListaNoticias.module.css";

interface PropsListaNoticias {
  noticias: Noticia[];
  aoEditar: (noticia: Noticia) => void;
  aoExcluir: (noticia: Noticia) => void;
}

export function ListaNoticias({ noticias, aoEditar, aoExcluir }: PropsListaNoticias) {
  return (
    <div className={styles.grade}>
      {noticias.map((noticia) => (
        <CartaoNoticia key={noticia.id} noticia={noticia} aoEditar={aoEditar} aoExcluir={aoExcluir} />
      ))}
    </div>
  );
}
