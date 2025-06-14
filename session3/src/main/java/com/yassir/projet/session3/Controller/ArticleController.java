package com.yassir.projet.session3.Controller;

import com.yassir.projet.session3.Model.Article;
import com.yassir.projet.session3.Service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/articles")
public class ArticleController {
    @Autowired
    IArticleService articleService;

    // add an article
    @PostMapping("/create")
    public void create(@RequestBody Article article) {
        articleService.createArticle(article);
    }

    // get all articles
    @GetMapping("/all")
    public List<Article> getAll() {
        return articleService.findAllArticles();
    }

    // update an article
    @PutMapping("/update/{code}")
    public void update(@PathVariable String code, @RequestBody Article article) {
        article.setCode(code);
        articleService.updateArticle(article);
    }

    // delete an article
    @DeleteMapping("/delete/{code}")
    public void delete(@PathVariable String code) {
        articleService.deleteArticle(code);
    }

    // find article by code
    @GetMapping("/{code}")
    public Optional<Article> get(@PathVariable String code) {
        return articleService.getArticleById(code);
    }
}