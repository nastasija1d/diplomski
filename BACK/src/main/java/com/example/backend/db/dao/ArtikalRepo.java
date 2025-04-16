package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Artikal;

public class ArtikalRepo {

    // dohvata trazeni artikal iz baze
    public Artikal getArtikl(int id) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, \n" +
                                "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p, artikl.cena_n\n"
                                +
                                "FROM artikl inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idProizvodjac\n"
                                +
                                "inner join marka on artikl.idmarka=marka.idmarka\n" +
                                "inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta\n" +
                                "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                                "where artikl.idArtikl = ?")) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Artikal(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getInt(7),
                        rs.getInt(8),
                        rs.getInt(9));
            }
            return null;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // dohvata sve artikle iz baze
    public List<Artikal> getAll() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, \n" +
                                "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p, artikl.cena_n\n"
                                +
                                "FROM artikl inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idProizvodjac\n"
                                +
                                "inner join marka on artikl.idmarka=marka.idmarka\n" +
                                "inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta\n" +
                                "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                                "order by artikl.naziv\n" +
                                "limit 800")) {
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
                        rs.getInt(9)));
            }
            return lista;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // dohvata sve artikle iz baze koji pripadaju odredjenoj podgrupi
    public List<Artikal> getAllOfPodgrupa(String id) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, \n" +
                                "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p, artikl.cena_n\n"
                                +
                                "FROM artikl inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idProizvodjac\n"
                                +
                                "inner join marka on artikl.idmarka=marka.idmarka\n" +
                                "inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta\n" +
                                "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                                "where podvrsta.naziv = ?\n" +
                                "order by artikl.naziv\n" +
                                "limit 800")) {
            ps.setString(1, id);
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
                        rs.getInt(9)));
            }
            return lista;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // dohvata sve nazive vrsta iz baze
    public List<String> getAllVrste() {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("select naziv from vrsta order by naziv")) {
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

    // filtrira artikle po zadatim parametrima
    public List<Artikal> filtrirajArtikle(String podgrupa, String proizvodjac, String marka,
            Integer minKolicina, Integer minCena, Integer maxCena) {
        try (Connection conn = DB.source().getConnection()) {

            StringBuilder sql = new StringBuilder(
                    "SELECT artikl.idArtikl, artikl.naziv, proizvodjac.naziv, " +
                            "marka.naziv, vrsta.naziv, podVrsta.naziv, artikl.kolicina, artikl.cena_p, artikl.cena_n " +
                            "FROM artikl " +
                            "INNER JOIN proizvodjac ON artikl.idproizvodjac = proizvodjac.idProizvodjac " +
                            "INNER JOIN marka ON artikl.idmarka = marka.idmarka " +
                            "INNER JOIN podvrsta ON artikl.idpodvrsta = podvrsta.idpodvrsta " +
                            "inner join vrsta on vrsta.idVrsta = podvrsta.idvrsta\n" + //
                            "WHERE podvrsta.naziv = ?");

            if (proizvodjac != null) {
                sql.append(" AND proizvodjac.naziv = ?");
            }
            if (marka != null) {
                sql.append(" AND marka.naziv = ?");
            }
            if (minKolicina != null) {
                sql.append(" AND artikl.kolicina >= ?");
            }
            if (minCena != null) {
                sql.append(" AND artikl.cena_p >= ?");
            }
            if (maxCena != null) {
                sql.append(" AND artikl.cena_p <= ?");
            }
            sql.append(" ORDER BY artikl.naziv LIMIT 800");

            // Pripremi SQL upit
            try (PreparedStatement ps = conn.prepareStatement(sql.toString())) {
                int parameterIndex = 1;
                ps.setString(parameterIndex++, podgrupa);

                // Postavi opcione parametre
                if (proizvodjac != null) {
                    ps.setString(parameterIndex++, proizvodjac);
                }
                if (marka != null) {
                    ps.setString(parameterIndex++, marka);
                }
                if (minKolicina != null) {
                    ps.setInt(parameterIndex++, minKolicina);
                }
                if (minCena != null) {
                    ps.setInt(parameterIndex++, minCena);
                }
                if (maxCena != null) {
                    ps.setInt(parameterIndex++, maxCena);
                }

                ResultSet rs = ps.executeQuery();
                List<Artikal> lista = new ArrayList<>();
                while (rs.next()) {
                    lista.add(new Artikal(
                            rs.getInt(1), // idArtikl
                            rs.getString(2), // naziv artikla
                            rs.getString(3), // naziv proizvođača
                            rs.getString(4), // naziv marke
                            rs.getString(5), // naziv vrste
                            rs.getString(6), // naziv podvrste
                            rs.getInt(7), // količina
                            rs.getInt(8), // cena_p
                            rs.getInt(9) // cena_n
                    ));
                }
                return lista;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // dohvata sve podvrste za odredjenu vrstu
    public List<String> getAllPodVrste(String id) {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT podvrsta.naziv FROM podvrsta \n" + //
                        "INNER JOIN vrsta ON podvrsta.idVrsta=vrsta.idVrsta\n" + //
                        "WHERE vrsta.naziv = ?")) {
            ps.setString(1, id);
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

    // dodaje novi artikal u bazu
    public int dodajArtikal(Artikal artikal) {
        try (Connection con = DB.source().getConnection();) {
            PreparedStatement ps = con.prepareStatement("SELECT MAX(idartikl) FROM artikl");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int id = rs.getInt(1) + 1;
                ps = con.prepareStatement(
                        "insert into artikl (idartikl, naziv, idproizvodjac, idmarka, idpodvrsta, kolicina, cena_p, cena_n)\n"
                                + //
                                "values(?, ?, \n" + //
                                "(select idproizvodjac from proizvodjac where naziv = ?),\n" + //
                                "(select idmarka from marka where naziv=?),\n" + //
                                "(select idpodvrsta from podvrsta where naziv=?),\n" + //
                                "?, ?, ?);");
                ps.setInt(1, id);
                ps.setString(2, artikal.getNaziv());
                ps.setString(3, artikal.getProizvodjac());
                ps.setString(4, artikal.getMarka());
                ps.setString(5, artikal.getPodVrsta());
                ps.setInt(6, artikal.getKolicina());
                ps.setInt(7, artikal.getCena_prodajna());
                ps.setInt(8, artikal.getCena_nabavna());
                return ps.executeUpdate();
            }
            return 0;
        } catch (Exception e) {
            return 0;
        }
    }

}
