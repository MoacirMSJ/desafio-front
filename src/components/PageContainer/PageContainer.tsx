import { ReactNode } from "react";
import Link from "next/link";
import styles from "./PageContainer.module.css";

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Link className={styles.backLink} href="/">
          ← Voltar
        </Link>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {children}
    </main>
  );
}
