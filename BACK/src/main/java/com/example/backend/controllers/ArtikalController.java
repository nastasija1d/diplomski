package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.ArtikalRepo;
import com.example.backend.models.Artikal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/artikal")
@CrossOrigin(origins = "http://localhost:4200")
public class ArtikalController {

    @GetMapping("{id}")
    public Artikal getArtikal(@PathVariable int id) {
        return new ArtikalRepo().getArtikl(id);
    }

    @GetMapping("svi")
    public List<Artikal> getAll() {
        return new ArtikalRepo().getAll();
    }

    @GetMapping("podgrupa/{id}")
    public List<Artikal> getPodgrupa(@PathVariable String id) {
        String naziv = id.replace("_", " ");
        return new ArtikalRepo().getAllOfPodgrupa(naziv);
    }

    @GetMapping("/filter/{id}")
    public List<Artikal> filtrirajArtikle(
            @PathVariable String id,
            @RequestParam(required = false) String marka,
            @RequestParam(required = false) String proizvodjac,
            @RequestParam(required = false) Integer minKolicina,
            @RequestParam(required = false) Integer minCena,
            @RequestParam(required = false) Integer maxCena) {
        String naziv = id.replace("_", " ");
        return new ArtikalRepo().filtrirajArtikle(naziv, proizvodjac, marka, minKolicina, minCena, maxCena);
    }

    @GetMapping("pretraga")
    public List<Artikal> pretraga(String str) {
        return null;
    }

    @PostMapping("/dodaj")
    public int dodajNoviArtikal(@RequestBody Artikal entity) {
        return new ArtikalRepo().dodajArtikal(entity);
    }

}
