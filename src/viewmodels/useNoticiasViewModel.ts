import { FormEvent, useEffect, useState } from "react";
import { Noticia, NoticiaEntrada } from "@/models/Noticia";
import {
  atualizarNoticia,
  buscarNoticiaPorTitulo,
  buscarNoticias,
  criarNoticia,
  excluirNoticia,
} from "@/services/servicoNoticia";

const TAMANHO_PAGINA = 10;

export function useNoticiasViewModel() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalDePaginas, setTotalDePaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [termoBusca, setTermoBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");

  const [formularioAberto, setFormularioAberto] = useState(false);
  const [noticiaEmEdicao, setNoticiaEmEdicao] = useState<Noticia | null>(null);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const [alvoExclusao, setAlvoExclusao] = useState<Noticia | null>(null);
  const [excluindo, setExcluindo] = useState(false);
  const [erroExclusao, setErroExclusao] = useState<string | null>(null);

  async function carregarPagina(paginaAlvo: number) {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await buscarNoticias(paginaAlvo, TAMANHO_PAGINA);
      setNoticias(resposta.noticias);
      setPagina(resposta.pagina);
      setTotalDePaginas(Math.max(resposta.totalDePaginas, 1));
    } catch {
      setErro("Não foi possível carregar as notícias no momento.");
    } finally {
      setCarregando(false);
    }
  }

  async function executarBusca(termo: string) {
    setCarregando(true);
    setErro(null);

    try {
      const resultados = await buscarNoticiaPorTitulo(termo);
      setNoticias(resultados);
      setPagina(1);
      setTotalDePaginas(1);
    } catch {
      setErro("Não foi possível buscar a notícia informada.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    let montado = true;

    async function carregarPaginaInicial() {
      setCarregando(true);
      setErro(null);

      try {
        const resposta = await buscarNoticias(1, TAMANHO_PAGINA);
        if (montado) {
          setNoticias(resposta.noticias);
          setPagina(resposta.pagina);
          setTotalDePaginas(Math.max(resposta.totalDePaginas, 1));
        }
      } catch {
        if (montado) {
          setErro("Não foi possível carregar as notícias no momento.");
        }
      } finally {
        if (montado) {
          setCarregando(false);
        }
      }
    }

    carregarPaginaInicial();

    return () => {
      montado = false;
    };
  }, []);

  function atualizar() {
    return buscaAtiva ? executarBusca(buscaAtiva) : carregarPagina(pagina);
  }

  function aoSubmeterBusca(evento: FormEvent) {
    evento.preventDefault();
    const termo = termoBusca.trim();

    if (!termo) {
      setBuscaAtiva("");
      carregarPagina(1);
      return;
    }

    setBuscaAtiva(termo);
    executarBusca(termo);
  }

  function limparBusca() {
    setTermoBusca("");
    setBuscaAtiva("");
    carregarPagina(1);
  }

  function irParaPagina(alvo: number) {
    if (alvo < 1 || alvo > totalDePaginas || alvo === pagina) return;
    carregarPagina(alvo);
  }

  function abrirFormularioCriacao() {
    setNoticiaEmEdicao(null);
    setErroFormulario(null);
    setFormularioAberto(true);
  }

  function abrirFormularioEdicao(noticia: Noticia) {
    setNoticiaEmEdicao(noticia);
    setErroFormulario(null);
    setFormularioAberto(true);
  }

  function fecharFormulario() {
    setFormularioAberto(false);
    setNoticiaEmEdicao(null);
    setErroFormulario(null);
  }

  async function enviarFormulario(dados: NoticiaEntrada) {
    setEnviando(true);
    setErroFormulario(null);

    try {
      if (noticiaEmEdicao) {
        await atualizarNoticia(noticiaEmEdicao.id, dados);
      } else {
        await criarNoticia(dados);
      }

      setFormularioAberto(false);
      setNoticiaEmEdicao(null);
      await atualizar();
    } catch {
      setErroFormulario("Não foi possível salvar a notícia. Verifique os dados e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  function solicitarExclusao(noticia: Noticia) {
    setAlvoExclusao(noticia);
    setErroExclusao(null);
  }

  function cancelarExclusao() {
    setAlvoExclusao(null);
    setErroExclusao(null);
  }

  async function confirmarExclusao() {
    if (!alvoExclusao) return;

    setExcluindo(true);
    setErroExclusao(null);

    try {
      await excluirNoticia(alvoExclusao.id);
      setAlvoExclusao(null);
      await atualizar();
    } catch {
      setErroExclusao("Não foi possível excluir a notícia.");
    } finally {
      setExcluindo(false);
    }
  }

  return {
    noticias,
    pagina,
    totalDePaginas,
    carregando,
    erro,
    termoBusca,
    definirTermoBusca: setTermoBusca,
    buscaAtiva,
    aoSubmeterBusca,
    limparBusca,
    irParaPagina,
    formularioAberto,
    noticiaEmEdicao,
    erroFormulario,
    enviando,
    abrirFormularioCriacao,
    abrirFormularioEdicao,
    fecharFormulario,
    enviarFormulario,
    alvoExclusao,
    excluindo,
    erroExclusao,
    solicitarExclusao,
    cancelarExclusao,
    confirmarExclusao,
  };
}
