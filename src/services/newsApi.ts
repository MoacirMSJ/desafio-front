import axios from "axios";

export const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
});
