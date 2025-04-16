package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

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
}
