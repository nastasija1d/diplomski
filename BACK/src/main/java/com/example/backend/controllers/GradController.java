package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.GradRepo;
import com.example.backend.models.Grad;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/grad")
@CrossOrigin(origins = "http://localhost:4200")
public class GradController {

    @GetMapping("/svi")
    public List<Grad> getAll() {
        return new GradRepo().getAll();
    }

}
