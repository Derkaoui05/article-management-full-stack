package com.yassir.projet.session3.Service;

import com.yassir.projet.session3.Model.Article;

import java.util.List;
import java.util.Optional;

public interface IArticleService {
    void createArticle(Article article);
    void updateArticle(Article article);
    //void deleteArticle(Article article);
    void deleteArticle(String code);
    List<Article> findAllArticles();
    Optional<Article> getArticleById(String code);
}