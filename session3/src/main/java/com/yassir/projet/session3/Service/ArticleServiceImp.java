package com.yassir.projet.session3.Service;

import com.yassir.projet.session3.Model.Article;
import com.yassir.projet.session3.Repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleServiceImp implements IArticleService{
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public void createArticle(Article article) {
        if (articleRepository.existsById(article.getCode())){
            System.out.println("article already exists");
        }
        else {
            articleRepository.save(article);
        }
    }

    @Override
    public void updateArticle(Article article) {
        if (!articleRepository.existsById(article.getCode())){
            System.out.println("article not found");
        }
        else {
            articleRepository.save(article);
        }
    }

    @Override
    public void deleteArticle(String code) {
        if (!articleRepository.existsById(code)){
            System.out.println("article not found");
        }
        else {
            articleRepository.deleteById(code);
        }
    }

    @Override
    public List<Article> findAllArticles() {
        return articleRepository.findAll();
    }
    @Override
    public Optional<Article> getArticleById(String code) {
        return articleRepository.findById(code);
    }
}
