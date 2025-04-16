import { Artikal } from './artikal';
import { Korisnik } from './korisnik';

export class Porudzbina {
  idPorudzbina: number;
  korisnik: Korisnik;
  datum: Date;
  iznos: number;
  idstatus: number;
  artikli: Artikal[];

  constructor(
    idPorudzbina: number,
    korisnik: Korisnik,
    datum: Date,
    iznos: number,
    idstatus: number,
    artikli: Artikal[]
  ) {
    this.idPorudzbina = idPorudzbina;
    this.korisnik = korisnik;
    this.datum = datum;
    this.iznos = iznos;
    this.idstatus = idstatus;
    this.artikli = artikli;
  }
}
