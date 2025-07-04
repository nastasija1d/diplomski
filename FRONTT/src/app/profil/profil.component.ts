import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../1models/korisnik';
import { AuthServiceService } from '../1services/auth-service.service';
import { CommonModule } from '@angular/common';
import { PorudzbinaService } from '../1services/porudzbina.service';
import { Porudzbina } from '../1models/porudzbina';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  korisnik: Korisnik | null = null;
  error: string | null = null;
  porudzbine: Porudzbina[] = []; // Lista porudžbina

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getProfil().subscribe({
      next: (data) => {
        this.korisnik = data;
        this.authService.getArhiva().subscribe({
          next: (porudzbineData) => {
            this.porudzbine = porudzbineData; 

          },
          error: (err) => {
            this.error = 'Greška pri dohvatanju arhive porudžbina.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.error = 'Greška pri dohvatanju profila. Molimo ulogujte se ponovo.';
        console.error(err);
      }
    });
  }

  logout(){
    this.authService.logout();
    window.location.reload(); // Osvježavanje stranice nakon odjave
  }

  otvorenePorudzbine: number[] = [];

toggleDetalje(id: number) {
  const index = this.otvorenePorudzbine.indexOf(id);
  if (index > -1) {
    this.otvorenePorudzbine.splice(index, 1); // Sakrij
  } else {
    this.otvorenePorudzbine.push(id); // Prikaži
  }
}

prikazatiDetalje(id: number): boolean {
  return this.otvorenePorudzbine.includes(id);
}

}
