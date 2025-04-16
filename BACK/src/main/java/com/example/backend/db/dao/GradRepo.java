package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Grad;

public class GradRepo {

    public List<Grad> getAll() {
        try (Connection con = DB.source().getConnection();
                PreparedStatement ps = con.prepareStatement("select postanskiBroj, naziv from grad order by naziv")) {
            ResultSet rs = ps.executeQuery();
            List<Grad> gradovi = new ArrayList<>();
            while (rs.next()) {
                gradovi.add(new Grad(rs.getString("naziv"), rs.getInt("postanskiBroj")));
            }
            return gradovi;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
