import axios from "axios";
import { cepApi } from "./cepApi";
import { Cep } from "@/models/Cep";

export async function fetchCep(cep: string): Promise<Cep> {
  const sanitizedCep = cep.replace(/\D/g, "");

  try {
    const response = await cepApi.get<Cep>(`/${sanitizedCep}/json`);

    if (response.data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Não foi possível conectar ao serviço de CEP. Tente novamente.");
    }

    throw error;
  }
}
