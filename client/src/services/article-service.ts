// src/services/article-service.ts
import apiService from './api-service';

export interface Article {
  code: string;
  designation: string;
  price: number;
}

// Update the article type to exclude code for update operations
export type ArticleUpdate = Omit<Article, 'code'>;

export const getArticles = async (): Promise<Article[]> => {
  const response = await apiService.get<Article[]>('/articles/all');
  return response.data;
};

export const createArticle = async (article: Article): Promise<Article> => {
  const response = await apiService.post<Article>('/articles/create', article);
  return response.data;
};

export const updateArticle = async (
  code: string,
  articleUpdate: ArticleUpdate,
): Promise<Article> => {
  const response = await apiService.put<Article>(`/articles/update/${code}`, articleUpdate);
  return response.data;
};

export const deleteArticle = async (code: string): Promise<void> => {
  try {
    await apiService.delete(`/articles/delete/${code}`);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Failed to delete article. Please try again.');
  }
};

export const getArticleByCode = async (code: string): Promise<Article> => {
  const response = await apiService.get<Article>(`/articles/${code}`);
  return response.data;
};
