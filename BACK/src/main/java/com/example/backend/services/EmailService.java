package com.example.backend.services;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.backend.db.dao.PorudzbinaRepo;
import com.example.backend.models.Artikal;
import com.example.backend.models.PorudzbinaInfo;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendConfirmOrderEmail(int idKorisnik, int idPorudzbina) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("nastasija1d@gmail.com");
            helper.setTo("nastasija1d@gmail.com");
            helper.setSubject("Potvrda porudzbine");

            PorudzbinaInfo por = new PorudzbinaRepo().dohvatiDetaljePorudzbina(idPorudzbina);
            por.setArtikli(new PorudzbinaRepo().dohvatiStavkeIzPorudzbine(idPorudzbina));
            helper.setText(kreirajHtmlMejl(por), true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String kreirajHtmlMejl(PorudzbinaInfo porudzbina) {
        StringBuilder sb = new StringBuilder();

        sb.append("<html>")
                .append("<head>")
                .append("<meta charset='UTF-8'>")
                .append("<style>")
                // Stilizacija tabele
                .append("table { border-collapse: collapse; width: 100%; }")
                .append("th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }")
                .append("th { background-color: #007BFF; color: white; }")
                .append("</style>")
                .append("</head>")
                .append("<body>");

        // Osnovni podaci o porudžbini
        sb.append("<p>Poštovani,</p>")
                .append("<p>Hvala Vam što ste izvršili porudžbinu. Ovde su detalji Vaše porudžbine:</p>")
                .append("<p>")
                .append("Broj porudžbine: <strong>").append(porudzbina.getIdPorudzbina()).append("</strong><br>")
                .append("Datum: <strong>").append(porudzbina.getDatum()).append("</strong><br>")
                .append("Ukupan iznos: <strong>").append(porudzbina.getIznos()).append("</strong>")
                .append("</p>");

        // Tabela sa detaljima o artiklima
        sb.append("<p>Detalji porudžbine:</p>")
                .append("<table>")
                .append("<thead>")
                .append("<tr>")
                .append("<th>Naziv artikla</th>")
                .append("<th>Proizvođač</th>")
                .append("<th>Podgrupa</th>")
                .append("<th>Marka</th>")
                .append("<th>Količina</th>")
                .append("<th>Cena</th>")
                .append("</tr>")
                .append("</thead>")
                .append("<tbody>");

        // Prolazimo kroz listu artikala i dodajemo svaki kao novi red u tabeli
        for (Artikal artikal : porudzbina.getArtikli()) {
            sb.append("<tr>")
                    .append("<td>").append(artikal.getNaziv()).append("</td>")
                    .append("<td>").append(artikal.getProizvodjac()).append("</td>")
                    .append("<td>").append(artikal.getPodVrsta()).append("</td>")
                    .append("<td>").append(artikal.getMarka()).append("</td>")
                    .append("<td>").append(artikal.getKorpa()).append("</td>")
                    .append("<td>").append(artikal.getCena_prodajna()).append("</td>")
                    .append("</tr>");
        }

        sb.append("</tbody>")
                .append("</table>");

        // Završetak emaila
        sb.append("<p>Hvala što ste izabrali našu uslugu.</p>")
                .append("<p>Srdačno,<br>Vaš Tim</p>")
                .append("</body>")
                .append("</html>");

        return sb.toString();
    }

}