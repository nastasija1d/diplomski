package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Artikal;
import com.example.backend.models.Korisnik;
import com.example.backend.models.PorudzbinaInfo;

public class PorudzbinaRepo {

    // Metoda za dohvatanje svih artikala iz korpe za korisnika sa datim id-jem
    public List<Artikal> dohvatiArtikleIzKorpe(int id) {
        try (Connection con = DB.source().getConnection()) {
            String query = "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, \n" + //
                    "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p,\n" +
                    "artikl.cena_n, stavka.kolicina AS uKorpi\n" +
                    "FROM artikl inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idProizvodjac\n" + //
                    "inner join marka on artikl.idmarka=marka.idmarka\n" + //
                    "inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta\n" + //
                    "inner join stavka on stavka.idArtikl = artikl.idArtikl\n" + //
                    "inner join porudzbina on stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                    "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                    "where porudzbina.idKorisnik=?\n" + //
                    "and porudzbina.idstatus=1\n" + //
                    "order by artikl.idPodVrsta";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            List<Artikal> lista = new ArrayList<>();
            while (rs.next()) {
                lista.add(new Artikal(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getInt(7),
                        rs.getInt(8),
                        rs.getInt(9),
                        rs.getInt(10)));
            }
            return lista;

        } catch (Exception e) {
            return null;
        }
    }

