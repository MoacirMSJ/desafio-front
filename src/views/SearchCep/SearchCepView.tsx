"use client";

import { PageContainer } from "@/components/PageContainer/PageContainer";
import { CepForm } from "@/components/CepForm/CepForm";
import { useSearchCepViewModel } from "@/viewmodels/useSearchCepViewModel";
import styles from "./SearchCepView.module.css";

export function SearchCepView() {
  const { cep, setCep, result, loading, error, handleSearch } = useSearchCepViewModel();

  return (
    <PageContainer title="Consultar CEP">
      <CepForm cep={cep} onCepChange={setCep} onSubmit={handleSearch} loading={loading} />

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <dl className={styles.result}>
          <div className={styles.row}>
            <dt>CEP</dt>
            <dd>{result.cep}</dd>
          </div>
          <div className={styles.row}>
            <dt>Logradouro</dt>
            <dd>{result.logradouro || "-"}</dd>
          </div>
          <div className={styles.row}>
            <dt>Bairro</dt>
            <dd>{result.bairro || "-"}</dd>
          </div>
          <div className={styles.row}>
            <dt>Cidade</dt>
            <dd>{result.localidade}</dd>
          </div>
          <div className={styles.row}>
            <dt>UF</dt>
            <dd>{result.uf}</dd>
          </div>
        </dl>
      )}
    </PageContainer>
  );
}
