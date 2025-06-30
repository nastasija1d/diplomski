import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../1models/korisnik';
import { AuthServiceService } from '../1services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  korisnik: Korisnik | null = null;
  error: string | null = null;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getProfil().subscribe({
      next: (data) => {
        this.korisnik = data;
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
}
