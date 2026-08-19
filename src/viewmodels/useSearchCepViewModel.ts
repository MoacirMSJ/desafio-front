import { useState } from "react";
import { Cep } from "@/models/Cep";
import { fetchCep } from "@/services/cepService";

export function useSearchCepViewModel() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<Cep | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    const sanitizedCep = cep.replace(/\D/g, "");

    if (sanitizedCep.length !== 8) {
      setError("Informe um CEP válido com 8 dígitos.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCep(sanitizedCep);
      setResult(data);
    } catch {
      setError("Não foi possível encontrar o CEP informado.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    cep,
    setCep,
    result,
    loading,
    error,
    handleSearch,
  };
}
