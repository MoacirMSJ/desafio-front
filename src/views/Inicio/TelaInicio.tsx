"use client";

import { useRouter } from "next/navigation";
import { Botao } from "@/components/Botao/Botao";
import styles from "./TelaInicio.module.css";

export function TelaInicio() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Bem-vindo</h1>
      <p className={styles.subtitulo}>Escolha uma das opções abaixo</p>
      <div className={styles.acoes}>
        <Botao onClick={() => router.push("/buscar-cep")}>Consultar CEP</Botao>
        <Botao variante="secundario" onClick={() => router.push("/noticias")}>
          Notícias
        </Botao>
      </div>
    </main>
  );
}
