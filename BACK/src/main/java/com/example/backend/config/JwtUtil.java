package com.example.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Ključ će biti generisan jednom prilikom pokretanja aplikacije
    private Key key;

    // Vreme važenja: 1 sat
    private final long expiration = 1000 * 60 * 60;

    @PostConstruct
    public void init() {
        // Automatski kreira 512-bitni HMAC ključ za HS512
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    /**
     * Generiše JWT token sa subject = email i claim "uloga" = KUPAC|ADMIN
     */
    public String generateToken(String email, int tip) {
        String uloga = (tip == 2) ? "ADMIN" : "KUPAC";

        return Jwts.builder()
                .setSubject(email)
                .claim("uloga", uloga)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)                    // koristi HS512 key
                .compact();
    }

    /**
     * Parsira i vraća sve claim-ove iz tokena
     */
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    /**
     * Proverava da li je token validan (nije istekao i ispravan je signature)
     */
    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
