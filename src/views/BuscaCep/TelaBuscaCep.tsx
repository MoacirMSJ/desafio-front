"use client";

import { ContainerPagina } from "@/components/ContainerPagina/ContainerPagina";
import { FormularioCep } from "@/components/FormularioCep/FormularioCep";
import { useBuscaCepViewModel } from "@/viewmodels/useBuscaCepViewModel";
import styles from "./TelaBuscaCep.module.css";

export function TelaBuscaCep() {
  const { cep, definirCep, resultado, carregando, erro, buscar } = useBuscaCepViewModel();

  return (
    <ContainerPagina titulo="Consultar CEP">
      <FormularioCep cep={cep} aoAlterarCep={definirCep} aoSubmeter={buscar} carregando={carregando} />

      {erro && (
        <p className={styles.erro} role="alert">
          {erro}
        </p>
      )}

      {carregando && (
        <div className={styles.esqueleto} aria-hidden="true">
          <div className={styles.linhaEsqueleto} />
          <div className={styles.linhaEsqueleto} />
          <div className={styles.linhaEsqueleto} />
          <div className={styles.linhaEsqueleto} />
        </div>
      )}

      {!carregando && resultado && (
        <dl className={styles.resultado}>
          <div className={styles.linha}>
            <dt>CEP</dt>
            <dd>{resultado.cep}</dd>
          </div>
          <div className={styles.linha}>
            <dt>Logradouro</dt>
            <dd>{resultado.logradouro || "-"}</dd>
          </div>
          <div className={styles.linha}>
            <dt>Bairro</dt>
            <dd>{resultado.bairro || "-"}</dd>
          </div>
          <div className={styles.linha}>
            <dt>Cidade</dt>
            <dd>{resultado.localidade}</dd>
          </div>
          <div className={styles.linha}>
            <dt>UF</dt>
            <dd>{resultado.uf}</dd>
          </div>
        </dl>
      )}
    </ContainerPagina>
  );
}
