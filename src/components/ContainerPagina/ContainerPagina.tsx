import { ReactNode } from "react";
import Link from "next/link";
import styles from "./ContainerPagina.module.css";

interface PropsContainerPagina {
  titulo: string;
  children: ReactNode;
}

export function ContainerPagina({ titulo, children }: PropsContainerPagina) {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Link className={styles.linkVoltar} href="/">
          ← Voltar
        </Link>
        <h1 className={styles.titulo}>{titulo}</h1>
      </div>
      {children}
    </main>
  );
}
