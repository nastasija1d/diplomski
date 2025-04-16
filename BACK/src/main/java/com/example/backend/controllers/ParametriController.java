package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.ArtikalRepo;
import com.example.backend.db.dao.ParametriRepo;
import com.example.backend.models.Proizvodjac;

@RestController
@RequestMapping("/parametri")
@CrossOrigin(origins = "http://localhost:4200")
public class ParametriController {

    @GetMapping("marka/svi")
    public List<String> getAllBrend() {
        return new ParametriRepo().getAllMarke();
    }

    @GetMapping("proizvodjac/svi")
    public List<String> getAllProizvodjaci() {
        return new ParametriRepo().getAllProizvodjaci();
    }

    @GetMapping("vrsta/svi")
    public List<String> getAllVrste() {
        return new ArtikalRepo().getAllVrste();
    }

    @GetMapping("vrsta/{id}")
    public List<String> getPodVrste(@PathVariable String id) {
        String naziv = id.replace("_", " ");
        return new ArtikalRepo().getAllPodVrste(naziv);
    }

    @GetMapping("proizvodjac/{id}")
    public List<Proizvodjac> getProizvodjaciOfPodgrupa(@PathVariable String id) {
        String naziv = id.replace("_", " ");
        return new ParametriRepo().getProizvodjaciOfPodgrupa(naziv);
    }

    @GetMapping("dostupno/{id}")
    public List<Integer> getDostupnoOfPodgrupa(@PathVariable String id) {
        String naziv = id.replace("_", " ");
        return new ParametriRepo().getDostupnoOfPodgrupa(naziv);
    }

    @GetMapping("minmaxcena/{id}")
    public List<Integer> getMinMaxCenaOfPodgrupa(@PathVariable String id) {
        String naziv = id.replace("_", " ");
        return new ParametriRepo().getMinMaxCenaOfPodgrupa(naziv);
    }

}
