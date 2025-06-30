package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.config.JwtUtil;
import com.example.backend.db.dao.KorisnikRepo;
import com.example.backend.models.Korisnik;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final KorisnikRepo korisnikRepo = new KorisnikRepo();

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String lozinka = body.get("lozinka");

        Korisnik korisnik = korisnikRepo.login(email, lozinka);
        if (korisnik == null) {
            throw new RuntimeException("Pogrešan email ili lozinka.");
        }
        int idKorisnika = korisnikRepo.dohvatiId(email);

        String token = jwtUtil.generateToken(korisnik.getEmail(), korisnik.getTip());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("tip", String.valueOf(korisnik.getTip()));
        response.put("id", String.valueOf(idKorisnika)); // Dodaj ID korisnika
        return response;
    }

     @GetMapping("/profil")
    public ResponseEntity<Korisnik> dohvatiProfil(@RequestHeader("Authorization") String authHeader) {
        try {
            // Izvlačenje tokena iz Authorization zaglavlja: "Bearer token"
            String token = authHeader.replace("Bearer ", "");
            // Izvlačenje emaila iz tokena
            String email = jwtUtil.extractClaims(token).getSubject();

            // Dohvatanje korisnika iz baze po emailu
            Korisnik korisnik = korisnikRepo.nadjiPoEmailu(email);
            if (korisnik == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return ResponseEntity.ok(korisnik);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}