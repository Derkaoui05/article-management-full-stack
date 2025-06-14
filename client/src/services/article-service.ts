// src/services/articleService.ts
import apiService from './api-sevice';

export const getArticles = async () => {
  const response = await apiService.get<Article[]>('/articles/all');
  return response.data;
};
export const createArticle = async (article: Article) => {
  const response = await apiService.post<Article>('/articles/create', article);
  return response.data;
  };

export interface Article {
  code: string;
  designation: string;
  price: number;
}
