import { ButtonHTMLAttributes } from "react";
import styles from "./Botao.module.css";

interface PropsBotao extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "perigo";
}

const CLASSE_VARIANTE = {
  primario: "primario",
  secundario: "secundario",
  perigo: "perigo",
} as const;

export function Botao({ variante = "primario", className, children, ...resto }: PropsBotao) {
  const classeVariante = styles[CLASSE_VARIANTE[variante]];

  return (
    <button className={`${styles.botao} ${classeVariante} ${className ?? ""}`} {...resto}>
      {children}
    </button>
  );
}
