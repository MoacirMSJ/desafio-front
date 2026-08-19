import axios from "axios";
import { newsApi } from "./newsApi";
import { News, NewsInput, NewsListResponse } from "@/models/News";

export async function fetchNews(page: number, limit: number): Promise<NewsListResponse> {
  const response = await newsApi.get<NewsListResponse>("", { params: { page, limit } });
  return response.data;
}

export async function searchNewsByTitle(title: string): Promise<News[]> {
  const response = await newsApi.get<News[]>(`/${encodeURIComponent(title)}`);
  return response.data;
}

export async function createNews(input: NewsInput): Promise<News> {
  const response = await newsApi.post<News>("", input);
  return response.data;
}

export async function updateNews(id: string, input: NewsInput): Promise<News> {
  const response = await newsApi.put<News>(`/${id}`, input);
  return response.data;
}

export async function deleteNews(id: string): Promise<void> {
  try {
    await newsApi.delete(`/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Não foi possível excluir a notícia.");
    }

    throw error;
  }
}
