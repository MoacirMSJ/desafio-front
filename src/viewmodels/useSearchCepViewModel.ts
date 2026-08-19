import { useState } from "react";
import { Cep } from "@/models/Cep";
import { fetchCep } from "@/services/cepService";

const CEP_LENGTH = 8;

export function useSearchCepViewModel() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<Cep | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCepChange(value: string) {
    setCep(value);

    if (error) {
      setError(null);
    }
  }

  async function handleSearch() {
    const sanitizedCep = cep.replace(/\D/g, "");

    if (sanitizedCep.length !== CEP_LENGTH) {
      setError("Informe um CEP válido com 8 dígitos.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchCep(sanitizedCep);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível encontrar o CEP informado.");
    } finally {
      setLoading(false);
    }
  }

  return {
    cep,
    setCep: handleCepChange,
    result,
    loading,
    error,
    handleSearch,
  };
}
