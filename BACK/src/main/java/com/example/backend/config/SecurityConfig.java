package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
            .csrf(csrf -> csrf.disable())   // isključi CSRF za stateless JWT
            .authorizeHttpRequests(auth -> auth
                //JAVNE RUTE
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/artikal/**").permitAll()
                .requestMatchers("/grad/**").permitAll()
                .requestMatchers("/korisnik/**").permitAll()
                .requestMatchers("/parametri/**").permitAll()
                .requestMatchers("/slika/**").permitAll()

                  //RUTE ZA ADMINA
                .requestMatchers("/porudzbina/dohvatiAktivne",
                                 "/porudzbina/posalji")
                    .hasRole("ADMIN")
                    //.permitAll()
                .requestMatchers("/vlasnik/**")
                    .hasRole("ADMIN")
                    //.permitAll()

                //RUTE ZA KUPCA 
                .requestMatchers("/porudzbina/**")
                    .hasRole("KUPAC")
                    //.permitAll()

                // sve ostalo zahteva autentifikaciju
                .anyRequest().authenticated()
            )
            // ubaci JwtFilter pre Springovog UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
