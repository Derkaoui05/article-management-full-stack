package com.yassir.projet.session3.Repository;

import com.yassir.projet.session3.Model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, String> {
    void deleteByDesignation(String title);
    void findArticlesByDesignation(String designation);
}
