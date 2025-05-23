package com.cultura.insight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FilmesController {

    @GetMapping("/filmes")
    public String paginaFilmes() {
        return "filmes";
    }
}
