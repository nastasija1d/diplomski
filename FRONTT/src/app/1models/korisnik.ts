export class Korisnik {
  ime: string;
  prezime: string;
  email: string;
  lozinka: string;
  telefon: string;
  adresa: string;
  grad: string;

  constructor(
    ime: string,
    prezime: string,
    email: string,
    lozinka: string,
    telefon: string,
    adresa: string,
    grad: string
  ) {
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
    this.lozinka = lozinka;
    this.telefon = telefon;
    this.adresa = adresa;
    this.grad = grad;
  }
}
