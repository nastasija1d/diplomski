import { Component, inject, OnInit } from '@angular/core';
import { Grad } from '../1models/grad';
import { GradService } from '../1services/grad.service';
import { Korisnik } from '../1models/korisnik';
import { KorisnikService } from '../1services/korisnik.service';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css',
})
export class RegistracijaComponent implements OnInit {
  gradovi: Grad[];
  gradService = inject(GradService);
  korisnikService = inject(KorisnikService);
  korisnik: Korisnik;
  errorMessage: string;

  ngOnInit(): void {
    this.gradService.getAll().subscribe((data) => {
      this.gradovi = data;
    });
    this.errorMessage = '';
  }

  registruj() {
    console.log('CAOOO PICKE');
    this.errorMessage = '';
    // Dohvatanje vrednosti iz input polja
    const ime = (
      document.getElementById('ime') as HTMLInputElement
    ).value.trim();
    const prezime = (
      document.getElementById('prezime') as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById('email') as HTMLInputElement
    ).value.trim();
    const lozinka = (
      document.getElementById('lozinka') as HTMLInputElement
    ).value.trim();
    const telefon = (
      document.getElementById('telefon') as HTMLInputElement
    ).value.trim();
    const adresa = (
      document.getElementById('adresa') as HTMLInputElement
    ).value.trim();
    const grad = document.getElementById('grad') as HTMLSelectElement;

    // Regex za validaciju
    const imePrezimeRegex = /^[A-Za-zČĆŽŠĐčćžšđ]+$/; // Samo slova (i podrška za naše karaktere)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validan email
    const telefonRegex = /^[0-9]{9,15}$/; // Telefon mora biti broj (9-15 cifara)

    if (!ime || !imePrezimeRegex.test(ime)) {
      this.errorMessage = 'Ime mora sadržati samo slova';
      return;
    }
    if (!prezime || !imePrezimeRegex.test(prezime)) {
      this.errorMessage = 'Prezime mora sadržati samo slova';
      return;
    }
    if (!email || !emailRegex.test(email)) {
      this.errorMessage = 'Email nije u ispravnom formatu';
      return;
    }
    if (!lozinka || lozinka.length < 6) {
      this.errorMessage = 'Lozinka mora imati najmanje 6 karaktera';
      return;
    }
    if (!telefon || !telefonRegex.test(telefon)) {
      this.errorMessage = 'Telefon mora sadržati između 9 i 15 cifara';
      return;
    }
    if (!adresa) {
      this.errorMessage = 'Molimo unesite adresu';
    }

    this.korisnik = new Korisnik(
      ime,
      prezime,
      email,
      lozinka,
      telefon,
      adresa,
      grad.value
    );
    console.log('Korisnik za registraciju:', this.korisnik);

    this.korisnikService.registruj(this.korisnik).subscribe((data) => {
      if (data == 1 || data == 2) {
        console.log('Korisnik registrovan');
        alert('Korisnik uspesno registrovan!');
      } else {
        console.log('Korisnik NIJE registrovan');
        alert('Vec postoji korisnik sa unetom mail adresom!');
      }
    });
  }
}
