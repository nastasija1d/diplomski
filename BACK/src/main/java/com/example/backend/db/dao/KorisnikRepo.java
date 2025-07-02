package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.backend.db.DB;
import com.example.backend.models.Korisnik;

public class KorisnikRepo {

    public int dodajKorisnika(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "insert into korisnik(ime, prezime, email, lozinka, telefon, adresa, idgrad)\n" + //
                                "values (?,?,?,?,?,?,(select idGrad from grad where postanskiBroj=?));\n")) {
            ps.setString(1, korisnik.getIme());
            ps.setString(2, korisnik.getPrezime());
            ps.setString(3, korisnik.getEmail());
            ps.setString(4, korisnik.getLozinka());
            ps.setString(5, korisnik.getTelefon());
            ps.setString(6, korisnik.getAdresa());
            ps.setString(7, korisnik.getGrad());
            return ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 404;
    }

    
    public Korisnik login(String email, String lozinka) {
        try (Connection conn = DB.source().getConnection();
             PreparedStatement ps = conn.prepareStatement(
                "select k.ime, k.prezime, k.email, k.lozinka, \n" + //
                "k.telefon, k.adresa, g.naziv, k.tip\n" + //
                "from korisnik k inner join grad g\n" + //
                "on k.idgrad = g.idgrad WHERE k.email = ? AND k.lozinka = ?")) {
            ps.setString(1, email);
            ps.setString(2, lozinka);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Korisnik k = new Korisnik(
                rs.getString("k.ime"),
                rs.getString("k.prezime"),
                rs.getString("k.email"),
                rs.getString("k.lozinka"),
                rs.getString("k.telefon"),
                rs.getString("k.adresa"),
                rs.getString("g.naziv"),
                rs.getInt("k.tip"));
                return k;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Korisnik nadjiPoEmailu(String email) {
        try (Connection conn = DB.source().getConnection();
            PreparedStatement ps = conn.prepareStatement(
                "SELECT ime, prezime, email, telefon, adresa, g.naziv AS grad " +
                "FROM korisnik k JOIN grad g ON k.idGrad = g.idGrad WHERE k.email = ?")) {

            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Korisnik k = new Korisnik();
                k.setIme(rs.getString("ime"));
                k.setPrezime(rs.getString("prezime"));
                k.setEmail(rs.getString("email"));
                k.setTelefon(rs.getString("telefon"));
                k.setAdresa(rs.getString("adresa"));
                k.setGrad(rs.getString("grad"));
                return k;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int dohvatiId(String email) {
    try (Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement(
             "SELECT idkorisnik " +
             "FROM korisnik WHERE email = ?")) {

        ps.setString(1, email);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            return rs.getInt("idkorisnik");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return -1;
}


    public Korisnik getKorisnik(String id) {
        try (Connection conn = DB.source().getConnection();
            PreparedStatement ps = conn.prepareStatement(
                "SELECT ime, prezime, email, telefon, adresa, g.naziv AS grad " +
                "FROM korisnik k JOIN grad g ON k.idGrad = g.idGrad WHERE k.idkorisnik = ?")) {

            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Korisnik k = new Korisnik();
                k.setIme(rs.getString("ime"));
                k.setPrezime(rs.getString("prezime"));
                k.setEmail(rs.getString("email"));
                k.setTelefon(rs.getString("telefon"));
                k.setAdresa(rs.getString("adresa"));
                k.setGrad(rs.getString("grad"));
                return k;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
