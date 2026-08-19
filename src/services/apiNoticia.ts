import axios from "axios";

export const apiNoticia = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEWS_API_BASE_URL ?? "/api/noticias",
});
