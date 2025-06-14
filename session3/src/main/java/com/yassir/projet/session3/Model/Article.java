package com.yassir.projet.session3.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Article {
    @Id
    private String code;
    private String designation;
    private Float price;

    public Article() {
    }
    public Article(String code, String designation, Float price) {
        this.code = code;
        this.designation = designation;
        this.price = price;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Article{" +
                "code='" + code + '\'' +
                ", designation='" + designation + '\'' +
                ", prix=" + price +
                '}';
    }
}