export interface News {
  _id: string;
  title: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface NewsInput {
  title: string;
  description: string;
}

export interface NewsListResponse {
  data: News[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
