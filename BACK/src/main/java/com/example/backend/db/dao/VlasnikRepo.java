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
import com.example.backend.models.Proizvodjac;

public class VlasnikRepo {

    public List<Proizvodjac> getByMarka(String datumOD, String datumDO){
        try (Connection con = DB.source().getConnection()){
            PreparedStatement ps = con.prepareStatement("select marka.naziv, sum(stavka.kolicina) as broj\n" + //
                                "from porudzbina inner join stavka on\n" + //
                                "stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                                "inner join artikl on \n" + //
                                "artikl.idArtikl = stavka.idArtikl\n" + //
                                "inner join marka on\n" + //
                                "marka.idMarka = artikl.idMarka\n" + //
                                "where porudzbina.datum>=?\n" + //
                                "and porudzbina.datum<=?\n" + //
                                "group by artikl.idmarka\n" + //
                                "order by sum(stavka.kolicina) desc");
            ps.setString(1, datumOD);
            ps.setString(2, datumDO);
            List<Proizvodjac> pr = new ArrayList<Proizvodjac>();
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                pr.add(new Proizvodjac(rs.getString(1), rs.getInt(2)));
            }
            return pr;
        } catch (Exception e) {
            return null;
        }
    }

    public List<Proizvodjac> getByProizvodjac(String datumOD, String datumDO){
        try (Connection con = DB.source().getConnection()){
            PreparedStatement ps = con.prepareStatement("select proizvodjac.naziv, sum(stavka.kolicina) as broj\n" + //
                                "from porudzbina inner join stavka on\n" + //
                                "stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                                "inner join artikl on \n" + //
                                "artikl.idArtikl = stavka.idArtikl\n" + //
                                "inner join proizvodjac on\n" + //
                                "proizvodjac.idproizvodjac = artikl.idproizvodjac\n" + //
                                "where porudzbina.datum>=?\n" + //
                                "and porudzbina.datum<=?\n" + //
                                "group by artikl.idproizvodjac\n" + //
                                "order by sum(stavka.kolicina) desc");
            ps.setString(1, datumOD);
            ps.setString(2, datumDO);
            List<Proizvodjac> pr = new ArrayList<Proizvodjac>();
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                pr.add(new Proizvodjac(rs.getString(1), rs.getInt(2)));
            }
            return pr;
        } catch (Exception e) {
            return null;
        }
    }

    public List<Proizvodjac> getByKategorija(String datumOD, String datumDO) {
        try (Connection con = DB.source().getConnection()){
            PreparedStatement ps = con.prepareStatement("select vrsta.naziv, sum(stavka.kolicina) as broj\n" + //
                                "from porudzbina inner join stavka on\n" + //
                                "stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                                "inner join artikl on \n" + //
                                "artikl.idArtikl = stavka.idArtikl\n" + //
                                "inner join podvrsta on\n" + //
                                "podvrsta.idPodVrsta = artikl.idPodVrsta\n" + //
                                "inner join vrsta on\n" + //
                                "vrsta.idVrsta = podvrsta.idVrsta\n" + //
                                "where porudzbina.datum>=?\n" + //
                                "and porudzbina.datum<=?\n" + //
                                "group by podvrsta.idVrsta\n" + //
                                "order by sum(stavka.kolicina) desc");
            ps.setString(1, datumOD);
            ps.setString(2, datumDO);
            List<Proizvodjac> pr = new ArrayList<Proizvodjac>();
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                pr.add(new Proizvodjac(rs.getString(1), rs.getInt(2)));
            }
            return pr;
        } catch (Exception e) {
            return null;
        }
    }

    public List<PorudzbinaInfo> getAllPorudzbine(String datumOD, String datumDO) {
        try (Connection con = DB.source().getConnection()) {
            PreparedStatement ps = con
                    .prepareStatement("select porudzbina.idporudzbina, porudzbina.datum, porudzbina.iznos, sum(stavka.kolicina), \n" + //       
                                    "k.ime, k.prezime, k.email, k.lozinka, k.telefon, k.adresa, g.naziv \n" + //
                                    "from porudzbina inner join stavka on \n" + //
                                    "stavka.idporudzbina = porudzbina.idporudzbina \n" + //
                                    "inner join korisnik k on \n" + //
                                    "k.idkorisnik = porudzbina.idkorisnik \n" + //
                                    "inner join grad g on g.idgrad = k.idgrad \n" + //
                                    "where porudzbina.datum>= ?\n" + //
                                    "and porudzbina.datum<= ?\n" + //
                                    "group by porudzbina.idporudzbina\n" + //
                                    "order by porudzbina.datum");
            ps.setString(1, datumOD);
            ps.setString(2, datumDO);
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
                lista.add(porudzbina);
            }
            return lista;
        } catch (Exception e) {
            return null;
        }
    
    }

    public List<Artikal> getArtikle(String datumOD, String datumDO) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "select artikl.idArtikl, artikl.naziv, proizvodjac.naziv, marka.naziv,\n" +
                        "podvrsta.naziv, artikl.kolicina, artikl.cena_p, sum(stavka.kolicina)\n" + //
                        "from artikl inner join podvrsta on artikl.idPodVrsta = podvrsta.idpodvrsta\n" + //
                        "inner join marka on marka.idmarka=artikl.idmarka\n" + //
                        "inner join proizvodjac on proizvodjac.idproizvodjac = artikl.idproizvodjac\n" + //
                        "inner join stavka on stavka.idArtikl = artikl.idArtikl\n" + //
                        "inner join porudzbina on porudzbina.idporudzbina = stavka.idporudzbina\n" + //
                        "where porudzbina.datum>=? and porudzbina.datum<=?\n" + //
                        "group by artikl.idArtikl\n" + //
                        "order by sum(stavka.kolicina) desc, artikl.idArtikl\n" + //
                        "")) {
            ps.setString(1, datumOD);
            ps.setString(2, datumDO);
            ResultSet rs = ps.executeQuery();
            List<Artikal> lista = new ArrayList<>();
            while (rs.next()) {
                lista.add(new Artikal(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        null,
                        rs.getString(5),
                        rs.getInt(6),
                        rs.getInt(7),
                        rs.getInt(8)));
            }
            return lista;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
