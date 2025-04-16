import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Artikal } from '../1models/artikal';
import { ArtikalService } from '../1services/artikal.service';
import { CommonModule } from '@angular/common';
import { PorudzbinaService } from '../1services/porudzbina.service';

@Component({
  selector: 'app-artikal-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artikal-page.component.html',
  styleUrl: './artikal-page.component.css',
})
export class ArtikalPageComponent implements OnInit {
  ruta = inject(ActivatedRoute);
  servis = inject(ArtikalService);
  porudzbinaService = inject(PorudzbinaService);
  artikal: Artikal;
  id: string;
  slika: string;
  showToast = false;
  message: string;
  dodato: number;
  naStanju: boolean;
  grupa: string;
  podgrupa: string;

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.servis.getById(this.id).subscribe((data) => {
      this.artikal = data;
      this.naStanju = this.artikal.kolicina > 0;
      this.dodato = 0;
      this.slika =
        'http://localhost:8080/slika/podgrupa/' +
        this.artikal.podVrsta.replaceAll(' ', '_');
      this.grupa = this.artikal.vrsta.replaceAll(' ', '_');
      this.podgrupa = this.artikal.podVrsta.replaceAll(' ', '_');
    });
  }

  dodajUKorpu() {
    if (this.artikal.kolicina == 0) {
      this.message = 'Nema na stanju';
    } else if (this.artikal.kolicina == this.dodato + this.artikal.korpa) {
      this.message = 'Maksimalna kolicina dostignuta';
    } else {
      this.dodato++;
      this.message = 'Artikal dodat u korpu';
      this.porudzbinaService.dodajUKorpu(this.artikal.id, 1).subscribe();
    }
    // Prikaži oblačić
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 1000);
  }
}
