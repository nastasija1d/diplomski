package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.VlasnikRepo;
import com.example.backend.models.Proizvodjac;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/vlasnik")
public class VlasnikController {

    @GetMapping("/finansije/brend")
    public List<Proizvodjac> getByBrend( @RequestParam String datumOD, @RequestParam String datumDO) {
        return new VlasnikRepo().getByMarka(datumOD, datumDO);
    }

    @GetMapping("/finansije/proizvodjac")
    public List<Proizvodjac> getByProizvodjac( @RequestParam String datumOD, @RequestParam String datumDO) {
        return new VlasnikRepo().getByProizvodjac(datumOD, datumDO);
    }

    @GetMapping("/finansije/kategorija")
    public List<Proizvodjac> getByKategorija(@RequestParam String datumOD, @RequestParam String datumDO) {
        return new VlasnikRepo().getByKategorija(datumOD, datumDO);
    }
    
    
}
