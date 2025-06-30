package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors(withDefaults()) // omogućava CORS
            .csrf(csrf -> csrf.disable()) // isključuje CSRF za stateless JWT
            .authorizeHttpRequests(auth -> auth
                // JAVNE RUTE
                .requestMatchers("/auth/login").permitAll()
                .requestMatchers("/artikal/**").permitAll()
                .requestMatchers("/grad/**").permitAll()
                .requestMatchers("/korisnik/**").permitAll()
                .requestMatchers("/parametri/**").permitAll()
                .requestMatchers("/slika/**").permitAll()

                // RUTE ZA ADMINA
                .requestMatchers("/porudzbina/dohvatiAktivne", "/porudzbina/posalji")
                    .hasRole("ADMIN")
                .requestMatchers("/vlasnik/**")
                    .hasRole("ADMIN")

                // RUTE ZA KUPCA
                .requestMatchers("/porudzbina/**")
                    .hasRole("KUPAC")

                // sve ostalo zahteva autentifikaciju
                .anyRequest().authenticated()
            )
            // dodavanje JWT filtera pre Spring filtera za login
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // frontend domen
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); // ako šalješ credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
