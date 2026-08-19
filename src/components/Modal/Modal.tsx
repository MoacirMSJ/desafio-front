import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.css";

interface PropsModal {
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
}

export function Modal({ titulo, aoFechar, children }: PropsModal) {
  useEffect(() => {
    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        aoFechar();
      }
    }

    document.addEventListener("keydown", aoPressionarTecla);
    return () => document.removeEventListener("keydown", aoPressionarTecla);
  }, [aoFechar]);

  return (
    <div className={styles.overlay} onClick={aoFechar}>
      <div
        className={styles.dialogo}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="titulo-modal" className={styles.titulo}>
            {titulo}
          </h2>
          <button type="button" className={styles.botaoFechar} onClick={aoFechar} aria-label="Fechar">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
