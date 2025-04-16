export class Artikal {
  id: number;
  naziv: string;
  proizvodjac: string;
  marka: string;
  vrsta: string;
  podVrsta: string;
  kolicina: number;
  cena_prodajna: number;
  cena_nabavna: number;
  korpa: number;

  constructor(
    id: number,
    naziv: string,
    proizvodjac: string,
    marka: string,
    vrsta: string,
    podVrsta: string,
    kolicina: number,
    cena_prodajna: number,
    cena_nabavna: number,
    korpa: number
  ) {
    this.id = id;
    this.naziv = naziv;
    this.proizvodjac = proizvodjac;
    this.marka = marka;
    this.vrsta = vrsta;
    this.podVrsta = podVrsta;
    this.kolicina = kolicina;
    this.cena_prodajna = cena_prodajna;
    this.cena_nabavna = cena_nabavna;
    this.korpa = korpa;
  }
}
