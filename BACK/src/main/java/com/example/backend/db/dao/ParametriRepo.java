package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Proizvodjac;

public class ParametriRepo {

    public List<String> getAllMarke() {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("select naziv from marka")) {
            ResultSet rs = ps.executeQuery();
            List<String> marke = new ArrayList<>();
            while (rs.next()) {
                marke.add(rs.getString(1));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getAllModels(String brand) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT model.naziv FROM model INNER JOIN brend ON model.idBrend=brend.idBrend WHERE brend.naziv=?")) {
            ps.setString(1, brand);
            ResultSet rs = ps.executeQuery();
            List<String> marke = new ArrayList<>();
            while (rs.next()) {
                marke.add(rs.getString(1));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getAllProizvodjaci() {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("select naziv from proizvodjac")) {
            ResultSet rs = ps.executeQuery();
            List<String> marke = new ArrayList<>();
            while (rs.next()) {
                marke.add(rs.getString(1));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Proizvodjac> getProizvodjaciOfPodgrupa(String podvrsta) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT proizvodjac.naziv, count(*) as broj\n" + //
                                "from (proizvodjac inner join artikl\n" + //
                                "on artikl.idProizvodjac=proizvodjac.idProizvodjac)\n" + //
                                "inner join podvrsta on podvrsta.idPodVrsta = artikl.idPodVrsta\n" + //
                                "where podvrsta.naziv = ? \n" + //
                                "group by proizvodjac.naziv\n" + //
                                "order by broj desc")) {
            ps.setString(1, podvrsta);
            ResultSet rs = ps.executeQuery();
            List<Proizvodjac> marke = new ArrayList<>();
            while (rs.next()) {
                marke.add(new Proizvodjac(rs.getString(1), rs.getInt(2)));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Integer> getDostupnoOfPodgrupa(String podvrsta) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT COUNT(*) AS Ukupno,\n" + //
                                "SUM(CASE WHEN Kolicina >= 1 THEN 1 ELSE 0 END) AS Dostupno\n" + //
                                "FROM Artikl inner join podvrsta \n" + //
                                "on artikl.idPodVrsta = podvrsta.idPodVrsta\n" + //
                                "where podvrsta.naziv = ?")) {
            ps.setString(1, podvrsta);
            ResultSet rs = ps.executeQuery();
            List<Integer> marke = new ArrayList<>();
            if (rs.next()) {
                marke.add(rs.getInt(1));
                marke.add(rs.getInt(2));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Integer> getMinMaxCenaOfPodgrupa(String podvrsta) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT min(artikl.cena_p), max(artikl.cena_p)\n" + //
                                "FROM Artikl inner join podvrsta \n" + //
                                "on artikl.idPodVrsta = podvrsta.idPodVrsta\n" + //
                                "where podvrsta.naziv = ?")) {
            ps.setString(1, podvrsta);
            ResultSet rs = ps.executeQuery();
            List<Integer> marke = new ArrayList<>();
            if (rs.next()) {
                marke.add(rs.getInt(1));
                marke.add(rs.getInt(2));
            }
            return marke;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
