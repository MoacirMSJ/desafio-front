import { useState } from "react";
import { Cep } from "@/models/Cep";
import { buscarCep } from "@/services/servicoCep";

const TAMANHO_CEP = 8;

export function useBuscaCepViewModel() {
  const [cep, setCep] = useState("");
  const [resultado, setResultado] = useState<Cep | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function alterarCep(valor: string) {
    setCep(valor);

    if (erro) {
      setErro(null);
    }
  }

  async function buscar() {
    const cepSanitizado = cep.replace(/\D/g, "");

    if (cepSanitizado.length !== TAMANHO_CEP) {
      setErro("Informe um CEP válido com 8 dígitos.");
      setResultado(null);
      return;
    }

    setCarregando(true);
    setErro(null);
    setResultado(null);

    try {
      const dados = await buscarCep(cepSanitizado);
      setResultado(dados);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível encontrar o CEP informado.");
    } finally {
      setCarregando(false);
    }
  }

  return {
    cep,
    definirCep: alterarCep,
    resultado,
    carregando,
    erro,
    buscar,
  };
}
