package com.example.backend.models;

public class PodVrsta {
    private String naziv;
    private int broj;
    private String vrsta;

    public PodVrsta(String naziv, int broj) {
        this.naziv = naziv;
        this.broj = broj;
        this.vrsta = null;
    }

    public PodVrsta(String naziv, int broj, String vrsta) {
        this.naziv = naziv;
        this.broj = broj;
        this.vrsta = vrsta;
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

    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

}