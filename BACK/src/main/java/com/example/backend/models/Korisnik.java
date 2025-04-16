package com.example.backend.models;

public class Korisnik {
    private String ime;
    private String prezime;
    private String email;
    private String lozinka;
    private String telefon;
    private String adresa;
    private String grad;

    public Korisnik(String ime, String prezime, String email, String lozinka, String telefon, String adresa,
            String grad) {
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.lozinka = lozinka;
        this.telefon = telefon;
        this.adresa = adresa;
        this.grad = grad;
    }

    public String getIme() {
        return this.ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return this.prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return this.lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getTelefon() {
        return this.telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getAdresa() {
        return this.adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getGrad() {
        return this.grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }
}