    // metoda za dodavanjeg datog artikla u korpu korisniku
    public int addToCart(int korisnikId, int artiklId) {
        try (Connection con = DB.source().getConnection()) {
            int porudzbinaId = getActiveOrderId(con, korisnikId);
            if (porudzbinaId == -1) {
                porudzbinaId = createNewOrder(con, korisnikId);
            }
            if (isItemInCart(con, porudzbinaId, artiklId)) {
                updateItemQuantity(con, porudzbinaId, artiklId);
            } else {
                addNewItem(con, porudzbinaId, artiklId);
            }
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    // metoda za uklanjanje datog artikla iz korpe korisniku
    public int removeFromCart(int korisnikId, int artiklId) {
        try (Connection con = DB.source().getConnection()) {
            int porudzbinaId = getActiveOrderId(con, korisnikId);
            if (porudzbinaId == -1) {
                return 0;
            }
            PreparedStatement ps = con.prepareStatement("Delete from stavka where idPorudzbina = ? and idArtikl = ?");
            ps.setInt(1, porudzbinaId);
            ps.setInt(2, artiklId);
            ps.executeUpdate();
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    // metoda za smanjenje kolicine datog artikla u korpi korisniku
    public int removeOneFromCart(int idKorisnik, int idArtikl) {
        try (Connection con = DB.source().getConnection()) {
            int porudzbinaId = getActiveOrderId(con, idKorisnik);
            if (porudzbinaId == -1) {
                return 0;
            }
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE stavka SET kolicina = kolicina - 1 WHERE idPorudzbina = ? AND idArtikl = ?");
            ps.setInt(1, porudzbinaId);
            ps.setInt(2, idArtikl);
            ps.executeUpdate();
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    // metoda za dohvatanje broja artikala u korpi korisnika
    public int brojArtikalaUKorpi(int korisnik) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("select sum(stavka.kolicina) from \n" + //
                        "stavka inner join porudzbina\n" + //
                        "on stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                        "where porudzbina.idstatus=1\n" + //
                        "and porudzbina.idKorisnik = ?");) {
            ps.setInt(1, korisnik);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (Exception e) {

        }
        return 0;

    }

    // metoda za porucivanje artikala iz korpe korisnika
    public int poruci(int korisnikId) {
        try (Connection con = DB.source().getConnection()) {
            int porudzbinaId = getActiveOrderId(con, korisnikId);
            if (porudzbinaId == -1) {
                return 0;
            }
            PreparedStatement ps = con.prepareStatement("UPDATE porudzbina\n" + //
                    "SET iznos = (SELECT SUM(stavka.kolicina * stavka.cena) \n" + //
                    "FROM stavka \n" + //
                    "WHERE stavka.idporudzbina = porudzbina.idporudzbina), \n" + //
                    "idstatus = 2\n" + //
                    "WHERE idporudzbina = ?;\n" + //
                    "");
            ps.setInt(1, porudzbinaId);
            ps.executeUpdate();

            PreparedStatement ps2 = con.prepareStatement("UPDATE artikl\n" + //
                    "JOIN stavka ON artikl.idArtikl = stavka.idArtikl\n" + //
                    "SET artikl.kolicina = artikl.kolicina - stavka.kolicina\n" + //
                    "WHERE stavka.idPorudzbina = ?;");
            ps2.setInt(1, porudzbinaId);
            int rows = ps2.executeUpdate();
            if (rows >= 1)
                return porudzbinaId;
            return 0;

        } catch (Exception e) {
        }
        return 0;
    }

    // metoda za dohvatanje svih stavki iz porudzbine
    public List<Artikal> dohvatiStavkeIzPorudzbine(int idPorudzbina) {
        try (Connection con = DB.source().getConnection()) {
            String query = "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, \n" + //
                    "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p,\n" +
                    "artikl.cena_n, stavka.kolicina AS uKorpi\n" +
                    "FROM artikl inner join marka on artikl.idmarka=marka.idmarka\n" + //
                    "inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta\n" + //
                    "inner join stavka on stavka.idArtikl = artikl.idArtikl\n" + //
                    "inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idproizvodjac\n" + //
                    "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                    "where stavka.idporudzbina=?\n" + //
                    "order by artikl.idPodVrsta";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, idPorudzbina);
            ResultSet rs = ps.executeQuery();
            List<Artikal> lista = new ArrayList<>();
            while (rs.next()) {
                lista.add(new Artikal(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getInt(7),
                        rs.getInt(8),
                        rs.getInt(9),
                        rs.getInt(10)));
            }
            return lista;

        } catch (Exception e) {
            return null;
        }
    }

    // metoda za dohvatanje detalja porudzbine (korisnik, datum, iznos, status)
    public PorudzbinaInfo dohvatiDetaljePorudzbina(int idPorudzbina) {
        try (Connection con = DB.source().getConnection()) {
            PreparedStatement ps = con
                    .prepareStatement("SELECT p.idporudzbina, p.datum, p.iznos, p.idstatus,\n" + //
                            "k.ime, k.prezime, k.email, k.lozinka, k.telefon, k.adresa,\n" + //
                            "g.naziv\n" + //
                            "from porudzbina p inner join korisnik k\n" + //
                            "on k.idKorisnik = p.idKorisnik\n" + //
                            "inner join grad g\n" + //
                            "on k.idGrad = g.idGrad" +
                            " where p.idporudzbina = ?");
            ps.setInt(1, idPorudzbina);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Korisnik korisnik = new Korisnik(
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11));
                PorudzbinaInfo porudzbina = new PorudzbinaInfo(
                        rs.getInt(1),
                        korisnik,
                        rs.getDate(2),
                        rs.getInt(3),
                        rs.getInt(4));

                porudzbina.setArtikli(dohvatiStavkeIzPorudzbine(idPorudzbina));
                return porudzbina;
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    // VLASNIK: metoda za dohvatanje svih novih aktivnih porudzbina
    public List<PorudzbinaInfo> dohvatiAktivnePorudzbine() {
        try (Connection con = DB.source().getConnection()) {
            PreparedStatement ps = con
                    .prepareStatement("SELECT p.idporudzbina, p.datum, p.iznos, p.idstatus,\n" + //
                            "k.ime, k.prezime, k.email, k.lozinka, k.telefon, k.adresa,\n" + //
                            "g.naziv\n" + //
                            "from porudzbina p inner join korisnik k\n" + //
                            "on k.idKorisnik = p.idKorisnik\n" + //
                            "inner join grad g\n" + //
                            "on k.idGrad = g.idGrad" +
                            " where p.idstatus = 2 " +
                            "order by p.idporudzbina");
            ResultSet rs = ps.executeQuery();
            List<PorudzbinaInfo> lista = new ArrayList<>();
            while (rs.next()) {
                Korisnik korisnik = new Korisnik(
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11));
                PorudzbinaInfo porudzbina = new PorudzbinaInfo(
                        rs.getInt(1),
                        korisnik,
                        rs.getDate(2),
                        rs.getInt(3),
                        rs.getInt(4));

                porudzbina.setArtikli(dohvatiStavkeIzPorudzbine(rs.getInt(1)));
                lista.add(porudzbina);
            }
            return lista;
        } catch (Exception e) {
            return null;
        }
    }

    // VLASNIK: metoda za slanje poruzbine (statuz iz 2 -> 3)
    public int posaljiPorudzbinu(int idPorudzbina) {
        try (Connection con = DB.source().getConnection();) {
            PreparedStatement ps = con.prepareStatement("UPDATE porudzbina SET idstatus= 3 WHERE idporudzbina = ?");
            ps.setInt(1, idPorudzbina);
            return ps.executeUpdate();
        } catch (Exception e) {
            return 0;
        }
    }

    //////////////////// privatne metode///////////////////////////////
    ///
    private int getActiveOrderId(Connection con, int korisnikId) throws Exception {
        String query = "SELECT idPorudzbina FROM porudzbina WHERE idKorisnik = ? AND idstatus = 1";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, korisnikId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        return -1;
    }

    private int createNewOrder(Connection con, int korisnikId) throws Exception {
        String query = "INSERT INTO porudzbina (datum, idstatus, idKorisnik) VALUES (NOW(), 1, ?)";
        try (PreparedStatement ps = con.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, korisnikId);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                System.out.println("Nova porudžbina je kreirana.");
                return rs.getInt(1);
            }
        }
        throw new RuntimeException("Neuspešno kreiranje nove porudžbine.");
    }

    private boolean isItemInCart(Connection con, int porudzbinaId, int artiklId) throws Exception {
        String query = "SELECT COUNT(*) FROM stavka WHERE idPorudzbina = ? AND idArtikl = ?";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, porudzbinaId);
            ps.setInt(2, artiklId);
            ResultSet rs = ps.executeQuery();
            return rs.next() && rs.getInt(1) > 0;
        }
    }

    private void updateItemQuantity(Connection con, int porudzbinaId, int artiklId) throws Exception {
        String query = "UPDATE stavka SET kolicina = kolicina + 1 WHERE idPorudzbina = ? AND idArtikl = ?";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, porudzbinaId);
            ps.setInt(2, artiklId);
            ps.executeUpdate();
        }
    }

    private void addNewItem(Connection con, int porudzbinaId, int artiklId) throws Exception {
        String query = "INSERT INTO stavka (idPorudzbina, idArtikl, cena, kolicina) " +
                "VALUES (?, ?, (SELECT cena_p FROM artikl WHERE idArtikl = ?), 1)";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, porudzbinaId);
            ps.setInt(2, artiklId);
            ps.setInt(3, artiklId);
            ps.executeUpdate();
            System.out.println("Artikal je dodat u korpu.");
        }
    }

}
