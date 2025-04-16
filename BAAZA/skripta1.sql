SELECT artikl.idArtikl, porudzbina.idporudzbina, stavka.idstavka, 
artikl.naziv AS artikl, proizvodjac.naziv  AS proizvojac,
marka.naziv AS  marka, podVrsta.naziv AS  podvrsta, artikl.kolicina AS kolicina, 
artikl.cena_p , artikl.cena_n, stavka.kolicina AS uKorpi
FROM artikl inner join proizvodjac on artikl.idproizvodjac = proizvodjac.idProizvodjac
inner join marka on artikl.idmarka=marka.idmarka
inner join podvrsta on artikl.idpodvrsta=podvrsta.idpodvrsta
inner join stavka on stavka.idArtikl = artikl.idArtikl
inner join porudzbina on stavka.idporudzbina = porudzbina.idporudzbina
where porudzbina.idKorisnik=1
and porudzbina.idstatus=1
order by porudzbina.idporudzbina