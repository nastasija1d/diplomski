package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.KorisnikRepo;
import com.example.backend.models.Korisnik;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/korisnik")
@CrossOrigin(origins = "http://localhost:4200")
public class KorisnikController {

    @PostMapping("/registracija")
    public int postMethodName(@RequestBody Korisnik entity) {
        return new KorisnikRepo().dodajKorisnika(entity);
    }

    @GetMapping("/{id}")
    public Korisnik getKorisnikById(@PathVariable String id) {
        return new KorisnikRepo().getKorisnik(id);
    }
}
