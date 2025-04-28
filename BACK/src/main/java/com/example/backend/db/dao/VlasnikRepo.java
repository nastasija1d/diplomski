package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Proizvodjac;

public class VlasnikRepo {

    public List<Proizvodjac> getByMarka(String datumOD, String datumDO){
        try (Connection con = DB.source().getConnection()){
            PreparedStatement ps = con.prepareStatement("select marka.naziv, count(*) as broj\n" + //
                                "from porudzbina inner join stavka on\n" + //
                                "stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                                "inner join artikl on \n" + //
                                "artikl.idArtikl = stavka.idArtikl\n" + //
                                "inner join marka on\n" + //
                                "marka.idMarka = artikl.idMarka\n" + //
                                "where porudzbina.datum>=?\n" + //
                                "and porudzbina.datum<=?\n" + //
                                "group by artikl.idmarka\n" + //
                                "order by count(*) desc");
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
            PreparedStatement ps = con.prepareStatement("select proizvodjac.naziv, count(*) as broj\n" + //
                                "from porudzbina inner join stavka on\n" + //
                                "stavka.idporudzbina = porudzbina.idporudzbina\n" + //
                                "inner join artikl on \n" + //
                                "artikl.idArtikl = stavka.idArtikl\n" + //
                                "inner join proizvodjac on\n" + //
                                "proizvodjac.idproizvodjac = artikl.idproizvodjac\n" + //
                                "where porudzbina.datum>=?\n" + //
                                "and porudzbina.datum<=?\n" + //
                                "group by artikl.idproizvodjac\n" + //
                                "order by count(*) desc");
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
            PreparedStatement ps = con.prepareStatement("select vrsta.naziv, count(*) as broj\n" + //
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
                                "order by count(*) desc");
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
    
}
