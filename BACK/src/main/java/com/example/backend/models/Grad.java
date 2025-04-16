package com.example.backend.models;

public class Grad {
    private String naziv;
    private int postanskiBroj;

    public Grad(String naziv, int postanskiBroj) {
        this.naziv = naziv;
        this.postanskiBroj = postanskiBroj;
    }

    public String getNaziv() {
        return this.naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public int getPostanskiBroj() {
        return this.postanskiBroj;
    }

    public void setPostanskiBroj(int postanskiBroj) {
        this.postanskiBroj = postanskiBroj;
    }

}
