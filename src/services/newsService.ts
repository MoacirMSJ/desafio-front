import { newsApi } from "./newsApi";
import { NewsResponse } from "@/models/News";

export async function fetchTopHeadlines(country = "br"): Promise<NewsResponse> {
  const response = await newsApi.get<NewsResponse>("/top-headlines", {
    params: { country },
  });

  return response.data;
}
