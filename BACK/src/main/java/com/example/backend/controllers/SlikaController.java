package com.example.backend.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/slika")
@CrossOrigin(origins = "http://localhost:4200")
public class SlikaController {

    private static final String SLIKE_FOLDER = "back/src/main/resources/static/images/";

    @GetMapping("/podgrupa/{nazivPodGrupe}")
    public ResponseEntity<Resource> getPodGrupaSlika(@PathVariable String nazivPodGrupe) {
        try {
            Path putanjaDoSlike = Paths.get(SLIKE_FOLDER + "podgrupe/" + nazivPodGrupe + ".jpeg");
            Resource slika = new UrlResource(putanjaDoSlike.toUri());
            if (slika.exists() && slika.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(putanjaDoSlike))
                        .body(slika);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/grupa/{nazivGrupe}")
    public ResponseEntity<Resource> getGrupaSlika(@PathVariable String nazivGrupe) {
        try {
            Path putanjaDoSlike = Paths.get(SLIKE_FOLDER + "grupe/" + nazivGrupe + ".jpeg");
            Resource slika = new UrlResource(putanjaDoSlike.toUri());
            if (slika.exists() && slika.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(putanjaDoSlike))
                        .body(slika);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/marka/{nazivGrupe}")
    public ResponseEntity<Resource> getMarkaSlika(@PathVariable String nazivGrupe) {
        try {
            Path putanjaDoSlike = Paths.get(SLIKE_FOLDER + "marke/" + nazivGrupe + ".png");
            Resource slika = new UrlResource(putanjaDoSlike.toUri());
            if (slika.exists() && slika.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(putanjaDoSlike))
                        .body(slika);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

}
