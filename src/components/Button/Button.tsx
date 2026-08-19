import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const VARIANT_CLASS = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
} as const;

export function Button({ variant = "primary", className, children, ...rest }: ButtonProps) {
  const variantClass = styles[VARIANT_CLASS[variant]];

  return (
    <button className={`${styles.button} ${variantClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
