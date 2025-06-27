package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

    //dohvata sve porudzbine u odredjenom intervalu
    public List<PorudzbinaInfo> getAllPorudzbine(String datumOD, String datumDO) {
        try (Connection con = DB.source().getConnection()) {
            PreparedStatement ps = con
                    .prepareStatement("select porudzbina.idporudzbina, porudzbina.datum, porudzbina.iznos, sum(stavka.kolicina), \n" + //       
                                    "k.ime, k.prezime, k.email, k.lozinka, k.telefon, k.adresa, g.naziv, k.tip \n" + //
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
                        rs.getString(11),
                        rs.getInt(12));
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

    //dohvata sve artikle koji su poruceni u odredjenom intervalu
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
   
    //filtrira artikle po raznim parametrima
    public List<Artikal> filtrirajArtikle(String grupa, String podgrupa, String proizvodjac, String marka,
            String sortBy, int page, int size) {

        StringBuilder sql = new StringBuilder(
            "SELECT a.idArtikl, a.naziv, v.naziv AS vrsta, pv.naziv AS podvrsta, " +
            "pr.naziv AS proizvodjac, m.naziv AS marka, a.kolicina, a.cena_p, a.cena_n " +
            "FROM artikl a " +
            "INNER JOIN podvrsta pv ON a.idpodvrsta = pv.idpodvrsta " +
            "INNER JOIN vrsta v ON pv.idvrsta = v.idVrsta " +
            "INNER JOIN proizvodjac pr ON a.idproizvodjac = pr.idProizvodjac " +
            "INNER JOIN marka m ON a.idmarka = m.idmarka " +
            "WHERE 1=1"
        );

        List<Object> params = new ArrayList<>();

        if (grupa != null && !grupa.isEmpty()) {
            sql.append(" AND v.naziv = ?");
            params.add(grupa);
        }
        if (podgrupa != null && !podgrupa.isEmpty()) {
            sql.append(" AND pv.naziv = ?");
            params.add(podgrupa);
        }
        if (proizvodjac != null && !proizvodjac.isEmpty()) {
            sql.append(" AND pr.naziv = ?");
            params.add(proizvodjac);
        }
        if (marka != null && !marka.isEmpty()) {
            sql.append(" AND m.naziv = ?");
            params.add(marka);
        }

        sql.append(" ORDER BY ").append(sortBy).append(" ASC");

        // Pagination
        sql.append(" LIMIT ? OFFSET ?");
        params.add(size);
        params.add(page * size);

        try (Connection conn = DB.source().getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            ResultSet rs = ps.executeQuery();
            List<Artikal> lista = new ArrayList<>();
            while (rs.next()) {
                lista.add(new Artikal(
                    rs.getInt("idArtikl"),
                    rs.getString("naziv"),
                    rs.getString("proizvodjac"),
                    rs.getString("marka"),
                    rs.getString("vrsta"),
                    rs.getString("podvrsta"),
                    rs.getInt("kolicina"),
                    rs.getInt("cena_p"),
                    rs.getInt("cena_n")
                ));
            }
            return lista;

        } catch (SQLException e) {
            throw new RuntimeException("Greška prilikom filtriranja artikala", e);
        }
    }
}
