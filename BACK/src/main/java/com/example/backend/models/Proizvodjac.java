package com.example.backend.models;

public class Proizvodjac {
    String naziv;
    int broj;

    public Proizvodjac(String naziv, int broj) {
        this.naziv = naziv;
        this.broj = broj;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public int getBroj() {
        return broj;
    }

    public void setBroj(int broj) {
        this.broj = broj;
    }

}
