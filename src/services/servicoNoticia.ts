import axios from "axios";
import { apiNoticia } from "./apiNoticia";
import { Noticia, NoticiaEntrada, RespostaListaNoticias } from "@/models/Noticia";

interface NoticiaBruta {
  _id: string;
  titulo: string;
  descricao: string;
  excluido_em: string | null;
  criado_em: string;
  atualizado_em: string;
  __v: number;
}

interface RespostaListaBruta {
  dados: NoticiaBruta[];
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

function mapearNoticia(bruta: NoticiaBruta): Noticia {
  return {
    id: bruta._id,
    titulo: bruta.titulo,
    descricao: bruta.descricao,
    criadoEm: bruta.criado_em,
    atualizadoEm: bruta.atualizado_em,
  };
}

export async function buscarNoticias(pagina: number, limite: number): Promise<RespostaListaNoticias> {
  const resposta = await apiNoticia.get<RespostaListaBruta>("", { params: { pagina, limite } });

  return {
    noticias: resposta.data.dados.map(mapearNoticia),
    pagina: resposta.data.pagina,
    limite: resposta.data.limite,
    total: resposta.data.total,
    totalDePaginas: resposta.data.totalPaginas,
  };
}

export async function buscarNoticiaPorTitulo(titulo: string): Promise<Noticia[]> {
  const resposta = await apiNoticia.get<NoticiaBruta[]>(`/${encodeURIComponent(titulo)}`);
  return resposta.data.map(mapearNoticia);
}

export async function criarNoticia(dados: NoticiaEntrada): Promise<Noticia> {
  const resposta = await apiNoticia.post<NoticiaBruta>("", dados);
  return mapearNoticia(resposta.data);
}

export async function atualizarNoticia(id: string, dados: NoticiaEntrada): Promise<Noticia> {
  const resposta = await apiNoticia.put<NoticiaBruta>(`/${id}`, dados);
  return mapearNoticia(resposta.data);
}

export async function excluirNoticia(id: string): Promise<void> {
  try {
    await apiNoticia.delete(`/${id}`);
  } catch (erro) {
    if (axios.isAxiosError(erro)) {
      throw new Error("Não foi possível excluir a notícia.");
    }

    throw erro;
  }
}
