import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, children, ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;

  return (
    <button className={`${styles.button} ${variantClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
