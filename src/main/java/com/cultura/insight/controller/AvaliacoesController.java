package com.cultura.insight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AvaliacoesController {

    @GetMapping("/avaliacoes")
    public String avaliacoes() {
        return "avaliacoes";
    }
}
