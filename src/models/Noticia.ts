export interface Noticia {
  id: string;
  titulo: string;
  descricao: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface NoticiaEntrada {
  titulo: string;
  descricao: string;
}

export interface RespostaListaNoticias {
  noticias: Noticia[];
  pagina: number;
  limite: number;
  total: number;
  totalDePaginas: number;
}
