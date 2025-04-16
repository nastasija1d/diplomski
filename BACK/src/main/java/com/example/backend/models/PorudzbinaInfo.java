package com.example.backend.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class PorudzbinaInfo {
    private int idPorudzbina;
    private Korisnik korisnik;
    private Date datum;
    private int iznos;
    private int idStatus;
    private List<Artikal> artikli;

    public PorudzbinaInfo(int idPorudzbina, Korisnik idKorisnik, Date datum, int iznos, int idStatus,
            List<Artikal> artikli) {
        this.idPorudzbina = idPorudzbina;
        this.korisnik = idKorisnik;
        this.datum = datum;
        this.iznos = iznos;
        this.idStatus = idStatus;
        this.artikli = artikli;
    }

    public PorudzbinaInfo(int idPorudzbina, Korisnik idKorisnik, Date datum, int iznos, int idStatus) {
        this.idPorudzbina = idPorudzbina;
        this.korisnik = idKorisnik;
        this.datum = datum;
        this.iznos = iznos;
        this.idStatus = idStatus;
        this.artikli = new ArrayList<>();
    }

    public int getIdPorudzbina() {
        return this.idPorudzbina;
    }

    public void setIdPorudzbina(int idPorudzbina) {
        this.idPorudzbina = idPorudzbina;
    }

    public Korisnik getKorisnik() {
        return this.korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public Date getDatum() {
        return this.datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public int getIznos() {
        return this.iznos;
    }

    public void setIznos(int iznos) {
        this.iznos = iznos;
    }

    public int getIdStatus() {
        return this.idStatus;
    }

    public void setIdStatus(int idStatus) {
        this.idStatus = idStatus;
    }

    public List<Artikal> getArtikli() {
        return this.artikli;
    }

    public void setArtikli(List<Artikal> artikli) {
        this.artikli = artikli;
    }

    @Override
    public String toString() {
        String s = "{" +
                " idPorudzbina='" + getIdPorudzbina() + "'" +
                ", Korisnik='" + getKorisnik().getEmail() + "'" +
                ", datum='" + getDatum() + "'" +
                ", iznos='" + getIznos() + "'" +
                ", idStatus='" + getIdStatus() + "'" +
                "ARTIKLI:/n";
        for (Artikal a : artikli) {
            s += a.toString() + "/n";
        }

        return s;
    }

}
