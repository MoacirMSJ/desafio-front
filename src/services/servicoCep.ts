import axios from "axios";
import { apiCep } from "./apiCep";
import { Cep } from "@/models/Cep";

export async function buscarCep(cep: string): Promise<Cep> {
  const cepSanitizado = cep.replace(/\D/g, "");

  try {
    const resposta = await apiCep.get<Cep>(`/${cepSanitizado}/json`);

    if (resposta.data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return resposta.data;
  } catch (erro) {
    if (axios.isAxiosError(erro)) {
      throw new Error("Não foi possível conectar ao serviço de CEP. Tente novamente.");
    }

    throw erro;
  }
}
