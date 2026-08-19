import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CEP e Notícias",
  description: "Consulta de CEP e notícias com Next.js em arquitetura MVVM",
};

export default function LayoutRaiz({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
