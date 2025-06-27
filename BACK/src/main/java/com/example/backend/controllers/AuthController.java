package com.example.backend.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

        String token = jwtUtil.generateToken(korisnik.getEmail(), korisnik.getTip());

        return Map.of("token", token, "tip", String.valueOf(korisnik.getTip()));
    }
}