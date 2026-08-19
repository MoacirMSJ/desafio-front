"use client";

import { ContainerPagina } from "@/components/ContainerPagina/ContainerPagina";
import { ListaNoticias } from "@/components/ListaNoticias/ListaNoticias";
import { BarraBuscaNoticias } from "@/components/BarraBuscaNoticias/BarraBuscaNoticias";
import { FormularioNoticia } from "@/components/FormularioNoticia/FormularioNoticia";
import { DialogoConfirmacao } from "@/components/DialogoConfirmacao/DialogoConfirmacao";
import { Paginacao } from "@/components/Paginacao/Paginacao";
import { Botao } from "@/components/Botao/Botao";
import { useNoticiasViewModel } from "@/viewmodels/useNoticiasViewModel";
import styles from "./TelaNoticias.module.css";

export function TelaNoticias() {
  const {
    noticias,
    pagina,
    totalDePaginas,
    carregando,
    erro,
    termoBusca,
    definirTermoBusca,
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
  } = useNoticiasViewModel();

  return (
    <ContainerPagina titulo="Notícias">
      <div className={styles.barraFerramentas}>
        <Botao type="button" onClick={abrirFormularioCriacao}>
          + Nova notícia
        </Botao>
        <BarraBuscaNoticias
          valor={termoBusca}
          aoAlterar={definirTermoBusca}
          aoSubmeter={aoSubmeterBusca}
          aoLimpar={limparBusca}
          ativa={Boolean(buscaAtiva)}
        />
      </div>

      {carregando && <p className={styles.mensagem}>Carregando notícias...</p>}

      {erro && (
        <p className={styles.erro} role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && noticias.length === 0 && (
        <div className={styles.vazio}>
          <p>
            {buscaAtiva
              ? `Nenhuma notícia encontrada para "${buscaAtiva}".`
              : "Nenhuma notícia cadastrada ainda."}
          </p>
          {!buscaAtiva && <Botao onClick={abrirFormularioCriacao}>Cadastrar a primeira notícia</Botao>}
        </div>
      )}

      {!carregando && !erro && noticias.length > 0 && (
        <>
          <ListaNoticias noticias={noticias} aoEditar={abrirFormularioEdicao} aoExcluir={solicitarExclusao} />
          {!buscaAtiva && <Paginacao pagina={pagina} totalDePaginas={totalDePaginas} aoAlterar={irParaPagina} />}
        </>
      )}

      {formularioAberto && (
        <FormularioNoticia
          noticia={noticiaEmEdicao}
          erro={erroFormulario}
          enviando={enviando}
          aoSubmeter={enviarFormulario}
          aoFechar={fecharFormulario}
        />
      )}

      {alvoExclusao && (
        <DialogoConfirmacao
          titulo="Excluir notícia"
          mensagem={`Tem certeza que deseja excluir "${alvoExclusao.titulo}"? Essa ação não poderá ser desfeita.`}
          rotuloConfirmar="Excluir"
          carregando={excluindo}
          erro={erroExclusao}
          aoConfirmar={confirmarExclusao}
          aoCancelar={cancelarExclusao}
        />
      )}
    </ContainerPagina>
  );
}
