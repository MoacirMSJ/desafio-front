"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import styles from "./HomeView.module.css";

export function HomeView() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bem-vindo</h1>
      <p className={styles.subtitle}>Escolha uma das opções abaixo</p>
      <div className={styles.actions}>
        <Button onClick={() => router.push("/search-cep")}>Consultar CEP</Button>
        <Button variant="secondary" onClick={() => router.push("/news")}>
          Notícias
        </Button>
      </div>
    </main>
  );
}
