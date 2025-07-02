import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../1services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PorudzbinaService } from '../1services/porudzbina.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  lozinka = '';
  error: string | null = null;

  constructor(
    private authService: AuthServiceService,
    private porudzbina: PorudzbinaService,
    private router: Router
  ) {}

  onSubmit() {
  this.error = null;
  this.authService.login(this.email, this.lozinka).subscribe({
    next: () => {
      const tip = localStorage.getItem('tip');

      if (tip === '1') {
        // KUPAC
        this.porudzbina.osveziBrojArtikala();
        this.router.navigate(['/']);
      } else if (tip === '2') {
        // ADMIN
        this.router.navigate(['/vlasnik/pocetna']);
      } else {
        // Nešto nije u redu sa tokenom ili tipom
        this.error = 'Nepoznat tip korisnika';
      }
    },
    error: err => {
      this.error =
        err.status === 401
          ? 'Pogrešan email ili lozinka'
          : 'Greška pri logovanju. Pokušaj ponovo.';
    }
  });
}

}
