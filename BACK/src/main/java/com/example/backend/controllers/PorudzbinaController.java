package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.PorudzbinaRepo;
import com.example.backend.models.Artikal;
import com.example.backend.models.Porudzbina;
import com.example.backend.models.PorudzbinaInfo;
import com.example.backend.services.EmailService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/porudzbina")
@CrossOrigin(origins = "http://localhost:4200")
public class PorudzbinaController {
    private final EmailService emailService;

    public PorudzbinaController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("")
    public List<Artikal> getMethodName() {
        return new PorudzbinaRepo().dohvatiStavkeIzPorudzbine(1);
    }

    @GetMapping("/dohvatiAktivne")
    public List<PorudzbinaInfo> dohvatiAktivnePorudzbine() {
        return new PorudzbinaRepo().dohvatiAktivnePorudzbine();
    }

    @PostMapping("/dodaj")
    public int dodajArtikalUKorpu(@RequestBody Porudzbina porudzbina) {
        return new PorudzbinaRepo().addToCart(porudzbina.getIdKorisnik(), porudzbina.getIdArtikl());
    }

    @PostMapping("/ukloni")
    public int ukloniArtikalIzKorpe(@RequestBody Porudzbina porudzbina) {
        return new PorudzbinaRepo().removeFromCart(porudzbina.getIdKorisnik(), porudzbina.getIdArtikl());
    }

    @PostMapping("/izbaci")
    public int izbaciJedanArtikal(@RequestBody Porudzbina porudzbina) {
        return new PorudzbinaRepo().removeOneFromCart(porudzbina.getIdKorisnik(), porudzbina.getIdArtikl());
    }

    @GetMapping("/korpa")
    public List<Artikal> dohvatiArtikleIzKorpe(@RequestParam int korisnik) {
        return new PorudzbinaRepo().dohvatiArtikleIzKorpe(korisnik);
    }

    @GetMapping("/brojArtikala")
    public int brojArtikalaUKorpi(@RequestParam int korisnik) {
        return new PorudzbinaRepo().brojArtikalaUKorpi(korisnik);
    }

    @PostMapping("/naruci")
    public int poruci(@RequestBody Porudzbina porudzbina) {
        int idPorudzbina = new PorudzbinaRepo().poruci(porudzbina.getIdKorisnik());
        if (idPorudzbina == 0)
            return 0;
        this.emailService.sendConfirmOrderEmail(porudzbina.getIdKorisnik(), idPorudzbina);
        return idPorudzbina;
    }

    @PostMapping("/posalji")
    public int posaljiPorudzbinu(@RequestBody int idPorudzbina) {
        return new PorudzbinaRepo().posaljiPorudzbinu(idPorudzbina);
    }

}
