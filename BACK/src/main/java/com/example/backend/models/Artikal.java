package com.example.backend.models;

public class Artikal {
    private int id;
    private String naziv;
    private String proizvodjac;
    private String marka;
    private String vrsta;
    private String podVrsta;
    private int kolicina;
    private int cena_prodajna;
    private int cena_nabavna;
    private int korpa;

    public Artikal() {
    }

    public Artikal(int id, String naziv, String proizvodjac, String marka, String vrsta, String podVrsta, int kolicina,
            int cena_prodajna, int cena_nabavna) {
        this.id = id;
        this.naziv = naziv;
        this.proizvodjac = proizvodjac;
        this.marka = marka;
        this.vrsta = vrsta;
        this.podVrsta = podVrsta;
        this.kolicina = kolicina;
        this.cena_prodajna = cena_prodajna;
        this.cena_nabavna = cena_nabavna;
        this.korpa = 0;
    }

    public Artikal(int id, String naziv, String proizvodjac, String marka, String vrsta, String podVrsta, int kolicina,
            int cena_prodajna, int cena_nabavna, int uKorpi) {
        this.id = id;
        this.naziv = naziv;
        this.proizvodjac = proizvodjac;
        this.marka = marka;
        this.vrsta = vrsta;
        this.podVrsta = podVrsta;
        this.kolicina = kolicina;
        this.cena_prodajna = cena_prodajna;
        this.cena_nabavna = cena_nabavna;
        this.korpa = uKorpi;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getProizvodjac() {
        return proizvodjac;
    }

    public void setProizvodjac(String proizvodjac) {
        this.proizvodjac = proizvodjac;
    }

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public String getPodVrsta() {
        return podVrsta;
    }

    public void setPodVrsta(String podVrsta) {
        this.podVrsta = podVrsta;
    }

    public int getKolicina() {
        return kolicina;
    }

    public void setKolicina(int kolicina) {
        this.kolicina = kolicina;
    }

    public int getCena_prodajna() {
        return cena_prodajna;
    }

    public void setCena_prodajna(int cena_prodajna) {
        this.cena_prodajna = cena_prodajna;
    }

    public int getCena_nabavna() {
        return cena_nabavna;
    }

    public void setCena_nabavna(int cena_nabavna) {
        this.cena_nabavna = cena_nabavna;
    }

    public int getKorpa() {
        return korpa;
    }

    public void setUKorpi(int uKorpi) {
        this.korpa = uKorpi;
    }

    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    @Override
    public String toString() {
        return "Artikal [" + "naziv=" + naziv +
                ", cena_prodajna=" + cena_prodajna +
                ", id=" + id +
                ", kolicina=" + kolicina +
                ", marka=" + marka +
                ", podVrsta=" + podVrsta +
                ", proizvodjac=" + proizvodjac +
                ", uKorpi=" + korpa + "]";
    }

}
